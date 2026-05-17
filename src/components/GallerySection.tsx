import Image from "next/image";
import Link from "next/link";
import { getGaleri } from "@/app/dashboard/(home)/galeri/actions";
import GaleriCarousel from "@/components/ui-elements/GaleriCarousel";

export default async function GallerySection() {
  const hasil = await getGaleri(1);
  // Ambil 6, skip 3 pertama (sudah tampil di hero)
  const items = hasil.data.slice(0, 6);

  if (items.length === 0) return null; // Sembunyikan section jika kosong

  return (
    <section className="w-full overflow-hidden border-b border-gray-100 bg-white py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header ringkas */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-[#b91c1c]">
              Dokumentasi Gerakan
            </p>
            <h2 className="font-serif text-3xl font-extrabold tracking-tight text-gray-950 md:text-4xl">
              Jejak Langkah KMRT
            </h2>
          </div>
          <Link
            href="/galeri"
            className="shrink-0 border-b-2 border-gray-950 pb-1 text-sm font-bold uppercase tracking-wider text-gray-950 transition-colors hover:border-[#b91c1c] hover:text-[#b91c1c]"
          >
            Lihat Semua →
          </Link>
        </div>

        {/* Grid 3 kolom langsung — tanpa carousel, lebih compact */}
        <div className="grid grid-cols-2 gap-1 bg-gray-100 p-1 md:grid-cols-3">
          {items.slice(0, 3).map((item) => (
            <Link
              key={item.id}
              href="/galeri"
              className="group relative aspect-[4/3] overflow-hidden bg-white"
            >
              <Image
                src={item.gambar}
                alt={item.judul}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-gray-950/80 via-transparent to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#b91c1c]">
                  {new Date(item.tanggal).toLocaleDateString("id-ID", {
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <h4 className="font-serif text-sm font-bold leading-snug text-white line-clamp-2">
                  {item.judul}
                </h4>
              </div>
            </Link>
          ))}
        </div>

        {/* Link ke galeri penuh */}
        <div className="mt-8 text-center">
          <Link
            href="/galeri"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-500 transition-colors hover:text-[#b91c1c]"
          >
            Lihat seluruh dokumentasi kegiatan →
          </Link>
        </div>
      </div>
    </section>
  );
}