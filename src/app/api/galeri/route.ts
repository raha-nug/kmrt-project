import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET ALL: Mengambil semua foto galeri
export async function GET() {
  try {
    const galeri = await prisma.galeri.findMany({
      orderBy: {
        createdAt: "desc", // Foto terbaru muncul pertama
      },
    });

    return NextResponse.json(galeri, { status: 200 });
  } catch (error) {
    console.error("GET_GALERI_ERROR:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data galeri" },
      { status: 500 },
    );
  }
}

// POST: Menambah foto baru ke galeri
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { judul, gambar } = body;

    // Validasi input
    if (!judul || !gambar) {
      return NextResponse.json(
        { error: "Judul dan Gambar wajib diisi" },
        { status: 400 },
      );
    }

    const newGaleri = await prisma.galeri.create({
      data: {
        judul,
        gambar, // URL dari UploadThing
      },
    });

    return NextResponse.json(newGaleri, { status: 201 });
  } catch (error) {
    console.error("POST_GALERI_ERROR:", error);
    return NextResponse.json(
      { error: "Gagal menambahkan foto ke galeri" },
      { status: 500 },
    );
  }
}
