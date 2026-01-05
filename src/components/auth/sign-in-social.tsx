"use client";
import { signIn } from "@/lib/auth/auth-client";
import { Button } from "../ui/button";

export default function SignInSocial({
    provider, 
    children,
}: {
    provider: "google";
    children: React.ReactNode
}) {
    return (
        <Button 
            onClick={async () => {
                try {
                    const result = await signIn.social({
                        provider,
                        callbackURL: "/dashboard"
                    });
                    // If result has an error, log it
                    if (result?.error) {
                        console.error("Sign in error:", result.error);
                    }
                } catch (error) {
                    console.error("Failed to sign in with Google:", error);
                }
            }}
            type="button"
            variant="outline"
            className="w-80"
        >
            {children}
        </Button>
    );

}