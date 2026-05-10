import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, ArrowLeft, Share2 } from "lucide-react";
import { getNewsBySlug } from "@/app/dashboard/(home)/berita/actions";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function DetailBeritaPage({ params }: PageProps) {
  const { slug } = await params;
  const berita = await getNewsBySlug(slug);

  // Jika slug tidak ditemukan di database, tampilkan halaman 404 otomatis
  if (!berita) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header Artikel */}
      <section className="border-b border-gray-200 bg-gray-50 pb-10 pt-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/berita"
            className="mb-8 inline-flex items-center text-xs font-bold uppercase tracking-widest text-gray-500 transition-colors hover:text-[#b91c1c]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Indeks Berita
          </Link>

          <div className="mb-4 flex items-center text-sm font-bold uppercase tracking-widest text-gray-500">
            <Calendar className="mr-2 h-4 w-4 text-[#b91c1c]" />
            {new Date(berita.createdAt).toLocaleDateString("id-ID", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>

          <h1 className="mb-6 font-serif text-3xl font-extrabold leading-tight text-gray-950 sm:text-4xl md:text-5xl">
            {berita.judul}
          </h1>

          {/* Pemisah Opsional (Bisa diganti dengan Author jika ada) */}
          <div className="flex items-center gap-4 border-t border-gray-200 pt-6">
            <div className="flex h-10 w-10 items-center justify-center bg-gray-950 font-serif font-bold text-white">
              KM
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">DPID KMRT</p>
              <p className="text-xs text-gray-500">
                Divisi Pengelolaan Informasi & Dokumentasi
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Konten Artikel */}
      <section className="pt-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Gambar Utama */}
          <div className="relative mb-12 h-[300px] w-full bg-gray-100 shadow-md sm:h-[400px] md:h-[500px]">
            <Image
              src={berita.gambar || "/images/cover/cover-01.png"}
              alt={berita.judul}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Area Render HTML */}
          <article className="prose prose-lg prose-gray prose-headings:font-serif prose-headings:font-bold prose-a:text-[#b91c1c] prose-img:rounded-lg max-w-none">
            {/* Hati-hati: dangerouslySetInnerHTML digunakan karena data dari RichTextEditor berupa HTML string */}
            <div dangerouslySetInnerHTML={{ __html: berita.konten }} />
          </article>

          {/* Footer Artikel (Share dll) */}
          <div className="mt-16 flex items-center justify-between border-t border-gray-200 pt-8">
            <p className="text-sm font-bold uppercase tracking-widest text-gray-500">
              Akhir dari artikel
            </p>
            <button className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-900 transition-colors hover:text-[#b91c1c]">
              <Share2 className="h-4 w-4" /> Bagikan
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
