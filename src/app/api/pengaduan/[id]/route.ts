import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface Params {
  params: Promise<{ id: string }>;
}

// GET UNIQUE: Lihat detail pengaduan tertentu
export async function GET(req: Request, { params }: Params) {
  try {
    const { id } = await params;

    const data = await prisma.pengaduan.findUnique({
      where: { id },
    });

    if (!data) {
      return NextResponse.json(
        { error: "Data tidak ditemukan" },
        { status: 404 },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Kesalahan server" }, { status: 500 });
  }
}

// PATCH: Admin mengubah status pengaduan
export async function PATCH(req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { status } = body;

    // Validasi status
    const validStatus = ["MENUNGGU", "DIPROSES", "SELESAI", "DITOLAK"];

    if (status && !validStatus.includes(status)) {
      return NextResponse.json(
        { error: "Status tidak valid" },
        { status: 400 },
      );
    }

    const updated = await prisma.pengaduan.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PATCH_PENGADUAN_ERROR:", error);

    return NextResponse.json(
      { error: "Gagal memperbarui status" },
      { status: 500 },
    );
  }
}

// DELETE: Admin menghapus pengaduan
export async function DELETE(req: Request, { params }: Params) {
  try {
    const { id } = await params;

    await prisma.pengaduan.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Pengaduan berhasil dihapus",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal menghapus data" },
      { status: 500 },
    );
  }
}
