export type BookCategory =
  | "Fiction"
  | "Science"
  | "History"
  | "Kids"
  | "Non-Fiction"
  | "Finance"
  | "Fantasy"
  | "Others";

export interface Book {
  _id: string;
  title: string;
  author: string;
  category: BookCategory | string;
  image: string;
  shortDescription: string;
  longDescription?: string;
  totalCopies: number;
  rating?: number;
  publishedYear?: number;
  pages?: number;
  isbn?: string;
  language?: string;
  userName?: string;
  userEmail?: string;
  createdAt?: string;
}

