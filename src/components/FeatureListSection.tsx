export default function FeatureListSection() {
  // Merangkum 9 Prinsip KMRT menjadi 4 Pilar Utama untuk Halaman Beranda
  const prinsip = [
    {
      title: "Integritas Tanpa Kompromi",
      desc: "Menjunjung tinggi moralitas dan kejujuran, menolak segala bentuk suap, serta menjadi teladan murni dalam pemberantasan korupsi.",
    },
    {
      title: "Independen & Objektif",
      desc: "Berdiri tegak tanpa intervensi partai politik, bertindak adil tanpa diskriminasi, dan selalu mengambil keputusan murni demi kebenaran.",
    },
    {
      title: "Transparan & Akuntabel",
      desc: "Menerapkan standar keterbukaan informasi yang tinggi. Setiap langkah dan keputusan kami selalu siap diuji dan dipertanggungjawabkan kepada publik.",
    },
    {
      title: "Perlindungan & Kerahasiaan",
      desc: "Menjamin keamanan secara mutlak. Kami berkomitmen penuh merahasiakan identitas setiap saksi dan pelapor yang berani bersuara.",
    },
  ];

  return (
    <section className="w-full border-t-4 border-[#b91c1c] bg-gray-950 py-16 text-white lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start gap-10 lg:flex-row lg:gap-24">
          {/* Bagian Judul (Kiri) */}
          <div className="w-full lg:sticky lg:top-32 lg:w-1/3">
            <div className="mb-6 h-1 w-16 bg-[#b91c1c] lg:mb-8"></div>
            <h2 className="mb-4 font-serif text-3xl font-extrabold leading-tight tracking-tight text-white sm:mb-6 sm:text-4xl md:text-5xl">
              Prinsip <br className="hidden sm:block" />
              <span className="text-[#b91c1c]">Integritas</span> Kami.
            </h2>
            <p className="text-base font-light leading-relaxed text-gray-400 sm:text-lg">
              Empat pilar utama yang merangkum landasan etika pergerakan KMRT
              dalam menuntut keadilan dan mengawasi tata kelola pemerintahan di
              Tasikmalaya.
            </p>
          </div>

          {/* Grid Prinsip (Kanan) */}
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:w-2/3">
            {prinsip.map((item, i) => (
              <div
                key={i}
                className="group relative overflow-hidden border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-[#b91c1c] hover:bg-white/10 md:p-10"
              >
                {/* Aksen Merah Halus di Sudut saat Hover */}
                <div className="absolute right-0 top-0 h-16 w-16 -translate-y-full translate-x-full rounded-bl-full bg-[#b91c1c]/20 transition-transform duration-500 group-hover:translate-x-0 group-hover:translate-y-0"></div>

                {/* Ikon Tegas (Bentuk Shield/Tameng) */}
                <div className="mb-4 text-gray-500 transition-colors duration-300 group-hover:text-[#b91c1c] sm:mb-6">
                  <svg
                    className="h-8 w-8 sm:h-10 sm:w-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="square"
                      strokeLinejoin="miter"
                      strokeWidth="1.5"
                      d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                    />
                  </svg>
                </div>

                <h4 className="mb-3 font-serif text-lg font-bold tracking-wide text-white transition-colors group-hover:text-[#b91c1c] sm:mb-4 sm:text-xl">
                  {item.title}
                </h4>
                <p className="text-sm font-light leading-relaxed text-gray-400">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
