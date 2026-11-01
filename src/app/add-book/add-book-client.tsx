"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { BookCategory } from "@/types/book";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  BookPlus,
  ArrowLeft,
  Upload,
  User,
  Mail,
  Layers,
  BookOpen,
  FileText,
  Tag,
  Sparkles,
  CheckCircle,
  AlertCircle,
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

export function AddBookClient() {
  const router = useRouter();
  const { user, loading } = useAuth();

  // Protected route check
  useEffect(() => {
    if (!loading && !user) {
      toast.info("Please sign in to add new books to the library.");
      router.push("/login?redirect=/add-book");
    }
  }, [user, loading, router]);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "Fiction" as BookCategory,
    totalCopies: 5,
    shortDescription: "",
    longDescription: "",
    image: "",
  });

  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageUploadType, setImageUploadType] = useState<"file" | "url">("file");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle local image file upload & convert to base64 preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file (JPG, PNG, WebP).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image file size should be less than 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setImagePreview(result);
      setFormData((prev) => ({ ...prev, image: result }));
    };
    reader.readAsDataURL(file);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormData((prev) => ({ ...prev, image: val }));
    setImagePreview(val);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "totalCopies" ? Math.max(1, parseInt(value) || 1) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be signed in to add a book.");
      router.push("/login?redirect=/add-book");
      return;
    }

    if (!formData.title.trim()) {
      toast.error("Please enter the book title.");
      return;
    }

    if (!formData.author.trim()) {
      toast.error("Please enter the author's name.");
      return;
    }

    if (!formData.shortDescription.trim()) {
      toast.error("Please provide a short description.");
      return;
    }

    if (!formData.image) {
      toast.error("Please provide a book cover image (upload file or paste URL).");
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Save to user's created books storage
    try {
      const stored = localStorage.getItem("booknook_user_added_books");
      const list = stored ? JSON.parse(stored) : [];

      const newBook = {
        _id: "usr-book-" + Date.now(),
        title: formData.title.trim(),
        author: formData.author.trim(),
        category: formData.category,
        image: formData.image,
        totalCopies: formData.totalCopies,
        shortDescription: formData.shortDescription.trim(),
        longDescription: formData.longDescription.trim() || formData.shortDescription.trim(),
        userName: user.name,
        userEmail: user.email,
        createdAt: new Date().toISOString(),
      };

      list.unshift(newBook);
      localStorage.setItem("booknook_user_added_books", JSON.stringify(list));

      toast.success(`"${formData.title}" added to the library collection successfully!`, {
        duration: 4000,
        icon: <CheckCircle className="w-5 h-5 text-emerald-400" />,
      });

      router.push("/books");
    } catch (e) {
      console.error(e);
      toast.error("Failed to add book. Please try again.");
    } finally {
      setIsSubmitting(false);
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
      {/* Back Button */}
      <div>
        <Link
          href="/books"
          className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-emerald-400 transition-colors py-1 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Books
        </Link>
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto rounded-3xl bg-neutral-900/60 border border-neutral-800/80 p-6 sm:p-10 backdrop-blur-sm shadow-2xl">
        {/* Header */}
        <div className="pb-8 border-b border-neutral-800 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <BookPlus className="w-3.5 h-3.5" />
            <span>Library Contribution</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-100 tracking-tight">
            Add a New Book
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400">
            Contribute new titles to the BookNook catalog. All submissions are automatically indexed.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="pt-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Left Column: Cover Image Uploader & Preview */}
            <div className="md:col-span-5 space-y-4">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300 block">
                Book Cover Image <span className="text-emerald-400">*</span>
              </label>

              {/* Upload Mode Switcher */}
              <div className="flex rounded-xl bg-neutral-950 p-1 border border-neutral-800 text-xs font-medium">
                <button
                  type="button"
                  onClick={() => setImageUploadType("file")}
                  className={`flex-1 py-1.5 rounded-lg transition-all ${
                    imageUploadType === "file"
                      ? "bg-neutral-800 text-emerald-400 shadow-sm"
                      : "text-neutral-400 hover:text-neutral-200"
                  }`}
                >
                  Upload File
                </button>
                <button
                  type="button"
                  onClick={() => setImageUploadType("url")}
                  className={`flex-1 py-1.5 rounded-lg transition-all ${
                    imageUploadType === "url"
                      ? "bg-neutral-800 text-emerald-400 shadow-sm"
                      : "text-neutral-400 hover:text-neutral-200"
                  }`}
                >
                  Image URL
                </button>
              </div>

              {/* Image Preview Box */}
              <div className="relative w-full aspect-[3/4] rounded-2xl border-2 border-dashed border-neutral-700 bg-neutral-950/70 overflow-hidden flex flex-col items-center justify-center text-center p-4 group">
                {imagePreview ? (
                  <>
                    <Image
                      src={imagePreview}
                      alt="Cover Preview"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                      <p className="text-xs font-medium text-neutral-200">
                        Click below to replace image
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="space-y-2 text-neutral-500">
                    <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto text-neutral-400">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                    <p className="text-xs text-neutral-300 font-medium">
                      No cover selected
                    </p>
                    <p className="text-[11px] text-neutral-500">
                      Recommended 3:4 portrait ratio
                    </p>
                  </div>
                )}
              </div>

              {/* Input for File or URL */}
              {imageUploadType === "file" ? (
                <div>
                  <label className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs font-semibold text-neutral-300 hover:border-emerald-500/50 hover:text-emerald-400 cursor-pointer transition-colors">
                    <Upload className="w-4 h-4 text-emerald-400" />
                    <span>Choose Cover File</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              ) : (
                <div>
                  <input
                    type="url"
                    placeholder="https://example.com/cover.jpg"
                    value={formData.image}
                    onChange={handleUrlChange}
                    className="w-full rounded-xl bg-neutral-950 border border-neutral-800 px-3.5 py-2.5 text-xs text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              )}
            </div>

            {/* Right Column: Form Inputs */}
            <div className="md:col-span-7 space-y-5">
              {/* Title */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                  Book Title <span className="text-emerald-400">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="e.g. Sapiens: A Brief History of Humankind"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-neutral-950 border border-neutral-800 px-3.5 py-2.5 text-sm text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                />
              </div>

              {/* Author & Category (Two Columns) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Author Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-emerald-400" />
                    Author Name <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="author"
                    required
                    placeholder="e.g. Yuval Noah Harari"
                    value={formData.author}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-neutral-950 border border-neutral-800 px-3.5 py-2.5 text-sm text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                  />
                </div>

                {/* Category Dropdown */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-emerald-400" />
                    Category <span className="text-emerald-400">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-neutral-950 border border-neutral-800 px-3.5 py-2.5 text-sm text-neutral-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors cursor-pointer"
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
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-emerald-400" />
                    Total Copies Available <span className="text-emerald-400">*</span>
                  </span>
                  <span className="text-[11px] text-neutral-500 font-normal">
                    Minimum 1 copy
                  </span>
                </label>
                <input
                  type="number"
                  name="totalCopies"
                  min={1}
                  max={100}
                  required
                  value={formData.totalCopies}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-neutral-950 border border-neutral-800 px-3.5 py-2.5 text-sm text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                />
              </div>

              {/* Short Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-emerald-400" />
                  Short Description <span className="text-emerald-400">*</span>
                </label>
                <textarea
                  name="shortDescription"
                  required
                  rows={2}
                  placeholder="One or two compelling sentences about the book's core premise..."
                  value={formData.shortDescription}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-neutral-950 border border-neutral-800 px-3.5 py-2.5 text-sm text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors resize-none"
                />
              </div>

              {/* Long Description (Overview) */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-emerald-400" />
                    Detailed Overview & Summary
                  </span>
                  <span className="text-[11px] text-neutral-500 font-normal">
                    Optional
                  </span>
                </label>
                <textarea
                  name="longDescription"
                  rows={3}
                  placeholder="Comprehensive synopsis, background, or themes explored in the book..."
                  value={formData.longDescription}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-neutral-950 border border-neutral-800 px-3.5 py-2.5 text-sm text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                />
              </div>

              {/* Read-only User Session Info (PDF Mandatory Requirement) */}
              <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800/80 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  <User className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Contributor Information (Read-only)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-neutral-500 block text-[11px] mb-1">Added By</span>
                    <input
                      type="text"
                      value={user.name}
                      disabled
                      className="w-full rounded-lg bg-neutral-900 border border-neutral-800 px-3 py-1.5 text-neutral-300 cursor-not-allowed opacity-80"
                    />
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[11px] mb-1">Contributor Email</span>
                    <input
                      type="email"
                      value={user.email}
                      disabled
                      className="w-full rounded-lg bg-neutral-900 border border-neutral-800 px-3 py-1.5 text-neutral-300 cursor-not-allowed opacity-80"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-6 border-t border-neutral-800 flex items-center justify-end gap-3">
            <Link href="/books">
              <Button
                type="button"
                variant="ghost"
                className="text-neutral-400 hover:text-neutral-200"
              >
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-emerald-500 hover:bg-emerald-600 text-neutral-950 font-semibold px-8 h-11 rounded-xl shadow-lg shadow-emerald-500/20 hover:scale-[1.01] transition-all flex items-center gap-2"
            >
              <BookPlus className="w-4 h-4" />
              <span>{isSubmitting ? "Adding Book..." : "Add Book to Library"}</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
