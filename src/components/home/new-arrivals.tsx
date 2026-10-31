"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Book } from "@/types/book";
import { BookCard } from "@/components/books/book-card";
import { ArrowRight, Sparkles, Library } from "lucide-react";

// Real published book covers from Open Library Archive
const initialLatestBooks: Book[] = [
  {
    _id: "book-1",
    title: "The Alchemist",
    author: "Paulo Coelho",
    category: "Fiction",
    image: "/image/The Alchemist.webp",
    shortDescription: "A magical story about following your dreams and listening to your heart.",
    totalCopies: 5,
  },
  {
    _id: "book-2",
    title: "Atomic Habits",
    author: "James Clear",
    category: "Non-Fiction",
    image: "/image/Atomic Habits.webp",
    shortDescription: "An easy and proven way to build good habits and break bad ones.",
    totalCopies: 6,
  },
  {
    _id: "book-3",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Fiction",
    image: "/image/The Great Gatsby.webp",
    shortDescription: "A poignant portrait of ambition, obsession, and the jazz age in 1920s America.",
    totalCopies: 4,
  },
  {
    _id: "book-4",
    title: "Rich Dad Poor Dad",
    author: "Robert T. Kiyosaki",
    category: "Finance",
    image: "/image/Rich Dad Poor Dad.webp",
    shortDescription: "What the rich teach their kids about money that the poor and middle class do not.",
    totalCopies: 5,
  },
  {
    _id: "book-5",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    category: "Fantasy",
    image: "/image/The Hobbit.webp",
    shortDescription: "An unforgettable adventure through Middle-earth filled with mystery and treasure.",
    totalCopies: 4,
  },
  {
    _id: "book-6",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    category: "Finance",
    image: "/image/The Psychology of Money.webp",
    shortDescription: "Timeless lessons on wealth, greed, and happiness doing well with money.",
    totalCopies: 4,
  },
];

export function NewArrivalsSection() {
  const [books, setBooks] = useState<Book[]>(initialLatestBooks);

  useEffect(() => {
    // When Express backend is running with MongoDB, it automatically fetches:
    // fetch(`${process.env.NEXT_PUBLIC_API_URL}/books?sort=newest&limit=6`)
    //   .then(res => res.json())
    //   .then(data => { if (data.success && data.data?.length) setBooks(data.data.slice(0, 6)); });
  }, []);

  return (
    <section className="py-16 sm:py-20 bg-background transition-colors">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <span>Curated Selection</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              New Arrivals
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl">
              Discover the latest additions to our collection. Borrow your favorites with instant digital confirmation.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
            <Library className="h-4 w-4 text-primary" />
            <span>Latest 6 Additions</span>
          </div>
        </div>

        {/* 6 Books Grid: 3 cards per row on desktop (lg:grid-cols-3) as required */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {books.slice(0, 6).map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>

        {/* Below Button: "See All Books" (Navigates to /books as specified) */}
        <div className="mt-14 flex justify-center">
          <Link
            href="/books"
            className="inline-flex items-center gap-2.5 rounded-lg bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow-md transition-all duration-200"
          >
            <span>See All Books</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
