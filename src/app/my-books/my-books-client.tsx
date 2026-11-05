"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Book, BookCategory } from "@/types/book";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  BookOpen,
  Edit3,
  Trash2,
  Plus,
  Layers,
  Sparkles,
  AlertTriangle,
  X,
  ExternalLink,
  Tag,
  FileText,
  User,
  CheckCircle,
  Library,
  Upload,
  Image as ImageIcon,
} from "lucide-react";

const CATEGORIES: BookCategory[] = [
  "Fiction",
  "Science",
  "History",
  "Kids",
  "Non-Fiction",
  "Finance",
  "Fantasy",
  "Others",
];

const USER_BOOKS_KEY = "booknook_user_added_books";

export function MyBooksClient() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [myBooks, setMyBooks] = useState<Book[]>([]);
  const [editModalBook, setEditModalBook] = useState<Book | null>(null);
  const [editImageMode, setEditImageMode] = useState<"url" | "file">("file");
  const [deleteModalBook, setDeleteModalBook] = useState<Book | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Resize and compress image to keep under 100KB so it saves quickly without heavy payload
  const handleEditFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editModalBook) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file (JPG, PNG, WebP).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be under 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 500;
        const scale = Math.min(1, MAX_WIDTH / img.width);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.75);
          setEditModalBook((prev) => (prev ? { ...prev, image: compressedDataUrl } : null));
          toast.success("Image selected and optimized successfully!");
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // Protected route check
  useEffect(() => {
    if (!loading && !user) {
      toast.info("Please sign in to view and manage your published books.");
      router.push("/login?redirect=/my-books");
    }
  }, [user, loading, router]);

  // Load user's books from MongoDB with fallback to localStorage
  const loadUserBooks = async () => {
    if (!user) return;

    // First check localStorage for immediate render if available
    let initialLocal: Book[] = [];
    try {
      const stored = localStorage.getItem(USER_BOOKS_KEY);
      if (stored) {
        const all: Book[] = JSON.parse(stored);
        initialLocal = all.filter(
          (b) => b.userEmail?.toLowerCase() === user.email.toLowerCase()
        );
        if (initialLocal.length > 0) {
          setMyBooks(initialLocal);
        }
      }
    } catch (e) {
      console.error("Local storage read error:", e);
    }

    // Fetch live user books from MongoDB
    try {
      const res = await fetch(`/api/books?userEmail=${encodeURIComponent(user.email.toLowerCase())}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          const apiBooks: Book[] = json.data;
          
          // Merge with any un-synced local books
          const apiIds = new Set(apiBooks.map((b) => b._id));
          const localOnly = initialLocal.filter((b) => !apiIds.has(b._id));
          const combined = [...apiBooks, ...localOnly];
          
          setMyBooks(combined);
          return;
        }
      }
    } catch (err) {
      console.error("Failed to fetch user books from API:", err);
    }

    // Fallback if API fails and no books loaded
    if (initialLocal.length === 0) {
      setMyBooks([]);
    }
  };

  useEffect(() => {
    loadUserBooks();
  }, [user]);

  // Handle Edit Save
  const handleEditSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editModalBook || !user) return;

    if (!editModalBook.title.trim()) {
      toast.error("Book title is required.");
      return;
    }

    if (!editModalBook.author.trim()) {
      toast.error("Author name is required.");
      return;
    }

    setIsSaving(true);

    try {
      // 1. Sync update to MongoDB API
      try {
        await fetch(`/api/books/${editModalBook._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: editModalBook.title,
            author: editModalBook.author,
            category: editModalBook.category,
            image: editModalBook.image,
            shortDescription: editModalBook.shortDescription,
            longDescription: editModalBook.longDescription,
            totalCopies: editModalBook.totalCopies,
          }),
        });
      } catch (apiErr) {
        console.error("API update failed, updating local copy:", apiErr);
      }

      // 2. Sync to localStorage
      const stored = localStorage.getItem(USER_BOOKS_KEY);
      const all: Book[] = stored ? JSON.parse(stored) : [];
      const index = all.findIndex((b) => b._id === editModalBook._id);

      if (index !== -1) {
        all[index] = { ...editModalBook };
        localStorage.setItem(USER_BOOKS_KEY, JSON.stringify(all));
      } else {
        all.push({ ...editModalBook });
        localStorage.setItem(USER_BOOKS_KEY, JSON.stringify(all));
      }

      // 3. Update state immediately
      setMyBooks((prev) =>
        prev.map((b) => (b._id === editModalBook._id ? { ...editModalBook } : b))
      );

      toast.success(`"${editModalBook.title}" updated successfully!`, {
        duration: 4000,
        icon: <CheckCircle className="w-5 h-5 text-emerald-400" />,
      });
      setEditModalBook(null);
    } catch (e) {
      console.error(e);
      toast.error("Failed to update book. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // Handle Delete Confirm (Assignment: Custom modal, strictly no browser confirm())
  const handleDeleteConfirm = async () => {
    if (!deleteModalBook || !user) return;

    setIsDeleting(true);

    try {
      // 1. Sync delete to MongoDB API
      try {
        await fetch(`/api/books/${deleteModalBook._id}`, {
          method: "DELETE",
        });
      } catch (apiErr) {
        console.error("API delete failed:", apiErr);
      }

      // 2. Remove from localStorage
      const stored = localStorage.getItem(USER_BOOKS_KEY);
      const all: Book[] = stored ? JSON.parse(stored) : [];
      const updated = all.filter((b) => b._id !== deleteModalBook._id);
      localStorage.setItem(USER_BOOKS_KEY, JSON.stringify(updated));

      // 3. Remove from UI state
      setMyBooks((prev) => prev.filter((b) => b._id !== deleteModalBook._id));

      toast.success(`"${deleteModalBook.title}" removed from library inventory.`, {
        duration: 4000,
        icon: <CheckCircle className="w-5 h-5 text-emerald-400" />,
      });
      setDeleteModalBook(null);
    } catch (e) {
      console.error(e);
      toast.error("Failed to delete book. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
        <p className="text-sm text-neutral-400">Verifying session permissions...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-sm shadow-xl">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Library className="w-3.5 h-3.5" />
            <span>Contributor Hub</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-100 tracking-tight">
            My Books
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400">
            Manage, edit details, or remove books you have contributed to BookNook.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/add-book">
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-neutral-950 font-semibold px-5 h-11 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              <span>Add New Book</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      {myBooks.length === 0 ? (
        /* Empty State */
        <div className="py-16 px-6 text-center rounded-3xl bg-neutral-900/40 border border-neutral-800/60 space-y-4 max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-center mx-auto text-neutral-500">
            <BookOpen className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-neutral-200">
              No books contributed yet
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-sm mx-auto">
              You haven't added any books to the community library. Share titles with other readers today!
            </p>
          </div>
          <div className="pt-2">
            <Link href="/add-book">
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-neutral-950 font-semibold px-6 rounded-xl text-sm">
                Add Your First Book
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        /* Books Table / Grid */
        <div className="overflow-hidden rounded-3xl border border-neutral-800/80 bg-neutral-900/60 backdrop-blur-sm shadow-xl">
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-neutral-950/70 border-b border-neutral-800 text-[11px] uppercase tracking-wider font-semibold text-neutral-400">
                <tr>
                  <th scope="col" className="py-4 pl-6 pr-3">Book</th>
                  <th scope="col" className="py-4 px-4">Category</th>
                  <th scope="col" className="py-4 px-4">Available Copies</th>
                  <th scope="col" className="py-4 px-4">Date Added</th>
                  <th scope="col" className="py-4 pl-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60">
                {myBooks.map((book) => (
                  <tr
                    key={book._id}
                    className="hover:bg-neutral-800/30 transition-colors group"
                  >
                    {/* Cover + Title */}
                    <td className="py-4 pl-6 pr-3">
                      <div className="flex items-center gap-4">
                        <div className="relative w-14 aspect-[3/4] rounded-lg overflow-hidden shrink-0 border border-neutral-800 bg-neutral-950 group-hover:border-emerald-500/50 transition-colors">
                          <Image
                            src={book.image}
                            alt={book.title}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        </div>
                        <div className="space-y-0.5">
                          <h4 className="font-serif font-bold text-neutral-100 flex items-center gap-1.5">
                            <span>{book.title}</span>
                          </h4>
                          <p className="text-xs text-neutral-400">By {book.author}</p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {book.category}
                      </span>
                    </td>

                    {/* Copies */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1.5 text-xs text-neutral-300">
                        <Layers className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="font-semibold text-neutral-100">{book.totalCopies}</span>
                        <span className="text-neutral-500">copies</span>
                      </div>
                    </td>

                    {/* Date Added */}
                    <td className="py-4 px-4 text-xs text-neutral-400">
                      {book.createdAt
                        ? new Date(book.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "Recently"}
                    </td>

                    {/* Actions */}
                    <td className="py-4 pl-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Edit Button */}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setEditModalBook({ ...book })}
                          className="h-8 px-3 rounded-lg text-neutral-300 hover:text-emerald-400 hover:bg-emerald-500/10 border border-neutral-800 flex items-center gap-1.5 text-xs"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </Button>

                        {/* Delete Button */}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setDeleteModalBook(book)}
                          className="h-8 px-3 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 border border-rose-500/20 flex items-center gap-1.5 text-xs"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden divide-y divide-neutral-800/80">
            {myBooks.map((book) => (
              <div key={book._id} className="p-4 space-y-4">
                <div className="flex gap-3">
                  <div className="relative w-16 aspect-[3/4] rounded-lg overflow-hidden shrink-0 border border-neutral-800 bg-neutral-950">
                    <Image
                      src={book.image}
                      alt={book.title}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-1 flex-1">
                    <span className="text-[10px] uppercase font-semibold text-emerald-400">
                      {book.category}
                    </span>
                    <h4 className="font-serif font-bold text-neutral-100 text-sm leading-snug">
                      {book.title}
                    </h4>
                    <p className="text-xs text-neutral-400">By {book.author}</p>
                    <p className="text-xs text-emerald-400 font-medium pt-1">
                      {book.totalCopies} Copies available
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <Button
                    onClick={() => setEditModalBook({ ...book })}
                    className="flex-1 bg-neutral-800 hover:bg-emerald-600 hover:text-neutral-950 text-neutral-200 text-xs font-semibold rounded-xl border border-neutral-700 transition-all flex items-center justify-center gap-1.5 h-9"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    Edit
                  </Button>
                  <Button
                    onClick={() => setDeleteModalBook(book)}
                    className="flex-1 bg-rose-950/40 hover:bg-rose-600 hover:text-white text-rose-300 text-xs font-semibold rounded-xl border border-rose-800/60 transition-all flex items-center justify-center gap-1.5 h-9"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Edit Book Modal */}
      {editModalBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl rounded-3xl bg-neutral-900 border border-neutral-800 p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-neutral-800">
              <div>
                <span className="text-[11px] uppercase tracking-wider font-semibold text-emerald-400 flex items-center gap-1">
                  <Edit3 className="w-3.5 h-3.5" />
                  Update Details
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-neutral-100 mt-1">
                  Edit Book
                </h3>
              </div>
              <button
                onClick={() => setEditModalBook(null)}
                className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Edit Form */}
            <form onSubmit={handleEditSave} className="space-y-4">
              {/* Title */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-300">Book Title</label>
                <input
                  type="text"
                  required
                  value={editModalBook.title}
                  onChange={(e) =>
                    setEditModalBook({ ...editModalBook, title: e.target.value })
                  }
                  className="w-full rounded-xl bg-neutral-950 border border-neutral-800 px-3.5 py-2 text-sm text-neutral-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Author & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-neutral-300">Author</label>
                  <input
                    type="text"
                    required
                    value={editModalBook.author}
                    onChange={(e) =>
                      setEditModalBook({ ...editModalBook, author: e.target.value })
                    }
                    className="w-full rounded-xl bg-neutral-950 border border-neutral-800 px-3.5 py-2 text-sm text-neutral-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-neutral-300">Category</label>
                  <select
                    value={editModalBook.category}
                    onChange={(e) =>
                      setEditModalBook({ ...editModalBook, category: e.target.value })
                    }
                    className="w-full rounded-xl bg-neutral-950 border border-neutral-800 px-3.5 py-2 text-sm text-neutral-100 focus:outline-none focus:border-emerald-500 cursor-pointer"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Total Copies */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-300">
                  Total Copies Available
                </label>
                <input
                  type="number"
                  min={1}
                  max={100}
                  required
                  value={editModalBook.totalCopies}
                  onChange={(e) =>
                    setEditModalBook({
                      ...editModalBook,
                      totalCopies: Math.max(1, parseInt(e.target.value) || 1),
                    })
                  }
                  className="w-full rounded-xl bg-neutral-950 border border-neutral-800 px-3.5 py-2 text-sm text-neutral-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Cover Image Upload / URL Selector */}
              <div className="space-y-2 p-3.5 rounded-2xl bg-neutral-950/60 border border-neutral-800/80">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-neutral-200 flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
                    Cover Image
                  </label>
                  <div className="inline-flex p-0.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs">
                    <button
                      type="button"
                      onClick={() => setEditImageMode("file")}
                      className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                        editImageMode === "file"
                          ? "bg-emerald-500 text-neutral-950 shadow-sm"
                          : "text-neutral-400 hover:text-neutral-200"
                      }`}
                    >
                      Upload File
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditImageMode("url")}
                      className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                        editImageMode === "url"
                          ? "bg-emerald-500 text-neutral-950 shadow-sm"
                          : "text-neutral-400 hover:text-neutral-200"
                      }`}
                    >
                      Image URL
                    </button>
                  </div>
                </div>

                {editImageMode === "file" ? (
                  <div className="space-y-2">
                    <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-neutral-700 hover:border-emerald-500/80 rounded-xl cursor-pointer bg-neutral-900/40 hover:bg-neutral-900/80 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-2 pb-2">
                        <Upload className="w-5 h-5 text-emerald-400 mb-1" />
                        <p className="text-xs text-neutral-300 font-medium">
                          Click to select a new cover photo
                        </p>
                        <p className="text-[10px] text-neutral-500">
                          PNG, JPG, WebP (auto-optimized)
                        </p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleEditFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                ) : (
                  <div>
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/photo-..."
                      value={editModalBook.image}
                      onChange={(e) =>
                        setEditModalBook({ ...editModalBook, image: e.target.value })
                      }
                      className="w-full rounded-xl bg-neutral-900 border border-neutral-800 px-3.5 py-2 text-sm text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                )}

                {/* Preview Thumbnail */}
                {editModalBook.image && (
                  <div className="flex items-center gap-3 pt-1 border-t border-neutral-800/60">
                    <div className="relative w-12 aspect-[3/4] rounded-lg overflow-hidden border border-neutral-700 bg-neutral-900 shrink-0">
                      <Image
                        src={editModalBook.image}
                        alt="Cover Preview"
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                    <div className="text-[11px] text-neutral-400 truncate">
                      <span className="text-emerald-400 font-semibold">Active Preview:</span> Ready to save
                    </div>
                  </div>
                )}
              </div>

              {/* Short Description */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-300">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  required
                  value={editModalBook.shortDescription}
                  onChange={(e) =>
                    setEditModalBook({
                      ...editModalBook,
                      shortDescription: e.target.value,
                    })
                  }
                  className="w-full rounded-xl bg-neutral-950 border border-neutral-800 px-3.5 py-2 text-sm text-neutral-100 focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-800">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setEditModalBook(null)}
                  className="text-neutral-400 hover:text-neutral-200"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSaving}
                  className="bg-emerald-500 hover:bg-emerald-600 text-neutral-950 font-semibold px-6 rounded-xl"
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal (Assignment Rule: Custom Modal, Never alert/confirm) */}
      {deleteModalBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-3xl bg-neutral-900 border border-neutral-800 p-6 sm:p-8 shadow-2xl space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs uppercase font-semibold tracking-wider text-rose-400">
                    Permanent Deletion
                  </span>
                  <h3 className="font-serif text-xl font-bold text-neutral-100">
                    Delete This Book?
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setDeleteModalBook(null)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Book Info Summary */}
            <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center gap-3">
              <div className="relative w-12 aspect-[3/4] rounded-lg overflow-hidden shrink-0 border border-neutral-700">
                <Image
                  src={deleteModalBook.image}
                  alt={deleteModalBook.title}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-serif font-bold text-neutral-100 text-sm">
                  {deleteModalBook.title}
                </p>
                <p className="text-xs text-neutral-400">By {deleteModalBook.author}</p>
                <span className="text-[11px] text-rose-400 mt-1 block">
                  {deleteModalBook.totalCopies} copies will be unlisted
                </span>
              </div>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed">
              Are you sure you want to permanently delete this book from the library catalog? This action cannot be undone.
            </p>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                variant="ghost"
                onClick={() => setDeleteModalBook(null)}
                className="text-neutral-400 hover:text-neutral-200"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="bg-rose-600 hover:bg-rose-700 text-white font-semibold px-6 rounded-xl shadow-lg shadow-rose-600/20"
              >
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

