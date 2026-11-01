"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { initialBooksCatalog } from "@/data/initial-books";
import { Book } from "@/types/book";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  ExternalLink,
  HelpCircle,
  Library,
  RotateCcw,
  Sparkles,
  User,
  X,
  AlertCircle,
} from "lucide-react";

interface BorrowedItemWithDetails {
  book: Book;
  borrowedAt: string;
  returnDate: string;
}

export function MyBorrowsClient() {
  const router = useRouter();
  const { user, loading, userBorrows, returnBook } = useAuth();
  const [returnModalBook, setReturnModalBook] = useState<BorrowedItemWithDetails | null>(null);
  const [isReturning, setIsReturning] = useState(false);

  // Protected route check: Redirect unauthenticated user to login with redirect parameter
  useEffect(() => {
    if (!loading && !user) {
      toast.info("Please sign in to view your borrowed books collection.");
      router.push("/login?redirect=/my-borrows");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
        <p className="text-sm text-neutral-400">Loading your reading collection...</p>
      </div>
    );
  }

  // Combine borrow records with book details
  const borrowedList: BorrowedItemWithDetails[] = userBorrows
    .map((record) => {
      const book = initialBooksCatalog.find((b) => b._id === record.bookId);
      if (!book) return null;
      return {
        book,
        borrowedAt: record.borrowedAt,
        returnDate: record.returnDate,
      };
    })
    .filter((item): item is BorrowedItemWithDetails => item !== null);

  const handleConfirmReturn = async () => {
    if (!returnModalBook) return;

    setIsReturning(true);
    await new Promise((resolve) => setTimeout(resolve, 600));

    const success = returnBook(returnModalBook.book._id);
    setIsReturning(false);

    if (success) {
      toast.success(
        `"${returnModalBook.book.title}" returned successfully! Available copies updated.`,
        {
          duration: 4000,
          icon: <CheckCircle className="w-5 h-5 text-emerald-400" />,
        }
      );
      setReturnModalBook(null);
    } else {
      toast.error("Failed to return book. Please try again.");
    }
  };

  const formatBorrowDate = (isoString: string) => {
    try {
      return new Date(isoString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-sm">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Library className="w-3.5 h-3.5" />
            <span>Active Borrowed Collection</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-100 tracking-tight">
            My Borrowed Books
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400">
            Track reading schedules and return active titles back to the library.
          </p>
        </div>

        <div className="flex items-center gap-3 self-stretch sm:self-auto bg-neutral-950/80 border border-neutral-800 px-4 py-3 rounded-2xl">
          <div className="text-right sm:text-left">
            <span className="text-[11px] uppercase tracking-wider text-neutral-500 font-semibold block">
              Currently Borrowed
            </span>
            <span className="text-xl font-bold text-emerald-400 font-serif">
              {borrowedList.length} {borrowedList.length === 1 ? "Book" : "Books"}
            </span>
          </div>
        </div>
      </div>

      {/* Main Borrows Content */}
      {borrowedList.length === 0 ? (
        /* Empty State */
        <div className="py-16 px-6 text-center rounded-3xl bg-neutral-900/40 border border-neutral-800/60 space-y-4 max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-center mx-auto text-neutral-500">
            <BookOpen className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-neutral-200">
              No active borrowed books
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-sm mx-auto">
              You haven't checked out any books yet. Explore the catalog and borrow books for up to 60 days.
            </p>
          </div>
          <div className="pt-2">
            <Link href="/books">
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-neutral-950 font-semibold px-6 rounded-xl text-sm">
                Explore All Books
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        /* Table Layout (Assignment: Image, Title, Borrow Date, Return Date, Return Book button) */
        <div className="overflow-hidden rounded-3xl border border-neutral-800/80 bg-neutral-900/60 backdrop-blur-sm shadow-xl">
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-neutral-950/70 border-b border-neutral-800 text-[11px] uppercase tracking-wider font-semibold text-neutral-400">
                <tr>
                  <th scope="col" className="py-4 pl-6 pr-3">Book</th>
                  <th scope="col" className="py-4 px-4">Category</th>
                  <th scope="col" className="py-4 px-4">Borrow Date</th>
                  <th scope="col" className="py-4 px-4">Return Due Date</th>
                  <th scope="col" className="py-4 pl-4 pr-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60">
                {borrowedList.map(({ book, borrowedAt, returnDate }) => (
                  <tr
                    key={book._id}
                    className="hover:bg-neutral-800/30 transition-colors group"
                  >
                    {/* Book Cover + Title */}
                    <td className="py-4 pl-6 pr-3">
                      <div className="flex items-center gap-4">
                        <Link
                          href={`/books/${book._id}`}
                          className="relative w-14 aspect-[3/4] rounded-lg overflow-hidden shrink-0 border border-neutral-800 bg-neutral-950 group-hover:border-emerald-500/50 transition-colors"
                        >
                          <Image
                            src={book.image}
                            alt={book.title}
                            fill
                            className="object-cover"
                          />
                        </Link>
                        <div className="space-y-0.5">
                          <Link
                            href={`/books/${book._id}`}
                            className="font-serif font-bold text-neutral-100 hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                          >
                            <span>{book.title}</span>
                            <ExternalLink className="w-3 h-3 text-neutral-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                          <p className="text-xs text-neutral-400">
                            By {book.author}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {book.category}
                      </span>
                    </td>

                    {/* Borrow Date */}
                    <td className="py-4 px-4 text-xs text-neutral-300">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-neutral-400" />
                        <span>{formatBorrowDate(borrowedAt)}</span>
                      </div>
                    </td>

                    {/* Return Date */}
                    <td className="py-4 px-4 text-xs font-medium text-emerald-400">
                      <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full w-fit">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{returnDate}</span>
                      </div>
                    </td>

                    {/* Return Action */}
                    <td className="py-4 pl-4 pr-6 text-right">
                      <Button
                        onClick={() => setReturnModalBook({ book, borrowedAt, returnDate })}
                        className="bg-neutral-800 hover:bg-emerald-600 hover:text-neutral-950 text-neutral-200 text-xs font-semibold px-4 py-2 rounded-xl border border-neutral-700 transition-all flex items-center gap-1.5 ml-auto"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        Return Book
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card List View */}
          <div className="md:hidden divide-y divide-neutral-800/80">
            {borrowedList.map(({ book, borrowedAt, returnDate }) => (
              <div key={book._id} className="p-4 space-y-4">
                <div className="flex gap-3">
                  <div className="relative w-16 aspect-[3/4] rounded-lg overflow-hidden shrink-0 border border-neutral-800 bg-neutral-950">
                    <Image
                      src={book.image}
                      alt={book.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-1 flex-1">
                    <span className="text-[10px] uppercase font-semibold text-emerald-400">
                      {book.category}
                    </span>
                    <h4 className="font-serif font-bold text-neutral-100 text-sm leading-snug">
                      {book.title}
                    </h4>
                    <p className="text-xs text-neutral-400">By {book.author}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs p-3 rounded-xl bg-neutral-950/70 border border-neutral-800">
                  <div>
                    <span className="text-neutral-500 block text-[10px] uppercase">Borrowed:</span>
                    <span className="text-neutral-300 font-medium">{formatBorrowDate(borrowedAt)}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[10px] uppercase">Return By:</span>
                    <span className="text-emerald-400 font-semibold">{returnDate}</span>
                  </div>
                </div>

                <Button
                  onClick={() => setReturnModalBook({ book, borrowedAt, returnDate })}
                  className="w-full bg-neutral-800 hover:bg-emerald-600 hover:text-neutral-950 text-neutral-200 text-xs font-semibold rounded-xl border border-neutral-700 transition-all flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Return Book
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Return Confirmation Modal */}
      {returnModalBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-3xl bg-neutral-900 border border-neutral-800 p-6 sm:p-8 shadow-2xl space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs uppercase font-semibold tracking-wider text-emerald-400">
                    Return Confirmation
                  </span>
                  <h3 className="font-serif text-xl font-bold text-neutral-100">
                    Return This Book?
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setReturnModalBook(null)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Book Info Summary */}
            <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center gap-3">
              <div className="relative w-12 aspect-[3/4] rounded-lg overflow-hidden shrink-0 border border-neutral-700">
                <Image
                  src={returnModalBook.book.image}
                  alt={returnModalBook.book.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-serif font-bold text-neutral-100 text-sm">
                  {returnModalBook.book.title}
                </p>
                <p className="text-xs text-neutral-400">By {returnModalBook.book.author}</p>
                <p className="text-[11px] text-emerald-400 mt-1">
                  Scheduled return was: {returnModalBook.returnDate}
                </p>
              </div>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed">
              Returning this book will remove it from your active borrowed shelf and increment the available copies in the library inventory for other readers.
            </p>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                variant="ghost"
                onClick={() => setReturnModalBook(null)}
                className="text-neutral-400 hover:text-neutral-200"
              >
                Keep Reading
              </Button>
              <Button
                onClick={handleConfirmReturn}
                disabled={isReturning}
                className="bg-emerald-500 hover:bg-emerald-600 text-neutral-950 font-semibold px-6 rounded-xl"
              >
                {isReturning ? "Returning..." : "Confirm Return"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
