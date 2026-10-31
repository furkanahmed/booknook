"use client";

import React from "react";
import Link from "next/link";
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

        {/* Categories Grid (Clean Minimalist Cards Matching Reference) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            return (
              <Link
                key={cat.id}
                href={`/books?category=${encodeURIComponent(cat.slug)}`}
                className="group relative flex overflow-hidden rounded-[20px] bg-card border border-border/80 shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300 hover:-translate-y-1"
              >
                {/* 1. Left Vertical Colored Ribbon */}
                <div
                  className={`relative z-20 flex w-10 sm:w-11 shrink-0 flex-col items-center justify-center rounded-l-[19px] ${cat.badgeBg} text-white transition-colors`}
                >
                  <span className="-rotate-90 whitespace-nowrap font-sans text-[11px] font-bold uppercase tracking-widest text-white">
                    {cat.step}
                  </span>
                </div>

                {/* Clean Gap */}
                <div className="w-2 shrink-0 bg-muted/20 dark:bg-zinc-900/30" />

                {/* 2. Main Right Area (Compact & Slim) */}
                <div className="relative z-10 flex flex-1 flex-col justify-between overflow-hidden">
                  
                  {/* Top Content Box */}
                  <div className="p-4 sm:p-5 space-y-1.5">
                    {/* Top Header Row */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-bold text-[#FF5A36] dark:text-[#FF7043] tracking-normal">
                        {cat.tag}
                      </span>
                      <span className="text-[11px] font-medium text-muted-foreground bg-muted/80 dark:bg-muted/50 px-2.5 py-0.5 rounded-full border border-border/50">
                        {cat.count}
                      </span>
                    </div>

                    {/* Main Title */}
                    <h3 className="text-base sm:text-lg font-bold text-card-foreground group-hover:text-primary transition-colors tracking-tight">
                      {cat.name}
                    </h3>

                    {/* Description */}
                    <p className="pt-1 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  {/* Bottom Action Line */}
                  <div className="px-4 sm:px-5 py-2.5 border-t border-border/40 bg-card flex items-center justify-between text-xs font-semibold text-primary group-hover:text-[#FF5A36] dark:group-hover:text-[#FF7043] transition-colors">
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="h-3.5 w-3.5" />
                      <span>Explore Books</span>
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1.5 transition-transform duration-200" />
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
