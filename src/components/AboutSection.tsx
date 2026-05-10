export default function AboutSection() {
  return (
    <section className="w-full border-b border-gray-100 bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
          {/* Kolom Kiri: Teks Sejarah */}
          <div className="lg:col-span-7">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-12 bg-[#b91c1c]"></div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#b91c1c]">
                Sejarah & Perjuangan
              </p>
            </div>

            <h2 className="mb-8 font-serif text-4xl font-extrabold leading-tight tracking-tight text-gray-950 md:text-5xl">
              Lahir dari Rakyat, <br />
              Untuk Keadilan.
            </h2>

            <div className="space-y-6 text-justify text-lg font-light leading-relaxed text-gray-800">
              <p>
                KMRT didirikan pada <strong>09 Desember 2004</strong> di
                Tasikmalaya. Organisasi ini lahir sebagai respon tegas mahasiswa
                dan rakyat terhadap memudarnya semangat reformasi dan maraknya
                praktik korupsi di berbagai sektor pemerintahan daerah.
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

          {/* Kolom Kanan: Kartu Visi Misi (Formal Dokumen) */}
          <div className="space-y-8 lg:col-span-5">
            <div className="group relative rounded-sm border border-gray-100 bg-[#f9f9f9] p-8 shadow-sm transition-colors hover:border-gray-200">
              <span className="absolute right-4 top-4 text-xs font-bold text-gray-300 group-hover:text-[#b91c1c]">
                01
              </span>
              <h4 className="mb-4 font-serif text-xl font-bold uppercase tracking-wider text-gray-950">
                Visi
              </h4>
              <p className="font-light leading-relaxed text-gray-700">
                Terciptanya tatanan masyarakat yang adil dan beradab
                berlandaskan nilai-nilai kemanusiaan.
              </p>
            </div>

            <div className="group relative rounded-sm border border-gray-100 bg-[#f9f9f9] p-8 shadow-sm transition-colors hover:border-gray-200">
              <span className="absolute right-4 top-4 text-xs font-bold text-gray-300 group-hover:text-[#b91c1c]">
                02
              </span>
              <h4 className="mb-4 font-serif text-xl font-bold uppercase tracking-wider text-gray-950">
                Misi Utama
              </h4>
              <ul className="list-inside list-decimal space-y-2 text-sm font-light text-gray-700">
                <li>Pemberantasan korupsi sistemis</li>
                <li>Penegakan supremasi hukum tanpa pandang bulu</li>
                <li>Pembelaan Hak Asasi Manusia</li>
                <li>
                  Kontrol sosial pemerintah atau aparatur penyelenggara negara
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
