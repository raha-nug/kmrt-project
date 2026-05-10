"use client";

import React, { useState, useEffect } from "react";
import { kirimPengaduan, cekStatusLaporan } from "./actions";
import Swal from "sweetalert2";
import {
  ShieldCheck,
  UploadCloud,
  Info,
  Lock,
  Clock,
  Search,
  Copy,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { useUploadThing } from "@/utils/uploadthing";

export default function PengaduanPage() {
  // Mode Tampilan: 'buat' | 'cek' | 'sukses'
  const [activeTab, setActiveTab] = useState<"buat" | "cek" | "sukses">("buat");

  // State Form Laporan
  const [buktiUrl, setBuktiUrl] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cooldownTime, setCooldownTime] = useState<number>(0);
  const [generatedTicket, setGeneratedTicket] = useState<string>("");

  // State Cek Status
  const [cekTiketInput, setCekTiketInput] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [statusResult, setStatusResult] = useState<{
    status: string;
    tanggal: Date;
  } | null>(null);

  useEffect(() => {
    const lastSubmitTime = localStorage.getItem("lastComplaintTime");
    if (lastSubmitTime) {
      const timePassed = Date.now() - parseInt(lastSubmitTime, 10);
      const limaMenit = 5 * 60 * 1000;
      if (timePassed < limaMenit) {
        setCooldownTime(Math.ceil((limaMenit - timePassed) / 60000));
      }
    }
  }, []);

  const { startUpload } = useUploadThing("attachmentUploader", {
    onClientUploadComplete: (res) => {
      setIsUploading(false);
      setBuktiUrl(res[0].url);
      Swal.fire({
        icon: "success",
        title: "Bukti Terenkripsi",
        text: "File berhasil diunggah.",
        confirmButtonColor: "#030712",
      });
    },
    onUploadError: (error) => {
      setIsUploading(false);
      Swal.fire({
        icon: "error",
        title: "Akses Ditolak",
        text: error.message,
        confirmButtonColor: "#b91c1c",
      });
    },
    onUploadBegin: () => setIsUploading(true),
  });

  // --- HANDLER: KIRIM LAPORAN ---
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);

    if (formData.get("website_url")) {
      Swal.fire({
        icon: "success",
        title: "LAPORAN DITERIMA",
        confirmButtonColor: "#b91c1c",
      });
      setIsSubmitting(false);
      return;
    }

    if (buktiUrl) formData.append("bukti", buktiUrl);
    const result = await kirimPengaduan(formData);

    if (result.success && result.tiketId) {
      localStorage.setItem("lastComplaintTime", Date.now().toString());
      setCooldownTime(5);

      // Tampilkan layar sukses dengan tiket
      setGeneratedTicket(result.tiketId);
      setActiveTab("sukses");

      (e.target as HTMLFormElement).reset();
      setBuktiUrl("");
    } else {
      Swal.fire({
        icon: "error",
        title: "Kegagalan Sistem",
        text: result.message,
      });
    }
    setIsSubmitting(false);
  };

  // --- HANDLER: CEK STATUS ---
  const handleCekStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cekTiketInput.trim()) return;

    setIsChecking(true);
    setStatusResult(null);

    const res = await cekStatusLaporan(cekTiketInput);
    if (res.success && res.data) {
      setStatusResult({ status: res.data.status, tanggal: res.data.createdAt });
    } else {
      Swal.fire({
        icon: "error",
        title: "Tidak Ditemukan",
        text: res.message,
        confirmButtonColor: "#b91c1c",
      });
    }
    setIsChecking(false);
  };

  // --- HANDLER: COPY TIKET ---
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedTicket);
    Swal.fire({
      icon: "success",
      title: "Tersalin!",
      text: "Kode tiket berhasil disalin.",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  // --- HELPER: WARNA STATUS ---
  const getStatusColor = (status: string) => {
    switch (status) {
      case "MENUNGGU":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "DIPROSES":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "SELESAI":
        return "bg-green-100 text-green-800 border-green-200";
      case "DITOLAK":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* HERO SECTION */}
      <section className="relative bg-gray-950 py-24 text-white">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-20"></div>
        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-6 inline-flex items-center gap-2 border border-gray-700 bg-gray-900/50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-gray-300 backdrop-blur-sm">
            <Lock className="h-3 w-3 text-[#b91c1c]" /> Jalur Komunikasi
            Terenkripsi
          </div>
          <h1 className="mb-6 font-serif text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl">
            KEMUKAKAN KEBENARAN.
            <br />
            <span className="text-[#b91c1c]">LAPORKAN KEJAHATAN.</span>
          </h1>
        </div>
      </section>

      {/* KONTEN UTAMA */}
      <section className="relative z-20 mx-auto -mt-16 max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="border-t-8 border-[#b91c1c] bg-white shadow-2xl">
          {/* HEADER & TABS */}
          <div className="flex flex-col items-end justify-between border-b border-gray-100 bg-gray-50 px-8 pt-8 md:flex-row md:px-10">
            <div className="pb-6">
              <h2 className="font-serif text-2xl font-bold text-gray-950">
                Pusat Aduan KMRT
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Pilih layanan yang Anda butuhkan di bawah ini.
              </p>
            </div>

            {/* TABS MENU */}
            <div className="flex w-full gap-1 md:w-auto">
              <button
                onClick={() => setActiveTab("buat")}
                className={`flex-1 px-6 py-3 text-xs font-bold uppercase tracking-widest transition-colors md:flex-none ${activeTab === "buat" || activeTab === "sukses" ? "border-l border-r border-t border-gray-200 bg-white text-[#b91c1c]" : "border-b border-transparent bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
              >
                Buat Laporan
              </button>
              <button
                onClick={() => setActiveTab("cek")}
                className={`flex-1 px-6 py-3 text-xs font-bold uppercase tracking-widest transition-colors md:flex-none ${activeTab === "cek" ? "border-l border-r border-t border-gray-200 bg-white text-[#b91c1c]" : "border-b border-transparent bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
              >
                Cek Status
              </button>
            </div>
          </div>

          <div className="p-8 md:p-12">
            {/* =========================================
                TAB 1: FORM BUAT LAPORAN
            ============================================= */}
            {activeTab === "buat" &&
              (cooldownTime > 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Clock className="mb-4 h-16 w-16 animate-pulse text-[#b91c1c]" />
                  <h3 className="mb-2 text-xl font-bold uppercase tracking-widest text-gray-950">
                    Akses Dibatasi Sementara
                  </h3>
                  <p className="max-w-md text-gray-500">
                    Untuk mencegah spam, Anda hanya dapat mengirim satu laporan
                    setiap 5 menit. <br />
                    <br />
                    Silakan kembali lagi dalam{" "}
                    <span className="font-bold text-gray-900">
                      {cooldownTime} menit
                    </span>
                    .
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="animate-in fade-in slide-in-from-bottom-4 space-y-10 duration-500"
                >
                  <div aria-hidden="true" className="hidden">
                    <input
                      type="text"
                      name="website_url"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                    <div className="relative">
                      <input
                        type="text"
                        name="namaPelapor"
                        id="namaPelapor"
                        className="peer w-full border-b-2 border-gray-200 bg-transparent py-3 text-gray-950 placeholder-transparent focus:border-[#b91c1c] focus:outline-none"
                        placeholder="Nama"
                      />
                      <label
                        htmlFor="namaPelapor"
                        className="absolute -top-3.5 left-0 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:text-[#b91c1c]"
                      >
                        Nama Pelapor{" "}
                        <span className="font-normal text-gray-400">
                          (Boleh Dikosongkan)
                        </span>
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        name="kontak"
                        id="kontak"
                        className="peer w-full border-b-2 border-gray-200 bg-transparent py-3 text-gray-950 placeholder-transparent focus:border-[#b91c1c] focus:outline-none"
                        placeholder="Kontak"
                      />
                      <label
                        htmlFor="kontak"
                        className="absolute -top-3.5 left-0 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:text-[#b91c1c]"
                      >
                        Kontak Rahasia{" "}
                        <span className="font-normal text-gray-400">
                          (Opsional)
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-xs font-bold uppercase tracking-[0.1em] text-gray-950">
                      Uraian Fakta Kejadian{" "}
                      <span className="text-[#b91c1c]">*</span>
                    </label>
                    <textarea
                      name="kronologi"
                      required
                      rows={6}
                      maxLength={10000}
                      placeholder="Deskripsikan 5W+1H..."
                      className="w-full resize-none border border-gray-300 bg-gray-50 p-4 text-sm text-gray-950 focus:border-gray-950 focus:bg-white focus:outline-none focus:ring-0"
                    ></textarea>
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-gray-950">
                      Lampiran Bukti Digital{" "}
                      <Info className="h-4 w-4 text-[#b91c1c]" />
                    </label>
                    <div className="border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center transition-colors hover:border-gray-950">
                      {!buktiUrl ? (
                        <div className="flex flex-col items-center gap-3">
                          <UploadCloud className="h-8 w-8 text-gray-400" />
                          <label
                            className={`mt-2 inline-flex cursor-pointer items-center gap-2 bg-gray-950 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#b91c1c] ${isUploading ? "pointer-events-none opacity-50" : ""}`}
                          >
                            {isUploading
                              ? "Mengamankan File..."
                              : "Pilih Lampiran"}
                            <input
                              type="file"
                              accept="image/*, application/pdf"
                              className="hidden"
                              disabled={isUploading}
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) startUpload([file]);
                              }}
                            />
                          </label>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-3">
                          <ShieldCheck className="h-8 w-8 text-green-600" />
                          <p className="text-sm font-bold">
                            File Berhasil Diamankan
                          </p>
                          <button
                            type="button"
                            onClick={() => setBuktiUrl("")}
                            className="text-xs font-bold uppercase tracking-widest text-[#b91c1c] hover:text-gray-950"
                          >
                            [ Batalkan ]
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || isUploading}
                    className="group relative flex w-full items-center justify-center overflow-hidden bg-gray-950 p-5 text-sm font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-[#b91c1c] disabled:opacity-50"
                  >
                    <span className="relative z-10">
                      {isSubmitting ? "MEMPROSES..." : "KIRIMKAN LAPORAN"}
                    </span>
                    <div className="absolute inset-0 h-full w-0 bg-[#b91c1c] transition-all duration-300 ease-out group-hover:w-full"></div>
                  </button>
                </form>
              ))}

            {/* =========================================
                LAYAR SUKSES (TAMPIL SETELAH SUBMIT)
            ============================================= */}
            {activeTab === "sukses" && (
              <div className="animate-in zoom-in-95 flex flex-col items-center py-10 text-center duration-500">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h3 className="mb-2 font-serif text-2xl font-bold text-gray-950">
                  Laporan Berhasil Diamankan
                </h3>
                <p className="mb-8 max-w-md text-gray-500">
                  Terima kasih atas keberanian Anda. Laporan ini telah
                  dienkripsi dan dikirim ke Divisi Investigasi.
                </p>

                <div className="relative w-full max-w-md overflow-hidden rounded-lg bg-gray-950 p-6 text-left shadow-lg">
                  <div className="absolute right-0 top-0 p-4 opacity-10">
                    <ShieldCheck className="h-20 w-20 text-white" />
                  </div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    Kode Tiket Rahasia Anda
                  </p>
                  <p className="mb-4 break-all font-mono text-xl text-white">
                    {generatedTicket}
                  </p>

                  <div className="mb-4 flex items-start gap-2 rounded border border-yellow-500/30 bg-yellow-500/20 p-3">
                    <AlertCircle className="h-5 w-5 shrink-0 text-yellow-500" />
                    <p className="text-xs leading-relaxed text-yellow-200">
                      Simpan kode ini dengan aman! Kode ini adalah satu-satunya
                      cara Anda untuk melacak status laporan Anda.
                    </p>
                  </div>

                  <button
                    onClick={copyToClipboard}
                    className="flex w-full items-center justify-center gap-2 rounded bg-white p-3 text-sm font-bold uppercase tracking-widest text-gray-950 transition-colors hover:bg-gray-200"
                  >
                    <Copy className="h-4 w-4" /> Salin Kode Tiket
                  </button>
                </div>

                <button
                  onClick={() => setActiveTab("cek")}
                  className="mt-8 text-sm font-bold uppercase tracking-widest text-[#b91c1c] hover:underline"
                >
                  Lacak Laporan Ini Sekarang &rarr;
                </button>
              </div>
            )}

            {/* =========================================
                TAB 2: FORM CEK STATUS
            ============================================= */}
            {activeTab === "cek" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 mx-auto max-w-2xl duration-500">
                <div className="mb-8 text-center">
                  <Search className="mx-auto mb-4 h-12 w-12 text-gray-300" />
                  <h3 className="text-xl font-bold text-gray-950">
                    Lacak Investigasi KMRT
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Masukkan Kode Tiket Rahasia yang Anda dapatkan saat membuat
                    laporan.
                  </p>
                </div>

                <form onSubmit={handleCekStatus} className="flex gap-2">
                  <input
                    type="text"
                    value={cekTiketInput}
                    onChange={(e) => setCekTiketInput(e.target.value)}
                    placeholder="Contoh: 123e4567-e89b-12d3..."
                    className="flex-1 border-2 border-gray-200 bg-gray-50 p-4 font-mono text-sm focus:border-gray-950 focus:bg-white focus:outline-none"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isChecking}
                    className="bg-gray-950 px-6 font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#b91c1c] disabled:opacity-50"
                  >
                    {isChecking ? (
                      <RefreshCw className="h-5 w-5 animate-spin" />
                    ) : (
                      "Lacak"
                    )}
                  </button>
                </form>

                {/* HASIL PENCARIAN STATUS */}
                {statusResult && (
                  <div className="mt-10 border border-gray-200 bg-white shadow-sm">
                    <div className="border-b border-gray-100 bg-gray-50 px-6 py-4">
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
                        Hasil Pencarian
                      </p>
                    </div>
                    <div className="space-y-6 p-6">
                      <div>
                        <p className="mb-1 text-xs text-gray-500">
                          Tanggal Masuk Laporan
                        </p>
                        <p className="font-bold text-gray-950">
                          {new Date(statusResult.tanggal).toLocaleDateString(
                            "id-ID",
                            {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            },
                          )}
                        </p>
                      </div>

                      <div>
                        <p className="mb-2 text-xs text-gray-500">
                          Status Saat Ini
                        </p>
                        <span
                          className={`inline-flex items-center border px-4 py-2 text-sm font-bold uppercase tracking-widest ${getStatusColor(statusResult.status)}`}
                        >
                          {statusResult.status}
                        </span>
                      </div>

                      {statusResult.status === "MENUNGGU" && (
                        <p className="border-l-4 border-yellow-400 bg-gray-50 p-4 text-sm text-gray-600">
                          Laporan Anda telah diterima sistem dan sedang menunggu
                          antrean untuk ditinjau oleh tim kami.
                        </p>
                      )}
                      {statusResult.status === "DIPROSES" && (
                        <p className="border-l-4 border-blue-400 bg-gray-50 p-4 text-sm text-gray-600">
                          Laporan Anda sedang dalam tahap verifikasi atau
                          investigasi aktif oleh tim lapangan KMRT.
                        </p>
                      )}
                      {statusResult.status === "SELESAI" && (
                        <p className="border-l-4 border-green-400 bg-gray-50 p-4 text-sm text-gray-600">
                          Tindak lanjut atas laporan Anda telah selesai
                          dilakukan. Terima kasih atas partisipasi Anda.
                        </p>
                      )}
                      {statusResult.status === "DITOLAK" && (
                        <p className="border-l-4 border-red-400 bg-gray-50 p-4 text-sm text-gray-600">
                          Laporan dihentikan. Biasanya karena kurangnya bukti
                          kuat, salah sasaran, atau bukan wewenang KMRT.
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
