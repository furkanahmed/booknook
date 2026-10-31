"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Book } from "@/types/book";
import { BookCard } from "@/components/books/book-card";
import { ArrowRight, Sparkles, Library } from "lucide-react";

// Curated initial books for layout presentation before Express backend integration
const initialLatestBooks: Book[] = [
  {
    _id: "book-1",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    category: "Fiction",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop",
    shortDescription: "A compelling drama exploring justice, compassion, and courage in the American South.",
    totalCopies: 5,
  },
  {
    _id: "book-2",
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    category: "Science",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=800&auto=format&fit=crop",
    shortDescription: "An exploration into space, time, black holes, and the fundamental mysteries of our cosmos.",
    totalCopies: 3,
  },
  {
    _id: "book-3",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Fiction",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop",
    shortDescription: "A poignant portrait of ambition, obsession, and the jazz age in 1920s America.",
    totalCopies: 4,
  },
  {
    _id: "book-4",
    title: "Sapiens: A Brief History",
    author: "Yuval Noah Harari",
    category: "History",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=800&auto=format&fit=crop",
    shortDescription: "How an insignificant ape became the master of planet Earth.",
    totalCopies: 6,
  },
  {
    _id: "book-5",
    title: "The Little Prince",
    author: "Antoine de Saint-Exupéry",
    category: "Kids",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop",
    shortDescription: "A timeless poetic tale of love, friendship, and seeing with the heart.",
    totalCopies: 2,
  },
  {
    _id: "book-6",
    title: "Cosmos",
    author: "Carl Sagan",
    category: "Science",
    image: "https://images.unsplash.com/photo-1532012164546-f432f2e3edd4?q=80&w=800&auto=format&fit=crop",
    shortDescription: "A personal voyage exploring cosmic evolution, science, and the origins of human civilization.",
    totalCopies: 4,
  },
];

export function NewArrivalsSection() {
  const [books, setBooks] = useState<Book[]>(initialLatestBooks);
  const [loading, setLoading] = useState(false);

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

