"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { Book } from "@/types/book";
import { useAuth } from "@/context/auth-context";
import { BorrowSection } from "@/components/books/borrow-section";
import { getBookById } from "@/lib/books-service";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  CheckCircle2,
  FileText,
  Globe,
  Layers,
  Star,
  User,
} from "lucide-react";

export function BookDetailsClient({ initialBook }: { initialBook?: Book | null }) {
  const params = useParams();
  const id = (params?.id as string) || "";
  const [book, setBook] = useState<Book | null>(initialBook || null);

  useEffect(() => {
    if (!book && id) {
      const found = getBookById(id);
      if (found) {
        setBook(found);
      } else {
        // Fetch from MongoDB
        fetch(`/api/books`).then((r) => r.json()).then((d) => {
          if (d.success && Array.isArray(d.data)) {
            const match = d.data.find((b: any) => b._id === id);
            if (match) setBook(match);
          }
        }).catch((err) => console.error("Error fetching book details:", err));
      }
    }
  }, [id, book]);

  const { getAvailableCopies } = useAuth();

  if (!book) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4 bg-neutral-950 text-neutral-100">
        <div className="w-10 h-10 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
        <p className="text-sm text-neutral-400">Loading book details...</p>
      </div>
    );
  }

  const currentCopies = getAvailableCopies(book._id, book.totalCopies);
  const isAvailable = currentCopies > 0;

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Back Link */}
        <div>
          <Link
            href="/books"
            className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-emerald-400 transition-colors py-2 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to All Books
          </Link>
        </div>

        {/* Main Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 bg-neutral-900/60 border border-neutral-800/80 rounded-3xl p-6 sm:p-8 lg:p-10 backdrop-blur-sm">
          {/* Cover Column */}
          <div className="md:col-span-5 lg:col-span-4 flex flex-col items-center">
            <div className="relative w-full max-w-[340px] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-neutral-800 bg-neutral-950">
              <Image
                src={book.image}
                alt={book.title}
                fill
                sizes="(max-width: 768px) 100vw, 340px"
                className="object-cover"
                priority
              />
              <div className="absolute top-3 right-3 bg-neutral-900/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-emerald-400 border border-neutral-700/60 shadow-lg">
                {book.category}
              </div>
            </div>

            {/* Quick stock pill below cover */}
            <div className="mt-5 w-full max-w-[340px] flex items-center justify-between p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800 text-sm">
              <span className="text-neutral-400 flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                Available Copies:
              </span>
              <span
                className={`font-semibold px-2.5 py-0.5 rounded-full text-xs ${
                  isAvailable
                    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                    : "bg-rose-500/15 text-rose-400 border border-rose-500/30"
                }`}
              >
                {currentCopies} {currentCopies === 1 ? "Copy" : "Copies"}
              </span>
            </div>
          </div>

          {/* Book Information Column */}
          <div className="md:col-span-7 lg:col-span-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Category & Rating */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  {book.category}
                </span>
                {book.rating && (
                  <div className="flex items-center gap-1.5 text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-semibold">{book.rating.toFixed(1)}</span>
                    <span className="text-neutral-400">/ 5.0</span>
                  </div>
                )}
                <span
                  className={`inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full font-medium ${
                    isAvailable
                      ? "bg-emerald-950/80 text-emerald-400 border border-emerald-800/80"
                      : "bg-rose-950/80 text-rose-400 border border-rose-800/80"
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {isAvailable ? "In Stock" : "Currently Unavailable"}
                </span>
              </div>

              {/* Title & Author */}
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-neutral-100 tracking-tight leading-tight">
                  {book.title}
                </h1>
                <p className="mt-2 text-lg sm:text-xl text-neutral-400 flex items-center gap-2">
                  <User className="w-5 h-5 text-emerald-400" />
                  By <span className="text-neutral-200 font-medium">{book.author}</span>
                </p>
              </div>

              {/* Short Summary Callout */}
              <div className="p-4 rounded-2xl bg-neutral-950/60 border border-neutral-800 text-neutral-300 text-sm italic leading-relaxed">
                "{book.shortDescription}"
              </div>

              {/* Long Detailed Description */}
              <div className="space-y-2 pt-2">
                <h2 className="text-sm uppercase tracking-wider font-semibold text-emerald-400 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Book Overview & Summary
                </h2>
                <p className="text-neutral-300 leading-relaxed text-sm sm:text-base text-justify whitespace-pre-line font-normal">
                  {book.longDescription || book.shortDescription}
                </p>
              </div>

              {/* PDF Mandatory: Borrow Section with Auth Check, Stock Check & Calendar Modal */}
              <BorrowSection book={book} />
            </div>

            {/* Book Meta Details Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-neutral-800 text-xs text-neutral-300">
              <div className="p-3 rounded-xl bg-neutral-950/50 border border-neutral-800/60">
                <p className="text-neutral-500 mb-1 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  Published
                </p>
                <p className="font-semibold text-neutral-200">{book.publishedYear || "N/A"}</p>
              </div>
              <div className="p-3 rounded-xl bg-neutral-950/50 border border-neutral-800/60">
                <p className="text-neutral-500 mb-1 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-emerald-400" />
                  Pages
                </p>
                <p className="font-semibold text-neutral-200">{book.pages ? `${book.pages} Pages` : "N/A"}</p>
              </div>
              <div className="p-3 rounded-xl bg-neutral-950/50 border border-neutral-800/60">
                <p className="text-neutral-500 mb-1 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-emerald-400" />
                  Language
                </p>
                <p className="font-semibold text-neutral-200">{book.language || "English"}</p>
              </div>
              <div className="p-3 rounded-xl bg-neutral-950/50 border border-neutral-800/60">
                <p className="text-neutral-500 mb-1 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-emerald-400" />
                  ISBN
                </p>
                <p className="font-semibold text-neutral-200 truncate">{book.isbn || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
