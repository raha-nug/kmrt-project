import {
  Users,
  UserCircle,
  Briefcase,
  Megaphone,
  ShieldCheck,
  Users2,
  BookOpen,
  Heart,
} from "lucide-react";

const bph = [
  { jabatan: "Presiden", nama: "Ahmad Ripa" },
  { jabatan: "Sekretaris", nama: "Zamzam Nuralam, S.M" },
  { jabatan: "Bendahara", nama: "M Idam Saparudin, S.M" },
];

const divisi = [
  {
    icon: Heart,
    kode: "DPPA",
    nama: "Divisi Pemberdayaan Perempuan dan Perlindungan Anak",
    koordinator: "Risman Hakim",
  },
  {
    icon: Megaphone,
    kode: "DPID",
    nama: "Divisi Pengelolaan Informasi dan Dokumentasi",
    koordinator: "Didin Kumarudin",
  },
  {
    icon: ShieldCheck,
    kode: "DAH",
    nama: "Divisi Advokasi Hukum dan HAM",
    koordinator: "M Taufik Nurhidayat",
  },
  {
    icon: BookOpen,
    kode: "DPP",
    nama: "Divisi Pendidikan dan Pengkaderan",
    koordinator: "Nita Solihah",
  },
  {
    icon: Users2,
    kode: "DPMPP",
    nama: "Divisi Pemberdayaan Masyarakat dan Pelayanan Publik",
    koordinator: "Arizki Fajar Andika",
  },
];

export default function StrukturPage() {
  return (
    <div className="bg-white">
      {/* HERO */}
      <section className="relative bg-gray-950 py-20 text-white md:py-28">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#b91c1c]">
            Struktur Organisasi
          </h2>
          <h1 className="font-serif text-4xl font-extrabold leading-tight md:text-5xl">
            Kepemimpinan Kolektif Kolegial
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
            KMRT bergerak tanpa hierarki absolut. Kami dipimpin secara
            musyawarah dan setara demi menjaga independensi organisasi.
          </p>
          <p className="mx-auto mt-3 text-sm font-semibold uppercase tracking-widest text-[#b91c1c]">
            Periode 2024 – 2026
          </p>
        </div>
      </section>

      {/* BPH */}
      <section className="border-b border-gray-200 bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center bg-[#b91c1c]">
              <Users className="h-7 w-7 text-white" />
            </div>
            <h2 className="font-serif text-3xl font-bold text-gray-950">
              Badan Pengurus Harian
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-gray-500">
              Rotasi dan Mutasi BPH KMRT Periode 2024–2026 berdasarkan Akta
              Notaris No. 30, Mulyadi Siradz, S.H. Tahun 2023.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {bph.map((item) => (
              <div
                key={item.jabatan}
                className="w-full border border-gray-200 bg-white p-8 text-center shadow-sm transition-colors hover:border-[#b91c1c] sm:w-64"
              >
                <UserCircle className="mx-auto mb-4 h-14 w-14 text-gray-300" />
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#b91c1c]">
                  {item.jabatan}
                </p>
                <h3 className="font-serif text-lg font-bold text-gray-950">
                  {item.nama}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIVISI */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="font-serif text-3xl font-bold text-gray-950">
              Divisi Organisasi
            </h2>
            <div className="mx-auto mt-4 h-1 w-16 bg-[#b91c1c]" />
            <p className="mx-auto mt-4 max-w-2xl text-gray-500">
              Pelaksana teknis dan pengawalan isu di lapangan — Periode
              2024–2026.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {divisi.map((div, idx) => {
              const Icon = div.icon;
              const isAccent = idx % 2 === 0;
              return (
                <div
                  key={div.kode}
                  className={`group relative border-t-4 bg-white p-6 shadow-sm transition-shadow hover:shadow-md ${
                    isAccent ? "border-[#b91c1c]" : "border-gray-900"
                  }`}
                >
                  <Icon
                    className={`mb-4 h-8 w-8 transition-colors ${
                      isAccent ? "text-[#b91c1c]" : "text-gray-900"
                    }`}
                  />
                  <p className="mb-1 text-xs font-bold uppercase tracking-widest text-gray-400">
                    {div.kode}
                  </p>
                  <h4 className="mb-5 text-sm font-bold leading-snug text-gray-950">
                    {div.nama}
                  </h4>
                  <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                    <UserCircle className="h-8 w-8 shrink-0 text-gray-300" />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                        Koordinator
                      </p>
                      <p className="text-sm font-bold text-gray-900">
                        {div.koordinator}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
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
