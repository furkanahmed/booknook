import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Book } from "@/types/book";
import { ArrowRight, User } from "lucide-react";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  return (
    <div className="group flex h-full flex-col justify-between overflow-hidden rounded-xl border border-border bg-card shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-300">
      <div>
        {/* Book Cover Image with Fixed Aspect Ratio (Uniform dimensions as per Assignment Rule #7 & #8) */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
          <Image
            src={book.image}
            alt={book.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 right-3 z-10">
            <span className="rounded-full bg-slate-900/90 dark:bg-zinc-950/90 text-white font-semibold text-xs px-3 py-1 shadow-md border border-white/20 backdrop-blur-sm tracking-wide">
              {book.category}
            </span>
          </div>
        </div>

        {/* Book Details */}
        <div className="p-5 space-y-2">
          <h3 className="font-serif text-lg font-bold text-card-foreground line-clamp-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
            {book.title}
          </h3>
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground line-clamp-1">
            <User className="h-3.5 w-3.5 text-amber-500 shrink-0" />
            <span>{book.author}</span>
          </p>
        </div>
      </div>

      {/* Action: View Details Button */}
      <div className="p-5 pt-0">
        <Link
          href={`/books/${book._id}`}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-4 py-2.5 text-sm font-medium text-primary hover:bg-primary hover:text-primary-foreground active:scale-[0.98] transition-all duration-200"
        >
          <span>View Details</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

