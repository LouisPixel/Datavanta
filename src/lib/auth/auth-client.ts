"use client";

import { createAuthClient } from "better-auth/react"

// Get baseURL dynamically - Better Auth needs the full URL including /api/auth
const getBaseURL = () => {
    if (typeof window !== 'undefined') {
        return `${window.location.origin}/api/auth`;
    }
    // Fallback for SSR (shouldn't happen in client component, but just in case)
    const envURL = process.env.NEXT_PUBLIC_BETTER_AUTH_URL || process.env.BETTER_AUTH_URL;
    if (envURL) {
        // If env URL already includes /api/auth, use it as is, otherwise append it
        return envURL.endsWith('/api/auth') ? envURL : `${envURL}/api/auth`;
    }
    return "http://localhost:3000/api/auth";
};

export const { signIn, signOut, useSession, forgetPassword, resetPassword} = createAuthClient({
    baseURL: getBaseURL(),
});