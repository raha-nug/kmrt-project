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
      {/* 1. Hero Section (Teks Kiri, Gambar Kanan) */}
      <Hero />

      {/* 2. Baris Logo Partner/Jaringan */}
      <PartnerBar />

      {/* 3. Section Profil KMRT (Gambar Kiri, Teks Kanan) */}
      <AboutSection />

      {/* 4. Grid Berita (Desain Modern ala ICW) */}
      <NewsGrid />

      {/* 5. Galeri Dokumentasi (Grid 3 Kolom Bawah) */}
      <GallerySection />

      {/* 6. List Visi/Tujuan (Teks Tengah dengan List Ikon Bintang) */}
      <FeatureListSection />
    </div>
  );
}
