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

// Get baseURL - Better Auth expects the site root URL, not the API route
// It will automatically append /api/auth when needed
const getBaseURL = () => {
    const envURL = env.BETTER_AUTH_URL || process.env.BETTER_AUTH_URL;
    if (envURL) {
        // Remove /api/auth if present, Better Auth will add it
        return envURL.replace(/\/api\/auth\/?$/, '');
    }
    // Try Netlify environment variables
    if (process.env.NETLIFY) {
        const url = process.env.URL || process.env.DEPLOY_PRIME_URL;
        if (url) {
            return url;
        }
    }
    // Fallback for development
    return process.env.NEXT_PUBLIC_VERCEL_URL 
        ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
        : "http://localhost:3000";
};

const baseURL = getBaseURL();
console.log('Better Auth baseURL:', baseURL);
console.log('Google OAuth configured:', hasGoogleCredentials);
if (hasGoogleCredentials) {
    console.log('Expected Google redirect URI:', `${baseURL}/api/auth/callback/google`);
}

export const auth = betterAuth({
    secret: env.BETTER_AUTH_SECRET || process.env.BETTER_AUTH_SECRET || "default-secret-change-in-production",
    baseURL: baseURL,
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
