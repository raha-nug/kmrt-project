"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface GaleriItem {
  id: string;
  judul: string;
  gambar: string;
  tanggal: Date | string;
}

export default function GaleriCarousel({ items }: { items: GaleriItem[] }) {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const prev = useCallback(() => {
    setCurrent((c) => (c === 0 ? items.length - 1 : c - 1));
  }, [items.length]);

  const next = useCallback(() => {
    setCurrent((c) => (c === items.length - 1 ? 0 : c + 1));
  }, [items.length]);

  // Auto-play
  useEffect(() => {
    if (lightbox !== null) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next, lightbox]);

  // Keyboard nav untuk lightbox
  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight")
        setLightbox((l) => (l === null ? null : (l + 1) % items.length));
      if (e.key === "ArrowLeft")
        setLightbox((l) =>
          l === null ? null : (l - 1 + items.length) % items.length,
        );
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, items.length]);

  // Tampilkan 3 visible: current-1, current, current+1
  const getVisible = () => {
    const len = items.length;
    if (len === 1) return [0];
    if (len === 2) return [0, 1];
    return [(current - 1 + len) % len, current, (current + 1) % len];
  };

  const visible = getVisible();

  return (
    <>
      {/* Carousel */}
      <div className="relative">
        {/* Track */}
        <div className="grid grid-cols-1 gap-1 bg-gray-100 p-1 md:grid-cols-3">
          {visible.map((idx, pos) => {
            const item = items[idx];
            const isCenter = pos === 1 || items.length <= 2;
            return (
              <div
                key={item.id + "-" + pos}
                onClick={() => setLightbox(idx)}
                className={`group relative cursor-zoom-in overflow-hidden bg-white transition-all duration-500 ${
                  isCenter
                    ? "aspect-[4/3]"
                    : "aspect-[4/3] opacity-75 hover:opacity-100"
                }`}
              >
                <Image
                  src={item.gambar}
                  alt={item.judul}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-gray-950/80 via-transparent to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="mb-1 text-xs font-bold uppercase tracking-widest text-[#b91c1c]">
                    {new Date(item.tanggal).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <h4 className="font-serif text-base font-bold leading-snug text-white">
                    {item.judul}
                  </h4>
                </div>
              </div>
            );
          })}
        </div>

        {/* Prev / Next */}
        {items.length > 3 && (
          <>
            <button
              onClick={prev}
              aria-label="Sebelumnya"
              className="absolute -left-5 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center bg-gray-950 text-white shadow-lg transition-colors hover:bg-[#b91c1c]"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              aria-label="Berikutnya"
              className="absolute -right-5 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center bg-gray-950 text-white shadow-lg transition-colors hover:bg-[#b91c1c]"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Dots */}
        {items.length > 1 && (
          <div className="mt-6 flex justify-center gap-2">
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                aria-label={`Foto ${idx + 1}`}
                className={`h-1.5 transition-all duration-300 ${
                  idx === current
                    ? "w-8 bg-[#b91c1c]"
                    : "w-1.5 bg-gray-300 hover:bg-gray-500"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/95"
          onClick={() => setLightbox(null)}
        >
          {/* Close */}
          <button
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center text-white transition-colors hover:text-[#b91c1c]"
            onClick={() => setLightbox(null)}
          >
            <X className="h-6 w-6" />
          </button>

          {/* Prev */}
          <button
            className="absolute left-4 flex h-12 w-12 items-center justify-center bg-white/10 text-white transition-colors hover:bg-[#b91c1c]"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((l) =>
                l === null ? null : (l - 1 + items.length) % items.length,
              );
            }}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Image */}
          <div
            className="relative mx-20 h-[70vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={items[lightbox].gambar}
              alt={items[lightbox].judul}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 bg-gray-950/70 px-6 py-4 text-center">
              <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#b91c1c]">
                {new Date(items[lightbox].tanggal).toLocaleDateString("id-ID", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <p className="font-serif text-lg font-bold text-white">
                {items[lightbox].judul}
              </p>
              <p className="mt-2 text-xs text-gray-400">
                {lightbox + 1} / {items.length}
              </p>
            </div>
          </div>

          {/* Next */}
          <button
            className="absolute right-4 flex h-12 w-12 items-center justify-center bg-white/10 text-white transition-colors hover:bg-[#b91c1c]"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((l) => (l === null ? null : (l + 1) % items.length));
            }}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </>
  );
}
