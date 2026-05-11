// src/app/dashboard/kategori/page.tsx

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { getKategori } from "./actions";
import FormTambahKategori from "./FormTambahKategori";
import DeleteButton from "@/components/DeleteButton";
import { deleteKategori } from "./actions";
import { Tag } from "lucide-react";

interface KategoriItem {
  id: string;
  nama: string;
  slug: string;
}

export default async function KategoriPage() {
  const kategoriList = await getKategori();

  return (
    <>
      <Breadcrumb pageName="Manajemen Kategori" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Kolom Kiri: Form Tambah */}
        <div className="md:col-span-1">
          <FormTambahKategori />
        </div>

        {/* Kolom Kanan: Tabel Kategori */}
        <div className="dark:border-strokedark dark:bg-boxdark rounded-xl border border-gray-200 bg-white shadow-sm md:col-span-2">
          <div className="dark:border-strokedark border-b border-gray-100 px-6 py-4">
            <h3 className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
              <Tag className="h-4 w-4 text-primary" />
              Daftar Kategori
            </h3>
          </div>

          <div className="p-6">
            <table className="w-full table-auto">
              <thead>
                <tr className="dark:bg-meta-4 bg-gray-50 text-left">
                  <th className="rounded-l-lg px-4 py-3 font-medium text-black dark:text-white">
                    Nama Kategori
                  </th>

                  <th className="px-4 py-3 font-medium text-black dark:text-white">
                    Slug (URL)
                  </th>

                  <th className="rounded-r-lg px-4 py-3 text-center font-medium text-black dark:text-white">
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody>
                {kategoriList.map((item: KategoriItem) => (
                  <tr
                    key={item.id}
                    className="dark:border-strokedark border-b border-gray-100 last:border-0"
                  >
                    <td className="px-4 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      {item.nama}
                    </td>

                    <td className="px-4 py-4 font-mono text-sm text-gray-500 dark:text-gray-400">
                      /{item.slug}
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex justify-center">
                        <DeleteButton
                          id={item.id}
                          deleteAction={deleteKategori}
                          path="Kategori"
                          folder="dashboard"
                        />
                      </div>
                    </td>
                  </tr>
                ))}

                {kategoriList.length === 0 && (
                  <tr>
                    <td
                      colSpan={3}
                      className="py-6 text-center text-sm text-gray-500"
                    >
                      Belum ada kategori. Silakan buat baru.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
