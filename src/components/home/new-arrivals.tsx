"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Book } from "@/types/book";
import { BookCard } from "@/components/books/book-card";
import { ArrowRight, Sparkles, Library } from "lucide-react";
import { getLatestBooks } from "@/lib/books-service";

export function NewArrivalsSection() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    // Load latest books dynamically, prioritizing newest added books at the top
    setBooks(getLatestBooks(6));
  }, []);

  return (
    <section className="py-16 sm:py-24 bg-card/40 border-y border-border/60 transition-colors">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <span>Fresh Off The Press</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              New Arrivals
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
              Discover the latest books added to our library collection. Reserve your copy now before supplies run out.
            </p>
          </div>

          <Link
            href="/books"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors group self-start md:self-end"
          >
            <span>See Complete Catalog</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 6 Dynamic Books Grid (Uniform Dimensions & Equal Card Heights) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {books.map((book) => (
            <div key={book._id} className="h-full">
              <BookCard book={book} />
            </div>
          ))}
        </div>

        {/* Bottom CTA to All Books */}
        <div className="mt-12 text-center">
          <Link
            href="/books"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 active:scale-[0.98] transition-all"
          >
            <Library className="h-4 w-4" />
            <span>See All Books ({books.length >= 6 ? "50+ Titles" : `${books.length} Titles`})</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
