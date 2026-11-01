import { Metadata } from "next";
import { RegisterForm } from "./register-form";

export const metadata: Metadata = {
  title: "Register",
  description: "Create an account to borrow, track and explore books at BookNook.",
};

export default function RegisterPage() {
  return (
    <div className="container mx-auto flex min-h-[calc(100vh-14rem)] max-w-7xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <RegisterForm />
    </div>
  );
}

