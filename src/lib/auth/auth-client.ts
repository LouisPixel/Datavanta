"use client";

import { createAuthClient } from "better-auth/react"

// Get baseURL dynamically - Better Auth will use the current origin if not provided
// But we explicitly set it to ensure it works in production
const getBaseURL = () => {
    if (typeof window !== 'undefined') {
        return window.location.origin;
    }
    // Fallback for SSR (shouldn't happen in client component, but just in case)
    return process.env.NEXT_PUBLIC_BETTER_AUTH_URL || process.env.BETTER_AUTH_URL || "http://localhost:3000";
};

export const { signIn, signOut, useSession, forgetPassword, resetPassword} = createAuthClient({
    baseURL: getBaseURL(),
});