import { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to BookNook to borrow books and manage your digital library collection.",
};

export default function LoginPage() {
  return (
    <div className="container mx-auto flex min-h-[calc(100vh-14rem)] max-w-7xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <Suspense fallback={<div className="h-96 w-full max-w-md animate-pulse rounded-2xl bg-muted/40" />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}

