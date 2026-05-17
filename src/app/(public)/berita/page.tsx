import Image from "next/image";
import Link from "next/link";
import {
  Newspaper,
  Calendar,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { getBerita } from "@/app/dashboard/(home)/berita/actions";

interface Berita {
  id: string;
  slug: string;
  judul: string;
  gambar?: string | null;
  ringkasan?: string | null;
  konten: string;
  createdAt: Date | string;
}

// --- Helper: bersihkan HTML + entities ---
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>?/gm, "") // hapus tag HTML
    .replace(/&nbsp;/g, " ") // ganti &nbsp; dengan spasi biasa
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ") // normalkan spasi berlebih
    .trim();
}

// --- Pagination sesuai tema ---
function BeritaPagination({
  currentPage,
  lastPage,
  path,
}: {
  currentPage: number;
  lastPage: number;
  path: string;
}) {
  if (lastPage <= 1) return null;

  const pages = Array.from({ length: lastPage }, (_, i) => i + 1);
  const showEllipsis = lastPage > 7;

  const getVisiblePages = () => {
    if (!showEllipsis) return pages;
    if (currentPage <= 4) return [...pages.slice(0, 5), -1, lastPage];
    if (currentPage >= lastPage - 3)
      return [1, -1, ...pages.slice(lastPage - 5)];
    return [1, -1, currentPage - 1, currentPage, currentPage + 1, -2, lastPage];
  };

  const visiblePages = getVisiblePages();

  return (
    <nav
      aria-label="Navigasi halaman"
      className="mt-16 flex items-center justify-center gap-1"
    >
      {/* Prev */}
      <Link
        href={currentPage > 1 ? `${path}?page=${currentPage - 1}` : "#"}
        aria-disabled={currentPage === 1}
        className={`flex h-10 w-10 items-center justify-center border font-bold transition-all duration-200 ${
          currentPage === 1
            ? "pointer-events-none border-gray-200 text-gray-300"
            : "border-gray-300 text-gray-700 hover:border-[#b91c1c] hover:bg-[#b91c1c] hover:text-white"
        } `}
      >
        <ChevronLeft className="h-4 w-4" />
      </Link>

      {/* Page numbers */}
      {visiblePages.map((page, idx) =>
        page < 0 ? (
          <span
            key={`ellipsis-${idx}`}
            className="flex h-10 w-10 items-center justify-center text-gray-400"
          >
            ···
          </span>
        ) : (
          <Link
            key={page}
            href={`${path}?page=${page}`}
            className={`flex h-10 w-10 items-center justify-center border text-sm font-bold tracking-wide transition-all duration-200 ${
              page === currentPage
                ? "border-[#b91c1c] bg-[#b91c1c] text-white"
                : "border-gray-300 text-gray-700 hover:border-[#b91c1c] hover:bg-[#b91c1c] hover:text-white"
            } `}
          >
            {page}
          </Link>
        ),
      )}

      {/* Next */}
      <Link
        href={currentPage < lastPage ? `${path}?page=${currentPage + 1}` : "#"}
        aria-disabled={currentPage === lastPage}
        className={`flex h-10 w-10 items-center justify-center border font-bold transition-all duration-200 ${
          currentPage === lastPage
            ? "pointer-events-none border-gray-200 text-gray-300"
            : "border-gray-300 text-gray-700 hover:border-[#b91c1c] hover:bg-[#b91c1c] hover:text-white"
        } `}
      >
        <ChevronRight className="h-4 w-4" />
      </Link>
    </nav>
  );
}

// --- Page utama ---
export default async function BeritaPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params?.page ?? 1);
  const hasil = await getBerita(page, "");

  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <section className="relative bg-gray-950 py-16 text-white md:py-24">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.3em] text-[#b91c1c]">
              <Newspaper className="h-5 w-5" />
              Pusat Informasi
            </h2>
            <h1 className="font-serif text-4xl font-extrabold leading-tight md:text-5xl">
              Kabar Terkini & <br />
              Pernyataan Sikap
            </h1>
          </div>
        </div>
      </section>

      {/* NEWS LIST */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-10">
            {hasil.data.length > 0 ? (
              hasil.data.map((berita: Berita) => {
                // Gunakan ringkasan jika ada, fallback ke konten yang dibersihkan
                const preview = berita.ringkasan
                  ? stripHtml(berita.ringkasan)
                  : stripHtml(berita.konten);

                return (
                  <article
                    key={berita.id}
                    className="group flex flex-col gap-6 border-b border-gray-200 pb-10 md:flex-row"
                  >
                    {/* Thumbnail */}
                    <div className="w-full shrink-0 md:w-2/5">
                      <Link
                        href={`/berita/${berita.slug}`}
                        className="relative block h-60 w-full overflow-hidden bg-gray-100"
                      >
                        <Image
                          src={berita.gambar || "/images/cover/cover-01.png"}
                          alt={berita.judul}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </Link>
                    </div>

                    {/* Konten */}
                    <div className="flex w-full flex-col justify-center md:w-3/5">
                      <div className="mb-3 flex items-center text-xs font-bold uppercase tracking-widest text-gray-500">
                        <Calendar className="mr-2 h-4 w-4 text-[#b91c1c]" />
                        {new Date(berita.createdAt).toLocaleDateString(
                          "id-ID",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          },
                        )}
                      </div>
                      <Link href={`/berita/${berita.slug}`}>
                        <h2 className="mb-4 line-clamp-2 font-serif text-2xl font-bold text-gray-950 transition-colors group-hover:text-[#b91c1c]">
                          {berita.judul}
                        </h2>
                      </Link>
                      <p className="mb-6 line-clamp-3 text-gray-600">
                        {preview}
                      </p>
                      <div className="mt-auto">
                        <Link
                          href={`/berita/${berita.slug}`}
                          className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-[#b91c1c] transition-colors hover:text-gray-950"
                        >
                          Baca Selengkapnya
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })
            ) : (
              <div className="border border-dashed border-gray-300 bg-gray-50 py-20 text-center">
                <Newspaper className="mx-auto mb-4 h-12 w-12 text-gray-300" />
                <h3 className="text-xl font-bold text-gray-900">
                  Belum Ada Publikasi
                </h3>
                <p className="mt-2 text-gray-500">
                  Kabar terkini dan rilis pers KMRT akan segera diperbarui.
                </p>
              </div>
            )}
          </div>

          {/* Pagination custom */}
          <BeritaPagination
            currentPage={hasil.current_page}
            lastPage={hasil.last_page}
            path="/berita"
          />
        </div>
      </section>
    </div>
  );
}
