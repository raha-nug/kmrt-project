import Link from "next/link";

export default function GallerySection() {
  const galeriItems = [
    {
      id: 1,
      judul: "Aksi Damai Anti-Korupsi 2024",
      gambar:
        "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 2,
      judul: "Audiensi dengan Kejaksaan Negeri Tasikmalaya",
      gambar:
        "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 3,
      judul: "Pelatihan Kader Anti-Korupsi Angkatan IV",
      gambar:
        "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
  ];

  return (
    <section className="w-full overflow-hidden border-b border-gray-100 bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#b91c1c]">
            Dokumentasi Gerakan
          </p>
          <h2 className="font-serif text-4xl font-extrabold tracking-tight text-gray-950 md:text-5xl">
            Jejak Langkah KMRT
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-1 bg-gray-100 p-1 shadow-inner md:grid-cols-3">
          {galeriItems.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-[4/3] overflow-hidden bg-white"
            >
              <img
                src={item.gambar}
                alt={item.judul}
                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:blur-sm"
              />

              {/* Overlay Informasi (Tampil saat hover) */}
              <div className="absolute inset-0 flex flex-col justify-end bg-gray-950/80 p-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="mb-2 w-max border-b border-[#b91c1c] text-xs font-bold uppercase tracking-widest text-[#b91c1c]">
                  Aktivitas
                </span>
                <h4 className="font-serifleading-snug text-lg font-bold text-white">
                  {item.judul}
                </h4>
              </div>

              {/* Border Aksen Halus */}
              <div className="absolute inset-0 border border-transparent transition-colors group-hover:border-[#b91c1c]/20"></div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/galeri"
            className="border-b-2 border-gray-950 pb-2 text-sm font-bold uppercase tracking-wider text-gray-950 transition-colors hover:border-[#b91c1c] hover:text-[#b91c1c]"
          >
            Lihat Galeri Lengkap
          </Link>
        </div>
      </div>
    </section>
  );
}
