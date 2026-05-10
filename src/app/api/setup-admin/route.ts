// src/app/api/setup-admin/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function GET() {
  try {
    const adminCount = await prisma.user.count();
    if (adminCount > 0) {
      return NextResponse.json({ message: "Data admin sudah ada!" });
    }

    // 1. Buat roles satu per satu agar kita dapat ID-nya
    const [roleKonten, rolePengaduan] = await Promise.all([
      prisma.role.create({ data: { name: "ADMIN_KONTEN" } }),
      prisma.role.create({ data: { name: "ADMIN_PENGADUAN" } }),
    ]);

    const hashedPassword = await bcrypt.hash("rahasia123", 10);

    // 2. Buat users menggunakan ID dari role di atas
    await prisma.user.createMany({
      data: [
        {
          email: "adminkonten@admin.com",
          password: hashedPassword,
          name: "Budi (Admin Konten)",
          roleId: roleKonten.id, // ID asli dari DB
        },
        {
          email: "adminpengaduan@admin.com",
          password: hashedPassword,
          name: "Siti (Admin Pengaduan)",
          roleId: rolePengaduan.id, // ID asli dari DB
        },
      ],
    });

    return NextResponse.json({ message: "Berhasil! 2 Akun dibuat." });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal membuat admin" }, { status: 500 });
  }
}
