import Image from "next/image";
import Link from "next/link";
import { Newspaper, Calendar, ArrowRight } from "lucide-react";
import { getBerita } from "@/app/dashboard/(home)/berita/actions";
import Pagination from "@/components/ui-elements/Pagination";

interface Berita {
  id: string;
  slug: string;
  judul: string;
  gambar?: string | null;
  konten: string;
  createdAt: Date | string;
}

export default async function BeritaPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params?.page ?? 1);

  // Mengambil data berita (5 per halaman)
  const hasil = await getBerita(page, "");

  return (
    <div className="min-h-screen bg-white">
      {/* --- HERO SECTION --- */}
      <section className="relative bg-gray-950 py-16 text-white md:py-24">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>

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

      {/* --- NEWS LIST SECTION --- */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-10">
            {hasil.data.length > 0 ? (
              hasil.data.map((berita: Berita) => (
                <article
                  key={berita.id}
                  className="group flex flex-col gap-6 border-b border-gray-200 pb-10 md:flex-row"
                >
                  {/* Thumbnail Berita */}
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

                  {/* Konten Berita */}
                  <div className="flex w-full flex-col justify-center md:w-3/5">
                    <div className="mb-3 flex items-center text-xs font-bold uppercase tracking-widest text-gray-500">
                      <Calendar className="mr-2 h-4 w-4 text-[#b91c1c]" />

                      {new Date(berita.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </div>

                    <Link href={`/berita/${berita.slug}`}>
                      <h2 className="mb-4 line-clamp-2 font-serif text-2xl font-bold text-gray-950 transition-colors group-hover:text-[#b91c1c]">
                        {berita.judul}
                      </h2>
                    </Link>

                    <p className="mb-6 line-clamp-3 text-gray-600">
                      {/* Membersihkan tag HTML dari Rich Text Editor */}
                      {berita.konten.replace(/<[^>]*>?/gm, "")}
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
              ))
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

          {/* Pagination */}
          <Pagination
            currentPage={hasil.current_page}
            lastPage={hasil.last_page}
            path="/berita"
          />
        </div>
      </section>
    </div>
  );
}
