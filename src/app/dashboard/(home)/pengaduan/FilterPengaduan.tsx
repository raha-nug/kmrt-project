"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";

export default function FilterPengaduan() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const defaultQuery = searchParams.get("q")?.toString() || "";
  const defaultStatus = searchParams.get("status")?.toString() || "ALL";

  const [query, setQuery] = useState(defaultQuery);
  const [status, setStatus] = useState(defaultStatus);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(searchParams);

      params.set("page", "1");

      if (query) params.set("q", query);
      else params.delete("q");

      if (status !== "ALL") params.set("status", status);
      else params.delete("status");

      replace(`${pathname}?${params.toString()}`);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query, status, pathname, replace, searchParams]);

  return (
    <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      {/* Kolom Pencarian */}
      <div className="group relative flex-1">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <Search className="h-4.5 w-4.5 text-gray-400 transition-colors group-focus-within:text-primary dark:text-gray-500" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ketik ID Tiket, nama pelapor, atau cuplikan isi laporan..."
          className="dark:border-strokedark dark:bg-boxdark block w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 shadow-sm outline-none transition-all placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary dark:text-white dark:focus:border-primary"
        />
      </div>

      {/* Dropdown Filter Status */}
      <div className="group relative shrink-0">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <SlidersHorizontal className="h-4.5 w-4.5 text-gray-400 transition-colors group-focus-within:text-primary dark:text-gray-500" />
        </div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="dark:border-strokedark dark:bg-boxdark block w-full cursor-pointer appearance-none rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-10 text-sm font-medium text-gray-700 shadow-sm outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary dark:text-gray-300 dark:focus:border-primary sm:w-[220px]"
        >
          <option value="ALL">Semua Status</option>
          <option value="MENUNGGU">Menunggu</option>
          <option value="DIPROSES">Diproses</option>
          <option value="SELESAI">Selesai</option>
          <option value="DITOLAK">Ditolak</option>
        </select>
        {/* Ikon Panah Kustom Kanan */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
          <ChevronDown className="h-4 w-4 text-gray-400 transition-transform group-focus-within:rotate-180" />
        </div>
      </div>
    </div>
  );
}
