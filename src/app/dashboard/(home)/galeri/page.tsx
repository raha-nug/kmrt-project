import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { Button } from "@/components/ui-elements/button";
import Link from "next/link";
import Image from "next/image";
import DeleteButton from "@/components/DeleteButton";
import { deleteFunc } from "@/utils/DeleteActions";
import { getGaleri } from "./actions";
import Pagination from "@/components/ui-elements/Pagination";

export default async function GaleriPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params?.page ?? 1);
  const hasil = await getGaleri(page);

  return (
    <>
      <Breadcrumb pageName="Manajemen Galeri" />

      <ShowcaseSection title="Foto Galeri" className="space-y-4">
        <div className="flex justify-end">
          <Link href={"/dashboard/galeri/add"}>
            <Button
              size={"small"}
              variant={"primary"}
              shape={"rounded"}
              label="+ Tambah Foto"
            />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full overflow-hidden rounded-lg border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Preview</th>
                <th className="p-3 text-left">Judul Foto</th>
                <th className="p-3 text-left">Tanggal</th>
                <th className="p-3 text-center">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {hasil.data.map((item) => (
                <tr key={item.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">
                    <div className="relative h-16 w-24 overflow-hidden rounded border">
                      <Image
                        src={item.gambar}
                        alt={item.judul}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </td>
                  <td className="p-3 font-medium">{item.judul}</td>
                  <td className="p-3">
                    {new Date(item.createdAt).toLocaleDateString("id-ID")}
                  </td>
                  <td className="flex justify-center gap-2 p-3">
                    <DeleteButton
                      id={item.id}
                      deleteAction={deleteFunc}
                      path="Galeri"
                      folder="dashboard"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {hasil.data.length > 0 && (
          <Pagination
            currentPage={hasil.current_page}
            lastPage={hasil.last_page}
            path="/dashboard/galeri"
          />
        )}
      </ShowcaseSection>
    </>
  );
}
