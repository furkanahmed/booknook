"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Book } from "@/types/book";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  BookOpen,
  Calendar as CalendarIcon,
  CheckCircle,
  Clock,
  Info,
  Lock,
  Mail,
  User,
  X,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

interface BorrowSectionProps {
  book: Book;
}

export function BorrowSection({ book }: BorrowSectionProps) {
  const router = useRouter();
  const { user, hasBorrowed, recordBorrow } = useAuth();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [calendarMonth, setCalendarMonth] = useState<Date>(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const isOutOfStock = book.totalCopies <= 0;
  const alreadyBorrowed = hasBorrowed(book._id);

  // Normalize today (midnight)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Max borrow window: 60 days
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 60);
  maxDate.setHours(23, 59, 59, 999);

  const handleBorrowClick = () => {
    // 1. Login check: If not logged in, redirect with return url
    if (!user) {
      toast.info("Please sign in first to borrow this book.");
      router.push(`/login?redirect=/books/${book._id}`);
      return;
    }

    // 2. Stock check
    if (isOutOfStock) {
      toast.error("This book is currently out of stock.");
      return;
    }

    // 3. Duplicate check: Cannot borrow the same book twice
    if (alreadyBorrowed) {
      toast.warning("You have already borrowed this book!");
      return;
    }

    // Reset confirmation state & set default 7-days return date as specified in assignment plan
    setIsConfirmed(false);
    const defaultDate = new Date();
    defaultDate.setDate(today.getDate() + 7);
    setSelectedDate(defaultDate);
    setCalendarMonth(new Date());
    setModalOpen(true);
  };

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDate) {
      toast.error("Please pick a return date from the calendar.");
      return;
    }

    if (selectedDate < today) {
      toast.error("Return date cannot be in the past.");
      return;
    }

    const formattedDate = selectedDate.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 700));

    const success = recordBorrow(book._id, formattedDate);
    setIsSubmitting(false);

    if (success) {
      setIsConfirmed(true);
      toast.success(
        `Borrow confirmed! "${book.title}" is reserved until ${formattedDate}.`,
        {
          duration: 5000,
          icon: <CheckCircle className="w-5 h-5 text-emerald-400" />,
        }
      );
    } else {
      toast.error("Failed to process request. You have already borrowed this book.");
    }
  };

  // Calendar Helpers
  const year = calendarMonth.getFullYear();
  const month = calendarMonth.getMonth();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0 is Sunday

  const prevMonth = () => {
    setCalendarMonth(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCalendarMonth(new Date(year, month + 1, 1));
  };

  const isDateSelected = (d: number) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getDate() === d &&
      selectedDate.getMonth() === month &&
      selectedDate.getFullYear() === year
    );
  };

  const isDateDisabled = (d: number) => {
    const target = new Date(year, month, d);
    target.setHours(0, 0, 0, 0);
    return target < today || target > maxDate;
  };

  return (
    <div className="pt-4">
      {/* State Notice Banner */}
      {alreadyBorrowed && (
        <div className="mb-4 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-amber-300 text-xs sm:text-sm">
          <Info className="w-4 h-4 mt-0.5 shrink-0 text-amber-400" />
          <div>
            <p className="font-semibold text-amber-200">Already in Your Borrowed Shelf</p>
            <p className="text-amber-400/90 text-xs mt-0.5">
              You currently have an active borrow session for this book. Per library policy, members can hold only one copy of a title at any given time.
            </p>
          </div>
        </div>
      )}

      {isOutOfStock && !alreadyBorrowed && (
        <div className="mb-4 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 text-rose-300 text-xs sm:text-sm">
          <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0 text-rose-400" />
          <div>
            <p className="font-semibold text-rose-200">Currently Out of Stock</p>
            <p className="text-rose-400/90 text-xs mt-0.5">
              All copies have been checked out by fellow readers. Check back soon or browse other available titles.
            </p>
          </div>
        </div>
      )}

      {/* Main Trigger Button */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <Button
          onClick={handleBorrowClick}
          disabled={isOutOfStock || alreadyBorrowed}
          className={`h-12 px-8 font-semibold rounded-xl text-sm flex items-center justify-center gap-2.5 transition-all shadow-lg ${
            alreadyBorrowed
              ? "bg-neutral-800 text-neutral-400 border border-neutral-700 cursor-not-allowed opacity-80"
              : isOutOfStock
              ? "bg-rose-950/60 text-rose-400 border border-rose-800/80 cursor-not-allowed opacity-80"
              : "bg-emerald-500 hover:bg-emerald-600 text-neutral-950 shadow-emerald-500/20 hover:scale-[1.01]"
          }`}
        >
          {alreadyBorrowed ? (
            <>
              <CheckCircle className="w-4 h-4 text-amber-400" />
              Already Borrowed
            </>
          ) : isOutOfStock ? (
            <>
              <Lock className="w-4 h-4 text-rose-400" />
              Out of Stock
            </>
          ) : (
            <>
              <BookOpen className="w-4 h-4" />
              Borrow This Book
            </>
          )}
        </Button>

        {!user && !isOutOfStock && (
          <span className="text-xs text-neutral-400 flex items-center gap-1.5 self-center">
            <Info className="w-3.5 h-3.5 text-emerald-400" />
            Sign in required to confirm borrow request
          </span>
        )}
      </div>

      {/* Interactive Borrow Modal */}
      {modalOpen && user && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl rounded-3xl bg-neutral-900 border border-neutral-800 p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-neutral-800">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-16 rounded-lg overflow-hidden shrink-0 border border-neutral-700">
                  <Image
                    src={book.image}
                    alt={book.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-emerald-400 flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    Borrow Request
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-neutral-100">
                    {book.title}
                  </h3>
                  <p className="text-xs text-neutral-400">By {book.author}</p>
                </div>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Success Confirmation View */}
            {isConfirmed ? (
              <div className="text-center py-6 space-y-4 animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-neutral-100">Booking Confirmed!</h4>
                  <p className="text-sm text-neutral-400 mt-1">
                    "{book.title}" has been successfully added to your borrowed collection.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 text-left text-xs space-y-2 max-w-sm mx-auto">
                  <div className="flex justify-between text-neutral-400">
                    <span>Borrower:</span>
                    <span className="text-neutral-200 font-medium">{user.name}</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>Email:</span>
                    <span className="text-neutral-200 font-medium">{user.email}</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>Scheduled Return:</span>
                    <span className="text-emerald-400 font-semibold">
                      {selectedDate?.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    onClick={() => setModalOpen(false)}
                    className="bg-emerald-500 hover:bg-emerald-600 text-neutral-950 font-semibold px-8 rounded-xl"
                  >
                    Done & Close
                  </Button>
                </div>
              </div>
            ) : (
              /* Modal Form */
              <form onSubmit={handleModalSubmit} className="space-y-5">
                {/* Auto-filled User Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-neutral-400 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-emerald-400" />
                      Reader Name (Auto-filled)
                    </label>
                    <input
                      type="text"
                      value={user.name}
                      disabled
                      className="w-full rounded-xl bg-neutral-950 border border-neutral-800 px-3.5 py-2 text-xs sm:text-sm text-neutral-300 cursor-not-allowed opacity-80"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-neutral-400 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-emerald-400" />
                      Reader Email (Auto-filled)
                    </label>
                    <input
                      type="email"
                      value={user.email}
                      disabled
                      className="w-full rounded-xl bg-neutral-950 border border-neutral-800 px-3.5 py-2 text-xs sm:text-sm text-neutral-300 cursor-not-allowed opacity-80"
                    />
                  </div>
                </div>

                {/* Return Date Picker Calendar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-medium text-neutral-200 flex items-center gap-1.5">
                      <CalendarIcon className="w-3.5 h-3.5 text-emerald-400" />
                      Select Return Date (Calendar Picker)
                    </label>
                    {selectedDate && (
                      <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                        {selectedDate.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    )}
                  </div>

                  {/* Calendar Widget */}
                  <div className="rounded-2xl bg-neutral-950 border border-neutral-800 p-4">
                    {/* Month Navigator */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-neutral-200">
                        {monthNames[month]} {year}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={prevMonth}
                          className="p-1 rounded-lg text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={nextMonth}
                          className="p-1 rounded-lg text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 transition-colors"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Day Names Header */}
                    <div className="grid grid-cols-7 gap-1 text-center text-[11px] text-neutral-500 font-medium mb-1.5">
                      <span>Su</span>
                      <span>Mo</span>
                      <span>Tu</span>
                      <span>We</span>
                      <span>Th</span>
                      <span>Fr</span>
                      <span>Sa</span>
                    </div>

                    {/* Days Grid */}
                    <div className="grid grid-cols-7 gap-1 text-center text-xs">
                      {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                        <div key={`empty-${i}`} className="h-8" />
                      ))}

                      {Array.from({ length: daysInMonth }).map((_, i) => {
                        const dayNum = i + 1;
                        const disabled = isDateDisabled(dayNum);
                        const selected = isDateSelected(dayNum);

                        return (
                          <button
                            key={`day-${dayNum}`}
                            type="button"
                            disabled={disabled}
                            onClick={() => {
                              const newDate = new Date(year, month, dayNum);
                              setSelectedDate(newDate);
                            }}
                            className={`h-8 rounded-lg flex items-center justify-center font-medium transition-all ${
                              selected
                                ? "bg-emerald-500 text-neutral-950 font-bold shadow-md shadow-emerald-500/20 scale-105"
                                : disabled
                                ? "text-neutral-600 cursor-not-allowed opacity-40"
                                : "text-neutral-300 hover:bg-neutral-800 hover:text-emerald-400"
                            }`}
                          >
                            {dayNum}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Borrow Terms Notice */}
                <div className="p-3 rounded-xl bg-neutral-950/70 border border-neutral-800/80 text-[11px] text-neutral-400 flex items-start gap-2">
                  <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    Books can be borrowed for up to 60 days. You will be able to return this book anytime from your "My Borrows" page.
                  </span>
                </div>

                {/* Modal Actions */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setModalOpen(false)}
                    className="text-neutral-400 hover:text-neutral-200"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting || !selectedDate}
                    className="bg-emerald-500 hover:bg-emerald-600 text-neutral-950 font-semibold px-6 rounded-xl"
                  >
                    {isSubmitting ? "Confirming..." : "Confirm & Borrow"}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
