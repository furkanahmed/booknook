"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, ArrowRight } from "lucide-react";

interface StepItem {
  step: string;
  stepColor: string;
  title: string;
  description: string;
  image: string;
  actionText: string;
}

const borrowingSteps: StepItem[] = [
  {
    step: "STEP 01",
    stepColor: "text-[#FF5A36] dark:text-[#FF7043]",
    title: "Discover & Explore",
    description: "Browse curated titles and check live copy availability in our digital catalog.",
    image: "/image/step-1-discover.webp",
    actionText: "Explore Catalog",
  },
  {
    step: "STEP 02",
    stepColor: "text-[#0284C7] dark:text-[#38BDF8]",
    title: "Request & Borrow",
    description: "Select your return date with flexible duration and confirm your digital request.",
    image: "/image/step-2-request.webp",
    actionText: "Borrow Duration",
  },
  {
    step: "STEP 03",
    stepColor: "text-[#D97706] dark:text-[#F59E0B]",
    title: "Read & Enjoy",
    description: "Immerse in your favorite stories with real-time tracking in your dashboard.",
    image: "/image/step-3-read.webp",
    actionText: "Track Reading",
  },
  {
    step: "STEP 04",
    stepColor: "text-[#10B981] dark:text-[#34D399]",
    title: "One-Click Return",
    description: "Return finished books easily to automatically update the library stock.",
    image: "/image/step-4-return.webp",
    actionText: "Return Book",
  },
];

export function HowBorrowingWorksSection() {
  return (
    <section className="py-20 bg-background border-b border-border/40 transition-colors">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span>Simple 4-Step Process</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            How Borrowing Works
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            A seamless borrowing experience tailored for curious readers.
          </p>
        </div>

        {/* 4 Steps Grid: Open Storytelling Layout with 1:1 Aspect Ratio Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 items-start">
          {borrowingSteps.map((item) => (
            <div key={item.step} className="group flex flex-col items-center text-center">
              
              {/* Step Tag */}
              <span className={`font-mono text-xs font-bold uppercase tracking-widest ${item.stepColor} mb-4`}>
                {item.step}
              </span>

              {/* 1:1 Aspect Ratio Image Container */}
              <div className="relative aspect-square w-48 sm:w-52 max-w-full overflow-hidden rounded-2xl mb-6 transition-transform duration-300 group-hover:-translate-y-2">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 200px, 220px"
                  className="object-cover object-center"
                />
              </div>

              {/* Typography */}
              <div className="space-y-2 max-w-xs">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Action Link */}
              <Link
                href="/books"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-amber-500 transition-colors"
              >
                <span>{item.actionText}</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
