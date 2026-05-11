import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { getPengaduan } from "./actions";
import Pagination from "@/components/ui-elements/Pagination";
import DeleteButton from "@/components/DeleteButton";
import { deleteFunc } from "@/utils/DeleteActions";
import StatusUpdater from "./StatusUpdater";
import Link from "next/link";
import { Eye } from "lucide-react";
import FilterPengaduan from "./FilterPengaduan";
import { StatusPengaduan } from "@prisma/client";

interface PengaduanItem {
  id: string;
  namaPelapor: string | null;
  kontak: string | null;
  kronologi: string;
  status: StatusPengaduan;
  createdAt: Date | string;
}

export default async function PengaduanPage({
  searchParams,
}: {
  searchParams?: Promise<{
    page?: string;
    q?: string;
    status?: string;
  }>;
}) {
  const params = await searchParams;

  const page = Number(params?.page ?? 1);
  const q = params?.q || "";
  const status = params?.status || "";

  // Mengambil data pengaduan
  const hasil = await getPengaduan(page, q, status);

  return (
    <>
      <Breadcrumb pageName="Manajemen Pengaduan" />

      {/* Filter & Pencarian */}
      <FilterPengaduan />

      <ShowcaseSection title="Daftar Laporan Masyarakat" className="space-y-4">
        <div className="dark:border-strokedark dark:bg-boxdark overflow-x-auto rounded-xl border border-stroke bg-white">
          <table className="w-full table-auto">
            <thead>
              <tr className="dark:bg-meta-4 bg-gray-2 text-left">
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  ID Tiket
                </th>

                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Pelapor
                </th>

                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Kronologi (Cuplikan)
                </th>

                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Status
                </th>

                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Tanggal
                </th>

                <th className="px-4 py-4 text-center font-medium text-black dark:text-white">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody>
              {hasil.data.map((item: PengaduanItem) => (
                <tr
                  key={item.id}
                  className="dark:border-strokedark border-b border-stroke"
                >
                  {/* ID */}
                  <td className="px-4 py-5">
                    <p className="font-mono text-sm text-gray-500 dark:text-gray-400">
                      {item.id.split("-")[0].toUpperCase()}...
                    </p>
                  </td>

                  {/* Pelapor */}
                  <td className="px-4 py-5">
                    <p className="font-medium text-black dark:text-white">
                      {item.namaPelapor || "Anonim"}
                    </p>

                    <p className="text-xs text-gray-500">
                      {item.kontak || "-"}
                    </p>
                  </td>

                  {/* Kronologi */}
                  <td className="max-w-[200px] px-4 py-5">
                    <p className="truncate text-sm text-black dark:text-white">
                      {item.kronologi}
                    </p>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-5">
                    <StatusUpdater id={item.id} currentStatus={item.status} />
                  </td>

                  {/* Tanggal */}
                  <td className="px-4 py-5">
                    <p className="text-sm text-black dark:text-white">
                      {new Date(item.createdAt).toLocaleDateString("id-ID")}
                    </p>
                  </td>

                  {/* Aksi */}
                  <td className="px-4 py-5">
                    <div className="flex items-center justify-center space-x-2">
                      <Link
                        href={`/dashboard/pengaduan/${item.id}`}
                        className="flex h-8 w-8 items-center justify-center rounded bg-primary text-white hover:bg-opacity-90"
                        title="Lihat Detail & Bukti"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>

                      <DeleteButton
                        id={item.id}
                        deleteAction={deleteFunc}
                        path="Pengaduan"
                        folder="dashboard"
                      />
                    </div>
                  </td>
                </tr>
              ))}

              {/* Empty State */}
              {hasil.data.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center">
                    <p className="font-medium text-gray-500">
                      Data pengaduan tidak ditemukan.
                    </p>

                    {q || status ? (
                      <p className="mt-1 text-sm text-gray-400">
                        Coba gunakan kata kunci atau filter status yang berbeda.
                      </p>
                    ) : null}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={hasil.current_page}
          lastPage={hasil.last_page}
          path="/dashboard/pengaduan"
        />
      </ShowcaseSection>
    </>
  );
}
