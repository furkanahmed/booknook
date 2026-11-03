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
  const { user, hasBorrowed, recordBorrow, getAvailableCopies } = useAuth();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [calendarMonth, setCalendarMonth] = useState<Date>(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const currentCopies = getAvailableCopies(book._id, book.totalCopies);
  const isOutOfStock = currentCopies <= 0;
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

    const success = recordBorrow(book._id, formattedDate, {
      title: book.title,
      image: book.image,
      author: book.author,
      category: book.category,
    });
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-3 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-2xl bg-neutral-900 border border-neutral-800 p-3 sm:p-4 shadow-2xl flex flex-col justify-between">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
              <div className="flex items-center gap-2.5">
                <div className="relative w-8 h-11 rounded overflow-hidden shrink-0 border border-neutral-700">
                  <Image
                    src={book.image}
                    alt={book.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-emerald-400 flex items-center gap-1">
                    <BookOpen className="w-2.5 h-2.5" />
                    Borrow Request
                  </span>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-neutral-100 line-clamp-1 leading-tight">
                    {book.title}
                  </h3>
                  <p className="text-[11px] text-neutral-400 leading-tight">By {book.author}</p>
                </div>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-full text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Success Confirmation View */}
            {isConfirmed ? (
              <div className="text-center py-3 space-y-2.5 animate-in zoom-in-95 duration-200">
                <div className="w-10 h-10 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-neutral-100">Booking Confirmed!</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    "{book.title}" has been successfully added to your borrowed collection.
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-left text-xs space-y-1 max-w-sm mx-auto">
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

                <div className="pt-1">
                  <Button
                    onClick={() => setModalOpen(false)}
                    className="bg-emerald-500 hover:bg-emerald-600 text-neutral-950 font-semibold px-5 py-1.5 rounded-xl text-xs"
                  >
                    Done & Close
                  </Button>
                </div>
              </div>
            ) : (
              /* Modal Form */
              <form onSubmit={handleModalSubmit} className="space-y-2.5 pt-2">
                {/* Auto-filled User Info in compact inline row */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-0.5">
                    <label className="text-[10px] font-medium text-neutral-400 flex items-center gap-1">
                      <User className="w-2.5 h-2.5 text-emerald-400" />
                      Reader Name
                    </label>
                    <input
                      type="text"
                      value={user.name}
                      disabled
                      className="w-full rounded-md bg-neutral-950 border border-neutral-800 px-2.5 py-1 text-xs text-neutral-300 cursor-not-allowed opacity-80"
                    />
                  </div>

                  <div className="space-y-0.5">
                    <label className="text-[10px] font-medium text-neutral-400 flex items-center gap-1">
                      <Mail className="w-2.5 h-2.5 text-emerald-400" />
                      Reader Email
                    </label>
                    <input
                      type="email"
                      value={user.email}
                      disabled
                      className="w-full rounded-md bg-neutral-950 border border-neutral-800 px-2.5 py-1 text-xs text-neutral-300 cursor-not-allowed opacity-80"
                    />
                  </div>
                </div>

                {/* Return Date Picker Calendar */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-medium text-neutral-200 flex items-center gap-1">
                      <CalendarIcon className="w-3 h-3 text-emerald-400" />
                      Select Return Date
                    </label>
                    {selectedDate && (
                      <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        {selectedDate.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    )}
                  </div>

                  {/* Calendar Widget Ultra-Compact */}
                  <div className="rounded-xl bg-neutral-950 border border-neutral-800 p-2">
                    {/* Month Navigator */}
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-semibold text-neutral-200">
                        {monthNames[month]} {year}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={prevMonth}
                          className="p-0.5 rounded text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 transition-colors"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={nextMonth}
                          className="p-0.5 rounded text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 transition-colors"
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Day Names Header */}
                    <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-neutral-500 font-medium mb-1">
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
                        <div key={`empty-${i}`} className="h-5 sm:h-6" />
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
                            className={`h-5 sm:h-6 rounded flex items-center justify-center text-xs font-medium transition-all ${
                              selected
                                ? "bg-emerald-500 text-neutral-950 font-bold shadow-sm shadow-emerald-500/20"
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

                {/* Modal Actions */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-neutral-500 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-emerald-400/80" /> Max 60 days
                  </span>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setModalOpen(false)}
                      className="text-neutral-400 hover:text-neutral-200 text-xs h-7 px-2.5"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting || !selectedDate}
                      className="bg-emerald-500 hover:bg-emerald-600 text-neutral-950 font-semibold px-4 h-7 rounded-lg text-xs"
                    >
                      {isSubmitting ? "Confirming..." : "Confirm & Borrow"}
                    </Button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
