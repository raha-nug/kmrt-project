import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface Params {
  params: Promise<{ id: string }>;
}

// GET UNIQUE: Ambil detail satu berita
export async function GET(req: Request, { params }: Params) {
  try {
    const { id } = await params;

    const berita = await prisma.berita.findUnique({
      where: { id },
    });

    if (!berita) {
      return NextResponse.json(
        { error: "Berita tidak ditemukan" },
        { status: 404 },
      );
    }

    return NextResponse.json(berita, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}

// PATCH: Update berita
export async function PATCH(req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await req.json();

    // Jika judul diupdate, slug juga harus diupdate agar tetap relevan
    if (body.judul) {
      body.slug =
        body.judul
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "") +
        "-" +
        Math.random().toString(36).substring(2, 7);
    }

    const updatedBerita = await prisma.berita.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(updatedBerita, { status: 200 });
  } catch (error) {
    console.error("PATCH_BERITA_ERROR:", error);

    return NextResponse.json(
      { error: "Gagal mengupdate berita" },
      { status: 500 },
    );
  }
}

// DELETE: Hapus berita
export async function DELETE(req: Request, { params }: Params) {
  try {
    const { id } = await params;

    await prisma.berita.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Berita berhasil dihapus" },
      { status: 200 },
    );
  } catch (error) {
    console.error("DELETE_BERITA_ERROR:", error);

    return NextResponse.json(
      { error: "Gagal menghapus berita" },
      { status: 500 },
    );
  }
}
