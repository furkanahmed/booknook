"use client";

import React from "react";
import Link from "next/link";
import { 
  Compass, 
  ArrowRight, 
  BookOpen, 
  TrendingUp, 
  Landmark, 
  Atom, 
  Brain,
  Wand2,
  Baby,
  Layers
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
    tagline: "Improve yourself every single day.",
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
    tagline: "Plan, save, and grow your wealth.",
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
    tagline: "Explore modern wonders of science.",
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
    tagline: "Journey through ancient & modern time.",
    count: "260+ Books",
    icon: Landmark,
    gradient: "from-emerald-600/15 via-emerald-700/5 to-transparent",
    glowColor: "group-hover:shadow-emerald-600/20 group-hover:border-emerald-600/50",
    iconColor: "text-emerald-400 group-hover:text-emerald-300",
  },
  {
    id: "kids",
    name: "Kids",
    slug: "Kids",
    tagline: "Inspiring tales for young minds.",
    count: "180+ Books",
    icon: Baby,
    gradient: "from-rose-500/15 via-rose-600/5 to-transparent",
    glowColor: "group-hover:shadow-rose-500/20 group-hover:border-rose-500/50",
    iconColor: "text-rose-400 group-hover:text-rose-300",
  },
  {
    id: "fantasy",
    name: "Fantasy",
    slug: "Fantasy",
    tagline: "Step into limitless imagination.",
    count: "320+ Books",
    icon: Wand2,
    gradient: "from-violet-500/15 via-violet-600/5 to-transparent",
    glowColor: "group-hover:shadow-violet-500/20 group-hover:border-violet-500/50",
    iconColor: "text-violet-400 group-hover:text-violet-300",
  },
  {
    id: "others",
    name: "Others",
    slug: "Others",
    tagline: "Diverse genres, essays & rarities.",
    count: "140+ Books",
    icon: Layers,
    gradient: "from-blue-500/15 via-blue-600/5 to-transparent",
    glowColor: "group-hover:shadow-blue-500/20 group-hover:border-blue-500/50",
    iconColor: "text-blue-400 group-hover:text-blue-300",
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
              Dive into your favorite genre and discover amazing books curated across all 8 disciplines.
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

        {/* 8 Elegant Glassmorphic Cards (4 per row on Desktop: 2 rows of 4; 2 cols on mobile/tablet) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.id}
                href={`/books?category=${encodeURIComponent(cat.slug)}`}
                className={`group relative flex flex-col justify-between rounded-2xl bg-gradient-to-b ${cat.gradient} bg-neutral-900/60 backdrop-blur-md border border-neutral-800/80 p-5 sm:p-6 text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${cat.glowColor}`}
              >
                {/* Book Count Tag */}
                <div className="flex justify-end mb-1">
                  <span className="text-[10px] font-medium text-neutral-400 bg-neutral-950/60 px-2.5 py-0.5 rounded-full border border-neutral-800">
                    {cat.count}
                  </span>
                </div>

                {/* Real Vector Icon Container */}
                <div className="my-3 sm:my-4 flex items-center justify-center">
                  <div className="relative flex items-center justify-center w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-neutral-950/80 border border-neutral-800/90 shadow-inner group-hover:scale-110 group-hover:border-emerald-500/40 transition-all duration-300">
                    {/* Radial Glow behind icon */}
                    <div className="absolute inset-0 rounded-2xl bg-emerald-500/10 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Icon className={`w-8 h-8 sm:w-9 sm:h-9 ${cat.iconColor} transition-colors relative z-10 stroke-[1.75]`} />
                  </div>
                </div>

                {/* Title & Tagline */}
                <div className="space-y-1.5 mb-4">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-neutral-100 group-hover:text-emerald-400 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2">
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
