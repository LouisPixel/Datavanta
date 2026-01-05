import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "../db";
import { env } from "../env";
import { nextCookies } from "better-auth/next-js";
// If your Prisma file is located elsewhere, you can change the path

// Build a social providers config only if credentials are available
const socialProviders: { google?: { clientId: string; clientSecret: string } } = {};
const hasGoogleCredentials = !!(env.AUTH_GOOGLE_CLIENT_ID && env.AUTH_GOOGLE_SECRET);
if (hasGoogleCredentials) {
    socialProviders.google = {
        clientId: env.AUTH_GOOGLE_CLIENT_ID,
        clientSecret: env.AUTH_GOOGLE_SECRET,
    };
} else {
    // Log warning in development
    if (process.env.NODE_ENV === 'development') {
        console.warn('Google OAuth is not configured. Set AUTH_GOOGLE_CLIENT_ID and AUTH_GOOGLE_SECRET environment variables.');
    }
}

export const auth = betterAuth({
    secret: env.BETTER_AUTH_SECRET || process.env.BETTER_AUTH_SECRET || "default-secret-change-in-production",
    baseURL: env.BETTER_AUTH_URL || process.env.BETTER_AUTH_URL,
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
