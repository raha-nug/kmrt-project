import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react"; // install lucide-react jika belum ada

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  path: string;
}

export default function Pagination({
  currentPage,
  lastPage,
  path,
}: PaginationProps) {
  // Generate array angka halaman (misal: [1, 2, 3, 4, 5])
  const pages = Array.from({ length: lastPage }, (_, i) => i + 1);

  return (
    <div className="mt-6 flex justify-center">
      <nav className="inline-flex -space-x-px overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm">
        {/* Tombol Previous */}
        <Link
          href={`${path}?page=${Math.max(1, currentPage - 1)}`}
          className={`flex items-center border-r border-gray-200 px-3 py-2 hover:bg-gray-50 ${
            currentPage === 1 ? "pointer-events-none opacity-50" : ""
          }`}
        >
          <ChevronLeft size={20} className="text-gray-500" />
        </Link>

        {/* Nomor Halaman */}
        {pages.map((page) => (
          <Link
            key={page}
            href={`${path}?page=${page}`}
            className={`border-r border-gray-200 px-4 py-2 text-sm font-medium transition-colors ${
              currentPage == page
                ? "border-indigo-600 bg-indigo-600 text-white" // Warna ungu sesuai gambar
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            {page}
          </Link>
        ))}

        {/* Tombol Next */}
        <Link
          href={`${path}?page=${Math.min(lastPage, currentPage + 1)}`}
          className={`flex items-center px-3 py-2 hover:bg-gray-50 ${
            currentPage === lastPage ? "pointer-events-none opacity-50" : ""
          }`}
        >
          <ChevronRight size={20} className="text-gray-500" />
        </Link>
      </nav>
    </div>
  );
}
