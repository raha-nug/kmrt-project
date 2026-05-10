// src/app/dashboard/kategori/FormTambahKategori.tsx
"use client";

import { useState } from "react";
import { createKategori } from "./actions";
import Swal from "sweetalert2";
import { Plus } from "lucide-react";

export default function FormTambahKategori() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const res = await createKategori(formData);

    if (res.success) {
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: res.message,
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
      });
      (e.target as HTMLFormElement).reset();
    } else {
      Swal.fire({ icon: "error", title: "Gagal", text: res.message });
    }

    setIsSubmitting(false);
  };

  return (
    <div className="dark:border-strokedark dark:bg-boxdark rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="dark:border-strokedark border-b border-gray-100 px-6 py-4">
        <h3 className="font-semibold text-gray-900 dark:text-white">
          Tambah Kategori Baru
        </h3>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 p-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-black dark:text-white">
            Nama Kategori
          </label>
          <input
            type="text"
            name="nama"
            required
            placeholder="Contoh: Investigasi"
            className="dark:border-strokedark dark:bg-meta-4 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:text-white dark:focus:border-primary"
          />
          <p className="mt-1 text-xs text-gray-500">
            Slug URL akan dibuat secara otomatis.
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full justify-center gap-2 rounded-lg bg-gray-900 p-3 font-medium text-white transition-colors hover:bg-gray-800 disabled:opacity-50 dark:bg-primary dark:hover:bg-opacity-90"
        >
          {isSubmitting ? (
            "Menyimpan..."
          ) : (
            <>
              <Plus className="h-5 w-5" /> Simpan Kategori
            </>
          )}
        </button>
      </form>
    </div>
  );
}
