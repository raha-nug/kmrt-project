// src/app/dashboard/kategori/actions.ts
"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Mengubah teks menjadi slug URL-friendly (contoh: "Kegiatan KMRT" -> "kegiatan-kmrt")
const generateSlug = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

// 1. Ambil semua kategori
export async function getKategori() {
  try {
    return await prisma.kategori.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error fetching kategori:", error);
    return [];
  }
}

// 2. Tambah kategori baru
export async function createKategori(formData: FormData) {
  try {
    const nama = formData.get("nama") as string;
    if (!nama) return { success: false, message: "Nama kategori wajib diisi" };

    const slug = generateSlug(nama);

    // Cek apakah kategori sudah ada
    const existing = await prisma.kategori.findUnique({ where: { slug } });
    if (existing) return { success: false, message: "Kategori ini sudah ada" };

    await prisma.kategori.create({
      data: { nama, slug },
    });

    revalidatePath("/dashboard/kategori");
    return { success: true, message: "Kategori berhasil ditambahkan" };
  } catch (error) {
    console.error("Error create kategori:", error);
    return { success: false, message: "Gagal menyimpan kategori" };
  }
}

// 3. Hapus Kategori (Akan ditangani oleh DeleteButton yang sudah Anda miliki)
export async function deleteKategori(id: string) {
  try {
    // Opsional: Cek apakah kategori sedang dipakai oleh berita
    const cekBerita = await prisma.berita.findFirst({
      where: { kategoriId: id },
    });
    if (cekBerita) {
      return {
        success: false,
        message:
          "Kategori tidak bisa dihapus karena sedang digunakan oleh berita",
      };
    }

    await prisma.kategori.delete({ where: { id } });
    revalidatePath("/dashboard/kategori");
    return { success: true, message: "Kategori berhasil dihapus" };
  } catch (error) {
    return { success: false, message: "Gagal menghapus kategori" };
  }
}
