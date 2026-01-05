import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Layout({
    children
}: Readonly<{children: React.ReactNode}>) {
    return (
        <div>
            <Button className="fixed top-5 rounded-xl left border border-white/20" variant="outline" asChild>
                <Link href="/">
                <ArrowLeft/>
                Back
                </Link>
            </Button>
            {children}
        </div>
    );
}