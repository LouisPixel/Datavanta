"use client";
import { signIn } from "@/lib/auth/auth-client";
import { Button } from "../ui/button";
import { toast } from "sonner";

export default function SignInSocial({
    provider, 
    children,
}: {
    provider: "google";
    children: React.ReactNode
}) {
    const handleGoogleSignIn = async () => {
        try {
            console.log("Attempting Google sign in with provider:", provider);
            console.log("Base URL:", typeof window !== 'undefined' ? `${window.location.origin}/api/auth` : 'N/A');
            
            // signIn.social should redirect automatically to Google OAuth
            const result = await signIn.social({
                provider,
                callbackURL: "/dashboard"
            });
            
            // If we get a result (not a redirect), check for errors
            if (result && 'error' in result) {
                console.error("Sign in error:", result.error);
                const errorMsg = result.error?.message || 'Google authentication failed';
                toast.error(`Failed to sign in: ${errorMsg}`);
            } else {
                // If successful, the redirect should happen automatically
                console.log("Google sign in initiated successfully");
            }
        } catch (error) {
            console.error("Error initiating Google sign in:", error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            
            // Check if it's a configuration error
            if (errorMessage.includes('not configured') || errorMessage.includes('missing')) {
                toast.error('Google OAuth is not configured. Please check your environment variables in Netlify: AUTH_GOOGLE_CLIENT_ID and AUTH_GOOGLE_SECRET');
            } else if (errorMessage.includes('redirect_uri_mismatch') || errorMessage.includes('redirect')) {
                toast.error('Google OAuth redirect URI mismatch. Please check your Google Cloud Console settings and ensure the redirect URI matches: https://yourdomain.com/api/auth/callback/google');
            } else {
                toast.error(`Failed to sign in with Google: ${errorMessage}`);
            }
        }
    };

    return (
        <Button 
            onClick={handleGoogleSignIn}
            type="button"
            variant="outline"
            className="w-80"
        >
            {children}
        </Button>
    );

}