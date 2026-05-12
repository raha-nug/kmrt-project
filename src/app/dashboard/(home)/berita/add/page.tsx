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
import { addNews, getAllKategoriForForm, deleteImageFromUT } from "../actions";

export default function AddNewsPage() {
  const router = useRouter();

  // --- STATE UPLOAD ---
  const [imageUrl, setImageUrl] = useState<string>("");
  const [imageKey, setImageKey] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const imageKeyRef = useRef("");

  // --- STATE FORM ---
  const [title, setTitle] = useState("");
  const [kategoriId, setKategoriId] = useState("");
  const [categories, setCategories] = useState<{ id: string; nama: string }[]>(
    [],
  );
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  useEffect(() => {
    imageKeyRef.current = imageKey;
  }, [imageKey]);

  useEffect(() => {
    return () => {
      if (imageKeyRef.current && !isSubmitted) {
        deleteImageFromUT(imageKeyRef.current);
      }
    };
  }, [isSubmitted]);

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
    },
    onUploadError: () => setIsUploading(false),
    onUploadBegin: () => setIsUploading(true),
  });

  const handleRemoveImage = async () => {
    if (imageKey) {
      await deleteImageFromUT(imageKey);
      setImageUrl("");
      setImageKey("");
    }
  };

  const isFormValid =
    title.trim() !== "" && kategoriId !== "" && imageUrl !== "" && !isUploading;

  async function handleSubmit(formData: FormData) {
    if (!isFormValid) return;
    formData.append("image", imageUrl);

    const result = await addNews(formData);
    if (result?.success) {
      setIsSubmitted(true);
      Swal.fire({
        icon: "success",
        title: "Berhasil Terbit",
        timer: 1500,
        showConfirmButton: false,
      });
      router.push("/dashboard/berita");
      router.refresh();
    }
  }

  return (
    <>
      <Breadcrumb pageName="Tambah Berita" />

      <ShowcaseSection title="Form Publikasi Berita">
        <form action={handleSubmit} className="max-w-4xl space-y-6">
          {/* 1. Judul Berita */}
          <InputGroup
            type="text"
            label="Judul Berita"
            name="title"
            value={title}
            handleChange={(e) => setTitle(e.target.value)}
            placeholder="Ketik judul berita..."
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
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) startUpload([file]);
                  }}
                  className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                />
                <div className="flex flex-col items-center justify-center space-y-1 text-center">
                  <span className="text-sm font-medium text-slate-500">
                    Pilih Gambar
                  </span>
                  <span className="text-xs text-slate-400">
                    Rasio 16:9 disarankan
                  </span>
                </div>
              </div>
            ) : (
              <div className="relative h-48 w-full max-w-sm overflow-hidden rounded-xl border border-stroke shadow-sm">
                <Image
                  src={imageUrl}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
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
            <SwitcherOne name="published" defaultValue={true} />
          </div>

          {/* 6. Editor Isi Konten */}
          <RichTextEditor label="Isi Konten Berita" name="content" />

          {/* Tombol Aksi */}
          <div className="dark:border-strokedark flex items-center justify-end border-t border-stroke pt-6">
            <SubmitButton disabled={!isFormValid || isLoadingCategories} />
          </div>
        </form>
      </ShowcaseSection>
    </>
  );
}
