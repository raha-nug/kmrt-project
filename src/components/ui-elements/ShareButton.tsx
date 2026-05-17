"use client";

import { Share2, Check } from "lucide-react";
import { useState } from "react";

export default function ShareButton({ judul }: { judul: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;

    // Gunakan Web Share API jika tersedia (mobile)
    if (navigator.share) {
      try {
        await navigator.share({ title: judul, url });
        return;
      } catch {
        // User cancel — abaikan
        return;
      }
    }

    // Fallback: copy URL ke clipboard
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard tidak tersedia
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-900 transition-colors hover:text-[#b91c1c]"
    >
      {copied ? (
        <>
          <Check className="h-4 w-4 text-green-600" />
          <span className="text-green-600">Link Disalin!</span>
        </>
      ) : (
        <>
          <Share2 className="h-4 w-4" /> Bagikan
        </>
      )}
    </button>
  );
}
