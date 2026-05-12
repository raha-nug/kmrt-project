"use client";

import { useState } from "react";
import { createKategori } from "./actions";
import Swal from "sweetalert2";
import { Plus, Loader2 } from "lucide-react";

export default function FormTambahKategori() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nama, setNama] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!nama.trim()) return;

    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const res = await createKategori(formData);

    if (res.success) {
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Kategori baru telah ditambahkan.",
      });
      setNama("");
      (e.target as HTMLFormElement).reset();
    } else {
      Swal.fire({ icon: "error", title: "Gagal", text: res.message });
    }

    setIsSubmitting(false);
  };

  return (
    <div className="dark:border-strokedark dark:bg-boxdark rounded-xl border border-gray-200 bg-white shadow-sm md:col-span-2">
      {/* Header menggunakan border-b tipis khas list kategori */}
      <div className="dark:border-strokedark border-b border-stroke px-6.5 py-4">
        <h3 className="font-medium text-black dark:text-white">
          Tambah Kategori
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="p-6.5">
        <div className="mb-4.5">
          <label className="mb-2.5 block text-sm font-medium text-black dark:text-white">
            Nama Kategori
          </label>
          <input
            type="text"
            name="nama"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
            placeholder="Masukkan nama kategori"
            className="disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default dark:text-white dark:focus:border-primary"
          />
          <span className="mt-2 block text-xs text-slate-400">
            Slug akan dibuat secara otomatis oleh sistem.
          </span>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !nama.trim()}
          className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 disabled:cursor-not-allowed disabled:bg-opacity-50"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <Loader2 className="animate-spin" size={18} />
              <span>Memproses...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Plus size={18} />
              <span>Simpan Kategori</span>
            </div>
          )}
        </button>
      </form>
    </div>
  );
}
