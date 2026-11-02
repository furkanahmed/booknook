"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { ArrowRight, BookOpen, Compass, Sparkles } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

// 3 Curated Slides matching the Assignment Requirement
const slides = [
  {
    id: 1,
    title: "Discover Your Next Literary Escape",
    subtitle: "Sanctuary of Timeless Stories",
    description:
      "Immerse yourself in thousands of curated masterpieces across classics, modern fiction, history, and scientific discoveries.",
    bgImage: "/image/banner-1.webp",
    icon: BookOpen,
    accent: "Explore Rare Editions",
  },
  {
    id: 2,
    title: "Effortless Digital Borrowing Experience",
    subtitle: "Seamless Reading Journey",
    description:
      "Select your favorite titles with real-time copy tracking, flexible borrow durations, and convenient one-click returns.",
    bgImage: "/image/banner-2.webp",
    icon: Compass,
    accent: "Instant Digital Access",
  },
  {
    id: 3,
    title: "A Community Built Around Great Books",
    subtitle: "Expand Your Perspectives",
    description:
      "Contribute your own books, explore recommendations, and join a passionate circle of curious minds and avid readers.",
    bgImage: "/image/banner-3.webp",
    icon: Sparkles,
    accent: "Curated for Curious Minds",
  },
];

export function HeroSlider() {
  return (
    <section className="relative w-full overflow-hidden bg-background">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        speed={1000}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
          bulletActiveClass: "swiper-pagination-bullet-active !bg-amber-500 !w-8 !rounded-full transition-all duration-300",
        }}
        navigation={true}
        loop={true}
        className="h-[520px] sm:h-[580px] lg:h-[640px] w-full"
      >
        {slides.map((slide) => {
          const IconComponent = slide.icon;
          return (
            <SwiperSlide key={slide.id} className="relative h-full w-full">
              {/* Background Image with Dark Vignette Overlay */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={slide.bgImage}
                  alt={slide.title}
                  fill
                  priority={slide.id === 1}
                  className="object-cover object-center filter brightness-[0.4] contrast-105"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-black/40 to-black/60" />
              </div>

              {/* Slide Content */}
              <div className="relative z-10 flex h-full items-center">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="max-w-2xl space-y-6 text-white">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-amber-300 backdrop-blur-md">
                      <IconComponent className="h-3.5 w-3.5 text-amber-400" />
                      <span>{slide.accent}</span>
                    </div>

                    {/* Title */}
                    <h1 className="font-serif text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-white drop-shadow-sm leading-[1.15]">
                      {slide.title}
                    </h1>

                    {/* Short Text */}
                    <p className="text-base sm:text-lg text-gray-200 leading-relaxed font-light line-clamp-3">
                      {slide.description}
                    </p>

                    {/* Browse Books Button (Goes to /books as specified) */}
                    <div className="pt-2">
                      <Link
                        href="/books"
                        className="inline-flex items-center gap-2.5 rounded-lg bg-primary px-6 py-3.5 text-base font-medium text-primary-foreground shadow-lg shadow-black/20 hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                      >
                        <span>Browse Books</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}

