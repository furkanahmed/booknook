"use client";

import React from "react";
import Link from "next/link";
import { 
  Sparkles, 
  ArrowRight 
} from "lucide-react";
import { StoryDiscoverIcon } from "@/components/icons/story-discover";

export function HowBorrowingWorksSection() {
  return (
    <section className="py-20 bg-background border-b border-border/40 transition-colors">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Centered like the reference image) */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span>Simple 4-Step Process</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            How Borrowing Works
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Experience an effortless borrowing journey designed around avid readers.
          </p>
        </div>

        {/* Steps Grid: Open / Cardless (উন্মুক্ত লেআউট হুবহু রেফারেন্সের মতো) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 items-start">
          
          {/* ================= STEP 01: Discover & Explore (Open Character Layout) ================= */}
          <div className="group flex flex-col items-center text-center">
            
            {/* Step Number Tag */}
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#FF5A36] dark:text-[#FF7043] mb-3">
              STEP 01
            </span>

            {/* Free Open Character Illustration (No card box) */}
            <div className="h-48 w-full flex items-center justify-center mb-6 transition-transform duration-300 group-hover:-translate-y-2">
              <StoryDiscoverIcon className="h-full w-auto max-w-[190px]" />
            </div>

            {/* Typography Description (Directly on page background) */}
            <div className="space-y-2 max-w-xs">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                Discover & Explore
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                ব্রাউজ করুন এবং আপনার পছন্দের বইয়ের প্রাপ্যতা (availability) পরীক্ষা করে নির্বাচন করুন।
              </p>
            </div>

            {/* Subtle Action Link */}
            <Link
              href="/books"
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-amber-500 transition-colors"
            >
              <span>Explore Catalog</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* ================= STEP 02: Connect & Reserve (Placeholder) ================= */}
          <div className="flex flex-col items-center text-center opacity-40">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
              STEP 02
            </span>
            <div className="h-48 w-full flex items-center justify-center mb-6">
              <div className="h-36 w-36 rounded-full border-2 border-dashed border-border/80 flex items-center justify-center text-xs font-mono text-muted-foreground">
                Character 02
              </div>
            </div>
            <div className="space-y-1.5 max-w-xs">
              <h4 className="font-serif text-lg font-bold text-muted-foreground">Login & Request</h4>
              <p className="text-xs text-muted-foreground">লগইন করুন অথবা অ্যাকাউন্ট তৈরি করে বইটি রিজার্ভ করুন।</p>
            </div>
          </div>

          {/* ================= STEP 03: Instant Borrow (Placeholder) ================= */}
          <div className="flex flex-col items-center text-center opacity-40">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
              STEP 03
            </span>
            <div className="h-48 w-full flex items-center justify-center mb-6">
              <div className="h-36 w-36 rounded-full border-2 border-dashed border-border/80 flex items-center justify-center text-xs font-mono text-muted-foreground">
                Character 03
              </div>
            </div>
            <div className="space-y-1.5 max-w-xs">
              <h4 className="font-serif text-lg font-bold text-muted-foreground">Read & Enjoy</h4>
              <p className="text-xs text-muted-foreground">ডিজিটাল কনফার্মেশন পেয়ে নিশ্চিন্তে আপনার বইটি পড়া উপভোগ করুন।</p>
            </div>
          </div>

          {/* ================= STEP 04: One-Click Return (Placeholder) ================= */}
          <div className="flex flex-col items-center text-center opacity-40">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
              STEP 04
            </span>
            <div className="h-48 w-full flex items-center justify-center mb-6">
              <div className="h-36 w-36 rounded-full border-2 border-dashed border-border/80 flex items-center justify-center text-xs font-mono text-muted-foreground">
                Character 04
              </div>
            </div>
            <div className="space-y-1.5 max-w-xs">
              <h4 className="font-serif text-lg font-bold text-muted-foreground">Return Book</h4>
              <p className="text-xs text-muted-foreground">পড়া শেষ হলে এক ক্লিকেই লাইব্রেরিতে বইটি ফেরত দিন।</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
