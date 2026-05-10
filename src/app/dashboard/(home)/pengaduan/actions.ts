"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// 1. Ambil semua data pengaduan (Paginasi)
export async function getPengaduan(
  page: number = 1,
  query: string = "",
  statusFilter: string = "",
) {
  const take = 10;
  const skip = (page - 1) * take;

  // Bangun kondisi pencarian database (WHERE clause)
  const where: any = {};

  // Jika ada filter status (dan bukan 'ALL')
  if (statusFilter && statusFilter !== "ALL") {
    where.status = statusFilter;
  }

  // Jika ada kata kunci pencarian
  if (query) {
    where.OR = [
      { id: { contains: query } },
      { namaPelapor: { contains: query } },
      { kontak: { contains: query } },
      { kronologi: { contains: query } },
    ];
  }

  try {
    const [data, total] = await Promise.all([
      prisma.pengaduan.findMany({
        where,
        take,
        skip,
        orderBy: { createdAt: "desc" },
      }),
      prisma.pengaduan.count({ where }),
    ]);

    return {
      data,
      current_page: page,
      // Mencegah last_page menjadi 0 jika data kosong
      last_page: Math.ceil(total / take) || 1,
      total_data: total,
    };
  } catch (error) {
    console.error("Error fetching pengaduan:", error);
    return { data: [], current_page: 1, last_page: 1, total_data: 0 };
  }
}

// 2. Ambil detail pengaduan spesifik
export async function getPengaduanById(id: string) {
  try {
    return await prisma.pengaduan.findUnique({ where: { id } });
  } catch (error) {
    console.error("Error fetching detail:", error);
    return null;
  }
}

// 3. Update Status Pengaduan (Diproses, Selesai, dll)
// Anda harus menyesuaikan tipe enum-nya jika di schema Anda berbeda.
type StatusPengaduan = "MENUNGGU" | "DIPROSES" | "SELESAI" | "DITOLAK";

export async function updateStatusPengaduan(
  id: string,
  status: StatusPengaduan,
) {
  try {
    await prisma.pengaduan.update({
      where: { id },
      data: { status },
    });

    // Refresh halaman agar data terbaru langsung muncul
    revalidatePath("/dashboard/pengaduan");
    revalidatePath(`/dashboard/pengaduan/${id}`);

    return { success: true, message: "Status berhasil diperbarui." };
  } catch (error) {
    console.error("Gagal update status:", error);
    return { success: false, message: "Gagal memperbarui status." };
  }
}
