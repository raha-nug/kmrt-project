"use client";

import Link from "next/link";
import { useState } from "react";
// 1. Import usePathname
import { usePathname } from "next/navigation";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 2. Ambil path saat ini
  const pathname = usePathname();

  const menuItems = [
    { name: "Beranda", href: "/" },
    { name: "Tentang", href: "/tentang" },
    { name: "Struktur", href: "/struktur" },
    { name: "Galeri", href: "/galeri" },
    { name: "Berita", href: "/berita" },
  ];

  // 3. Fungsi pembantu untuk cek apakah link aktif
  const isActive = (href: string) => {
    if (href === "/" && pathname !== "/") return false;
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#b91c1c] font-serif text-xl font-bold text-white shadow-md">
              KM
            </div>
            <Link href="/" className="group flex flex-col">
              <span className="font-serif text-xl font-extrabold leading-none tracking-tight text-gray-950 transition-colors group-hover:text-[#b91c1c] md:text-2xl">
                KMRT
              </span>
              <span className="mt-1 text-[9px] font-bold uppercase tracking-widest text-gray-500 md:text-[10px]">
                Tasikmalaya
              </span>
            </Link>
          </div>

          {/* Navigasi Utama (Desktop) */}
          <nav className="hidden items-center gap-8 md:flex">
            {menuItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-xs font-bold uppercase tracking-widest transition-colors ${
                    active
                      ? "border-b-2 border-[#b91c1c] pb-1 text-[#b91c1c]"
                      : "text-gray-900 hover:text-[#b91c1c]"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Call to Action & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link
              href="/pengaduan"
              className={`hidden border px-6 py-3 text-xs font-bold uppercase tracking-widest transition-colors md:inline-flex ${
                pathname === "/pengaduan"
                  ? "border-[#b91c1c] bg-[#b91c1c] text-white"
                  : "border-transparent bg-gray-950 text-white hover:border-[#b91c1c] hover:bg-[#b91c1c]"
              }`}
            >
              Lapor Pengaduan
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-900 hover:text-[#b91c1c] focus:outline-none md:hidden"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <svg
                  className="h-7 w-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-7 w-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`absolute left-0 top-20 w-full origin-top border-b border-gray-200 bg-white shadow-xl transition-all duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen
            ? "pointer-events-auto scale-y-100 opacity-100"
            : "pointer-events-none scale-y-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col space-y-1 px-4 pb-6 pt-2">
          {menuItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`border-b border-gray-100 p-4 text-sm font-bold uppercase tracking-widest transition-colors ${
                  active
                    ? "border-l-4 border-l-[#b91c1c] bg-gray-50 text-[#b91c1c]"
                    : "text-gray-900 hover:bg-gray-50 hover:text-[#b91c1c]"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            );
          })}
          <Link
            href="/pengaduan"
            className={`mt-4 block p-4 text-center text-sm font-bold uppercase tracking-widest text-white ${
              pathname === "/pengaduan"
                ? "bg-[#b91c1c]"
                : "bg-gray-950 hover:bg-[#b91c1c]"
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Lapor Pengaduan
          </Link>
        </nav>
      </div>
    </header>
  );
}
