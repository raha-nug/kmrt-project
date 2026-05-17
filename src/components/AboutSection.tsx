export default function AboutSection() {
  const misi = [
    "Berperan aktif dalam pemberantasan korupsi",
    "Berperan aktif dalam penegakan supremasi hukum",
    "Berperan aktif dalam pembelaan HAM",
    "Berperan aktif dalam kesetaraan gender",
    "Menjadi kontrol sosial bagi pemerintah dan aparatur penyelenggara negara",
    "Peningkatan ekonomi organisasi",
  ];

  return (
    <section className="w-full border-b border-gray-100 bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
          {/* Kolom Kiri: Teks Sejarah */}
          <div className="lg:col-span-7">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-12 bg-[#b91c1c]" />
              <p className="text-xs font-bold uppercase tracking-widest text-[#b91c1c]">
                Sejarah & Perjuangan
              </p>
            </div>
            <h2 className="mb-8 font-serif text-4xl font-extrabold leading-tight tracking-tight text-gray-950 md:text-5xl">
              Lahir dari Rakyat, <br />
              Untuk Keadilan.
            </h2>
            <div className="space-y-6 text-lg font-light leading-relaxed text-gray-700">
              <p>
                KMRT didirikan pada{" "}
                <strong className="font-semibold text-gray-950">
                  09 Desember 2004
                </strong>{" "}
                di Tasikmalaya. Organisasi ini lahir sebagai respon tegas
                mahasiswa dan rakyat terhadap memudarnya semangat reformasi dan
                maraknya praktik korupsi di berbagai sektor pemerintahan daerah.
              </p>
              <p>
                Kami bergerak secara independen, tanpa afiliasi politik, untuk
                menjadi agen pengontrol sosial. Fokus kami adalah membongkar
                kasus korupsi, melakukan advokasi kebijakan publik, dan
                memberdayakan masyarakat agar berani bersuara melawan
                ketidakadilan.
              </p>
            </div>
          </div>

          {/* Kolom Kanan: Visi & Misi */}
          <div className="space-y-6 lg:col-span-5">
            {/* Visi */}
            <div className="group relative border border-gray-100 bg-gray-50 p-8 transition-colors hover:border-gray-200">
              <div className="mb-5 flex items-center justify-between">
                <h4 className="font-serif text-xl font-bold uppercase tracking-wider text-gray-950">
                  Visi
                </h4>
                <span className="text-xs font-bold text-gray-300 transition-colors group-hover:text-[#b91c1c]">
                  01
                </span>
              </div>
              <p className="font-light leading-relaxed text-gray-700">
                Terciptanya tatanan masyarakat yang adil dan beradab
                berlandaskan nilai-nilai kemanusiaan.
              </p>
            </div>

            {/* Misi */}
            <div className="group relative border border-gray-100 bg-gray-50 p-8 transition-colors hover:border-gray-200">
              <div className="mb-5 flex items-center justify-between">
                <h4 className="font-serif text-xl font-bold uppercase tracking-wider text-gray-950">
                  Misi Utama
                </h4>
                <span className="text-xs font-bold text-gray-300 transition-colors group-hover:text-[#b91c1c]">
                  02
                </span>
              </div>
              <ol className="space-y-3">
                {misi.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 text-xs font-bold text-[#b91c1c]">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-light leading-relaxed text-gray-700">
                      {item}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
