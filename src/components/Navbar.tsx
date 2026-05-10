// components/Navbar.tsx
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Bagian Kiri: LOGO dan TEKS (Nama/Slogan Singkat) */}
          <div className="flex items-center space-x-4">
            {/* [LOGO] */}
            <div className="flex h-10 w-10 items-center justify-center border border-gray-300 bg-gray-200 text-xs font-bold text-gray-500">
              LOGO
            </div>
            {/* [TEKS] */}
            <div className="hidden text-lg font-bold tracking-wide text-gray-800 sm:block">
              KMRT TASIKMALAYA
            </div>
          </div>

          {/* Bagian Kanan: Menu Fitur dan Icon */}
          <div className="flex items-center space-x-6">
            {/* [FITUR 1] [FITUR 2] [FITUR 3] */}
            <nav className="hidden space-x-6 text-sm font-semibold uppercase text-gray-600 md:flex">
              <Link
                href="/berita"
                className="transition-colors hover:text-gray-900"
              >
                Berita
              </Link>
              <Link
                href="/galeri"
                className="transition-colors hover:text-gray-900"
              >
                Galeri
              </Link>
              <Link
                href="/pengaduan"
                className="transition-colors hover:text-gray-900"
              >
                Pengaduan
              </Link>
            </nav>

            {/* Icon / Action Button */}
            <button className="rounded border border-gray-300 p-2 transition-colors hover:bg-gray-50">
              <svg
                className="h-5 w-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
