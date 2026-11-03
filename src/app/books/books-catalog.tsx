"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Book } from "@/types/book";
import { BookCard } from "@/components/books/book-card";
import { getAllBooks, fetchLiveBooks } from "@/lib/books-service";
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
  "Others",
];

export function BooksCatalog() {
  const searchParams = useSearchParams();
  const initialCategoryParam = searchParams.get("category");

  const [books, setBooks] = useState<Book[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategoryParam && allCategories.includes(initialCategoryParam)
      ? initialCategoryParam
      : "All"
  );
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Load all books from MongoDB API (works globally across all browsers & incognito)
    fetchLiveBooks().then((live) => {
      if (live && live.length > 0) {
        setBooks(live);
      } else {
        setBooks(getAllBooks());
      }
    });
  }, []);

  // Filter books dynamically based on category and search query
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesCategory =
        selectedCategory === "All" ||
        book.category?.toLowerCase() === selectedCategory.toLowerCase();

      const matchesSearch =
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.category?.toLowerCase().includes(searchQuery.toLowerCase());

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
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
            Explore our curated catalog of literary masterpieces, timeless classics, and insightful non-fiction. Filter by genre or search by title or author.
          </p>
        </div>

        {/* Total Count Badge */}
        <div className="self-start md:self-end flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border text-xs sm:text-sm font-medium text-foreground">
          <BookOpen className="h-4 w-4 text-primary" />
          <span>Showing <strong className="text-primary">{filteredBooks.length}</strong> of {books.length} Books</span>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by title, author, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-10 rounded-xl border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Category Pills (Scrollable on small screens) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          {allCategories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground border border-border/50"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

      </div>

      {/* Active Filter Indicator */}
      {(selectedCategory !== "All" || searchQuery) && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/30 px-4 py-2 rounded-lg border border-border/40">
          <Filter className="h-3.5 w-3.5 text-primary" />
          <span>Active filter:</span>
          {selectedCategory !== "All" && (
            <span className="font-semibold text-foreground">Category: "{selectedCategory}"</span>
          )}
          {searchQuery && (
            <span className="font-semibold text-foreground">Search: "{searchQuery}"</span>
          )}
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="ml-auto text-primary hover:underline font-medium"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Grid: 3 Cards Per Row on Desktop (Uniform height & equal dimensions as per Assignment Rules) */}
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredBooks.map((book) => (
            <div key={book._id} className="h-full">
              <BookCard book={book} />
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center rounded-2xl border border-dashed border-border bg-card/50 p-8 space-y-4">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto text-muted-foreground">
            <BookOpen className="h-6 w-6" />
          </div>
          <h3 className="font-serif text-xl font-bold text-card-foreground">No Books Found</h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            We couldn't find any books matching your current filters. Try searching with different keywords or reset your category.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="rounded-xl mt-2"
          >
            Reset All Filters
          </Button>
        </div>
      )}

    </div>
  );
}
