"use client";

import React from "react";
import Link from "next/link";
import { 
  Compass, 
  ArrowRight, 
  BookOpen, 
  Coins, 
  Landmark, 
  FlaskConical, 
  BrainCircuit, 
  Feather, 
  Sparkles, 
  Layers 
} from "lucide-react";

interface CategoryData {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  count: string;
  icon: React.ElementType;
  iconGlow: string;
  iconColor: string;
}

const categories: CategoryData[] = [
  {
    id: "fiction",
    name: "Fiction",
    slug: "Fiction",
    tagline: "Stories & imagination",
    count: "450+ Books",
    icon: BookOpen,
    iconGlow: "bg-emerald-500/15 text-emerald-400 group-hover:bg-emerald-500/25",
    iconColor: "text-emerald-400",
  },
  {
    id: "non-fiction",
    name: "Personal Growth",
    slug: "Non-Fiction",
    tagline: "Learn & improve",
    count: "380+ Books",
    icon: BrainCircuit,
    iconGlow: "bg-amber-500/15 text-amber-400 group-hover:bg-amber-500/25",
    iconColor: "text-amber-400",
  },
  {
    id: "finance",
    name: "Finance",
    slug: "Finance",
    tagline: "Manage your money",
    count: "210+ Books",
    icon: Coins,
    iconGlow: "bg-amber-500/15 text-amber-300 group-hover:bg-amber-500/25",
    iconColor: "text-amber-300",
  },
  {
    id: "science",
    name: "Science",
    slug: "Science",
    tagline: "Discover & learn",
    count: "190+ Books",
    icon: FlaskConical,
    iconGlow: "bg-teal-500/15 text-teal-400 group-hover:bg-teal-500/25",
    iconColor: "text-teal-400",
  },
  {
    id: "history",
    name: "History",
    slug: "History",
    tagline: "Explore the past",
    count: "260+ Books",
    icon: Landmark,
    iconGlow: "bg-emerald-600/15 text-emerald-400 group-hover:bg-emerald-600/25",
    iconColor: "text-emerald-400",
  },
  {
    id: "fantasy",
    name: "Fantasy",
    slug: "Fantasy",
    tagline: "Dream & explore",
    count: "320+ Books",
    icon: Feather,
    iconGlow: "bg-purple-500/15 text-purple-400 group-hover:bg-purple-500/25",
    iconColor: "text-purple-400",
  },
  {
    id: "kids",
    name: "Kids & Youth",
    slug: "Kids",
    tagline: "Tales for young minds",
    count: "180+ Books",
    icon: Sparkles,
    iconGlow: "bg-rose-500/15 text-rose-400 group-hover:bg-rose-500/25",
    iconColor: "text-rose-400",
  },
  {
    id: "others",
    name: "Special Editions",
    slug: "Others",
    tagline: "Rare genres & arts",
    count: "140+ Books",
    icon: Layers,
    iconGlow: "bg-blue-500/15 text-blue-400 group-hover:bg-blue-500/25",
    iconColor: "text-blue-400",
  },
];

export function CategoriesSection() {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-background via-emerald-950/20 to-background border-y border-emerald-900/20 transition-colors relative overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-400 backdrop-blur-sm">
              <Compass className="h-3.5 w-3.5 text-emerald-400" />
              <span>CATEGORIES</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-100">
              Browse by <span className="text-emerald-400 italic">Categories</span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 max-w-xl">
              Find your perfect book category across our curated shelves.
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

        {/* 8 Hexagon-Themed Cards (4 per row on Desktop: 2 rows of 4; 2 cols on mobile/tablet) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.id}
                href={`/books?category=${encodeURIComponent(cat.slug)}`}
                className="group relative flex flex-col items-center justify-between text-center transition-all duration-300 hover:-translate-y-2"
              >
                {/* Hexagon (৬ কোণ বিশিষ্ট) শেপ উইথ স্মুথ কর্নার ও ব্যাকগ্রাউন্ড */}
                <div 
                  className="w-full relative flex flex-col items-center justify-between p-6 sm:p-7 bg-neutral-900/80 hover:bg-neutral-900/95 border border-emerald-500/25 hover:border-emerald-500/60 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-emerald-500/20"
                  style={{
                    clipPath: "polygon(22% 0%, 78% 0%, 100% 50%, 78% 100%, 22% 100%, 0% 50%)",
                    minHeight: "260px",
                  }}
                >
                  {/* Subtle Inner Highlight */}
                  <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 via-transparent to-black/40 pointer-events-none" />

                  {/* Icon Area with Soft Watercolor/Glow Aura matching 3rd design */}
                  <div className="relative mt-2 flex items-center justify-center">
                    <div className={`w-16 h-16 sm:w-18 sm:h-18 rounded-full ${cat.iconGlow} flex items-center justify-center backdrop-blur-md transition-transform duration-300 group-hover:scale-110 shadow-inner`}>
                      <Icon className={`w-8 h-8 sm:w-9 sm:h-9 ${cat.iconColor} stroke-[1.8]`} />
                    </div>
                  </div>

                  {/* Category Details */}
                  <div className="space-y-1 my-2 z-10">
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-neutral-100 group-hover:text-emerald-400 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-neutral-400 line-clamp-1 font-light">
                      {cat.tagline}
                    </p>
                  </div>

                  {/* Explore Link with Arrow matching 3rd design */}
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 group-hover:text-emerald-300 transition-colors z-10 mb-1">
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
