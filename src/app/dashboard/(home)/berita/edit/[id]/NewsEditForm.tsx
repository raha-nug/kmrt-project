"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

import InputGroup from "@/components/FormElements/InputGroup";
import { SubmitButton } from "@/components/FormElements/SubmitButton";
import RichTextEditor from "@/components/FormElements/Editor";

import { updateNews } from "../../actions"; // Gunakan action updateNews
import { useUploadThing } from "@/utils/uploadthing";

export default function NewsEditForm({ news }: { news: any }) {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string>(news.gambar || ""); // Sinkron dengan field DB 'gambar'
  const [isUploading, setIsUploading] = useState(false);

  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      setIsUploading(false);
      setImageUrl(res[0].url);
      Swal.fire({ icon: "success", title: "Gambar terupload!", timer: 1000, showConfirmButton: false });
    },
    onUploadError: (error) => {
      setIsUploading(false);
      Swal.fire({ icon: "error", title: "Upload Gagal", text: error.message });
    },
    onUploadBegin: () => {
      setIsUploading(true);
    },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await startUpload([file]);
  };

  async function handleClientAction(formData: FormData) {
    if (!imageUrl) {
      Swal.fire({ icon: "error", title: "Gagal", text: "Gambar tidak boleh kosong!" });
      return;
    }

    // Tambahkan URL gambar (baik yang baru diupload atau yang lama) ke formData
    formData.append("image", imageUrl);

    const result = await updateNews(formData);

    if (result.success) {
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
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: result.message || "Terjadi kesalahan.",
      });
    }
  }

  return (
    <form action={handleClientAction} className="space-y-4">
      {/* Hidden ID */}
      <input type="hidden" name="id" defaultValue={news.id} />

      <InputGroup
        label="Judul Berita"
        type="text"
        name="title"
        defaultValue={news.judul} // Sesuaikan dengan field DB 'judul'
        required
      />

      {/* Image Upload Section */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-black dark:text-white">
          Gambar Berita {isUploading && <span className="text-primary animate-pulse ml-2">(Mengunggah...)</span>}
        </label>

        <div className="flex flex-col gap-4">
          {imageUrl && (
            <div className="relative h-48 w-full md:w-1/2 overflow-hidden rounded-lg border border-stroke">
              <Image
                src={imageUrl}
                alt="Preview"
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => setImageUrl("")}
                className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white shadow-md hover:bg-red-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
              </button>
            </div>
          )}

          {!imageUrl && (
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={isUploading}
              className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary focus:border-primary disabled:bg-gray-2"
            />
          )}
        </div>
      </div>

      <RichTextEditor
        label="Konten Berita"
        name="content"
        defaultValue={news.konten} // Sesuaikan dengan field DB 'konten'
        placeholder="Tulis detail berita di sini..."
      />

      <div className="flex justify-end pt-4">
        <SubmitButton disabled={isUploading} />
      </div>
    </form>
  );
}