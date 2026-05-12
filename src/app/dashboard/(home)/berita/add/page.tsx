"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Swal from "sweetalert2";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { SubmitButton } from "@/components/FormElements/SubmitButton";
import RichTextEditor from "@/components/FormElements/Editor";
import { useUploadThing } from "@/utils/uploadthing";
import { addNews, getAllKategoriForForm, deleteImageFromUT } from "../actions";

export default function AddNewsPage() {
  const router = useRouter();

  // --- STATE UPLOAD GAMBAR ---
  const [imageUrl, setImageUrl] = useState<string>("");
  const [imageKey, setImageKey] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const imageKeyRef = useRef("");

  // --- STATE FORM DATA (Untuk Validasi Tombol) ---
  const [title, setTitle] = useState("");
  const [kategoriId, setKategoriId] = useState("");
  const [categories, setCategories] = useState<{ id: string; nama: string }[]>(
    [],
  );
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  // Sync Ref dengan Key terbaru
  useEffect(() => {
    imageKeyRef.current = imageKey;
  }, [imageKey]);

  // --- LOGIKA CLEANUP (Hapus Gambar jika Batal) ---
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (imageKeyRef.current && !isSubmitted) {
        e.preventDefault();
        e.returnValue = "Gambar yang sudah diunggah akan terhapus. Lanjutkan?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      // Jika pindah halaman internal dan belum submit, hapus file
      if (imageKeyRef.current && !isSubmitted) {
        deleteImageFromUT(imageKeyRef.current);
      }
    };
  }, [isSubmitted]);

  // Ambil data kategori
  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getAllKategoriForForm();
        setCategories(data);
      } catch (error) {
        console.error("Gagal mengambil kategori:", error);
      } finally {
        setIsLoadingCategories(false);
      }
    }
    fetchCategories();
  }, []);

  // Hook UploadThing
  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      setIsUploading(false);
      setImageUrl(res[0].url);
      setImageKey(res[0].key);
      Swal.fire({
        icon: "success",
        title: "Gambar terupload!",
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
    if (file) await startUpload([file]);
  };

  const handleRemoveImage = async () => {
    if (imageKey) {
      await deleteImageFromUT(imageKey);
      setImageUrl("");
      setImageKey("");
    }
  };

  // Validasi: Judul, Kategori, dan Gambar harus ada
  const isFormValid =
    title.trim() !== "" && kategoriId !== "" && imageUrl !== "" && !isUploading;

  async function handleSubmit(formData: FormData) {
    if (!isFormValid) return;

    if (imageUrl) formData.append("image", imageUrl);

    const result = await addNews(formData);

    if (result?.success) {
      setIsSubmitted(true); // Flag agar cleanup tidak menghapus gambar
      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Berita berhasil diterbitkan.",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        router.push("/dashboard/berita");
        router.refresh();
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: result?.message || "Terjadi kesalahan.",
      });
    }
  }

  return (
    <>
      <Breadcrumb pageName="Tambahkan Berita" />

      <ShowcaseSection title="Form Publikasi Berita Baru">
        <form action={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                Judul Berita <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Masukkan judul..."
                className="dark:border-strokedark dark:bg-meta-4 w-full rounded-xl border border-gray-300 bg-transparent px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                Kategori <span className="text-red-500">*</span>
              </label>
              <select
                name="kategoriId"
                value={kategoriId}
                onChange={(e) => setKategoriId(e.target.value)}
                required
                disabled={isLoadingCategories}
                className="dark:border-strokedark dark:bg-meta-4 w-full appearance-none rounded-xl border border-gray-300 bg-transparent px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary disabled:opacity-50"
              >
                <option value="">
                  {isLoadingCategories
                    ? "Memuat kategori..."
                    : "-- Pilih Kategori --"}
                </option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nama}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Ringkasan & Status */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                Ringkasan Singkat (Opsional)
              </label>
              <textarea
                name="ringkasan"
                rows={3}
                placeholder="Teks pengantar untuk di halaman depan..."
                className="dark:border-strokedark dark:bg-meta-4 w-full rounded-xl border border-gray-300 bg-transparent px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              ></textarea>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                Status Publikasi
              </label>
              <select
                name="published"
                className="dark:border-strokedark dark:bg-meta-4 w-full appearance-none rounded-xl border border-gray-300 bg-transparent px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              >
                <option value="true">🟢 Langsung Publish</option>
                <option value="false">🟡 Simpan sebagai Draft</option>
              </select>
            </div>
          </div>

          {/* Upload Gambar Utama */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-900 dark:text-white">
              Gambar Utama{" "}
              {isUploading && (
                <span className="ml-2 animate-pulse text-primary">
                  (Mengunggah...)
                </span>
              )}
            </label>
            {!imageUrl ? (
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={isUploading}
                className="dark:border-strokedark dark:file:bg-meta-4 w-full cursor-pointer rounded-xl border border-gray-300 bg-transparent file:cursor-pointer file:border-0 file:bg-gray-100 file:px-5 file:py-3 file:text-sm file:font-medium file:text-gray-900 hover:file:bg-gray-200 dark:file:text-white"
              />
            ) : (
              <div className="dark:border-strokedark relative h-48 w-full overflow-hidden rounded-xl border border-gray-200 shadow-sm md:w-1/2">
                <Image
                  src={imageUrl}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute right-2 top-2 rounded-full bg-red-500 p-2 text-white shadow-md transition-colors hover:bg-red-600"
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

          {/* Editor Konten */}
          <RichTextEditor
            label="Isi Konten Berita"
            name="content"
            placeholder="Tulis detail berita secara lengkap di sini..."
          />

          <div className="dark:border-strokedark flex justify-end border-t border-gray-100 pt-4">
            <SubmitButton disabled={!isFormValid || isLoadingCategories} />
          </div>
        </form>
      </ShowcaseSection>
    </>
  );
}
