import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface Params {
  params: { id: string };
}

// DELETE: Menghapus foto dari galeri
export async function DELETE(req: Request, { params }: Params) {
  try {
    const id = params.id;

    // Opsional: Cek apakah data ada sebelum dihapus
    const item = await prisma.galeri.findUnique({
      where: { id },
    });

    if (!item) {
      return NextResponse.json(
        { error: "Data tidak ditemukan" },
        { status: 404 },
      );
    }

    await prisma.galeri.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Foto berhasil dihapus dari galeri" },
      { status: 200 },
    );
  } catch (error) {
    console.error("DELETE_GALERI_ERROR:", error);
    return NextResponse.json(
      { error: "Gagal menghapus data" },
      { status: 500 },
    );
  }
}

// GET UNIQUE: Mengambil satu data galeri (opsional)
export async function GET(req: Request, { params }: Params) {
  try {
    const item = await prisma.galeri.findUnique({
      where: { id: params.id },
    });

    if (!item) {
      return NextResponse.json(
        { error: "Data tidak ditemukan" },
        { status: 404 },
      );
    }

    return NextResponse.json(item, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 });
  }
}
