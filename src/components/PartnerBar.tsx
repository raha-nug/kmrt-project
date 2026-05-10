// components/PartnerBar.tsx

export default function PartnerBar() {
  // Array dummy untuk meng-generate kotak logo
  const partners = [1, 2, 3, 4, 5, 6];

  return (
    <section className="w-full border-b border-gray-200 bg-gray-50 py-10">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        {/* [PARTNER] Text / Label */}
        <h3 className="mb-6 inline-block border-b border-gray-300 pb-2 text-sm font-bold uppercase tracking-widest text-gray-500">
          Jaringan & Kemitraan
        </h3>

        {/* Deretan Logo */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {/* Logo Pertama (bisa teks/label khusus seperti "Lorem" di wireframe) */}
          <div className="flex h-12 w-24 items-center justify-center border border-gray-300 bg-white text-xs font-bold text-gray-400 shadow-sm">
            ICW
          </div>

          {/* Sisa Logo [LOGO] */}
          {partners.map((item) => (
            <div
              key={item}
              className="flex h-12 w-24 items-center justify-center border border-gray-300 bg-white text-xs text-gray-400 shadow-sm"
            >
              [LOGO {item}]
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
