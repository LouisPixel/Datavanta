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
                toast.error(`Failed to sign in: ${result.error?.message || 'Google authentication is not configured. Please set AUTH_GOOGLE_CLIENT_ID and AUTH_GOOGLE_SECRET in your environment variables.'}`);
            }
        } catch (error) {
            console.error("Error initiating Google sign in:", error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            toast.error(`Failed to sign in with Google: ${errorMessage}. Make sure Google OAuth is configured in your environment variables.`);
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