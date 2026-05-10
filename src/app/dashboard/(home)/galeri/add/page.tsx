"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import InputGroup from "@/components/FormElements/InputGroup";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import React, { useState } from "react";
import { addGaleri } from "../actions";
import { SubmitButton } from "@/components/FormElements/SubmitButton";
import Swal from "sweetalert2";
import Image from "next/image";
import { useUploadThing } from "@/utils/uploadthing";

export default function AddGaleriPage() {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);

  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      setIsUploading(false);
      setImageUrl(res[0].url);
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

  async function handleSubmit(formData: FormData) {
    if (!imageUrl) {
      Swal.fire({
        icon: "error",
        title: "Peringatan",
        text: "Pilih dan upload gambar terlebih dahulu!",
      });
      return;
    }

    formData.append("image", imageUrl);
    const result = await addGaleri(formData);

    if (result.success) {
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
            placeholder="Misal: Kegiatan Rapat Desa"
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
                className="file:bg-whiter w-full rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-0 file:px-5 file:py-3 file:hover:bg-primary focus:border-primary disabled:bg-gray-2"
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
                  onClick={() => setImageUrl("")}
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
            <SubmitButton disabled={isUploading} />
          </div>
        </form>
      </ShowcaseSection>
    </>
  );
}
