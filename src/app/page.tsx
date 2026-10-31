import { HeroSlider } from "@/components/home/hero-slider";
import { NewArrivalsSection } from "@/components/home/new-arrivals";
import { CategoriesSection } from "@/components/home/categories-section";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Banner / Slider Section (Swiper.js with 3 slides) */}
      <HeroSlider />

      {/* 2. New Arrivals (Dynamic 6 Books, 3 cards per row, See All Books button) */}
      <NewArrivalsSection />

      {/* 3. Extra Relevant Section 1: Browse by Categories / Genres */}
      <CategoriesSection />
    </div>
  );
}
