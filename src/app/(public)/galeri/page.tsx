import Image from "next/image";
import { Camera, Calendar } from "lucide-react";
import { getGaleri } from "@/app/dashboard/(home)/galeri/actions";

interface FotoGaleri {
  id: string;
  judul: string;
  gambar: string;
  tanggal: Date | string;
  createdAt: Date | string;
}

export default async function GaleriPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params?.page ?? 1);

  // Mengambil data galeri dari database
  const hasil = await getGaleri(page);

  return (
    <div className="min-h-screen bg-white">
      {/* --- HERO SECTION --- */}
      <section className="relative bg-gray-950 py-20 text-white md:py-28">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#b91c1c] shadow-lg">
            <Camera className="h-8 w-8 text-white" />
          </div>

          <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#b91c1c]">
            Dokumentasi Pergerakan
          </h2>

          <h1 className="font-serif text-4xl font-extrabold leading-tight md:text-5xl">
            Galeri KMRT
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
            Rekam jejak perjuangan, aksi massa, audiensi, dan advokasi Koalisi
            Mahasiswa & Rakyat Tasikmalaya di lapangan.
          </p>
        </div>
      </section>

      {/* --- GALLERY GRID SECTION --- */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Grid Foto */}
          {hasil.data.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {hasil.data.map((foto: FotoGaleri) => (
                <div
                  key={foto.id}
                  className="group flex flex-col overflow-hidden border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl"
                >
                  {/* Image Container */}
                  <div className="relative h-64 w-full overflow-hidden bg-gray-100">
                    <Image
                      src={foto.gambar}
                      alt={foto.judul}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Overlay merah saat hover */}
                    <div className="absolute inset-0 bg-[#b91c1c]/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  </div>

                  {/* Detail Text */}
                  <div className="border-t-4 border-transparent p-5 transition-colors group-hover:border-[#b91c1c]">
                    <h3 className="mb-2 line-clamp-2 text-lg font-bold text-gray-900">
                      {foto.judul}
                    </h3>

                    <div className="flex items-center text-xs font-semibold uppercase tracking-widest text-gray-500">
                      <Calendar className="mr-2 h-4 w-4 text-[#b91c1c]" />

                      {new Date(foto.tanggal).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State jika tidak ada foto */
            <div className="border border-dashed border-gray-300 bg-gray-50 py-20 text-center">
              <Camera className="mx-auto mb-4 h-12 w-12 text-gray-300" />

              <h3 className="text-xl font-bold text-gray-900">
                Belum Ada Dokumentasi
              </h3>

              <p className="mt-2 text-gray-500">
                Foto-foto kegiatan KMRT akan segera diperbarui.
              </p>
            </div>
          )}

          {/* --- PAGINATION --- */}
          {hasil.last_page > 1 && (
            <div className="mt-16 flex justify-center gap-2">
              {Array.from({ length: hasil.last_page }, (_, i) => i + 1).map(
                (pageNum) => (
                  <a
                    key={pageNum}
                    href={`/galeri?page=${pageNum}`}
                    className={`flex h-10 w-10 items-center justify-center font-bold transition-colors ${
                      pageNum === hasil.current_page
                        ? "bg-[#b91c1c] text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {pageNum}
                  </a>
                ),
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
