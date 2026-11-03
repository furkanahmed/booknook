import { Book } from "@/types/book";
import { initialBooksCatalog } from "@/data/initial-books";

export const USER_ADDED_BOOKS_KEY = "booknook_user_added_books";

/**
 * Returns all books from local storage fallback
 */
export function getAllBooks(): Book[] {
  if (typeof window === "undefined") {
    return initialBooksCatalog;
  }

  try {
    const stored = localStorage.getItem(USER_ADDED_BOOKS_KEY);
    const userBooks: Book[] = stored ? JSON.parse(stored) : [];

    const userBookIds = new Set(userBooks.map((b) => b._id));
    const initialFiltered = initialBooksCatalog.filter((b) => !userBookIds.has(b._id));

    return [...userBooks, ...initialFiltered];
  } catch (error) {
    console.error("Error reading user added books:", error);
    return initialBooksCatalog;
  }
}

/**
 * Fetch dynamic books directly from MongoDB API
 */
export async function fetchLiveBooks(limit?: number): Promise<Book[]> {
  try {
    const url = limit ? `/api/books?limit=${limit}` : `/api/books`;
    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();
    if (data.success && Array.isArray(data.data)) {
      return data.data;
    }
  } catch (e) {
    console.error("fetchLiveBooks failed, falling back to local:", e);
  }
  return limit ? getAllBooks().slice(0, limit) : getAllBooks();
}

/**
 * Returns latest N books for New Arrivals
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
