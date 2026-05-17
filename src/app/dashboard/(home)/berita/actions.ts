"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

// 1. FUNGSI UNTUK MENGAMBIL DAFTAR BERITA (PENTING)
export async function getBerita(
  page: number = 1,
  query: string = "",
  statusFilter: string = "",
) {
  const take = 10;
  const skip = (page - 1) * take;

  const where: any = {};

  // Logika Filter Status
  if (statusFilter === "PUBLISHED") where.published = true;
  if (statusFilter === "DRAFT") where.published = false;

  // Logika Search
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

// 2. FUNGSI TAMBAH BERITA
export async function addNews(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const image = formData.get("image") as string;
    const kategoriId = formData.get("kategoriId") as string;
    const ringkasan = formData.get("ringkasan") as string;

    // SwitcherOne mengirim "1" untuk true
    const published = formData.get("published") === "1";

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

    revalidatePath("/");
    revalidatePath("/dashboard/berita");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Gagal menyimpan ke database." };
  }
}

// 3. FUNGSI UPDATE BERITA
export async function updateNews(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const newImageUrl = formData.get("image") as string; // URL Baru
    const kategoriId = formData.get("kategoriId") as string;
    const ringkasan = formData.get("ringkasan") as string;
    const published = formData.get("published") === "1";

    if (!id || !title || !content || !kategoriId) {
      return { success: false, message: "Field wajib tidak boleh kosong!" };
    }

    // 1. Ambil data lama sebelum diupdate untuk mendapatkan URL gambar lama
    const oldNews = await prisma.berita.findUnique({
      where: { id },
      select: { gambar: true },
    });

    const slug =
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "") +
      "-" +
      id.substring(0, 5);

    // 2. Update database
    await prisma.berita.update({
      where: { id },
      data: {
        judul: title,
        slug,
        ringkasan,
        konten: content,
        gambar: newImageUrl,
        kategoriId,
        published,
      },
    });

    // 3. LOGIKA PEMBERSIHAN GAMBAR LAMA
    // Jika gambar diganti (URL baru != URL lama) dan gambar lama ada
    if (oldNews?.gambar && oldNews.gambar !== newImageUrl) {
      // Ambil fileKey dari URL (asumsi format UploadThing: https://utfs.io/f/FILE_KEY)
      const oldFileKey = oldNews.gambar.split("/f/")[1];
      if (oldFileKey) {
        try {
          await utapi.deleteFiles(oldFileKey);
          console.log("Gambar lama berhasil dihapus dari UT:", oldFileKey);
        } catch (delError) {
          console.error("Gagal menghapus gambar lama dari UT:", delError);
          // Kita tidak return error di sini agar proses update tetap dianggap sukses
        }
      }
    }

    revalidatePath("/");
    revalidatePath("/dashboard/berita");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Gagal memperbarui database." };
  }
}

// 4. FUNGSI PENDUKUNG LAINNYA
export async function deleteImageFromUT(fileKey: string) {
  if (!fileKey) return { success: false };
  try {
    await utapi.deleteFiles(fileKey);
    return { success: true };
  } catch (error) {
    console.error("UT Delete Error:", error);
    return { success: false };
  }
}

export async function getAllKategoriForForm() {
  return await prisma.kategori.findMany({
    select: { id: true, nama: true },
    orderBy: { nama: "asc" },
  });
}

export async function getNewsById(id: string) {
  return await prisma.berita.findUnique({
    where: { id },
  });
}

export async function deleteNews(id: string) {
  try {
    // 1. Cari data berita terlebih dahulu untuk mendapatkan URL gambar
    const news = await prisma.berita.findUnique({
      where: { id },
      select: { gambar: true },
    });

    if (!news) {
      return { success: false, message: "Berita tidak ditemukan." };
    }

    // 2. Hapus file dari UploadThing jika ada
    if (news.gambar) {
      // Ambil fileKey dari URL (Format: https://utfs.io/f/FILE_KEY)
      const fileKey = news.gambar.split("/f/")[1];

      if (fileKey) {
        try {
          await utapi.deleteFiles(fileKey);
          console.log("Gambar berhasil dihapus dari UploadThing:", fileKey);
        } catch (delError) {
          // Kita log error tapi tetap lanjut menghapus data di DB
          // agar data tidak "nyangkut" karena masalah storage
          console.error("Gagal menghapus file di UploadThing:", delError);
        }
      }
    }

    // 3. Hapus data dari database Prisma
    await prisma.berita.delete({
      where: { id },
    });

    // Revalidasi cache agar tampilan web langsung update
    revalidatePath("/");
    revalidatePath("/dashboard/berita");

    return { success: true, message: "Berita dan gambar berhasil dihapus." };
  } catch (error) {
    console.error("Error Delete News:", error);
    return { success: false, message: "Gagal menghapus berita." };
  }
}

export async function getNewsBySlug(slug: string) {
  try {
    return await prisma.berita.findUnique({
      where: { slug, published: true },
      include: { kategori: true },
    });
  } catch (error) {
    console.error("Error fetching berita by slug:", error);
    return null;
  }
}