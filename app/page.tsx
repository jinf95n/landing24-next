import Navbar from "@/components/interactive/Navbar";
import HeroSection from "@/components/interactive/HeroSection";
import ProblemSection from "@/components/interactive/ProblemSection";
import SolutionSection from "@/components/interactive/SolutionSection";
import StepsSection from "@/components/interactive/StepsSection";
import PortfolioSection from "@/components/interactive/PortfolioSection";
import TestimonialsSection from "@/components/interactive/TestimonialsSection";
import PricingSection from "@/components/interactive/PricingSection";
import FAQSection from "@/components/interactive/FAQSection";
import Footer from "@/components/sections/Footer";
import WhatsAppButton from "@/components/sections/WhatsAppButton";
import ConversionWrapper from "@/components/interactive/ConversionWrapper";
import BlogPreview from "@/components/sections/BlogPreview";

export default function Home() {
  return (
    <div className="min-h-screen">
      <ConversionWrapper>
        <Navbar />
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <StepsSection />
        <PortfolioSection />
        <TestimonialsSection />
        <PricingSection />
        <BlogPreview />
        <FAQSection />
        <Footer />
        <WhatsAppButton />
      </ConversionWrapper>
    </div>
  );
}