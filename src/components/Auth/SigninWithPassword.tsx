// src/app/auth/sign-in/page.tsx

import type { Metadata } from "next";
import Image from "next/image";
import Signin from "@/components/Auth/Signin";

export const metadata: Metadata = {
  title: "Login KMRT",
};

export default function SignInPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a0a]">
      {/* Background Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(185,28,28,0.25),_transparent_35%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.06),_transparent_30%)]"></div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:40px_40px]" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10">
        <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl lg:grid-cols-2">
          {/* LEFT CONTENT */}
          <div className="relative hidden flex-col justify-between overflow-hidden border-r border-white/10 bg-gradient-to-br from-[#111111] via-[#161616] to-[#220909] p-14 lg:flex">
            {/* Red Glow */}
            <div className="absolute right-[-100px] top-[-100px] h-72 w-72 rounded-full bg-red-700/20 blur-3xl"></div>

            <div className="relative z-10">
              <div className="mb-10 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-red-800/40 bg-red-900/20">
                  <Image
                    src="/images/logo/logo.png"
                    alt="KMRT"
                    width={42}
                    height={42}
                    className="object-contain"
                  />
                </div>

                <div>
                  <p className="text-sm uppercase tracking-[0.4em] text-red-500">
                    Dashboard Internal
                  </p>

                  <h1 className="text-3xl font-black tracking-wide text-white">
                    KMRT
                  </h1>
                </div>
              </div>

              <div className="max-w-lg">
                <h2 className="mb-6 text-5xl font-black leading-tight text-white">
                  Koalisi Mahasiswa &
                  <span className="text-red-600"> Rakyat </span>
                  Tasikmalaya
                </h2>

                <p className="text-lg leading-relaxed text-gray-400">
                  Sistem internal untuk pengelolaan berita, pengaduan,
                  dokumentasi perjuangan, dan pusat informasi gerakan KMRT.
                </p>
              </div>
            </div>

            {/* Bottom Quote */}
            <div className="relative z-10 mt-16 border-l-4 border-red-700 pl-6">
              <p className="text-lg italic leading-relaxed text-gray-300">
                “Suara rakyat tidak boleh dibungkam. Perjuangan harus terus
                dijaga.”
              </p>

              <span className="mt-4 block text-sm uppercase tracking-[0.3em] text-red-500">
                KMRT TASIKMALAYA
              </span>
            </div>
          </div>

          {/* RIGHT LOGIN */}
          <div className="flex items-center justify-center bg-[#111111]/80 px-6 py-14 sm:px-12">
            <div className="w-full max-w-md">
              {/* Mobile Logo */}
              <div className="mb-10 flex flex-col items-center text-center lg:hidden">
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl border border-red-800/40 bg-red-900/20">
                  <Image
                    src="/images/logo/logo.png"
                    alt="KMRT"
                    width={50}
                    height={50}
                  />
                </div>

                <h1 className="text-3xl font-black text-white">KMRT</h1>

                <p className="mt-2 text-sm uppercase tracking-[0.3em] text-red-500">
                  Dashboard Internal
                </p>
              </div>

              {/* Login Card */}
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
                <div className="mb-8">
                  <p className="mb-2 text-sm uppercase tracking-[0.3em] text-red-500">
                    Secure Access
                  </p>

                  <h2 className="text-4xl font-black text-white">Sign In</h2>

                  <p className="mt-3 text-gray-400">
                    Masuk ke sistem dashboard KMRT menggunakan akun yang telah
                    terdaftar.
                  </p>
                </div>

                <Signin />

                <div className="mt-8 border-t border-white/10 pt-6 text-center">
                  <p className="text-sm text-gray-500">
                    © {new Date().getFullYear()} KMRT Tasikmalaya
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
