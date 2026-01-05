import { createAuthClient } from "better-auth/react"
export const { signIn, signOut, useSession, forgetPassword, resetPassword} = createAuthClient({
    baseURL: "http://localhost:3000",
});