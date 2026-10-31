import { HeroSlider } from "@/components/home/hero-slider";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Banner / Slider Section (Swiper.js, 3 slides, Title, Text, Browse Books Button) */}
      <HeroSlider />

      {/* 2. Placeholders for upcoming Home sections */}
      <div className="container mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Next sections: Dynamic New Arrivals, How Borrowing Works, Top Categories */}
      </div>
    </div>
  );
}
