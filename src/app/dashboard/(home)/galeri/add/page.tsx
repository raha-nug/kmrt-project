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
  const [isSubmitted, setIsSubmitted] = useState(false);

  // State untuk form
  const [judul, setJudul] = useState("");
  const [tanggal, setTanggal] = useState("");

  // Ref untuk menyimpan key terbaru agar bisa diakses di dalam cleanup useEffect
  const imageKeyRef = useRef("");

  useEffect(() => {
    imageKeyRef.current = imageKey;
  }, [imageKey]);

  // Logic Cleanup: Hapus file jika user keluar halaman/tutup tab tanpa submit
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (imageKeyRef.current && !isSubmitted) {
        e.preventDefault();
        e.returnValue =
          "Foto yang diupload akan terhapus jika Anda keluar. Lanjutkan?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      // Jika komponen unmount (pindah page internal) dan belum submit, hapus file
      if (imageKeyRef.current && !isSubmitted) {
        deleteImageFromUT(imageKeyRef.current);
      }
    };
  }, [isSubmitted]);

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

    formData.append("image", imageUrl);
    formData.append("tanggal", tanggal); // Pastikan tanggal ikut terkirim

    const result = await addGaleri(formData);

    if (result.success) {
      setIsSubmitted(true); // Matikan proteksi cleanup
      await Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Foto ditambahkan ke galeri.",
      });
      window.location.href = "/dashboard/galeri";
    } else {
      Swal.fire({ icon: "error", title: "Error", text: result.message });
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
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) startUpload([file]);
                }}
                disabled={isUploading}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-0 file:px-5 file:py-3 file:hover:bg-primary focus:border-primary disabled:bg-gray-2"
              />
            ) : (
              <div className="relative h-60 w-full overflow-hidden rounded-lg border md:w-1/2">
                <Image
                  src={imageUrl}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute right-2 top-2 rounded-full bg-red-500 p-1.5 text-white shadow-lg"
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
