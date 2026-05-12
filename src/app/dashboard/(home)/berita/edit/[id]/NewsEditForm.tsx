"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Swal from "sweetalert2";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { SubmitButton } from "@/components/FormElements/SubmitButton";
import InputGroup from "@/components/FormElements/InputGroup";
import RichTextEditor from "@/components/FormElements/Editor";
import SwitcherOne from "@/components/FormElements/Switchers/SwitcherOne";
import { useUploadThing } from "@/utils/uploadthing";
import {
  updateNews,
  deleteImageFromUT,
  getAllKategoriForForm,
} from "../../actions";

export default function NewsEditForm({ news }: { news: any }) {
  const router = useRouter();

  // --- STATE UPLOAD ---
  const [imageUrl, setImageUrl] = useState<string>(news.gambar || "");
  const [imageKey, setImageKey] = useState<string>(""); // Key untuk gambar BARU
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const newImageKeyRef = useRef("");

  // --- STATE FORM DATA ---
  const [title, setTitle] = useState(news.judul || "");
  const [kategoriId, setKategoriId] = useState(news.kategoriId || "");
  const [categories, setCategories] = useState<{ id: string; nama: string }[]>(
    [],
  );
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  // Sync Ref dengan Key terbaru untuk cleanup
  useEffect(() => {
    newImageKeyRef.current = imageKey;
  }, [imageKey]);

  // Logic Cleanup: Hanya menghapus gambar BARU jika user batal edit
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (newImageKeyRef.current && !isSubmitted) {
        e.preventDefault();
        e.returnValue =
          "Perubahan belum disimpan, gambar baru akan terhapus. Keluar?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      if (newImageKeyRef.current && !isSubmitted) {
        deleteImageFromUT(newImageKeyRef.current);
      }
    };
  }, [isSubmitted]);

  // Ambil data kategori
  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getAllKategoriForForm();
        setCategories(data);
      } finally {
        setIsLoadingCategories(false);
      }
    }
    fetchCategories();
  }, []);

  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      setIsUploading(false);
      setImageUrl(res[0].url);
      setImageKey(res[0].key);
      Swal.fire({
        icon: "success",
        title: "Gambar diperbarui!",
        timer: 1000,
        showConfirmButton: false,
      });
    },
    onUploadError: (error) => {
      setIsUploading(false);
      Swal.fire({ icon: "error", title: "Upload Gagal", text: error.message });
    },
    onUploadBegin: () => setIsUploading(true),
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await startUpload([file]);
  };

  const handleRemoveImage = async () => {
    if (imageKey) {
      // Hapus file baru dari storage
      await deleteImageFromUT(imageKey);
      setImageKey("");
      setImageUrl("");
    } else {
      // Cukup kosongkan preview untuk gambar lama
      setImageUrl("");
    }
  };

  const isFormValid =
    title.trim() !== "" && kategoriId !== "" && imageUrl !== "" && !isUploading;

  async function handleClientAction(formData: FormData) {
    if (!isFormValid) return;

    formData.append("image", imageUrl);

    const result = await updateNews(formData);

    if (result.success) {
      setIsSubmitted(true);
      await Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Berita berhasil diperbarui.",
        timer: 1500,
        showConfirmButton: false,
      });
      router.push("/dashboard/berita");
      router.refresh();
    } else {
      Swal.fire({ icon: "error", title: "Gagal", text: result.message });
    }
  }

  return (
    <form action={handleClientAction} className="max-w-4xl space-y-6">
      {/* Hidden ID */}
      <input type="hidden" name="id" defaultValue={news.id} />

      {/* 1. Judul Berita */}
      <InputGroup
        label="Judul Berita"
        type="text"
        name="title"
        value={title}
        handleChange={(e) => setTitle(e.target.value)}
        required
      />

      {/* 2. Kategori */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-black dark:text-white">
          Kategori Berita <span className="text-red-500">*</span>
        </label>
        <select
          name="kategoriId"
          value={kategoriId}
          onChange={(e) => setKategoriId(e.target.value)}
          required
          className="dark:border-form-strokedark dark:bg-form-input w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-[11px] text-sm text-black outline-none transition focus:border-primary active:border-primary dark:text-white"
        >
          <option value="">Pilih Kategori</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nama}
            </option>
          ))}
        </select>
      </div>

      {/* 3. Ringkasan */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-black dark:text-white">
          Ringkasan Berita{" "}
          <span className="ml-1 text-xs font-normal text-slate-400">
            (Preview)
          </span>
        </label>
        <textarea
          name="ringkasan"
          rows={3}
          defaultValue={news.ringkasan}
          placeholder="Tuliskan ringkasan singkat isi berita..."
          className="dark:border-form-strokedark dark:bg-form-input w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-sm text-black outline-none transition focus:border-primary active:border-primary dark:text-white"
        ></textarea>
      </div>

      {/* 4. Gambar Utama */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-black dark:text-white">
          Gambar Utama{" "}
          {isUploading && (
            <span className="ml-2 animate-pulse text-xs font-normal text-primary">
              (Upload...)
            </span>
          )}
        </label>

        {!imageUrl ? (
          <div className="dark:border-strokedark dark:bg-meta-4 group relative flex h-32 w-full max-w-lg cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-stroke bg-gray-50 transition hover:border-primary">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
            />
            <div className="flex flex-col items-center justify-center space-y-1 text-center">
              <span className="text-sm font-medium text-slate-500">
                Ganti Gambar
              </span>
            </div>
          </div>
        ) : (
          <div className="relative h-48 w-full max-w-sm overflow-hidden rounded-xl border border-stroke shadow-sm">
            <Image src={imageUrl} alt="Preview" fill className="object-cover" />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute right-2 top-2 rounded-full bg-red-500 p-1.5 text-white shadow-lg transition-transform hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* 5. Status Publikasi */}
      <div className="dark:border-strokedark flex items-center gap-6 border-y border-dashed border-stroke py-2">
        <label className="text-sm font-medium text-black dark:text-white">
          Status Publish
        </label>
        <SwitcherOne name="published" defaultValue={news.published} />
      </div>

      {/* 6. Editor Isi Konten */}
      <RichTextEditor
        label="Isi Konten Berita"
        name="content"
        defaultValue={news.konten}
      />

      <div className="dark:border-strokedark flex items-center justify-end border-t border-stroke pt-6">
        <SubmitButton disabled={!isFormValid || isLoadingCategories} />
      </div>
    </form>
  );
}
