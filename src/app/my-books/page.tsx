import { Metadata } from "next";
import { MyBooksClient } from "./my-books-client";

export const metadata: Metadata = {
  title: "My Books - Contributed Titles",
  description: "View, update, or remove books you have published on the BookNook digital library.",
};

export default function MyBooksPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <MyBooksClient />
      </div>
    </main>
  );
}
