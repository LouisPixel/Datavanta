"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { forgetPassword } from "@/lib/auth/auth-client";

export default function Page() {
    const params = useSearchParams();
    const emailFromQuery = params.get('email') || "";
    const [email, setEmail] = useState(emailFromQuery);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { error } = await forgetPassword({
            email,
            redirectTo: `${window.location.origin}/login/forgot-account/forgot-password/rest-password`,
        });
        
        if (error) {
            setMessage("Something went wrong. Please try again.");
        } else {
            setMessage("Check your email for the reset link.");
        }
        setEmail("");
    };

    return (
        <form
        onSubmit={handleSubmit}
        className="p-6 max-w-md mx-auto space-y-4 container mt-10">
            <h1 className="text-xl font-semibold">Forgot Password?</h1>
            <Input 
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border rounded"/>
            <div className="grid grid-cols-3 gap-2">
                <Button type="submit">Send Reset Link</Button>
                <Button asChild variant={"outline"}>
                    <Link href="/login">Sign In</Link>
                </Button>
            </div>
            {message && <p>{message}</p>}
        </form>

    );
}