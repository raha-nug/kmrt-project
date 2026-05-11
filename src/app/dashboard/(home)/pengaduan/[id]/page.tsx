import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { getPengaduanById } from "../actions";
import { notFound } from "next/navigation";
import StatusUpdater from "../StatusUpdater";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Phone,
  Calendar,
  FileText,
  Image as ImageIcon,
} from "lucide-react";
import Image from "next/image";

export default async function DetailPengaduanPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pengaduan = await getPengaduanById(id);

  if (!pengaduan) {
    notFound();
  }

  // --- LOGIKA BARU PENGECEKAN PDF ---
  let isPDF = false;
  if (pengaduan.bukti) {
    if (pengaduan.bukti.toLowerCase().endsWith(".pdf")) {
      isPDF = true;
    } else {
      try {
        const res = await fetch(pengaduan.bukti, { method: "HEAD" });
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/pdf")) {
          isPDF = true;
        }
      } catch (error) {
        console.error("Gagal memverifikasi tipe file lampiran:", error);
      }
    }
  }
  // -----------------------------------

  return (
    <>
      <Breadcrumb pageName="Detail Pengaduan" />

      {/* Header Info & Tombol Kembali */}
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <Link
          href="/dashboard/pengaduan"
          className="inline-flex items-center text-sm font-medium text-gray-500 transition-colors hover:text-blue-600"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Daftar
        </Link>
        <span className="dark:bg-meta-4 dark:border-strokedark rounded-md border border-gray-200 bg-gray-100 px-3 py-1.5 font-mono text-xs text-gray-800 dark:text-gray-300">
          Tiket ID: {pengaduan.id}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* KOLOM KIRI: Info Pelapor & Status */}
        <div className="flex flex-col gap-6 xl:col-span-1">
          {/* Card Info Pelapor */}
          <div className="dark:border-strokedark dark:bg-boxdark rounded-xl border border-gray-200 bg-white">
            <div className="dark:border-strokedark dark:bg-meta-4/20 rounded-t-xl border-b border-gray-100 bg-gray-50/50 px-6 py-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Informasi Pelapor
              </h3>
            </div>
            <div className="space-y-5 p-6">
              <div className="flex items-start gap-4">
                <div className="dark:bg-meta-4 rounded-full bg-gray-100 p-2">
                  <User className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    Nama Lengkap
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-gray-900 dark:text-white">
                    {pengaduan.namaPelapor}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="dark:bg-meta-4 rounded-full bg-gray-100 p-2">
                  <Phone className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    Kontak Rahasia
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-gray-900 dark:text-white">
                    {pengaduan.kontak}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="dark:bg-meta-4 rounded-full bg-gray-100 p-2">
                  <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    Waktu Laporan Masuk
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-gray-900 dark:text-white">
                    {new Date(pengaduan.createdAt).toLocaleString("id-ID", {
                      dateStyle: "full",
                      timeStyle: "short",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card Tindak Lanjut */}
          <div className="dark:border-strokedark dark:bg-boxdark rounded-xl border border-gray-200 bg-white">
            <div className="dark:border-strokedark dark:bg-meta-4/20 rounded-t-xl border-b border-gray-100 bg-gray-50/50 px-6 py-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Tindak Lanjut & Status
              </h3>
            </div>
            <div className="p-6">
              <p className="mb-4 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                Ubah status di bawah ini. Pelapor akan melihat perubahannya saat
                melacak kode tiket.
              </p>
              <div className="w-full sm:w-auto">
                <StatusUpdater
                  id={pengaduan.id}
                  currentStatus={pengaduan.status}
                />
              </div>
            </div>
          </div>
        </div>

        {/* KOLOM KANAN: Kronologi & Bukti */}
        <div className="flex flex-col gap-6 xl:col-span-2">
          {/* Card Kronologi */}
          <div className="dark:border-strokedark dark:bg-boxdark rounded-xl border border-gray-200 bg-white">
            <div className="dark:border-strokedark dark:bg-meta-4/20 flex items-center gap-2 rounded-t-xl border-b border-gray-100 bg-gray-50/50 px-6 py-4">
              <FileText className="h-4 w-4 text-gray-500" />
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Uraian Fakta Kejadian
              </h3>
            </div>
            <div className="p-6">
              <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-gray-700 dark:text-gray-300">
                {pengaduan.kronologi}
              </p>
            </div>
          </div>

          {/* Card Lampiran Bukti */}
          <div className="dark:border-strokedark dark:bg-boxdark rounded-xl border border-gray-200 bg-white">
            <div className="dark:border-strokedark dark:bg-meta-4/20 flex items-center gap-2 rounded-t-xl border-b border-gray-100 bg-gray-50/50 px-6 py-4">
              <ImageIcon className="h-4 w-4 text-gray-500" />
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Lampiran Bukti Digital
              </h3>
            </div>
            <div className="p-6">
              {pengaduan.bukti ? (
                <div className="dark:border-strokedark dark:bg-meta-4 relative w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                  {isPDF ? (
                    <div className="flex flex-col">
                      <iframe
                        src={pengaduan.bukti}
                        className="dark:bg-boxdark h-[600px] w-full bg-white"
                        title="Bukti Dokumen PDF"
                      />
                      <a
                        href={pengaduan.bukti}
                        target="_blank"
                        rel="noreferrer"
                        className="flex w-full items-center justify-center gap-2 bg-gray-900 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-[#b91c1c] dark:bg-primary dark:hover:bg-opacity-90"
                      >
                        <FileText className="h-4 w-4" /> Buka atau Unduh Dokumen
                        PDF
                      </a>
                    </div>
                  ) : (
                    <a
                      href={pengaduan.bukti}
                      target="_blank"
                      rel="noreferrer"
                      className="group relative block w-full"
                    >
                      <Image
                        src={pengaduan.bukti}
                        height={100}
                        width={1000}
                        alt="Bukti Laporan"
                        className="max-h-[600px] w-full object-contain"
                      />
                      {/* Overlay text on hover for images */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <span className="rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-900">
                          Buka resolusi penuh
                        </span>
                      </div>
                    </a>
                  )}
                </div>
              ) : (
                <div className="dark:border-strokedark dark:bg-meta-4/10 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50/50 py-12">
                  <ImageIcon className="mb-3 h-10 w-10 text-gray-300 dark:text-gray-600" />
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Pelapor tidak melampirkan file atau bukti digital.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
