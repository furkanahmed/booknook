import { Metadata } from "next";
import { ProfileClient } from "./profile-client";

export const metadata: Metadata = {
  title: "My Profile - Reader Account",
  description: "View your verified library membership, session information, and reading activity.",
};

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <ProfileClient />
      </div>
    </main>
  );
}
