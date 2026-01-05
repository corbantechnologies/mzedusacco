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
import { Eye, EyeOff } from "lucide-react";
import { getSession, signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import toast from "react-hot-toast";

function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [member_no, setMemberNo] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await signIn("credentials", {
        redirect: false,
        member_no,
        password,
      });
      const session = await getSession();
      if (response?.error) {
        toast?.error("Invalid member number or password");
        setLoading(false);
      } else {
        toast?.success("Login successful! Redirecting...");
        if (session?.user?.is_staff === true) {
          router.push("/sacco-admin/dashboard");
        } else if (session?.user?.is_system_admin === true) {
          router.push("/sacco-admin/dashboard");
        } else if (session?.user?.is_member === true) {
          router.push("/member/dashboard");
        } else {
          router.push("/");
        }
      }
    } catch (error) {
      setLoading(false);
      toast?.error("Login failed. Please try again.");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-0 bg-white/95 backdrop-blur-sm">
      <CardHeader className="space-y-1 items-center text-center pb-2">
        <Image
          src="/auth-image-noBg-2.png"
          alt="Mwanda Mzedu SACCO Logo"
          width={180}
          height={180}
          className="mx-auto"
        />
        <CardTitle className="text-2xl font-bold tracking-tight text-primary">
          Mwanda Mzedu SACCO
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          The SACCO for everyone
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="member_no">Member Number</Label>
            <Input
              type="text"
              id="member_no"
              placeholder="Enter your member number"
              className="h-10"
              value={member_no}
              onChange={(e) => setMemberNo(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <a
                href="/forgot-password"
                className="text-xs text-primary hover:underline font-medium"
              >
                Forgot Password?
              </a>
            </div>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                className="h-10 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-10 text-base font-semibold transition-all"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default LoginForm;
