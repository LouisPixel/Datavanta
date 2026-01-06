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
            const currentOrigin = typeof window !== 'undefined' ? window.location.origin : '';
            const expectedRedirectURI = `${currentOrigin}/api/auth/callback/google`;
            
            console.log("Attempting Google sign in with provider:", provider);
            console.log("Current origin:", currentOrigin);
            console.log("Expected redirect URI:", expectedRedirectURI);
            console.log("Base URL (client):", `${currentOrigin}/api/auth`);
            
            // signIn.social should redirect automatically to Google OAuth
            const result = await signIn.social({
                provider,
                callbackURL: "/dashboard"
            });
            
            // If we get a result (not a redirect), check for errors
            if (result && typeof result === 'object' && 'error' in result) {
                const error = result.error as { message?: string } | string | unknown;
                console.error("Sign in error:", error);
                const errorMsg = (typeof error === 'object' && error !== null && 'message' in error) 
                    ? String(error.message) 
                    : typeof error === 'string' 
                        ? error 
                        : 'Google authentication failed';
                const fullError = typeof error === 'object' && error !== null 
                    ? JSON.stringify(error, null, 2) 
                    : String(error);
                console.error("Full error details:", fullError);
                
                toast.error(`Failed to sign in: ${errorMsg}`, {
                    description: `Make sure your Google Cloud Console has this redirect URI: ${expectedRedirectURI}`,
                    duration: 10000,
                });
            } else {
                // If successful, the redirect should happen automatically
                console.log("Google sign in initiated successfully");
            }
        } catch (error) {
            console.error("Error initiating Google sign in:", error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            const currentOrigin = typeof window !== 'undefined' ? window.location.origin : '';
            const expectedRedirectURI = `${currentOrigin}/api/auth/callback/google`;
            
            // Check if it's a configuration error
            if (errorMessage.includes('not configured') || errorMessage.includes('missing')) {
                toast.error('Google OAuth is not configured', {
                    description: 'Please check your environment variables in Netlify: AUTH_GOOGLE_CLIENT_ID and AUTH_GOOGLE_SECRET',
                    duration: 10000,
                });
            } else if (errorMessage.includes('redirect_uri_mismatch') || errorMessage.includes('redirect') || errorMessage.includes('redirect_uri')) {
                toast.error('Google OAuth redirect URI mismatch', {
                    description: `Add this redirect URI in Google Cloud Console: ${expectedRedirectURI}`,
                    duration: 10000,
                });
            } else {
                toast.error(`Failed to sign in with Google: ${errorMessage}`, {
                    description: `Expected redirect URI: ${expectedRedirectURI}`,
                    duration: 10000,
                });
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