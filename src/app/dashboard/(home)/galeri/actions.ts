"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Mengambil semua foto galeri dengan paginasi
export async function getGaleri(page: number = 1) {
  const take = 10;
  const skip = (page - 1) * take;

  const [data, total] = await Promise.all([
    prisma.galeri.findMany({
      take,
      skip,
      orderBy: { createdAt: "desc" },
    }),
    prisma.galeri.count(),
  ]);

  return {
    data,
    current_page: page,
    last_page: Math.ceil(total / take),
  };
}

// Menambah foto ke galeri
export async function addGaleri(formData: FormData) {
  try {
    const judul = formData.get("judul") as string;
    const gambar = formData.get("image") as string; // URL dari UploadThing

    if (!judul || !gambar) {
      return { success: false, message: "Judul dan Gambar wajib diisi!" };
    }

    await prisma.galeri.create({
      data: { judul, gambar },
    });

    revalidatePath("/dashboard/galeri");
    return { success: true };
  } catch (error) {
    return { success: false, message: "Gagal menyimpan ke database." };
  }
}