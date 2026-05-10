"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function deleteFunc(id: string, path: string) {
  // 1. Cek Autentikasi & Otorisasi
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Anda harus login untuk menghapus data");
  }

  try {
    // 2. Eksekusi penghapusan berdasarkan path (nama model)
    // Kita buat mapping agar dinamis
    const modelName = path.toLowerCase();

    if (modelName === "berita") {
      await prisma.berita.delete({ where: { id } });
    } else if (modelName === "galeri") {
      await prisma.galeri.delete({ where: { id } });
    } else if (modelName === "pengaduan") {
      await prisma.pengaduan.delete({ where: { id } });
    } else {
      throw new Error("Model tidak dikenal");
    }

    // 3. Bersihkan cache agar data di layar langsung update
    revalidatePath(`/dashboard/${path.toLowerCase()}`);

    return { success: true };
  } catch (error: any) {
    console.error("DELETE_ERROR:", error);
    throw new Error(error.message || "Gagal menghapus data");
  }
}
