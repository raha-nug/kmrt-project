import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET ALL: Menampilkan semua berita
export async function GET() {
  try {
    const berita = await prisma.berita.findMany({
      include: {
        kategori: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(berita, { status: 200 });
  } catch (error) {
    console.error("GET_BERITA_ERROR:", error);

    return NextResponse.json(
      { error: "Gagal mengambil data berita" },
      { status: 500 },
    );
  }
}

// POST: Membuat berita baru
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      judul,
      konten,
      gambar,
      published,
      kategoriId,
    } = body;

    // Validasi
    if (!judul || !konten || !kategoriId) {
      return NextResponse.json(
        {
          error: "Judul, konten, dan kategori wajib diisi",
        },
        { status: 400 },
      );
    }

    // Generate slug
    const slug =
      judul
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "") +
      "-" +
      Math.random().toString(36).substring(2, 7);

    const newBerita = await prisma.berita.create({
      data: {
        judul,
        slug,
        konten,
        gambar,
        published: published ?? false,

        // RELASI KATEGORI
        kategori: {
          connect: {
            id: kategoriId,
          },
        },
      },
      include: {
        kategori: true,
      },
    });

    return NextResponse.json(newBerita, {
      status: 201,
    });
  } catch (error: any) {
    console.error("POST_BERITA_ERROR:", error);

    if (error.code === "P2002") {
      return NextResponse.json(
        {
          error: "Judul sudah digunakan",
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: "Gagal membuat berita" },
      { status: 500 },
    );
  }
}