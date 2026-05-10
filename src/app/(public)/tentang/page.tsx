import {
  Target,
  Users,
  ShieldCheck,
  Scale,
  Search,
  BookOpen,
  Megaphone,
} from "lucide-react";

export default function TentangKami() {
  return (
    <div className="bg-white">
      {/* --- HERO SECTION --- */}
      <section className="relative bg-gray-950 py-20 text-white md:py-32">
        {/* Pattern Background (Opsional) */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#b91c1c]">
              Profil Organisasi
            </h2>
            <h1 className="font-serif text-4xl font-extrabold leading-tight md:text-6xl">
              Lihat, Dengar, Rasakan, <br />
              dan Lakukan!
            </h1>
            <p className="mt-6 text-lg text-gray-400">
              Gerakan sosial anti-korupsi demi mewujudkan Tata Kelola
              Pemerintahan yang Baik (Good Governance) di Tasikmalaya.
            </p>
          </div>
        </div>
      </section>

      {/* --- SEJARAH & LATAR BELAKANG --- */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-16 md:grid-cols-2">
            <div>
              <h3 className="mb-6 font-serif text-3xl font-bold text-gray-950">
                Lahirnya KMRT
              </h3>
              <div className="space-y-4 text-lg leading-relaxed text-gray-600">
                <p>
                  <strong className="text-gray-900">
                    Koalisi Mahasiswa & Rakyat Tasikmalaya (KMRT)
                  </strong>{" "}
                  adalah organisasi perkumpulan non-pemerintah yang didirikan
                  pada tanggal <strong>09 Desember 2004</strong> oleh sejumlah
                  mahasiswa di Tasikmalaya.
                </p>
                <p>
                  Lahir di tengah stagnasi semangat reformasi 1998, KMRT hadir
                  sebagai respons atas maraknya praktik korupsi di sektor
                  legislatif dan eksekutif. Korupsi telah mendistorsi kebijakan
                  publik yang berujung pada buruknya kualitas layanan publik,
                  kemiskinan, dan ketidakberdayaan rakyat.
                </p>
                <p>
                  Kami meyakini bahwa transparansi dan partisipasi publik adalah
                  kunci untuk memberantas akar dari praktik culas penyelenggara
                  negara.
                </p>
              </div>
            </div>

            <div className="border-l-4 border-[#b91c1c] bg-gray-50 p-8 shadow-sm">
              <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-gray-900">
                Prinsip Pergerakan
              </h4>
              <ul className="space-y-4">
                {[
                  "Bebas dari pengaruh dan kepentingan partai politik.",
                  "Bertindak objektif dalam menghadapi pejabat negara atau kelompok tertentu.",
                  "Menolak segala tindakan untuk keuntungan finansial pribadi.",
                  "Transparan dan bertanggung jawab atas setiap keputusan yang diambil.",
                  "Anti-diskriminasi baik berdasarkan agama, ras, maupun golongan.",
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-sm text-gray-700 md:text-base"
                  >
                    <ShieldCheck className="h-6 w-6 shrink-0 text-[#b91c1c]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- VISI & MISI --- */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="font-serif text-4xl font-bold text-gray-950">
              Visi & Misi
            </h2>
            <div className="mx-auto mt-4 h-1.5 w-20 bg-[#b91c1c]"></div>
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div className="flex flex-col justify-center border border-gray-100 bg-white p-10 text-center shadow-sm">
              <Target className="mx-auto mb-6 h-16 w-16 text-[#b91c1c]" />
              <h3 className="mb-4 font-serif text-2xl font-bold">Visi Utama</h3>
              <p className="text-lg leading-relaxed text-gray-600">
                Mewujudkan <em>Good Governance</em> dan memperluas partisipasi
                publik di Tasikmalaya untuk menciptakan masyarakat yang adil,
                makmur, dan bebas korupsi.
              </p>
            </div>

            <div className="border border-gray-100 bg-white p-10 shadow-sm">
              <Scale className="mb-6 h-12 w-12 text-[#b91c1c]" />
              <h3 className="mb-4 font-serif text-2xl font-bold">
                Misi Perjuangan
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex gap-3">
                  <strong className="text-[#b91c1c]">1.</strong> Berperan aktif
                  dalam pemberantasan korupsi di daerah.
                </li>
                <li className="flex gap-3">
                  <strong className="text-[#b91c1c]">2.</strong> Menegakkan
                  supremasi hukum yang seadil-adilnya.
                </li>
                <li className="flex gap-3">
                  <strong className="text-[#b91c1c]">3.</strong> Membela Hak
                  Asasi Manusia (HAM) dan mendorong kesetaraan gender.
                </li>
                <li className="flex gap-3">
                  <strong className="text-[#b91c1c]">4.</strong> Menjadi{" "}
                  <em>Social Control</em> bagi pemerintah daerah dan aparatur
                  negara.
                </li>
                <li className="flex gap-3">
                  <strong className="text-[#b91c1c]">5.</strong> Memfasilitasi
                  akses pelayanan umum bagi masyarakat miskin melalui advokasi
                  kebijakan publik.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- STRUKTUR & DIVISI --- */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="font-serif text-3xl font-bold text-gray-950">
              Divisi Organisasi
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              KMRT berbentuk presidium yang bersifat kolektif kolegial. Untuk
              memaksimalkan fungsi pengawasan dan pemberdayaan, KMRT dibagi ke
              dalam 4 divisi strategis:
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Divisi 1 */}
            <div className="group border border-gray-200 p-6 transition-all hover:border-[#b91c1c] hover:shadow-lg">
              <Megaphone className="mb-4 h-10 w-10 text-gray-400 group-hover:text-[#b91c1c]" />
              <h4 className="mb-2 font-bold text-gray-950">DPID</h4>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#b91c1c]">
                Divisi Pengelolaan Informasi & Dokumentasi
              </p>
              <p className="text-sm text-gray-600">
                Mengelola pusat informasi, kampanye digital, serta dokumentasi
                seluruh kegiatan dan hasil investigasi koalisi.
              </p>
            </div>

            {/* Divisi 2 */}
            <div className="group border border-gray-200 p-6 transition-all hover:border-[#b91c1c] hover:shadow-lg">
              <Search className="mb-4 h-10 w-10 text-gray-400 group-hover:text-[#b91c1c]" />
              <h4 className="mb-2 font-bold text-gray-950">DMHKPP</h4>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#b91c1c]">
                Divisi Monitoring Hukum Korupsi & Pelayanan Publik
              </p>
              <p className="text-sm text-gray-600">
                Melakukan sosialisasi, advokasi litigasi maupun non-litigasi,
                serta mengawasi kualitas pelayanan birokrasi.
              </p>
            </div>

            {/* Divisi 3 */}
            <div className="group border border-gray-200 p-6 transition-all hover:border-[#b91c1c] hover:shadow-lg">
              <Users className="mb-4 h-10 w-10 text-gray-400 group-hover:text-[#b91c1c]" />
              <h4 className="mb-2 font-bold text-gray-950">DPMPSDM</h4>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#b91c1c]">
                Divisi Pemberdayaan Masyarakat & SDM
              </p>
              <p className="text-sm text-gray-600">
                Mendorong perencanaan partisipatif (seperti APBS/RKAS) dan
                mengorganisir pemberdayaan masyarakat di tingkat lokal.
              </p>
            </div>

            {/* Divisi 4 */}
            <div className="group border border-gray-200 p-6 transition-all hover:border-[#b91c1c] hover:shadow-lg">
              <BookOpen className="mb-4 h-10 w-10 text-gray-400 group-hover:text-[#b91c1c]" />
              <h4 className="mb-2 font-bold text-gray-950">DPP</h4>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#b91c1c]">
                Divisi Pendidikan & Pengkaderan
              </p>
              <p className="text-sm text-gray-600">
                Menjaga napas pergerakan melalui pendidikan anti-korupsi serta
                rekrutmen kader-kader muda progresif.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA PENGADUAN --- */}
      <section className="bg-[#b91c1c] py-16 text-center text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-4 font-serif text-3xl font-bold">
            Temukan Indikasi Korupsi atau Pelayanan Buruk?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-red-100">
            KMRT menyediakan layanan advokasi, investigasi, dan KMRT Complain
            Center (Pusat Pengaduan). Identitas pelapor kami lindungi secara
            penuh.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="/pengaduan"
              className="bg-gray-950 px-8 py-4 font-bold uppercase tracking-widest shadow-xl transition-all hover:bg-white hover:text-gray-950"
            >
              Lapor KMRT Center
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
