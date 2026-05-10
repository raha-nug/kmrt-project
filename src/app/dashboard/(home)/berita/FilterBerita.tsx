"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";

export default function FilterBerita() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [query, setQuery] = useState(searchParams.get("q")?.toString() || "");
  const [status, setStatus] = useState(
    searchParams.get("status")?.toString() || "ALL",
  );

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
      <div className="group relative flex-1">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <Search className="h-4.5 w-4.5 text-gray-400 transition-colors group-focus-within:text-primary" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari judul berita..."
          className="dark:border-strokedark dark:bg-boxdark block w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 shadow-sm outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary dark:text-white"
        />
      </div>

      <div className="group relative shrink-0">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <SlidersHorizontal className="h-4.5 w-4.5 text-gray-400 transition-colors group-focus-within:text-primary" />
        </div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="dark:border-strokedark dark:bg-boxdark block w-full cursor-pointer appearance-none rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-10 text-sm font-medium text-gray-700 shadow-sm outline-none transition-all focus:border-primary dark:text-gray-300 sm:w-[200px]"
        >
          <option value="ALL">Semua Status</option>
          <option value="PUBLISHED">Published</option>
          <option value="DRAFT">Draft</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </div>
      </div>
    </div>
  );
}
