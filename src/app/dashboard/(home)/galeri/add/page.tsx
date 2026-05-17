"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import InputGroup from "@/components/FormElements/InputGroup";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import React, { useState, useEffect, useRef } from "react";
import { addGaleri, deleteImageFromUT } from "../actions";
import { SubmitButton } from "@/components/FormElements/SubmitButton";
import Swal from "sweetalert2";
import Image from "next/image";
import { useUploadThing } from "@/utils/uploadthing";

export default function AddGaleriPage() {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [imageKey, setImageKey] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);

  // State untuk form
  const [judul, setJudul] = useState("");
  const [tanggal, setTanggal] = useState("");

  // ✅ Gunakan Ref agar sinkron seketika tanpa delay re-render
  const isSubmittedRef = useRef(false);
  const imageKeyRef = useRef("");

  // Sync imageKey ke ref setiap kali berubah
  useEffect(() => {
    imageKeyRef.current = imageKey;
  }, [imageKey]);

  // ✅ Cleanup: hanya hapus jika belum submit (pakai ref, bukan state)
  useEffect(() => {
    return () => {
      if (imageKeyRef.current && !isSubmittedRef.current) {
        deleteImageFromUT(imageKeyRef.current);
      }
    };
  }, []); // dependency kosong — hanya jalan saat unmount

  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      setIsUploading(false);
      setImageUrl(res[0].url);
      setImageKey(res[0].key);
      Swal.fire({
        icon: "success",
        title: "Upload Berhasil",
        timer: 1000,
        showConfirmButton: false,
      });
    },
    onUploadError: (error) => {
      setIsUploading(false);
      Swal.fire({ icon: "error", title: "Gagal", text: error.message });
    },
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
    judul.trim() !== "" && tanggal !== "" && imageUrl !== "" && !isUploading;

  async function handleSubmit(formData: FormData) {
    if (!isFormValid) return;

    // ✅ Kunci sebelum request — ref langsung berubah tanpa tunggu re-render
    isSubmittedRef.current = true;

    formData.append("image", imageUrl);
    formData.append("tanggal", tanggal);

    try {
      const result = await addGaleri(formData);
      if (result.success) {
        await Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Foto ditambahkan ke galeri.",
        });
        window.location.href = "/dashboard/galeri";
      } else {
        // ✅ Jika DB gagal, buka kembali kunci agar cleanup bisa jalan
        isSubmittedRef.current = false;
        Swal.fire({ icon: "error", title: "Error", text: result.message });
      }
    } catch (error) {
      isSubmittedRef.current = false;
      console.error(error);
      Swal.fire("Error", "Terjadi kesalahan sistem", "error");
    }
  }

  return (
    <>
      <Breadcrumb pageName="Tambah Galeri" />
      <ShowcaseSection title="Form Foto Galeri">
        <form action={handleSubmit} className="space-y-5">
          <InputGroup
            type="text"
            label="Judul Foto"
            name="judul"
            value={judul}
            handleChange={(e) => setJudul(e.target.value)}
            placeholder="Misal: Kegiatan Rapat Desa"
            required
          />
          <InputGroup
            type="date"
            label="Tanggal Kegiatan"
            name="tanggal"
            value={tanggal}
            handleChange={(e) => setTanggal(e.target.value)}
            required
          />
          <div className="space-y-2">
            <label className="block text-sm font-medium text-black dark:text-white">
              File Gambar{" "}
              {isUploading && (
                <span className="ml-2 animate-pulse text-primary">
                  (Proses Upload...)
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
                  disabled={isUploading}
                  className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                />
                <div className="flex flex-col items-center justify-center text-center">
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
          <div className="flex justify-end">
            <SubmitButton disabled={!isFormValid} />
          </div>
        </form>
      </ShowcaseSection>
    </>
  );
}
