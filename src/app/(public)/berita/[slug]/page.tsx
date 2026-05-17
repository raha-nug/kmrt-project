import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, ArrowLeft } from "lucide-react";
import { getNewsBySlug } from "@/app/dashboard/(home)/berita/actions";
import ShareButton from "@/components/ui-elements/ShareButton";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Bersihkan HTML entities agar prose tidak menampilkan &nbsp; dll
function sanitizeHtml(html: string): string {
  return (
    html
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      // Hapus spasi berlebih di dalam tag (misal: <p>   </p>)
      .replace(/<p>\s*<\/p>/g, "")
      .trim()
  );
}

export default async function DetailBeritaPage({ params }: PageProps) {
  const { slug } = await params;
  const berita = await getNewsBySlug(slug);

  if (!berita) {
    notFound();
  }

  const kontenBersih = sanitizeHtml(berita.konten);

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
        </div>
      </section>

      {/* Konten Artikel */}
      <section className="pt-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Gambar Utama */}
          {berita.gambar && (
            <div className="relative mb-12 h-[300px] w-full overflow-hidden bg-gray-100 shadow-md sm:h-[400px] md:h-[500px]">
              <Image
                src={berita.gambar}
                alt={berita.judul}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Prose — render HTML dari RTE */}
          <article
            className={[
              "prose prose-lg max-w-none",
              // Tipografi
              "prose-headings:font-serif prose-headings:font-bold prose-headings:text-gray-950",
              "prose-p:text-gray-700 prose-p:leading-relaxed",
              // Link
              "prose-a:text-[#b91c1c] prose-a:font-semibold prose-a:no-underline hover:prose-a:underline",
              // Gambar
              "prose-img:rounded-none prose-img:shadow-md",
              // Blockquote
              "prose-blockquote:border-l-[#b91c1c] prose-blockquote:bg-gray-50 prose-blockquote:py-1 prose-blockquote:not-italic",
              // Strong & em
              "prose-strong:text-gray-900",
              // HR
              "prose-hr:border-gray-200",
            ].join(" ")}
          >
            <div dangerouslySetInnerHTML={{ __html: kontenBersih }} />
          </article>

          {/* Footer Artikel */}
          <div className="mt-16 flex flex-col gap-4 border-t border-gray-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-bold uppercase tracking-widest text-gray-400">
              — Akhir dari artikel —
            </p>

            {/* Share button — client component kecil */}
            <ShareButton judul={berita.judul} />
          </div>
        </div>
      </section>
    </div>
  );
}
