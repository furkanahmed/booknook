"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Compass, 
  ArrowRight, 
  BookOpen, 
  Sparkles, 
  TrendingUp, 
  Landmark, 
  Atom, 
  BookMarked 
} from "lucide-react";

interface CategoryData {
  id: string;
  step: string;
  tag: string;
  name: string;
  slug: string;
  count: string;
  description: string;
  image: string;
  badgeBg: string;
  tagColor: string;
  icon: React.ElementType;
}

const categories: CategoryData[] = [
  {
    id: "fiction",
    step: "GENRE 01",
    tag: "Literature & Drama",
    name: "Classic & Fiction",
    slug: "Fiction",
    count: "450+ Books",
    description: "Immerse in timeless novels, emotional journeys, and celebrated global classics.",
    image: "/image/cat-fiction.webp",
    badgeBg: "bg-emerald-600 dark:bg-emerald-700",
    tagColor: "text-emerald-600 dark:text-emerald-400",
    icon: BookMarked,
  },
  {
    id: "non-fiction",
    step: "GENRE 02",
    tag: "Personal Mastery",
    name: "Non-Fiction & Memoir",
    slug: "Non-Fiction",
    count: "380+ Books",
    description: "Habit formation, psychology, life lessons, and transformative biographies.",
    image: "/image/cat-non-fiction.webp",
    badgeBg: "bg-amber-600 dark:bg-amber-700",
    tagColor: "text-amber-600 dark:text-amber-400",
    icon: Compass,
  },
  {
    id: "finance",
    step: "GENRE 03",
    tag: "Wealth & Economy",
    name: "Finance & Investing",
    slug: "Finance",
    count: "210+ Books",
    description: "Master money psychology, modern investing, market wisdom, and independence.",
    image: "/image/cat-finance.webp",
    badgeBg: "bg-orange-600 dark:bg-orange-700",
    tagColor: "text-orange-600 dark:text-orange-400",
    icon: TrendingUp,
  },
  {
    id: "science",
    step: "GENRE 04",
    tag: "Universe & Nature",
    name: "Science & Cosmos",
    slug: "Science",
    count: "190+ Books",
    description: "Explore astrophysics, evolutionary milestones, and futuristic discoveries.",
    image: "/image/cat-science.webp",
    badgeBg: "bg-blue-600 dark:bg-blue-700",
    tagColor: "text-blue-600 dark:text-blue-400",
    icon: Atom,
  },
  {
    id: "history",
    step: "GENRE 05",
    tag: "Human Civilizations",
    name: "History & Culture",
    slug: "History",
    count: "260+ Books",
    description: "Ancient revolutions, empire chronicles, and pivotal heritage milestones.",
    image: "/image/cat-history.webp",
    badgeBg: "bg-rose-600 dark:bg-rose-700",
    tagColor: "text-rose-600 dark:text-rose-400",
    icon: Landmark,
  },
  {
    id: "fantasy",
    step: "GENRE 06",
    tag: "Mystic Worlds",
    name: "Fantasy & Realms",
    slug: "Fantasy",
    count: "320+ Books",
    description: "Mythical lands, magical lore, epic kingdoms, and legendary adventures.",
    image: "/image/cat-fantasy.webp",
    badgeBg: "bg-purple-600 dark:bg-purple-700",
    tagColor: "text-purple-600 dark:text-purple-400",
    icon: Sparkles,
  },
];

export function CategoriesSection() {
  return (
    <section className="py-20 bg-background border-y border-border/40 transition-colors">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
              <Compass className="h-3.5 w-3.5 text-amber-500" />
              <span>Curated Collections</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Browse by Categories
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl">
              Explore our physical & digital shelves organized by literary disciplines. Click any genre to view all available titles.
            </p>
          </div>

          <Link
            href="/books"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-amber-500 transition-colors group"
          >
            <span>Explore All Books</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Categories Grid (Exact Reference Image Style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            return (
              <Link
                key={cat.id}
                href={`/books?category=${encodeURIComponent(cat.slug)}`}
                className="group relative flex overflow-hidden rounded-[20px] bg-card border border-border/80 shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300 hover:-translate-y-1"
              >
                {/* 1. Left Vertical Colored Ribbon (Flush to left, top & bottom) */}
                <div
                  className={`relative z-20 flex w-12 sm:w-14 shrink-0 flex-col items-center justify-center rounded-l-[19px] ${cat.badgeBg} text-white transition-colors`}
                >
                  <span className="-rotate-90 whitespace-nowrap font-sans text-xs font-bold uppercase tracking-widest text-white">
                    {cat.step}
                  </span>
                </div>

                {/* 2. Main Right Content Area */}
                <div className="relative z-10 flex flex-1 flex-col justify-between p-6 sm:p-7 overflow-hidden">
                  
                  {/* Subtle Cinematic Background Image */}
                  <div className="absolute inset-0 z-0 pointer-events-none">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center opacity-10 dark:opacity-15 group-hover:opacity-20 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-card via-card/95 to-card/85" />
                  </div>

                  {/* Top Header Row: Category Tag (Orange/Coral style) + Books Count */}
                  <div className="relative z-10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-base sm:text-lg font-bold text-[#FF5A36] dark:text-[#FF7043] tracking-normal">
                        {cat.tag}
                      </span>
                      <span className="text-xs font-medium text-muted-foreground bg-muted/60 px-3 py-1 rounded-full border border-border/50">
                        {cat.count}
                      </span>
                    </div>

                    {/* Main Bold Title (e.g. Job হান্টিং style) */}
                    <h3 className="text-xl sm:text-2xl font-bold text-card-foreground group-hover:text-primary transition-colors tracking-tight">
                      {cat.name}
                    </h3>

                    {/* Description Paragraph */}
                    <p className="pt-2 text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  {/* Bottom Action Line: Explore Titles with Arrow */}
                  <div className="relative z-10 pt-5 mt-4 border-t border-border/40 flex items-center justify-between text-xs sm:text-sm font-semibold text-primary group-hover:text-[#FF5A36] dark:group-hover:text-[#FF7043] transition-colors">
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="h-4 w-4" />
                      <span>Explore Titles</span>
                    </span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform duration-200" />
                  </div>

                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
