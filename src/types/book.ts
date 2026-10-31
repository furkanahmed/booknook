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
  totalCopies: number;
  userName?: string;
  userEmail?: string;
  createdAt?: string;
}

