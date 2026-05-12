"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

// Mengambil semua berita dengan paginasi
export async function getBerita(
  page: number = 1,
  query: string = "",
  statusFilter: string = "",
) {
  const take = 10;
  const skip = (page - 1) * take;

  const where: any = {};

  if (statusFilter === "PUBLISHED") where.published = true;
  if (statusFilter === "DRAFT") where.published = false;

  if (query) {
    where.OR = [
      { judul: { contains: query, mode: "insensitive" } },
      { ringkasan: { contains: query, mode: "insensitive" } },
    ];
  }

  try {
    const [data, total] = await Promise.all([
      prisma.berita.findMany({
        where,
        take,
        skip,
        orderBy: { createdAt: "desc" },
        include: { kategori: true },
      }),
      prisma.berita.count({ where }),
    ]);

    return {
      data,
      current_page: page,
      last_page: Math.ceil(total / take) || 1,
      total_data: total,
    };
  } catch (error) {
    console.error("Error fetching berita:", error);
    return { data: [], current_page: 1, last_page: 1, total_data: 0 };
  }
}

// Menghapus file dari UploadThing storage
export async function deleteImageFromUT(fileKey: string) {
  if (!fileKey) return { success: false, message: "File Key diperlukan." };
  try {
    const response = await utapi.deleteFiles(fileKey);
    return { success: response.success };
  } catch (error) {
    console.error("UploadThing Delete Error:", error);
    return { success: false, message: "Gagal menghapus file di storage." };
  }
}

// Mengambil satu berita berdasarkan ID
export async function getNewsById(id: string) {
  return await prisma.berita.findUnique({
    where: { id },
  });
}

// Mengambil detail berita berdasarkan slug
export async function getNewsBySlug(slug: string) {
  try {
    return await prisma.berita.findUnique({
      where: { slug: slug },
    });
  } catch (error) {
    console.error("Error fetching news detail:", error);
    return null;
  }
}

export async function getAllKategoriForForm() {
  return await prisma.kategori.findMany({
    select: { id: true, nama: true },
    orderBy: { nama: "asc" },
  });
}

// Menambah berita
export async function addNews(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const image = formData.get("image") as string;
    const kategoriId = formData.get("kategoriId") as string;
    const ringkasan = formData.get("ringkasan") as string;
    const published = formData.get("published") === "true";

    if (!title || !content || !kategoriId || !image) {
      return {
        success: false,
        message: "Judul, Kategori, Konten, dan Gambar Utama wajib diisi!",
      };
    }

    const slug =
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "") +
      "-" +
      Math.random().toString(36).substring(2, 7);

    await prisma.berita.create({
      data: {
        judul: title,
        slug,
        ringkasan,
        konten: content,
        gambar: image,
        kategoriId,
        published,
      },
    });

    revalidatePath("/dashboard/berita");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Gagal menyimpan ke database." };
  }
}

// Update berita
export async function updateNews(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const image = formData.get("image") as string;
    const kategoriId = formData.get("kategoriId") as string;
    const ringkasan = formData.get("ringkasan") as string;
    const published = formData.get("published") === "true";

    if (!id || !title || !content || !kategoriId) {
      return { success: false, message: "Field wajib tidak boleh kosong!" };
    }

    const slug =
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "") +
      "-" +
      id.substring(0, 5);

    await prisma.berita.update({
      where: { id },
      data: {
        judul: title,
        slug: slug,
        ringkasan,
        konten: content,
        gambar: image || null,
        kategoriId,
        published,
      },
    });

    revalidatePath("/dashboard/berita");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Gagal memperbarui database." };
  }
}
