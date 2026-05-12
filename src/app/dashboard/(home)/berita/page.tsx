import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import Link from "next/link";
import { getBerita } from "./actions";
import Pagination from "@/components/ui-elements/Pagination";
import DeleteButton from "@/components/DeleteButton";
import { deleteFunc } from "@/utils/DeleteActions";
import { Plus, Edit } from "lucide-react";
import FilterBerita from "./FilterBerita";
import { Button } from "@/components/ui-elements/button"; // Menggunakan button yang sama dengan Galeri

interface Kategori {
  nama: string;
}

interface BeritaItem {
  id: string;
  judul: string;
  createdAt: Date | string;
  published: boolean;
  kategori?: Kategori | null;
}

export default async function BeritaPage({
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

  const hasil = await getBerita(page, q, status);

  return (
    <>
      <Breadcrumb pageName="Manajemen Berita" />

      {/* Button Tambah Berita disamakan stylenya dengan Galeri */}
      <div className="mb-6 flex justify-end">
        <Link href="/dashboard/berita/add">
          <Button
            size="small"
            variant="primary"
            shape="rounded"
            label="+ Tambah Berita"
          />
        </Link>
      </div>

      <FilterBerita />

      <ShowcaseSection title="Data Berita" className="space-y-4">
        <div className="overflow-x-auto">
          {/* Table wrapper disamakan: border-gray-300 dan rounded-lg */}
          <table className="w-full table-auto overflow-hidden rounded-lg border border-gray-300 text-left">
            {/* Thead disamakan: bg-gray-100 */}
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 font-semibold text-gray-900">
                  Judul Berita
                </th>
                <th className="p-3 font-semibold text-gray-900">Kategori</th>
                <th className="p-3 text-center font-semibold text-gray-900">
                  Status
                </th>
                <th className="p-3 text-center font-semibold text-gray-900">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody>
              {hasil.data.map((item: BeritaItem) => (
                <tr
                  key={item.id}
                  className="border-t transition-colors hover:bg-gray-50"
                >
                  <td className="p-3">
                    <p
                      className="max-w-[250px] truncate font-medium text-gray-900"
                      title={item.judul}
                    >
                      {item.judul}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {new Date(item.createdAt).toLocaleDateString("id-ID")}
                    </p>
                  </td>

                  <td className="p-3">
                    <span className="rounded-md border border-gray-200 bg-gray-100 px-2 py-1 text-xs text-gray-600">
                      {item.kategori?.nama || "Umum"}
                    </span>
                  </td>

                  <td className="p-3 text-center">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                        item.published
                          ? "bg-green-100 text-green-700 ring-1 ring-green-200"
                          : "bg-yellow-100 text-yellow-700 ring-1 ring-yellow-200"
                      }`}
                    >
                      {item.published ? "Published" : "Draft"}
                    </span>
                  </td>

                  <td className="p-3">
                    <div className="flex items-center justify-center gap-3">
                      <Link
                        href={`/dashboard/berita/edit/${item.id}`}
                        className="text-gray-500 transition-colors hover:text-blue-600"
                      >
                        <Edit className="h-5 w-5" />
                      </Link>

                      <DeleteButton
                        id={item.id}
                        deleteAction={deleteFunc}
                        path="Berita"
                        folder="dashboard"
                      />
                    </div>
                  </td>
                </tr>
              ))}

              {hasil.data.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-gray-500">
                    Tidak ada berita yang ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {hasil.data.length > 0 && (
          <Pagination
            currentPage={hasil.current_page}
            lastPage={hasil.last_page}
            path="/dashboard/berita"
          />
        )}
      </ShowcaseSection>
    </>
  );
}
