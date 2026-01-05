import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "../db";
import { env } from "../env";
import { nextCookies } from "better-auth/next-js";
// If your Prisma file is located elsewhere, you can change the path

export const auth = betterAuth({
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
    socialProviders: {
        google: {
            clientId: env.AUTH_GOOGLE_CLIENT_ID,
            clientSecret: env.AUTH_GOOGLE_SECRET,
        },
    },

    plugins: [nextCookies()],
});
