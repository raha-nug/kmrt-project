import {
  Target,
  Users,
  ShieldCheck,
  Scale,
  Search,
  BookOpen,
  Megaphone,
  Heart,
  Mail,
  MapPin,
  Facebook,
  Instagram,
} from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────
const prinsip = [
  {
    no: "01",
    judul: "Integritas",
    poin: [
      "Tidak pernah melakukan kejahatan pidana, politik, ekonomi, dan hak asasi manusia.",
      "Tidak pernah membela atau melindungi koruptor.",
      "Tidak menempatkan diri di bawah kepentingan finansial dari pihak luar yang dapat mempengaruhi visi dan misi KMRT.",
    ],
  },
  {
    no: "02",
    judul: "Pertanggungjawaban",
    poin: [
      "Bertanggung jawab atas keputusan dan tindakan kepada rakyat.",
      "Tunduk pada pemeriksaan publik atas seluruh aktivitas KMRT.",
    ],
  },
  {
    no: "03",
    judul: "Independen",
    poin: [
      "Bebas dari pengaruh dan kepentingan partai politik tertentu.",
      "Bertindak objektif dalam menghadapi pejabat negara atau kelompok kepentingan.",
      "Tidak membuat keputusan untuk memperoleh keuntungan finansial pribadi.",
    ],
  },
  {
    no: "04",
    judul: "Keterbukaan",
    poin: [
      "Terbuka selebar-lebarnya mengenai semua keputusan dan tindakan yang diambil.",
      "Dapat memberikan alasan atas setiap keputusan dan tindakan.",
    ],
  },
  {
    no: "05",
    judul: "Anti-Diskriminasi",
    poin: [
      "Tidak melakukan diskriminasi berdasarkan agama, ras, atau golongan dalam menjalankan tugas.",
    ],
  },
  {
    no: "06",
    judul: "Objektivitas",
    poin: [
      "Setiap keputusan dan tindakan semata-mata berdasarkan pertimbangan kebenaran dan keadilan.",
    ],
  },
  {
    no: "07",
    judul: "Kejujuran",
    poin: [
      "Membeberkan setiap kepentingan pribadi yang berhubungan dengan kewajiban.",
      "Mengambil langkah untuk mengatasi benturan kepentingan yang mungkin timbul.",
    ],
  },
  {
    no: "08",
    judul: "Kepemimpinan",
    poin: [
      "Mendorong dan mendukung pemberantasan korupsi melalui sikap keteladanan.",
    ],
  },
  {
    no: "09",
    judul: "Kerahasiaan",
    poin: [
      "Wajib menyimpan kerahasiaan informasi yang diperoleh dalam menjalankan tugas, terutama terhadap saksi dan pelapor.",
    ],
  },
];

const misi = [
  "Berperan aktif dalam pemberantasan korupsi",
  "Berperan aktif dalam penegakan supremasi hukum",
  "Berperan aktif dalam pembelaan HAM",
  "Berperan aktif dalam kesetaraan gender",
  "Menjadi kontrol sosial bagi pemerintah atau aparatur penyelenggara negara",
  "Peningkatan ekonomi organisasi",
];

const peran = [
  "Memfasilitasi penyadaran dan pengorganisasian rakyat di bidang hak-hak warga negara di Tasikmalaya.",
  "Memfasilitasi penguatan kapasitas rakyat dalam proses pengambilan dan pengawasan kebijakan publik.",
  "Mendorong inisiatif rakyat untuk membongkar kasus korupsi dan melaporkan pelakunya kepada aparat penegak hukum.",
  "Mendorong partisipasi masyarakat dalam mendukung program pemerintah daerah, legislatif, dan sektor pengawasan.",
  "Memfasilitasi dan mendorong penguatan good governance di Tasikmalaya.",
];

const fungsi = [
  "Melakukan penyelidikan kasus korupsi di Tasikmalaya.",
  "Melakukan advokasi kebijakan publik untuk menjamin akses pelayanan umum bagi masyarakat miskin.",
  "Melakukan advokasi non-litigasi terhadap masyarakat kurang mampu yang terlibat masalah hukum.",
  "Melakukan kampanye gerakan sosial anti korupsi (anti corruption social movement) di Tasikmalaya.",
];

const pengalaman = [
  {
    tahun: "2004 – kini",
    uraian: "Penyelidikan kasus korupsi di eksekutif dan legislatif.",
  },
  {
    tahun: "2004 – kini",
    uraian:
      "Advokasi non-litigasi masyarakat kurang mampu yang terlibat masalah hukum.",
  },
  {
    tahun: "Jan – Sep 2004",
    uraian:
      "Jajak pendapat tentang arah pembangunan yang diinginkan masyarakat bawah di Tasikmalaya.",
  },
  {
    tahun: "2008 – 2010",
    uraian:
      "Penguatan kapasitas masyarakat terpinggirkan melalui program KBMT di Kampung Hanja Bojong Gambir.",
  },
  {
    tahun: "2008",
    uraian:
      "Seminar dan Lokakarya Otonomi Daerah dengan peserta seluruh organisasi kedaerahan di Jawa Barat.",
  },
  {
    tahun: "2009 – 2010",
    uraian:
      "Kerjasama dengan Komisi Yudisial dalam Program Peradilan Bersih dan Monitoring Hakim PN Tasikmalaya.",
  },
  {
    tahun: "2009 – 2010",
    uraian: "Monitoring Kinerja Kejaksaan se-Jawa Barat bersama ICW.",
  },
  {
    tahun: "2011 – 2012",
    uraian:
      "Fasilitator Pelatihan Perencanaan Anggaran Sekolah di Sumba Timur (NTT) dan Kota Muna (Sultra) bersama ICW.",
  },
  {
    tahun: "2011 – 2012",
    uraian:
      "Mendorong APBS partisipatif di 6 sekolah dasar di Tasikmalaya bersama ICW.",
  },
];

const divisi = [
  {
    icon: Megaphone,
    kode: "DPID",
    nama: "Divisi Pengelolaan Informasi & Dokumentasi",
    koordinator: "Yayu Julianti, S.Ak",
    anggota: [
      "Khoerunnida Al-kamil",
      "Rendi Herdianto",
      "Soilhun Nasih",
      "Dedi Fatahillah",
    ],
    deskripsi:
      "Mengelola pusat informasi, kampanye digital, serta dokumentasi seluruh kegiatan dan hasil investigasi koalisi.",
  },
  {
    icon: Search,
    kode: "DMHKPP",
    nama: "Divisi Monitoring Hukum Korupsi & Pelayanan Publik",
    koordinator: "Muhammad Yamin",
    anggota: [
      "M. Rafi Abdillah",
      "Noviyanti",
      "M. Idam Saparudin",
      "Rismawati",
      "Aprilia Savitri",
    ],
    deskripsi:
      "Melakukan sosialisasi, advokasi litigasi maupun non-litigasi, serta mengawasi kualitas pelayanan birokrasi.",
  },
  {
    icon: Users,
    kode: "DPMPSDM",
    nama: "Divisi Pemberdayaan Masyarakat & Pengembangan SDM",
    koordinator: "M. Dede Irfan",
    anggota: [
      "Amin Paridudin, S.Pd",
      "Nita Solihat",
      "Zamzam Nuralam",
      "Nisa Fauziah",
      "Ega",
    ],
    deskripsi:
      "Mendorong perencanaan anggaran partisipatif dan mengorganisir pemberdayaan masyarakat di tingkat lokal.",
  },
  {
    icon: BookOpen,
    kode: "DPP",
    nama: "Divisi Pendidikan & Pengkaderan",
    koordinator: "M. Rafi Faza",
    anggota: [
      "Hagi Sopyan Hidayat, S.M",
      "Indra Maulana",
      "Hani Rijki Nuraeni",
      "Dina Ratna Juwita",
    ],
    deskripsi:
      "Menjaga napas pergerakan melalui pendidikan anti-korupsi serta rekrutmen kader-kader muda progresif.",
  },
  {
    icon: Heart,
    kode: "DPPHAM",
    nama: "Divisi Pemberdayaan Perempuan & Hak Asasi Manusia",
    koordinator: "Nida Nur Cahyani, S.Kep",
    anggota: ["Wita Nurmala, S.Kep", "Sinta Nurhayati", "M. Nur Muslim"],
    deskripsi:
      "Memastikan perspektif gender dan HAM terintegrasi dalam setiap program dan advokasi KMRT.",
  },
];

// ── Komponen ──────────────────────────────────────────────────────────
export default function TentangKami() {
  return (
    <div className="bg-white">
      {/* HERO */}
      <section className="relative bg-gray-950 py-20 text-white md:py-32">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#b91c1c] md:text-base">
              Profil Organisasi
            </h2>
            <h1 className="font-serif text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
              Lihat, Dengar, Rasakan, <br />
              dan Lakukan!
            </h1>
            <p className="mt-6 text-base leading-relaxed text-gray-400 md:text-lg lg:text-xl">
              Gerakan sosial anti-korupsi demi mewujudkan Tata Kelola
              Pemerintahan yang Baik (Good Governance) di Tasikmalaya sejak 09
              Desember 2004.
            </p>
          </div>
        </div>
      </section>

      {/* SEJARAH */}
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <h3 className="mb-6 font-serif text-3xl font-bold text-gray-950 md:text-4xl">
                Lahirnya KMRT
              </h3>
              <div className="space-y-5 text-base leading-relaxed text-gray-600 md:text-lg">
                <p>
                  <strong className="text-gray-900">
                    Koalisi Mahasiswa & Rakyat Tasikmalaya (KMRT)
                  </strong>{" "}
                  adalah organisasi perkumpulan non-pemerintah yang didirikan
                  pada{" "}
                  <strong className="text-gray-900">09 Desember 2004</strong>{" "}
                  oleh sejumlah mahasiswa di Tasikmalaya, di tengah tidak
                  berjalannya semangat reformasi 1998 dengan implikasi semakin
                  maraknya korupsi di sektor legislatif, eksekutif, maupun
                  yudikatif.
                </p>
                <p>
                  KMRT bergerak di Kabupaten dan Kota Tasikmalaya, ikut andil
                  dalam menangani kasus-kasus korupsi — mulai dari melaporkan
                  koruptor ke penegak hukum hingga melakukan pencegahan dengan
                  konsisten mengemban etika integritas anti korupsi. Selain
                  gerakan anti korupsi, KMRT juga aktif di pemberdayaan
                  masyarakat, termasuk membangun sarana pendidikan dan
                  organisasi kepemudaan yang tersebar di Tasikmalaya.
                </p>
                <p>
                  Kami meyakini bahwa pemberantasan korupsi akan berjalan
                  efektif jika ada pelibatan yang luas dari rakyat sebagai
                  kekuatan terbesar. KMRT mengambil posisi bersama rakyat
                  membangun gerakan sosial anti korupsi untuk mengimbangi
                  persekongkolan elit birokrasi, DPRD, dan bisnis.
                </p>
              </div>
            </div>
            <div className="border-l-4 border-[#b91c1c] bg-gray-50 p-8 shadow-sm">
              <h4 className="mb-6 text-base font-bold uppercase tracking-widest text-gray-900">
                Prinsip Singkat Pergerakan
              </h4>
              <ul className="space-y-4">
                {[
                  "Bebas dari pengaruh dan kepentingan partai politik.",
                  "Bertindak objektif dalam menghadapi pejabat negara atau kelompok tertentu.",
                  "Menolak segala tindakan untuk keuntungan finansial pribadi.",
                  "Transparan dan bertanggung jawab atas setiap keputusan yang diambil.",
                  "Anti-diskriminasi berdasarkan agama, ras, maupun golongan.",
                  "Wajib menyimpan kerahasiaan identitas saksi dan pelapor.",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-base text-gray-700"
                  >
                    <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-[#b91c1c]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* VISI & MISI */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="font-serif text-3xl font-bold text-gray-950 md:text-4xl">
              Visi & Misi
            </h2>
            <div className="mx-auto mt-4 h-1.5 w-20 bg-[#b91c1c]" />
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Visi */}
            <div className="flex flex-col items-center border border-gray-100 bg-white p-10 text-center shadow-sm">
              <Target className="mb-6 h-16 w-16 text-[#b91c1c]" />
              <h3 className="mb-4 font-serif text-2xl font-bold md:text-3xl">
                Visi
              </h3>
              <p className="text-base leading-relaxed text-gray-600 md:text-lg">
                Terciptanya tatanan masyarakat yang adil dan beradab
                berlandaskan nilai-nilai kemanusiaan.
              </p>
            </div>
            {/* Misi */}
            <div className="border border-gray-100 bg-white p-10 shadow-sm">
              <Scale className="mb-6 h-14 w-14 text-[#b91c1c]" />
              <h3 className="mb-5 font-serif text-2xl font-bold md:text-3xl">
                Misi
              </h3>
              <ol className="space-y-4">
                {/* Asumsi: array 'misi' sudah didefinisikan sebelumnya */}
                {(typeof misi !== "undefined"
                  ? misi
                  : [
                      "Melakukan pengawasan kebijakan publik.",
                      "Mendorong terciptanya tata kelola pemerintahan yang baik.",
                      "Membangun kesadaran hukum masyarakat.",
                    ]
                ).map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 text-base font-bold text-[#b91c1c]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-base leading-relaxed text-gray-600">
                      {item}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* PERAN & FUNGSI */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="font-serif text-3xl font-bold text-gray-950 md:text-4xl">
              Peran & Fungsi
            </h2>
            <div className="mx-auto mt-4 h-1.5 w-20 bg-[#b91c1c]" />
          </div>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <h4 className="mb-6 border-b border-gray-200 pb-3 text-base font-bold uppercase tracking-widest text-gray-900">
                Peran
              </h4>
              <ul className="space-y-4">
                {(typeof peran !== "undefined"
                  ? peran
                  : ["Peran 1", "Peran 2"]
                ).map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-base leading-relaxed text-gray-600"
                  >
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#b91c1c]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-6 border-b border-gray-200 pb-3 text-base font-bold uppercase tracking-widest text-gray-900">
                Fungsi
              </h4>
              <ul className="space-y-4">
                {(typeof fungsi !== "undefined"
                  ? fungsi
                  : ["Fungsi 1", "Fungsi 2"]
                ).map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-base leading-relaxed text-gray-600"
                  >
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#b91c1c]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PRINSIP LENGKAP */}
      <section className="bg-gray-950 py-24 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="font-serif text-3xl font-bold md:text-4xl">
              9 Prinsip KMRT
            </h2>
            <div className="mx-auto mt-4 h-1.5 w-20 bg-[#b91c1c]" />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(typeof prinsip !== "undefined" ? prinsip : []).map((p) => (
              <div
                key={p.no}
                className="group border border-gray-800 bg-gray-900 p-6 transition-colors hover:border-[#b91c1c]"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="font-serif text-xl font-bold text-white">
                    {p.judul}
                  </h4>
                  <span className="text-sm font-bold text-gray-700 transition-colors group-hover:text-[#b91c1c]">
                    {p.no}
                  </span>
                </div>
                <ul className="space-y-3">
                  {p.poin.map((poin, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-base leading-relaxed text-gray-400"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b91c1c]" />
                      {poin}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STRUKTUR ORGANISASI */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="font-serif text-3xl font-bold text-gray-950 md:text-4xl">
              Struktur Organisasi
            </h2>
            <div className="mx-auto mt-4 h-1.5 w-20 bg-[#b91c1c]" />
            <p className="mx-auto mt-6 max-w-2xl text-base text-gray-600 md:text-lg">
              KMRT berbentuk presidium yang bersifat kolektif kolegial.
            </p>
          </div>

          {/* BPH */}
          <div className="mb-16 flex flex-wrap justify-center gap-6">
            {[
              { jabatan: "Presiden", nama: "Hendar Suhendar" },
              { jabatan: "Sekretaris", nama: "Deden Hidayat" },
              { jabatan: "Bendahara", nama: "Ali Husni Mubarok, S.M" },
            ].map((bph) => (
              <div
                key={bph.jabatan}
                className="min-w-[200px] border border-gray-200 bg-gray-50 px-8 py-6 text-center"
              >
                <p className="text-sm font-bold uppercase tracking-widest text-[#b91c1c]">
                  {bph.jabatan}
                </p>
                <p className="mt-3 font-serif text-lg font-bold text-gray-950 md:text-xl">
                  {bph.nama}
                </p>
              </div>
            ))}
          </div>

          {/* Divisi */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(typeof divisi !== "undefined" ? divisi : []).map((div) => {
              const Icon = div.icon || MapPin; // Fallback icon jika tidak ada
              return (
                <div
                  key={div.kode}
                  className="group border border-gray-200 p-8 transition-all hover:border-[#b91c1c] hover:shadow-lg"
                >
                  <Icon className="mb-5 h-10 w-10 text-gray-400 transition-colors group-hover:text-[#b91c1c]" />
                  <h4 className="mb-2 text-lg font-bold text-gray-950 md:text-xl">
                    {div.kode}
                  </h4>
                  <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#b91c1c]">
                    {div.nama}
                  </p>
                  <p className="mb-6 text-base leading-relaxed text-gray-600">
                    {div.deskripsi}
                  </p>
                  <div className="border-t border-gray-100 pt-5">
                    <p className="mb-2 text-sm font-bold uppercase tracking-wider text-gray-500">
                      Koordinator
                    </p>
                    <p className="mb-4 text-base font-semibold text-gray-800">
                      {div.koordinator}
                    </p>
                    <p className="mb-2 text-sm font-bold uppercase tracking-wider text-gray-500">
                      Tenaga Pendukung
                    </p>
                    <ul className="space-y-1.5">
                      {div.anggota.map((a) => (
                        <li key={a} className="text-base text-gray-600">
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* REKAM JEJAK */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="font-serif text-3xl font-bold text-gray-950 md:text-4xl">
              Rekam Jejak
            </h2>
            <div className="mx-auto mt-4 h-1.5 w-20 bg-[#b91c1c]" />
            <p className="mt-6 text-base text-gray-600 md:text-lg">
              Pengalaman pelaksanaan program sejak berdiri
            </p>
          </div>
          <div className="relative mx-auto max-w-3xl">
            <div className="absolute left-[84px] top-0 h-full w-px bg-gray-300 md:left-[100px]" />
            <div className="space-y-10">
              {(typeof pengalaman !== "undefined" ? pengalaman : []).map(
                (item, i) => (
                  <div key={i} className="flex items-start gap-6">
                    <div className="w-[84px] shrink-0 pr-4 text-right md:w-[100px]">
                      <span className="text-base font-bold text-[#b91c1c] md:text-lg">
                        {item.tahun}
                      </span>
                    </div>
                    <div className="relative flex-1 pb-2">
                      <div className="absolute -left-[21px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-[#b91c1c] bg-white" />
                      <p className="text-base leading-relaxed text-gray-600 md:text-lg">
                        {item.uraian}
                      </p>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* KONTAK & SEKRETARIAT */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="font-serif text-3xl font-bold text-gray-950 md:text-4xl">
              Kontak & Sekretariat
            </h2>
            <div className="mx-auto mt-4 h-1.5 w-20 bg-[#b91c1c]" />
          </div>
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-start gap-4 border border-gray-200 p-8">
              <MapPin className="mt-1 h-6 w-6 shrink-0 text-[#b91c1c]" />
              <div>
                <p className="mb-2 text-sm font-bold uppercase tracking-wider text-gray-500">
                  Sekretariat
                </p>
                <p className="text-base leading-relaxed text-gray-700">
                  Jl. Doser, Cipakat, Kec. Singaparna, Tasikmalaya, Jawa Barat
                  46417
                </p>
              </div>
            </div>

            {/* EMAIL */}
            <div className="flex items-start gap-4 border border-gray-200 p-8">
              <Mail className="mt-1 h-6 w-6 shrink-0 text-[#b91c1c]" />
              <div>
                <p className="mb-2 text-sm font-bold uppercase tracking-wider text-gray-500">
                  Email
                </p>
                <a
                  href="mailto:Official_kmrt@gmail.com"
                  className="text-base text-gray-700 transition-colors hover:text-[#b91c1c]"
                >
                  Official_kmrt@gmail.com
                </a>
              </div>
            </div>

            {/* MEDIA SOSIAL */}
            <div className="flex items-start gap-4 border border-gray-200 p-8">
              <Facebook className="mt-1 h-6 w-6 shrink-0 text-[#b91c1c]" />
              <div>
                <p className="mb-2 text-sm font-bold uppercase tracking-wider text-gray-500">
                  Media Sosial
                </p>
                <div className="flex flex-col gap-2">
                  <a
                    href="http://www.facebook.com/aksi.kmrt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base text-gray-700 transition-colors hover:text-[#b91c1c]"
                  >
                    Facebook: aksi.kmrt
                  </a>
                  <a
                    href="https://www.instagram.com/aksikmrt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base text-gray-700 transition-colors hover:text-[#b91c1c]"
                  >
                    Instagram: @aksikmrt
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA PENGADUAN */}
      <section className="bg-[#b91c1c] py-20 text-center text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 font-serif text-3xl font-bold md:text-4xl">
            Temukan Indikasi Korupsi atau Pelayanan Buruk?
          </h2>

          <p className="mx-auto mb-10 max-w-3xl text-base leading-relaxed text-red-100 md:text-lg">
            KMRT menyediakan layanan advokasi, investigasi, dan KMRT Complain
            Center (Pusat Pengaduan) untuk kasus korupsi APBN, APBD, APBDes,
            serta pelayanan publik sektor pendidikan dan kesehatan. Identitas
            pelapor kami lindungi secara penuh.
          </p>

          <a
            href="/pengaduan"
            className="inline-block bg-gray-950 px-8 py-4 text-base font-bold uppercase tracking-widest shadow-xl transition-all hover:bg-white hover:text-gray-950"
          >
            Lapor KMRT Center
          </a>
        </div>
      </section>
    </div>
  );
}