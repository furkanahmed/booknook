import { HeroSlider } from "@/components/home/hero-slider";
import { NewArrivalsSection } from "@/components/home/new-arrivals";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Banner / Slider Section (Swiper.js with 3 slides) */}
      <HeroSlider />

      {/* 2. New Arrivals (Dynamic 6 Books, 3 cards per row, See All Books button) */}
      <NewArrivalsSection />
    </div>
  );
}
