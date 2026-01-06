import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "../db";
import { env } from "../env";
import { nextCookies } from "better-auth/next-js";
// If your Prisma file is located elsewhere, you can change the path

// Build a social providers config only if credentials are available
// Try env first, then fallback to process.env directly (for Netlify compatibility)
const socialProviders: { google?: { clientId: string; clientSecret: string } } = {};
const googleClientId = env.AUTH_GOOGLE_CLIENT_ID || process.env.AUTH_GOOGLE_CLIENT_ID;
const googleSecret = env.AUTH_GOOGLE_SECRET || process.env.AUTH_GOOGLE_SECRET;
const hasGoogleCredentials = !!(googleClientId && googleSecret);

if (hasGoogleCredentials) {
    socialProviders.google = {
        clientId: googleClientId,
        clientSecret: googleSecret,
    };
    console.log('Google OAuth configured successfully');
} else {
    // Log warning in all environments to help debug
    console.warn('Google OAuth is not configured. Set AUTH_GOOGLE_CLIENT_ID and AUTH_GOOGLE_SECRET environment variables.');
    console.warn('Current values:', {
        clientId: googleClientId ? '***set***' : 'missing',
        secret: googleSecret ? '***set***' : 'missing',
    });
}

// Get baseURL - should be the full URL to the API route (e.g., https://yourdomain.com/api/auth)
// If BETTER_AUTH_URL is set, use it; otherwise construct from NEXT_PUBLIC_VERCEL_URL or default
const getBaseURL = () => {
    const envURL = env.BETTER_AUTH_URL || process.env.BETTER_AUTH_URL;
    if (envURL) {
        // If env URL already includes /api/auth, use it as is, otherwise append it
        return envURL.endsWith('/api/auth') ? envURL : `${envURL}/api/auth`;
    }
    // Fallback for development
    return process.env.NEXT_PUBLIC_VERCEL_URL 
        ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/auth`
        : "http://localhost:3000/api/auth";
};

export const auth = betterAuth({
    secret: env.BETTER_AUTH_SECRET || process.env.BETTER_AUTH_SECRET || "default-secret-change-in-production",
    baseURL: getBaseURL(),
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    emailAndPassword: {
        enabled: true,
        minPasswordLength: 8,
        maxPasswordLength: 128,
        autoSignIn: true,
    },
    account: {
        accountLinking: {
            enabled: true,
        },
    },
    ...(Object.keys(socialProviders).length > 0 && { socialProviders }),

    plugins: [nextCookies()],
});
