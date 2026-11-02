import { Metadata } from "next";
import { notFound } from "next/navigation";
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

  if (!book) {
    return {
      title: "Book Not Found - BookNook",
    };
  }

  return {
    title: `${book.title} by ${book.author} | BookNook`,
    description: book.shortDescription,
  };
}

export default async function BookDetailsPage({
  params,
}: BookDetailsPageProps) {
  const { id } = await params;
  const book = initialBooksCatalog.find((b) => b._id === id);

  if (!book) {
    notFound();
  }

  return <BookDetailsClient book={book} />;
}
