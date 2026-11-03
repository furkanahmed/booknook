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
  Brain,
  Wand2
} from "lucide-react";

interface CategoryData {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  count: string;
  icon: React.ElementType;
  gradient: string;
  glowColor: string;
  iconColor: string;
}

const categories: CategoryData[] = [
  {
    id: "fiction",
    name: "Fiction",
    slug: "Fiction",
    tagline: "Timeless stories for every reader.",
    count: "450+ Books",
    icon: BookOpen,
    gradient: "from-emerald-500/15 via-emerald-600/5 to-transparent",
    glowColor: "group-hover:shadow-emerald-500/20 group-hover:border-emerald-500/50",
    iconColor: "text-emerald-400 group-hover:text-emerald-300",
  },
  {
    id: "non-fiction",
    name: "Non-Fiction",
    slug: "Non-Fiction",
    tagline: "Improve yourself every day.",
    count: "380+ Books",
    icon: Brain,
    gradient: "from-teal-500/15 via-teal-600/5 to-transparent",
    glowColor: "group-hover:shadow-teal-500/20 group-hover:border-teal-500/50",
    iconColor: "text-teal-400 group-hover:text-teal-300",
  },
  {
    id: "finance",
    name: "Finance",
    slug: "Finance",
    tagline: "Plan, save, and grow wealth.",
    count: "210+ Books",
    icon: TrendingUp,
    gradient: "from-amber-500/15 via-amber-600/5 to-transparent",
    glowColor: "group-hover:shadow-amber-500/20 group-hover:border-amber-500/50",
    iconColor: "text-amber-400 group-hover:text-amber-300",
  },
  {
    id: "science",
    name: "Science",
    slug: "Science",
    tagline: "Explore the wonders of science.",
    count: "190+ Books",
    icon: Atom,
    gradient: "from-cyan-500/15 via-cyan-600/5 to-transparent",
    glowColor: "group-hover:shadow-cyan-500/20 group-hover:border-cyan-500/50",
    iconColor: "text-cyan-400 group-hover:text-cyan-300",
  },
  {
    id: "history",
    name: "History",
    slug: "History",
    tagline: "Journey through human time.",
    count: "260+ Books",
    icon: Landmark,
    gradient: "from-emerald-600/15 via-emerald-700/5 to-transparent",
    glowColor: "group-hover:shadow-emerald-600/20 group-hover:border-emerald-600/50",
    iconColor: "text-emerald-400 group-hover:text-emerald-300",
  },
  {
    id: "fantasy",
    name: "Fantasy",
    slug: "Fantasy",
    tagline: "Step into deep imagination.",
    count: "320+ Books",
    icon: Wand2,
    gradient: "from-violet-500/15 via-violet-600/5 to-transparent",
    glowColor: "group-hover:shadow-violet-500/20 group-hover:border-violet-500/50",
    iconColor: "text-violet-400 group-hover:text-violet-300",
  },
];

export function CategoriesSection() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-background via-emerald-950/20 to-background border-y border-emerald-900/20 transition-colors relative overflow-hidden">
      {/* Subtle Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-400 backdrop-blur-sm">
              <Compass className="h-3.5 w-3.5 text-emerald-400" />
              <span>EXPLORE CATEGORIES</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-100">
              Browse by <span className="text-emerald-400 italic">Categories</span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 max-w-xl">
              Dive into your favorite genre and discover amazing books curated for every curious mind.
            </p>
          </div>

          <Link
            href="/books"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 hover:bg-emerald-500 hover:text-neutral-950 px-5 py-2.5 text-sm font-semibold text-emerald-400 transition-all duration-200 group self-start md:self-auto shadow-lg shadow-emerald-950/50"
          >
            <span>Explore All Books</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 6 Elegant Glassmorphic Cards (Responsive: 1 row on Desktop 2xl/xl, 3 cols on tablet, 2 cols on mobile) */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3.5 sm:gap-4 lg:gap-5">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.id}
                href={`/books?category=${encodeURIComponent(cat.slug)}`}
                className={`group relative flex flex-col justify-between rounded-2xl bg-gradient-to-b ${cat.gradient} bg-neutral-900/60 backdrop-blur-md border border-neutral-800/80 p-4 sm:p-5 text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${cat.glowColor}`}
              >
                {/* Book Count Tag */}
                <div className="flex justify-end mb-1">
                  <span className="text-[10px] font-medium text-neutral-400 bg-neutral-950/60 px-2 py-0.5 rounded-full border border-neutral-800">
                    {cat.count}
                  </span>
                </div>

                {/* Real Vector Icon Container (No cartoonish 3D) */}
                <div className="my-3 sm:my-4 flex items-center justify-center">
                  <div className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-neutral-950/80 border border-neutral-800/90 shadow-inner group-hover:scale-110 group-hover:border-emerald-500/40 transition-all duration-300">
                    {/* Radial Glow behind icon */}
                    <div className="absolute inset-0 rounded-2xl bg-emerald-500/10 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Icon className={`w-7 h-7 sm:w-8 sm:h-8 ${cat.iconColor} transition-colors relative z-10 stroke-[1.75]`} />
                  </div>
                </div>

                {/* Title & Tagline */}
                <div className="space-y-1 sm:space-y-1.5 mb-4">
                  <h3 className="font-serif text-base sm:text-lg font-bold text-neutral-100 group-hover:text-emerald-400 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-neutral-400 leading-tight line-clamp-2">
                    {cat.tagline}
                  </p>
                </div>

                {/* Round Arrow Button matching 2nd design */}
                <div className="pt-2 flex justify-center">
                  <div className="w-8 h-8 rounded-full bg-neutral-950/80 border border-neutral-800 flex items-center justify-center text-neutral-400 group-hover:bg-emerald-500 group-hover:text-neutral-950 group-hover:border-emerald-400 transition-all duration-300">
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
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
