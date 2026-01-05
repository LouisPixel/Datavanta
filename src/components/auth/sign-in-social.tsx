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
            }
        } catch (error) {
            console.error("Error initiating Google sign in:", error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            
            // Check if it's a configuration error
            if (errorMessage.includes('not configured') || errorMessage.includes('missing')) {
                toast.error('Google OAuth is not configured. Please check your environment variables in Netlify: AUTH_GOOGLE_CLIENT_ID and AUTH_GOOGLE_SECRET');
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