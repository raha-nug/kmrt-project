import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Newspaper, Image as ImageIcon, ShieldAlert } from "lucide-react";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  const user = session?.user as
    | { name?: string | null; email?: string | null; role?: string }
    | undefined;
  const role = user?.role;

  // Mengambil total data dari database secara paralel
  const [totalBerita, totalGaleri, totalPengaduan] = await Promise.all([
    prisma.berita.count(),
    prisma.galeri.count(),
    prisma.pengaduan.count(),
  ]);

  return (
    <>
      <Breadcrumb pageName="Dashboard" />

      {/* Sambutan (Flat Design tanpa shadow) */}
      <div className="dark:border-strokedark dark:bg-boxdark mb-8 rounded-xl border border-gray-200 bg-white p-8">
        <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
          Selamat Datang, {user?.name || "Admin"}
        </h1>
      </div>

      {/* Grid Kartu Total Data */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
        {/* KARTU PENGADUAN */}
        {(role === "ADMIN_PENGADUAN" || role === "SUPER_ADMIN" || !role) && (
          <div className="dark:border-strokedark dark:bg-boxdark rounded-xl border border-gray-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Total Pengaduan
                </p>
                <h4 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                  {totalPengaduan}
                </h4>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-[#b91c1c] dark:bg-red-500/10 dark:text-red-500">
                <ShieldAlert className="h-6 w-6" />
              </div>
            </div>
          </div>
        )}

        {/* KARTU BERITA */}
        {(role === "ADMIN_KONTEN" || role === "SUPER_ADMIN" || !role) && (
          <div className="dark:border-strokedark dark:bg-boxdark rounded-xl border border-gray-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Total Publikasi
                </p>
                <h4 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                  {totalBerita}
                </h4>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-500">
                <Newspaper className="h-6 w-6" />
              </div>
            </div>
          </div>
        )}

        {/* KARTU GALERI */}
        {(role === "ADMIN_KONTEN" || role === "SUPER_ADMIN" || !role) && (
          <div className="dark:border-strokedark dark:bg-boxdark rounded-xl border border-gray-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Total Galeri
                </p>
                <h4 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                  {totalGaleri}
                </h4>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-500">
                <ImageIcon className="h-6 w-6" />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
