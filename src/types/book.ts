export interface Book {
  _id: string;
  title: string;
  author: string;
  category: "Fiction" | "Science" | "History" | "Kids" | "Others";
  image: string;
  shortDescription: string;
  totalCopies: number;
  userName?: string;
  userEmail?: string;
  createdAt?: string;
}

