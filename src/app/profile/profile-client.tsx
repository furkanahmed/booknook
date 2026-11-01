"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  User as UserIcon,
  Mail,
  ShieldCheck,
  BookOpen,
  Library,
  Calendar,
  LogOut,
  Sparkles,
  ArrowRight,
  Clock,
  Award,
} from "lucide-react";

export function ProfileClient() {
  const router = useRouter();
  const { user, loading, logout, userBorrows } = useAuth();
  const [userAddedBooksCount, setUserAddedBooksCount] = useState(0);

  // Protected route check
  useEffect(() => {
    if (!loading && !user) {
      toast.info("Please sign in to view your profile and reading activity.");
      router.push("/login?redirect=/profile");
    }
  }, [user, loading, router]);

  // Load count of books published by this user from local storage
  useEffect(() => {
    if (!user) return;
    try {
      const stored = localStorage.getItem("booknook_user_added_books");
      if (stored) {
        const books = JSON.parse(stored);
        const count = books.filter(
          (b: any) => b.userEmail?.toLowerCase() === user.email.toLowerCase()
        ).length;
        setUserAddedBooksCount(count);
      }
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  if (loading || !user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
        <p className="text-sm text-neutral-400">Loading reader profile...</p>
      </div>
    );
  }

  // Derive initials for avatar fallback
  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .substring(0, 2)
        .toUpperCase()
    : "U";

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully.");
    router.push("/");
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Profile Header Card */}
      <div className="relative overflow-hidden rounded-3xl bg-neutral-900/60 border border-neutral-800/80 p-6 sm:p-10 backdrop-blur-sm shadow-2xl">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
          {/* Avatar / Photo */}
          <div className="relative">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-1 shadow-2xl flex items-center justify-center shrink-0">
              {user.avatar ? (
                <div className="relative w-full h-full rounded-[22px] overflow-hidden bg-neutral-950">
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-full h-full rounded-[22px] bg-neutral-950 flex items-center justify-center text-emerald-400 font-serif text-3xl font-bold shadow-inner">
                  {initials}
                </div>
              )}
            </div>
            {/* Status indicator dot */}
            <div
              className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-neutral-900 shadow-md"
              title="Active Reader Session"
            />
          </div>

          {/* User Details */}
          <div className="space-y-3 text-center sm:text-left flex-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Library Member</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-100 tracking-tight">
              {user.name}
            </h1>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs sm:text-sm text-neutral-400">
              <span className="flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-emerald-400" />
                {user.email}
              </span>
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                Standard Tier Reader
              </span>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="h-9 px-4 rounded-xl text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 border border-rose-500/20 flex items-center gap-2"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Card 1: Books Borrowed */}
        <div className="rounded-3xl bg-neutral-900/60 border border-neutral-800/80 p-6 sm:p-8 backdrop-blur-sm shadow-xl flex flex-col justify-between space-y-6 group hover:border-emerald-500/40 transition-colors">
          <div className="flex items-start justify-between">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <BookOpen className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 bg-neutral-950 px-3 py-1 rounded-full border border-neutral-800">
              Reading Shelf
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-4xl sm:text-5xl font-serif font-bold text-neutral-100">
              {userBorrows.length}
            </span>
            <p className="text-sm font-semibold text-neutral-200">
              Active Borrowed {userBorrows.length === 1 ? "Book" : "Books"}
            </p>
            <p className="text-xs text-neutral-400">
              Books currently checked out under your library account with scheduled return dates.
            </p>
          </div>

          <Link href="/my-borrows">
            <Button className="w-full bg-neutral-800 hover:bg-emerald-600 hover:text-neutral-950 text-neutral-200 font-semibold text-xs h-10 rounded-xl border border-neutral-700 transition-all flex items-center justify-center gap-2 group-hover:bg-emerald-500 group-hover:text-neutral-950 group-hover:border-transparent">
              <span>View Borrowed Books</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        {/* Card 2: Books Contributed */}
        <div className="rounded-3xl bg-neutral-900/60 border border-neutral-800/80 p-6 sm:p-8 backdrop-blur-sm shadow-xl flex flex-col justify-between space-y-6 group hover:border-emerald-500/40 transition-colors">
          <div className="flex items-start justify-between">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
              <Library className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 bg-neutral-950 px-3 py-1 rounded-full border border-neutral-800">
              Contributions
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-4xl sm:text-5xl font-serif font-bold text-neutral-100">
              {userAddedBooksCount}
            </span>
            <p className="text-sm font-semibold text-neutral-200">
              Contributed {userAddedBooksCount === 1 ? "Book" : "Books"}
            </p>
            <p className="text-xs text-neutral-400">
              Titles you have published and made available for the community reading sanctuary.
            </p>
          </div>

          <div className="flex gap-2">
            <Link href="/my-books" className="flex-1">
              <Button className="w-full bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold text-xs h-10 rounded-xl border border-neutral-700 transition-all flex items-center justify-center gap-1.5">
                <span>My Books</span>
              </Button>
            </Link>
            <Link href="/add-book" className="flex-1">
              <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-neutral-950 font-semibold text-xs h-10 rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/20">
                <span>Add Book</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Account Info Panel */}
      <div className="p-6 rounded-3xl bg-neutral-900/40 border border-neutral-800/60 space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>Membership & Compliance Details</span>
        </h3>
        <p className="text-xs text-neutral-400 leading-relaxed">
          Your BookNook session is authenticated securely. Readers are entitled to borrow up to multiple concurrent titles within their return deadlines. Returning titles on or before due dates keeps the catalog available for the community.
        </p>
      </div>
    </div>
  );
}

