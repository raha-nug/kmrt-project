"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { UTApi } from "uploadthing/server";

// Inisialisasi UTApi untuk menghapus file di server UploadThing
const utapi = new UTApi();

/**
 * Mengambil semua foto galeri dengan paginasi
 * Diurutkan berdasarkan 'tanggal' kegiatan (bukan waktu upload)
 */
export async function getGaleri(page: number = 1) {
  const take = 10;
  const skip = (page - 1) * take;

  try {
    const [data, total] = await Promise.all([
      prisma.galeri.findMany({
        take,
        skip,
        orderBy: { tanggal: "desc" }, // Sekarang diurutkan berdasarkan tanggal kegiatan
      }),
      prisma.galeri.count(),
    ]);

    return {
      data,
      current_page: page,
      last_page: Math.ceil(total / take),
    };
  } catch (error) {
    console.error("Gagal mengambil data galeri:", error);
    return { data: [], current_page: 1, last_page: 1 };
  }
}

/**
 * Menambah foto ke galeri
 * Menerima judul, gambar (URL), dan tanggal kegiatan
 */
export async function addGaleri(formData: FormData) {
  try {
    const judul = formData.get("judul") as string;
    const gambar = formData.get("image") as string;
    const tanggal = formData.get("tanggal") as string;

    // Validasi dasar server-side
    if (!judul || !gambar || !tanggal) {
      return {
        success: false,
        message: "Judul, Gambar, dan Tanggal wajib diisi!",
      };
    }

    await prisma.galeri.create({
      data: {
        judul,
        gambar,
        tanggal: new Date(tanggal), // Pastikan input string dikonversi ke format Date Prisma
      },
    });

    revalidatePath("/dashboard/galeri");
    return { success: true };
  } catch (error) {
    console.error("Gagal menyimpan galeri:", error);
    return { success: false, message: "Gagal menyimpan ke database." };
  }
}

/**
 * Menghapus file dari UploadThing storage
 * Digunakan jika user membatalkan upload atau mengganti gambar sebelum disubmit
 */
export async function deleteImageFromUT(fileKey: string) {
  if (!fileKey) return { success: false, message: "File Key diperlukan." };

  try {
    const response = await utapi.deleteFiles(fileKey);

    if (response.success) {
      return { success: true };
    }

    return { success: false, message: "Gagal menghapus file di storage." };
  } catch (error) {
    console.error("UploadThing Delete Error:", error);
    return {
      success: false,
      message: "Terjadi kesalahan saat menghapus file.",
    };
  }
}
