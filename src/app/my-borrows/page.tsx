import { Metadata } from "next";
import { MyBorrowsClient } from "./my-borrows-client";

export const metadata: Metadata = {
  title: "My Borrows - Reading Collection",
  description: "View and manage your active borrowed books and scheduled return dates.",
};

export default function MyBorrowsPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <MyBorrowsClient />
      </div>
    </main>
  );
}
