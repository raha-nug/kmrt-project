import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import Link from "next/link";
import { getBerita } from "./actions";
import Pagination from "@/components/ui-elements/Pagination";
import DeleteButton from "@/components/DeleteButton";
import { deleteFunc } from "@/utils/DeleteActions";
import { Plus, Edit, Eye } from "lucide-react";
import FilterBerita from "./FilterBerita";

export default async function BeritaPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string; q?: string; status?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params?.page ?? 1);
  const q = params?.q || "";
  const status = params?.status || "";

  const hasil = await getBerita(page, q, status);

  return (
    <>
      <Breadcrumb pageName="Manajemen Berita" />

      <div className="mb-6 flex items-center justify-end">
        
        <Link
          href="/dashboard/berita/add"
          className="flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-opacity-90 dark:bg-primary"
        >
          <Plus className="h-4 w-4" /> Tambah Berita
        </Link>
      </div>

      <FilterBerita />

      <ShowcaseSection title="Data Berita" className="space-y-4">
        <div className="dark:border-strokedark dark:bg-boxdark overflow-x-auto rounded-xl border border-stroke bg-white">
          <table className="w-full table-auto text-left">
            <thead>
              <tr className="dark:bg-meta-4 bg-gray-2">
                <th className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  Judul Berita
                </th>
                <th className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  Kategori
                </th>
                
                <th className="px-6 py-4 text-center font-semibold text-gray-900 dark:text-white">
                  Status
                </th>
                <th className="px-6 py-4 text-center font-semibold text-gray-900 dark:text-white">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {hasil.data.map((item) => (
                <tr
                  key={item.id}
                  className="dark:border-strokedark dark:hover:bg-meta-4/10 border-b border-stroke transition-colors hover:bg-gray-50"
                >
                  <td className="px-6 py-5">
                    <p
                      className="max-w-[250px] truncate font-medium text-gray-900 dark:text-white"
                      title={item.judul}
                    >
                      {item.judul}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {new Date(item.createdAt).toLocaleDateString("id-ID")}
                    </p>
                  </td>
                  <td className="px-6 py-5">
                    <span className="dark:bg-meta-4 rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:text-gray-300">
                      {item.kategori?.nama || "Umum"}
                    </span>
                  </td>
                  
                  <td className="px-6 py-5 text-center">
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
                  <td className="px-6 py-5 text-center">
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
                  <td colSpan={5} className="py-12 text-center text-gray-500">
                    Tidak ada berita yang ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={hasil.current_page}
          lastPage={hasil.last_page}
          path="/dashboard/berita"
        />
      </ShowcaseSection>
    </>
  );
}
