import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  // Endpoint untuk Berita dan Galeri
  imageUploader: f({ image: { maxFileSize: "4MB" } }).onUploadComplete(
    async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata);
      return { url: file.url };
    },
  ),

  // Endpoint untuk Bukti Pengaduan (bisa PDF atau Gambar)
  attachmentUploader: f({
    image: { maxFileSize: "4MB" },
    pdf: { maxFileSize: "8MB" },
  }).onUploadComplete(async ({ file }) => {
    return { url: file.url };
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
