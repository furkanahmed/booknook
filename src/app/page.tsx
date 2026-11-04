import { HeroSlider } from "@/components/home/hero-slider";
import { NewArrivalsSection } from "@/components/home/new-arrivals";
import { CategoriesSection } from "@/components/home/categories-section";
import { HowBorrowingWorksSection } from "@/components/home/how-borrowing-works";
import { AnimatedSection } from "@/components/ui/animated-section";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Banner / Slider Section (Swiper.js with 3 slides) */}
      <HeroSlider />

      {/* 2. New Arrivals (Dynamic 6 Books, with smooth Framer Motion reveal) */}
      <AnimatedSection>
        <NewArrivalsSection />
      </AnimatedSection>

      {/* 3. Extra Relevant Section 1: Browse by Categories / Genres */}
      <AnimatedSection delay={0.1}>
        <CategoriesSection />
      </AnimatedSection>

      {/* 4. Extra Relevant Section 2: How Borrowing Works */}
      <AnimatedSection delay={0.15}>
        <HowBorrowingWorksSection />
      </AnimatedSection>
    </div>
  );
}
