import Image from "next/image";
import Link from "next/link";

export default function NewsGrid() {
  const headline = {
    kategori: "INVESTIGASI",
    judul:
      "KMRT Serahkan Bukti Baru Kasus Dugaan Korupsi Dana Desa ke Kejaksaan",
    ringkasan:
      "Tim investigasi KMRT resmi menyerahkan dokumen tambahan terkait dugaan penyelewengan dana desa senilai miliaran rupiah. Kasus ini melibatkan beberapa pejabat desa di wilayah Kabupaten Tasikmalaya.",
    tanggal: "15 Januari 2025",
    slug: "kmrt-serahkan-bukti-baru-korupsi-dana-desa",
    gambar:
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  };

  const sideNews = [
    {
      id: 1,
      kategori: "ADVOKASI",
      judul:
        "KMRT Dampingi Warga Tuntut Transparansi Proyek Infrastruktur Jalan",
      tanggal: "03 Januari 2025",
      slug: "kmrt-dampingi-warga-transparansi-proyek",
    },
    {
      id: 2,
      kategori: "PENDIDIKAN",
      judul: "Pelatihan Kader Anti-Korupsi Angkatan V Resmi Dibuka",
      tanggal: "20 Desember 2024",
      slug: "pelatihan-kader-anti-korupsi-v",
    },
  ];

  return (
    <section className="w-full border-b border-gray-100 bg-[#fcfbf9] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 flex items-center justify-between border-b-2 border-gray-950 pb-4">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#b91c1c]">
              Suara Perjuangan
            </p>
            <h2 className="font-serif text-4xl font-extrabold tracking-tight text-gray-950 md:text-5xl">
              Kabar & Informasi
            </h2>
          </div>
          <Link
            href="/berita"
            className="hidden text-sm font-bold uppercase tracking-wider text-gray-950 hover:text-[#b91c1c] sm:block"
          >
            Lihat Semua Berita &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Berita Utama (Kiri) */}
          <div className="group flex flex-col overflow-hidden border border-gray-100 bg-white transition-all duration-300 hover:border-gray-200 hover:shadow-2xl lg:col-span-7">
            <div className="relative h-72 w-full overflow-hidden sm:h-96">
              <Image
                src={headline.gambar}
                alt={headline.judul}
                height={100}
                width={100}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/10"></div>
            </div>
            <div className="flex flex-grow flex-col p-8 md:p-10">
              <span className="mb-5 w-max border-b border-[#b91c1c] pb-1 text-xs font-bold uppercase tracking-widest text-[#b91c1c]">
                {headline.kategori}
              </span>

              <Link href={`/berita/${headline.slug}`} className="group">
                <h3 className="font-seriftracking-tight mb-5 text-3xl font-bold leading-tight text-gray-950 transition-colors group-hover:text-[#b91c1c] md:text-4xl">
                  {headline.judul}
                </h3>
              </Link>

              <p className="mb-8 line-clamp-3 font-light leading-relaxed text-gray-700">
                {headline.ringkasan}
              </p>

              <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-5 text-sm text-gray-400">
                <span>{headline.tanggal}</span>
                <Link
                  href={`/berita/${headline.slug}`}
                  className="text-sm font-bold uppercase tracking-widest text-[#b91c1c] hover:underline"
                >
                  Baca Selengkapnya
                </Link>
              </div>
            </div>
          </div>

          {/* Berita Samping (Kanan) */}
          <div className="space-y-6 lg:col-span-5">
            {sideNews.map((news) => (
              <div
                key={news.id}
                className="group flex cursor-pointer gap-6 border border-gray-100 bg-white p-6 transition-all hover:border-gray-200 hover:shadow-xl"
              >
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-sm bg-gray-950 font-bold text-white transition-colors group-hover:bg-[#b91c1c]">
                  {news.kategori.substring(0, 1)}
                </div>
                <div>
                  <span className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-[#b91c1c]">
                    {news.kategori}
                  </span>
                  <Link href={`/berita/${news.slug}`}>
                    <h4 className="mb-2 line-clamp-2 font-serif text-base font-bold leading-snug text-gray-950 transition-colors group-hover:text-[#b91c1c]">
                      {news.judul}
                    </h4>
                  </Link>
                  <p className="text-xs uppercase text-gray-400">
                    {news.tanggal}
                  </p>
                </div>
              </div>
            ))}
            <div className="mt-8 text-center sm:hidden">
              <Link
                href="/berita"
                className="inline-block rounded-sm border-2 border-gray-950 bg-white px-6 py-3 text-xs font-semibold uppercase tracking-widest text-gray-950 transition-colors hover:bg-gray-950 hover:text-white"
              >
                Lihat Semua Berita
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
