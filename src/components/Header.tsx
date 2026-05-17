"use client";

import Link from "next/link";
import Image from "next/image"; // 1. Import komponen Image dari Next.js
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: "Beranda", href: "/" },
    { name: "Tentang", href: "/tentang" },
    { name: "Struktur", href: "/struktur" },
    { name: "Galeri", href: "/galeri" },
    { name: "Berita", href: "/berita" },
  ];

  const isActive = (href: string) => {
    if (href === "/" && pathname !== "/") return false;
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo & Brand Identity */}
          {/* Seluruh area dijadikan Link agar gambar dan teks bisa diklik bersamaan */}
          <Link href="/" className="group flex items-center gap-4">
            {/* Area Gambar Logo */}
            <div className="relative h-11 w-11 shrink-0 overflow-hidden">
              {/* 2. Gunakan tag Image. Pastikan file logo Anda (misal: logo-kmrt.png) ada di dalam folder 'public' */}
              <Image
                src="/images/logo/logo-kmrt.png" // Ganti dengan nama file gambar Anda
                alt="Logo KMRT"
                fill
                className="object-contain" // Gunakan 'object-contain' agar logo tidak terpotong, atau 'object-cover' jika ingin memenuhi kotak
                sizes="44px"
              />

              {/* Jika Anda lebih suka tag img HTML biasa tanpa next/image, gunakan baris di bawah ini dan hapus tag <Image> di atas: */}
              {/* <img src="/logo-kmrt.png" alt="Logo KMRT" className="h-full w-full object-contain" /> */}
            </div>

            {/* Area Teks Logo */}
            <div className="flex flex-col">
              <span className="font-serif text-xl font-extrabold leading-none tracking-tight text-gray-950 transition-colors group-hover:text-[#b91c1c] md:text-2xl">
                KMRT
              </span>
             
            </div>
          </Link>

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
