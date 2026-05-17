import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-[#0a0a0a] py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Kolom 1: Otoritas Organisasi */}
          <div className="space-y-4 md:col-span-2">
            <h3 className="font-seriftracking-tight text-2xl font-bold text-white">
              KMRT
            </h3>
            <p className="max-w-md text-sm font-light leading-relaxed text-gray-400">
              KOALISI MAHASISWA & RAKYAT TASIKMALAYA.
              <br />
              Berdiri sejak 2004 untuk mengawal transparansi, menuntut
              akuntabilitas, dan memberantas korupsi demi tatanan masyarakat
              yang adil.
            </p>
            <p className="text-sm font-semibold italic tracking-wide text-[#b91c1c]">
              Lihat, Dengar, Rasakan, dan Lakukan!
            </p>
          </div>

          {/* Kolom 2: Kontak Sekretariat */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Sekretariat
            </h4>
            <p className="text-sm font-light leading-relaxed text-gray-400">
              Komplek Perumahan Rancabungur Blok.E No.2 RT.003 RW.003 Desa
              Cilampunghilir <br />
              Kec.Padakembang Kab.Tasikmalaya 46466
              <br /> Jawa Barat, 46466
            </p>
          </div>

          {/* Kolom 3: Navigasi Otoritatif */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Tautan
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link
                  href="/pengaduan"
                  className="transition-colors hover:text-[#b91c1c]"
                >
                  Pusat Pengaduan Kejahatan
                </Link>
              </li>
              <li>
                <Link
                  href="/berita"
                  className="transition-colors hover:text-[#b91c1c]"
                >
                  Kabar Perjuangan
                </Link>
              </li>
              <li>
                <Link
                  href="/tentang"
                  className="transition-colors hover:text-[#b91c1c]"
                >
                  Profil Organisasi
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright & Aksen */}
        <div className="mt-16 border-t border-gray-800 pt-8 text-center text-xs tracking-wider text-gray-600">
          <p>
            &copy; {new Date().getFullYear()} Koalisi Mahasiswa & Rakyat
            Tasikmalaya. All rights reserved.
          </p>
          <p className="mt-1">Lihat, Dengar, Rasakan, dan Lakukan!</p>
        </div>
      </div>
    </footer>
  );
}
