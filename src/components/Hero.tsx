import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden border-b border-gray-800 bg-[#0a0a0a] py-24 text-white md:py-32">
      {/* Ilustrasi Latar Belakang Halus (Simbol Timbangan Keadilan Abstrak) */}
      <div className="absolute inset-0 z-0 opacity-[0.03]">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            d="M50 10 L90 90 L10 90 Z"
            fill="none"
            stroke="white"
            strokeWidth="0.5"
          />
          <circle cx="50" cy="40" r="3" fill="white" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-16 md:flex-row">
          {/* Kiri: Teks Otoritatif */}
          <div className="flex w-full flex-col items-start text-left md:w-3/5">
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-gray-800 bg-white/5 px-4 py-1.5">
              <div className="h-2 w-2 animate-pulse rounded-full bg-[#b91c1c]"></div>
              <span className="text-xs font-semibold uppercase tracking-widest text-gray-300">
                Koalisi Mahasiswa & Rakyat Tasikmalaya · Est. 2004
              </span>
            </div>

            <h1 className="mb-8 font-serif text-5xl font-extrabold leading-tight tracking-tighter text-white md:text-7xl">
              Tegakkan <span className="text-[#b91c1c]">Keadilan</span>.<br />
              Lawan Korupsi.
            </h1>

            <p className="mb-12 max-w-xl text-xl font-light leading-relaxed text-gray-300 opacity-90">
              KMRT berdiri sebagai benteng independen melawan praktik korupsi di
              Tasikmalaya. Kami bergerak dengan integritas untuk mewujudkan tata
              kelola pemerintahan yang bersih dan transparans.
            </p>

            <div className="flex w-full flex-col gap-5 sm:w-auto sm:flex-row">
              <Link
                href="/pengaduan"
                className="rounded-sm bg-[#b91c1c] px-8 py-4 text-center text-sm font-bold uppercase tracking-widest text-white shadow-2xl transition-colors hover:bg-[#991b1b]"
              >
                Laporkan Kejahatan
              </Link>
              <Link
                href="/tentang"
                className="rounded-sm border border-gray-700 bg-transparent px-8 py-4 text-center text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-white/5"
              >
                Profil Organisasi
              </Link>
            </div>
          </div>

          {/* Kanan: Ilustrasi Mewah (Contoh Placeholder untuk Ilustrasi Vektor Elegan) */}
          <div className="w-full md:w-2/5">
            <div className="group relative flex aspect-[3/4] w-full items-center justify-center overflow-hidden rounded-sm border border-gray-800 bg-[#111] p-8 shadow-2xl">
              {/* Efek Cahaya Halus */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#b91c1c]/20 to-transparent opacity-30 blur-2xl transition-opacity group-hover:opacity-50"></div>

              <div className="relative z-10 text-center">
                {/* Placeholder Ilustrasi: Gunakan SVG Vektor Pedang/Timbangan yang bersih */}
                <svg
                  className="mx-auto mb-6 h-24 w-24 text-gray-700 transition-colors duration-500 group-hover:text-[#b91c1c]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <h3 className="mb-4 font-serif text-3xl font-bold italic text-white">
                  "Lihat, Dengar, Rasakan, dan Lakukan!"
                </h3>
                <p className="text-sm font-light leading-relaxed text-gray-400">
                  Motto perjuangan KMRT untuk transparansi dan keadilan.
                </p>
              </div>

              {/* Garis Aksen Halus */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#b91c1c]"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
