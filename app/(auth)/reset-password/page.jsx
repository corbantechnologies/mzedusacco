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
import { passwordReset } from "@/services/members";
import { PasswordSetupSchema } from "@/validation";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ResetPassword() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        code: "",
        new_password: "",
        confirm_password: "",
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const router = useRouter();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
        // Clear error when user types
        if (errors[e.target.id]) {
            setErrors({ ...errors, [e.target.id]: "" });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        // Validate using the schema
        try {
            await PasswordSetupSchema.validate(
                {
                    password: formData.new_password,
                    confirmPassword: formData.confirm_password,
                },
                { abortEarly: false }
            );
        } catch (err) {
            const validationErrors = {};
            if (err.inner) {
                err.inner.forEach((error) => {
                    // Map schema keys to form keys if necessary, or just use mapped logic in display
                    // Schema: password -> field: new_password
                    // Schema: confirmPassword -> field: confirm_password
                    if (error.path === "password") validationErrors.new_password = error.message;
                    if (error.path === "confirmPassword") validationErrors.confirm_password = error.message;
                });
            }
            setErrors(validationErrors);
            // toast.error("Please fix the validation errors.");
            return;
        }

        setLoading(true);
        try {
            await passwordReset({
                email: formData.email,
                code: formData.code,
                password: formData.new_password,
                confirm_password: formData.confirm_password,
            });
            toast.success("Password reset successful! You can now login.");
            router.push("/login");
        } catch (error) {
            console.error(error);
            toast.error(
                error?.response?.data?.message ||
                "Failed to reset password. Please check your code."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-md mx-auto shadow-lg border-0 bg-white/95 backdrop-blur-sm">
                <CardHeader className="space-y-1 items-center text-center pb-2">
                    <CardTitle className="text-2xl font-bold tracking-tight text-primary">
                        Reset Password
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                        Enter the code sent to your email and your new password
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
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="code">Reset Code (OTP)</Label>
                            <Input
                                type="text"
                                id="code"
                                placeholder="Enter the 6-digit code"
                                className="h-10 tracking-widest"
                                value={formData.code}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="new_password">New Password</Label>
                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    id="new_password"
                                    placeholder="Enter new password"
                                    className={`h-10 pr-10 ${errors.new_password ? "border-red-500" : ""}`}
                                    value={formData.new_password}
                                    onChange={handleChange}
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-4 h-4" />
                                    ) : (
                                        <Eye className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                            {errors.new_password && (
                                <p className="text-sm text-red-500 mt-1">{errors.new_password}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirm_password">Confirm New Password</Label>
                            <div className="relative">
                                <Input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirm_password"
                                    placeholder="Confirm new password"
                                    className={`h-10 pr-10 ${errors.confirm_password ? "border-red-500" : ""}`}
                                    value={formData.confirm_password}
                                    onChange={handleChange}
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="w-4 h-4" />
                                    ) : (
                                        <Eye className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                            {errors.confirm_password && (
                                <p className="text-sm text-red-500 mt-1">{errors.confirm_password}</p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-10 text-base font-semibold"
                            disabled={loading}
                        >
                            {loading ? "Resetting..." : "Reset Password"}
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