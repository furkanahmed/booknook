"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles, 
  HelpCircle 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }

    if (!formData.password) {
      toast.error("Please enter your password.");
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 600));

      // Derive display name from email
      const displayName = formData.email.split("@")[0];
      const capitalized = displayName.charAt(0).toUpperCase() + displayName.slice(1);

      login({
        id: "usr-" + Date.now(),
        name: capitalized,
        email: formData.email.toLowerCase(),
      });

      toast.success("Welcome back! Signed in successfully.");
      // Requirement: Navigate to the originally requested route or Home page
      router.push(redirectUrl);
    } catch {
      toast.error("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Assignment Mandatory Rule:
  // "Forget Password link/button that is visible but does nothing except show an info toast ("not available yet") — no backend trigger, no email flow"
  const handleForgetPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    toast.info("Password reset feature is not available yet.", {
      icon: <HelpCircle className="h-4 w-4 text-sky-500" />,
      description: "As per assignment rules, password reset is temporarily disabled.",
    });
  };

  // Assignment Mandatory Rule: Social Login (Google only)
  const handleGoogleSignIn = () => {
    login({
      id: "usr-google-" + Date.now(),
      name: "Demo Reader",
      email: "reader@booknook.com",
    });
    toast.success("Signed in with Google successfully!");
    router.push(redirectUrl);
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-border/80 bg-card p-6 sm:p-8 shadow-lg transition-colors">
      
      {/* Header */}
      <div className="text-center space-y-2 mb-8">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
          <Sparkles className="h-3.5 w-3.5 text-amber-500" />
          <span>Welcome Back</span>
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-card-foreground">
          Sign In to BookNook
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Enter your email and password to access your borrowing history.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground" htmlFor="email">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              className="w-full rounded-xl border border-input bg-background/50 pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-foreground" htmlFor="password">
              Password
            </label>
            {/* Forget Password link (Shows informative toast only, strictly no reset flow) */}
            <button
              type="button"
              onClick={handleForgetPassword}
              className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Forget Password?
            </button>
          </div>
          
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full rounded-xl border border-input bg-background/50 pl-10 pr-10 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Submit Login Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-xl py-2.5 font-semibold text-sm shadow-md mt-2"
        >
          {isLoading ? (
            <span>Signing In...</span>
          ) : (
            <span className="flex items-center justify-center gap-1.5">
              <span>Login</span>
              <ArrowRight className="h-4 w-4" />
            </span>
          )}
        </Button>
      </form>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground font-medium">Or continue with</span>
        </div>
      </div>

      {/* Social Login: Google Only (Assignment Rule: No other social login allowed) */}
      <Button
        type="button"
        variant="outline"
        onClick={handleGoogleSignIn}
        className="w-full rounded-xl py-2.5 border-border hover:bg-muted font-medium text-sm flex items-center justify-center gap-2"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            fill="#EA4335"
          />
        </svg>
        <span>Sign in with Google</span>
      </Button>

      {/* Footer Link to Register */}
      <p className="mt-6 text-center text-xs sm:text-sm text-muted-foreground">
        Don&apos;t have an account yet?{" "}
        <Link
          href="/register"
          className="font-semibold text-primary hover:text-amber-500 hover:underline transition-colors"
        >
          Register here
        </Link>
      </p>

    </div>
  );
}

