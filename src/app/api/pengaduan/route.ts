import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET ALL: Admin melihat semua pengaduan
export async function GET() {
  try {
    const pengaduan = await prisma.pengaduan.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(pengaduan, { status: 200 });
  } catch (error) {
    console.error("GET_PENGADUAN_ERROR:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data pengaduan" },
      { status: 500 },
    );
  }
}

// POST: Masyarakat mengirim pengaduan baru
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { namaPelapor, kontak, kronologi, bukti } = body;

    // Validasi input minimal
    if (!kronologi) {
      return NextResponse.json(
        { error: "Isi kronologi pengaduan wajib diisi" },
        { status: 400 },
      );
    }

    const newPengaduan = await prisma.pengaduan.create({
      data: {
        namaPelapor: namaPelapor || "Anonim", // Jika tidak diisi, default Anonim
        kontak: kontak || "-",
        kronologi,
        bukti, // URL dari UploadThing (opsional)
        status: "MENUNGGU", // Default status sesuai enum di schema
      },
    });

    return NextResponse.json(newPengaduan, { status: 201 });
  } catch (error) {
    console.error("POST_PENGADUAN_ERROR:", error);
    return NextResponse.json(
      { error: "Gagal mengirim pengaduan" },
      { status: 500 },
    );
  }
}
