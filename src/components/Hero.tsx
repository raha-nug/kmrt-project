import Image from "next/image";
import Link from "next/link";
import { getGaleri } from "@/app/dashboard/(home)/galeri/actions";
import HeroSlideshow from "@/components/ui-elements/HeroSlideshow";

export default async function Hero() {
  const hasil = await getGaleri(1);
  const fotoHero = hasil.data.slice(0, 3);

  return (
    <section className="relative w-full overflow-hidden border-b border-gray-800 bg-[#0a0a0a] py-20 text-white md:py-28">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-stretch gap-10 md:flex-row md:gap-16">
          {/* ── KIRI: Teks ── */}
          <div className="flex w-full flex-col justify-center md:w-3/5">
            {/* Badge */}
            <div className="mb-8 inline-flex w-fit items-center gap-3 rounded-full border border-gray-800 bg-white/5 px-4 py-1.5">
              <div className="h-2 w-2 animate-pulse rounded-full bg-[#b91c1c]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                Koalisi Mahasiswa & Rakyat Tasikmalaya · Est. 2004
              </span>
            </div>

            {/* Aksen garis */}
            <div className="mb-5 h-0.5 w-10 bg-[#b91c1c]" />

            {/* Heading */}
            <h1 className="mb-5 font-serif text-4xl font-extrabold leading-tight tracking-tight text-white md:text-6xl">
              Tegakkan <span className="text-[#b91c1c]">Keadilan</span>.<br />
              Lawan Korupsi.
            </h1>

            {/* Pull-quote */}
            <blockquote className="mb-6 border-l-2 border-[#b91c1c] pl-4 text-sm italic text-gray-500">
              &ldquo;Lihat, Dengar, Rasakan, dan Lakukan!&rdquo;
            </blockquote>

            {/* Deskripsi */}
            <p className="mb-8 max-w-lg text-base font-light leading-relaxed text-gray-400">
              KMRT berdiri sebagai benteng independen melawan praktik korupsi di
              Tasikmalaya. Bergerak dengan integritas untuk mewujudkan tata
              kelola pemerintahan yang bersih dan transparan.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/pengaduan"
                className="bg-[#b91c1c] px-8 py-4 text-center text-sm font-bold uppercase tracking-widest text-white shadow-2xl transition-colors hover:bg-[#991b1b]"
              >
                Laporkan Ketidakadilan
              </Link>
              <Link
                href="/tentang"
                className="border border-gray-700 px-8 py-4 text-center text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-white/5"
              >
                Profil Organisasi
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-10 flex gap-8 border-t border-gray-800 pt-8">
              {[
                { num: "20+", label: "Tahun Bergerak" },
                { num: "50+", label: "Kasus Advokasi" },
                { num: "1K+", label: "Anggota Aktif" },
              ].map((s) => (
                <div key={s.label} className="border-l-2 border-[#b91c1c] pl-3">
                  <div className="font-serif text-2xl font-bold text-white">
                    {s.num}
                  </div>
                  <div className="mt-0.5 text-xs uppercase tracking-widest text-gray-600">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Scroll hint */}
            <div className="mt-8 flex items-center gap-2 text-xs uppercase tracking-widest text-gray-700">
              <svg
                className="h-4 w-4 animate-bounce"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
              Gulir ke bawah
            </div>
          </div>

          {/* ── KANAN: Foto Slideshow ── */}
          <div className="w-full md:w-2/5">
            <HeroSlideshow items={fotoHero} />
          </div>
        </div>
      </div>
    </section>
  );
}
