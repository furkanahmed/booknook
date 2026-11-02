import { Metadata } from "next";
import { initialBooksCatalog } from "@/data/initial-books";
import { BookDetailsClient } from "./book-details-client";

interface BookDetailsPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: BookDetailsPageProps): Promise<Metadata> {
  const { id } = await params;
  const book = initialBooksCatalog.find((b) => b._id === id);

  return {
    title: book ? `${book.title} by ${book.author} | BookNook` : "Book Details | BookNook",
    description: book?.shortDescription || "View details and borrow books on BookNook digital library.",
  };
}

export default async function BookDetailsPage({
  params,
}: BookDetailsPageProps) {
  const { id } = await params;
  const initialBook = initialBooksCatalog.find((b) => b._id === id) || null;

  return <BookDetailsClient initialBook={initialBook} />;
}
