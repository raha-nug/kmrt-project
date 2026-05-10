// app/not-found.tsx
import Link from "next/link";
import { Button } from "@/components/ui-elements/button";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex h-[80vh] items-center justify-center px-6">
      <div className="w-full max-w-xl rounded-xl border border-gray-200 bg-white p-10 text-center shadow-sm">
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="flex h-40 w-40 items-center justify-center rounded-full bg-gray-100 text-4xl">
            <Image
              src="/images/not-found.jpg"
              alt="404"
              width={900}
              height={900}
            />
          </div>
        </div>

        {/* Title */}
        <h1 className="mb-2 text-3xl font-bold text-gray-800">
          Halaman Tidak Ditemukan
        </h1>

        {/* Subtitle */}
        <p className="mb-8 text-gray-500">
          Maaf, halaman yang kamu cari tidak tersedia atau sudah dipindahkan.
        </p>

        {/* Actions */}
        <div className="flex justify-center gap-3">
          <Link href="/dashboard">
            <Button
              className="bg-indigo-600 hover:bg-indigo-700"
              label="Kembali ke Dashboard"
              shape={"rounded"}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
