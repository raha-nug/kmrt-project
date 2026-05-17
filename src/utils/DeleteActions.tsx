"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export async function deleteFunc(id: string, path: string) {
  // 1. Cek Autentikasi & Otorisasi
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Anda harus login untuk menghapus data");
  }

  try {
    const modelName = path.toLowerCase();

    // --- LOGIKA PENGHAPUSAN BERITA ---
    if (modelName === "berita") {
      // Ambil data untuk mendapatkan URL gambar
      const news = await prisma.berita.findUnique({
        where: { id },
        select: { gambar: true },
      });

      if (news?.gambar) {
        const fileKey = news.gambar.split("/f/")[1];
        if (fileKey) await utapi.deleteFiles(fileKey);
      }
      await prisma.berita.delete({ where: { id } });
    }

    // --- LOGIKA PENGHAPUSAN GALERI ---
    else if (modelName === "galeri") {
      // Ambil data untuk mendapatkan URL gambar
      const galeri = await prisma.galeri.findUnique({
        where: { id },
        select: { gambar: true }, // Sesuaikan nama field gambar di model Galeri kamu
      });

      if (galeri?.gambar) {
        const fileKey = galeri.gambar.split("/f/")[1];
        if (fileKey) await utapi.deleteFiles(fileKey);
      }
      await prisma.galeri.delete({ where: { id } });
    }

    // --- LOGIKA PENGHAPUSAN LAINNYA ---
    else if (modelName === "pengaduan") {
      await prisma.pengaduan.delete({ where: { id } });
    } else {
      throw new Error("Model tidak dikenal");
    }

    // 3. Bersihkan cache agar data di layar langsung update
    // Revalidate halaman spesifik dan halaman utama jika perlu
    revalidatePath(`/dashboard/${modelName}`);
    if (modelName === "berita" || modelName === "galeri") {
      revalidatePath("/"); // Update landing page
    }

    return { success: true };
  } catch (error: any) {
    console.error("DELETE_ERROR:", error);
    throw new Error(error.message || "Gagal menghapus data");
  }
}
