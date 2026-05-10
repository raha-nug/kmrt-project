"use server";

import prisma from "@/lib/prisma";

// 1. Fungsi Kirim Pengaduan (Diperbarui untuk mengembalikan ID)
export async function kirimPengaduan(formData: FormData) {
  try {
    const namaPelapor = formData.get("namaPelapor") as string;
    const kontak = formData.get("kontak") as string;
    const kronologi = formData.get("kronologi") as string;
    const bukti = formData.get("bukti") as string;

    if (!kronologi) {
      return { success: false, message: "Kronologi kejadian wajib diisi!" };
    }

    const laporanBaru = await prisma.pengaduan.create({
      data: {
        namaPelapor: namaPelapor ? namaPelapor : "Anonim",
        kontak: kontak ? kontak : "Tidak disertakan",
        kronologi,
        bukti: bukti ? bukti : null,
      },
    });

    // KEMBALIKAN ID SEBAGAI KODE TIKET
    return {
      success: true,
      tiketId: laporanBaru.id,
      message: "Laporan berhasil dikirim dan dienkripsi.",
    };
  } catch (error) {
    console.error("Error submit pengaduan:", error);
    return {
      success: false,
      message: "Terjadi kesalahan pada server. Coba lagi.",
    };
  }
}

// 2. Fungsi BARU: Cek Status Pengaduan
export async function cekStatusLaporan(tiketId: string) {
  try {
    // Cari laporan hanya berdasarkan ID, dan hanya kembalikan status & tanggal (demi keamanan)
    const laporan = await prisma.pengaduan.findUnique({
      where: { id: tiketId.trim() },
      select: {
        status: true,
        createdAt: true,
      },
    });

    if (!laporan) {
      return {
        success: false,
        message: "Kode Tiket tidak ditemukan dalam sistem kami.",
      };
    }

    return { success: true, data: laporan };
  } catch (error) {
    console.error("Error cek status:", error);
    return {
      success: false,
      message: "Terjadi kesalahan sistem saat mencari tiket.",
    };
  }
}
