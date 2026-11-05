import { Metadata } from "next";
import { Suspense } from "react";
import { BooksCatalog } from "./books-catalog";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "All Books",
  description: "Browse and discover our full catalog of curated physical and digital library books.",
};

export default function AllBooksPage() {
  return (
    <div className="min-h-screen bg-background py-12 sm:py-16 transition-colors">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<div className="h-96 w-full animate-pulse rounded-2xl bg-muted/30" />}>
          <BooksCatalog />
        </Suspense>
      </div>
    </div>
  );
}
