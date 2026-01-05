"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forgotPassword } from "@/services/members";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await forgotPassword({ email });
            toast.success("If an account exists, a reset code has been sent.");
            router.push("/reset-password");
        } catch (error) {
            console.error(error);
            toast.error("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-md mx-auto shadow-lg border-0 bg-white/95 backdrop-blur-sm">
                <CardHeader className="space-y-1 items-center text-center pb-2">
                    <CardTitle className="text-2xl font-bold tracking-tight text-primary">
                        Forgot Password
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                        Enter your email to receive a password reset code
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                className="h-10"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-10 text-base font-semibold"
                            disabled={loading}
                        >
                            {loading ? "Sending..." : "Send Reset Code"}
                        </Button>
                    </form>

                    <div className="text-center pt-2">
                        <Link
                            href="/login"
                            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Login
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}