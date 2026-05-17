"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface GaleriItem {
  id: string;
  judul: string;
  gambar: string;
  tanggal: Date | string;
}

export default function HeroSlideshow({ items }: { items: GaleriItem[] }) {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = (idx: number) => {
    if (animating || idx === current) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(idx);
      setAnimating(false);
    }, 300);
  };

  const prev = () => goTo((current - 1 + items.length) % items.length);
  const next = () => goTo((current + 1) % items.length);

  // Auto-play
  useEffect(() => {
    if (items.length <= 1) return;
    const t = setInterval(() => {
      setCurrent((c) => (c + 1) % items.length);
    }, 4500);
    return () => clearInterval(t);
  }, [items.length]);

  // Fallback jika tidak ada foto
  if (items.length === 0) {
    return (
      <div className="flex aspect-[3/4] w-full items-center justify-center border border-gray-800 bg-[#111]">
        <div className="text-center">
          <svg
            className="mx-auto mb-4 h-16 w-16 text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-xs uppercase tracking-widest text-gray-700">
            Belum ada foto
          </p>
        </div>
      </div>
    );
  }

  const active = items[current];

  return (
    <div className="relative flex aspect-[3/4] w-full flex-col gap-2 border border-gray-800">
      {/* Foto utama */}
      <div className="relative flex-1 overflow-hidden bg-[#111]">
        <Image
          src={active.gambar}
          alt={active.judul}
          fill
          priority
          className={`object-cover transition-opacity duration-500 ${
            animating ? "opacity-0" : "opacity-100"
          }`}
          sizes="(max-width: 768px) 100vw, 40vw"
        />

        {/* Gradient overlay bawah */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/20 to-transparent" />

        {/* Caption */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#b91c1c]">
            {new Date(active.tanggal).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          <h3 className="line-clamp-2 font-serif text-base font-bold leading-snug text-white">
            {active.judul}
          </h3>
        </div>

        {/* Garis aksen bawah */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#b91c1c]" />

        {/* Prev/Next — hanya jika > 1 foto */}
        {items.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Foto sebelumnya"
              className="absolute left-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center bg-gray-950/60 text-white transition-colors hover:bg-[#b91c1c]"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={next}
              aria-label="Foto berikutnya"
              className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center bg-gray-950/60 text-white transition-colors hover:bg-[#b91c1c]"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail strip bawah — tampil jika ada > 1 foto */}
      {items.length > 1 && (
        <div className="flex gap-2">
          {items.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => goTo(idx)}
              aria-label={`Lihat foto ${idx + 1}`}
              className={`relative flex-1 overflow-hidden transition-all duration-300 ${
                idx === current
                  ? "h-16 ring-1 ring-[#b91c1c]"
                  : "h-16 opacity-40 hover:opacity-70"
              }`}
            >
              <Image
                src={item.gambar}
                alt={item.judul}
                fill
                className="object-cover"
                sizes="15vw"
              />
            </button>
          ))}
        </div>
      )}

      {/* Dots counter pojok kanan atas */}
      <div className="absolute right-3 top-3 rounded-sm bg-gray-950/70 px-2 py-1 text-xs font-bold tabular-nums text-white">
        {current + 1} / {items.length}
      </div>
    </div>
  );
}
