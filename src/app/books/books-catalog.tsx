"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Book } from "@/types/book";
import { BookCard } from "@/components/books/book-card";
import { initialBooksCatalog } from "@/data/initial-books";
import { Search, Sparkles, BookOpen, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const allCategories = [
  "All",
  "Fiction",
  "Non-Fiction",
  "Finance",
  "Science",
  "History",
  "Kids",
  "Fantasy",
];

export function BooksCatalog() {
  const searchParams = useSearchParams();
  const initialCategoryParam = searchParams.get("category");

  const [books] = useState<Book[]>(initialBooksCatalog);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategoryParam && allCategories.includes(initialCategoryParam)
      ? initialCategoryParam
      : "All"
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Filter books dynamically based on category and search query
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesCategory =
        selectedCategory === "All" ||
        book.category.toLowerCase() === selectedCategory.toLowerCase();

      const matchesSearch =
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [books, selectedCategory, searchQuery]);

  return (
    <div className="space-y-10">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-border/60">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span>Complete Library Collection</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            All Books
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl">
            Explore our curated catalog of physical and digital volumes. Filter by genre, search your favorite author, or reserve copies instantly.
          </p>
        </div>

        {/* Live Books Counter */}
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-card border border-border/80 shadow-xs self-start md:self-auto">
          <BookOpen className="h-5 w-5 text-primary" />
          <span className="text-sm font-semibold text-foreground">
            {filteredBooks.length} {filteredBooks.length === 1 ? "Book" : "Books"} Available
          </span>
        </div>
      </div>

      {/* Controls: Search Bar & Category Filter Pills */}
      <div className="space-y-4">
        
        {/* Search Input Bar */}
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, author, or genre..."
            className="w-full rounded-xl border border-input bg-card pl-10 pr-10 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Category Pills (Horizontal Scrollable for Mobile & Desktop) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <Filter className="h-4 w-4 text-muted-foreground shrink-0 mr-1 hidden sm:inline" />
          {allCategories.map((category) => {
            const isSelected = selectedCategory.toLowerCase() === category.toLowerCase();
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-sm scale-105"
                    : "bg-muted/70 hover:bg-muted text-muted-foreground hover:text-foreground border border-border/50"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Book Grid: Mandatory 3 Cards Per Row on Desktop as per Assignment PDF */}
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {filteredBooks.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="rounded-2xl border border-dashed border-border/80 bg-card/50 p-12 text-center space-y-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-muted/60 text-muted-foreground">
            <BookOpen className="h-7 w-7" />
          </div>
          <div className="space-y-1 max-w-sm mx-auto">
            <h3 className="font-serif text-lg font-bold text-foreground">No Books Found</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              We couldn&apos;t find any books matching your criteria. Try adjusting your search or category filter.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="rounded-xl border-border text-xs font-semibold"
          >
            Reset Filters
          </Button>
        </div>
      )}

    </div>
  );
}

