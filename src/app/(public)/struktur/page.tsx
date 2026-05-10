import {
  Users,
  UserCircle,
  Briefcase,
  Megaphone,
  Search,
  Users2,
  BookOpen,
} from "lucide-react";

export default function StrukturPage() {
  return (
    <div className="bg-white">
      {/* --- HERO SECTION --- */}
      <section className="relative bg-gray-950 py-20 text-white md:py-28">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#b91c1c]">
            Struktur Organisasi
          </h2>
          <h1 className="font-serif text-4xl font-extrabold leading-tight md:text-5xl">
            Kepemimpinan Kolektif Kolegial
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
            KMRT bergerak tanpa hierarki absolut. Kami dipimpin oleh Dewan
            Presidium yang mengambil keputusan secara musyawarah dan setara demi
            menjaga independensi organisasi.
          </p>
        </div>
      </section>

      {/* --- DEWAN PRESIDIUM --- */}
      <section className="border-b border-gray-200 bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#b91c1c] shadow-lg">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h2 className="font-serif text-3xl font-bold text-gray-950">
              Dewan Presidium
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Pemegang mandat tertinggi dalam organisasi yang berfungsi sebagai
              penentu arah kebijakan dan strategi pergerakan KMRT.
            </p>
          </div>

          {/* Contoh 3 Presidium (Bisa disesuaikan jumlahnya) */}
          <div className="flex flex-wrap justify-center gap-8">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="w-full border border-gray-200 bg-white p-6 text-center shadow-sm transition-colors hover:border-[#b91c1c] sm:w-64"
              >
                <UserCircle className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                <h3 className="text-lg font-bold text-gray-950">
                  Nama Presidium {item}
                </h3>
                <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-[#b91c1c]">
                  Anggota Presidium
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SEKRETARIAT JENDRAL --- */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-center gap-8 md:flex-row">
            <div className="relative w-full overflow-hidden bg-gray-950 p-6 text-center text-white shadow-lg md:w-80">
              <div className="absolute -right-4 -top-4 opacity-10">
                <Briefcase className="h-32 w-32" />
              </div>
              <h3 className="relative z-10 mb-1 text-xl font-bold">
                Sekretaris Jenderal
              </h3>
              <p className="relative z-10 mb-6 text-sm text-gray-400">
                Pusat Administrasi & Manajerial
              </p>
              <div className="relative z-10 bg-white/10 p-3">
                <p className="font-semibold text-white">Nama Sekjen</p>
              </div>
            </div>

            <div className="relative w-full overflow-hidden bg-gray-950 p-6 text-center text-white shadow-lg md:w-80">
              <div className="absolute -right-4 -top-4 opacity-10">
                <Briefcase className="h-32 w-32" />
              </div>
              <h3 className="relative z-10 mb-1 text-xl font-bold">
                Bendahara Umum
              </h3>
              <p className="relative z-10 mb-6 text-sm text-gray-400">
                Pengelolaan Logistik & Keuangan
              </p>
              <div className="relative z-10 bg-white/10 p-3">
                <p className="font-semibold text-white">Nama Bendahara</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- KOORDINATOR DIVISI --- */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="font-serif text-3xl font-bold text-gray-950">
              Bidang & Divisi
            </h2>
            <div className="mx-auto mt-4 h-1 w-16 bg-[#b91c1c]"></div>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Pelaksana teknis operasional dan pengawalan isu di lapangan.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* DPID */}
            <div className="relative border-t-4 border-[#b91c1c] bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <Megaphone className="mb-4 h-8 w-8 text-[#b91c1c]" />
              <h4 className="mb-1 text-lg font-bold text-gray-950">
                Koord. DPID
              </h4>
              <p className="mb-6 line-clamp-2 text-xs text-gray-500">
                Pengelolaan Informasi & Dokumentasi
              </p>
              <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                <UserCircle className="h-8 w-8 text-gray-400" />
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    Nama Koordinator
                  </p>
                </div>
              </div>
            </div>

            {/* DMHKPP */}
            <div className="relative border-t-4 border-gray-900 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <Search className="mb-4 h-8 w-8 text-gray-900" />
              <h4 className="mb-1 text-lg font-bold text-gray-950">
                Koord. DMHKPP
              </h4>
              <p className="mb-6 line-clamp-2 text-xs text-gray-500">
                Monitoring Hukum & Pelayanan Publik
              </p>
              <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                <UserCircle className="h-8 w-8 text-gray-400" />
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    Nama Koordinator
                  </p>
                </div>
              </div>
            </div>

            {/* DPMPSDM */}
            <div className="relative border-t-4 border-[#b91c1c] bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <Users2 className="mb-4 h-8 w-8 text-[#b91c1c]" />
              <h4 className="mb-1 text-lg font-bold text-gray-950">
                Koord. DPMPSDM
              </h4>
              <p className="mb-6 line-clamp-2 text-xs text-gray-500">
                Pemberdayaan Masyarakat & SDM
              </p>
              <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                <UserCircle className="h-8 w-8 text-gray-400" />
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    Nama Koordinator
                  </p>
                </div>
              </div>
            </div>

            {/* DPP */}
            <div className="relative border-t-4 border-gray-900 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <BookOpen className="mb-4 h-8 w-8 text-gray-900" />
              <h4 className="mb-1 text-lg font-bold text-gray-950">
                Koord. DPP
              </h4>
              <p className="mb-6 line-clamp-2 text-xs text-gray-500">
                Pendidikan & Pengkaderan
              </p>
              <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                <UserCircle className="h-8 w-8 text-gray-400" />
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    Nama Koordinator
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CALL TO ACTION BERGABUNG --- */}
      <section className="border-t border-gray-200 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold text-gray-950">
            Ingin Menjadi Bagian dari KMRT?
          </h2>
          <p className="mb-8 text-gray-600">
            Kami membuka pintu selebar-lebarnya bagi pemuda, mahasiswa, dan
            masyarakat Tasikmalaya yang memiliki integritas dan semangat
            anti-korupsi untuk bergabung dalam barisan perjuangan kami.
          </p>
          <a
            href="/kontak"
            className="inline-block bg-[#b91c1c] px-8 py-3 font-bold uppercase tracking-widest text-white shadow-lg transition-colors hover:bg-gray-950"
          >
            Hubungi KMRT
          </a>
        </div>
      </section>
    </div>
  );
}
