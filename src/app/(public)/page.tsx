// app/page.tsx
import Hero from "@/components/Hero";
import PartnerBar from "@/components/PartnerBar";
import AboutSection from "@/components/AboutSection";
import NewsGrid from "@/components/NewsGrid";
import GallerySection from "@/components/GallerySection";
import FeatureListSection from "@/components/FeatureListSection";

export default function Home() {
  return (
    <div className="flex w-full flex-col bg-white">
      <Hero />

      <PartnerBar />

      <AboutSection />

      <FeatureListSection />

      <NewsGrid />

      <GallerySection />
    </div>
  );
}
