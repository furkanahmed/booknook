import { Book } from "@/types/book";
import { initialBooksCatalog } from "@/data/initial-books";

export const USER_ADDED_BOOKS_KEY = "booknook_user_added_books";

/**
 * Returns all books: newly added user books first (sorted newest first), followed by initial books.
 */
export function getAllBooks(): Book[] {
  if (typeof window === "undefined") {
    return initialBooksCatalog;
  }

  try {
    const stored = localStorage.getItem(USER_ADDED_BOOKS_KEY);
    const userBooks: Book[] = stored ? JSON.parse(stored) : [];

    // Filter out any duplicates if an id clashes
    const userBookIds = new Set(userBooks.map((b) => b._id));
    const initialFiltered = initialBooksCatalog.filter((b) => !userBookIds.has(b._id));

    return [...userBooks, ...initialFiltered];
  } catch (error) {
    console.error("Error reading user added books:", error);
    return initialBooksCatalog;
  }
}

/**
 * Returns latest N books for New Arrivals (newly added user books first)
 */
export function getLatestBooks(limit: number = 6): Book[] {
  const all = getAllBooks();
  return all.slice(0, limit);
}

/**
 * Find single book by ID
 */
export function getBookById(id: string): Book | undefined {
  const all = getAllBooks();
  return all.find((b) => b._id === id);
}

