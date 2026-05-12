import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  // Endpoint untuk Berita dan Galeri
  imageUploader: f({ image: { maxFileSize: "4MB" } }).onUploadComplete(
    async ({ metadata, file }) => {
      console.log("Upload complete:", file.url);

      // PENTING: Kembalikan 'key' agar bisa ditangkap oleh onClientUploadComplete
      // dan digunakan untuk fungsi hapus jika user batal.
      return {
        url: file.url,
        key: file.key,
      };
    },
  ),

  // Endpoint untuk Bukti Pengaduan (bisa PDF atau Gambar)
  attachmentUploader: f({
    image: { maxFileSize: "4MB" },
    pdf: { maxFileSize: "4MB" },
  }).onUploadComplete(async ({ file }) => {
    return {
      url: file.url,
      key: file.key,
    };
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
