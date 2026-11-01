import { Metadata } from "next";
import { AddBookClient } from "./add-book-client";

export const metadata: Metadata = {
  title: "Add Book - Library Contribution",
  description: "Contribute and list new books to the BookNook digital library collection.",
};

export default function AddBookPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <AddBookClient />
      </div>
    </main>
  );
}
