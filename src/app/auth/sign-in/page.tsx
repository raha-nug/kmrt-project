"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function SignInPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    Swal.fire({
      title: "Memproses Login",
      text: "Mohon tunggu sebentar...",
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const result = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error("Email atau password salah");
      }

      await Swal.fire({
        icon: "success",
        title: "Login Berhasil",
        text: "Selamat datang di sistem KMRT",
        timer: 1500,
        showConfirmButton: false,
      });

      router.push("/dashboard");
      router.refresh();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Login Gagal",
        text: error.message || "Terjadi kesalahan",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f4f4f4]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#050816] py-24">
        {/* GRID */}
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>
      </section>

      {/* LOGIN */}
      <section className="relative z-10 -mt-16 pb-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="grid overflow-hidden rounded-sm border border-gray-200 bg-white shadow-2xl lg:grid-cols-2">
            {/* LEFT SIDE */}
            <div className="relative hidden overflow-hidden bg-[#111827] p-14 lg:block">
              <div className="absolute right-0 top-0 h-40 w-40 bg-[#c1121f] opacity-20 blur-3xl" />

              <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                  <div className="mb-10 inline-flex items-center gap-4 border-l-4 border-[#c1121f] pl-5">
                    <div>
                      <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#c1121f]">
                        Secure Access
                      </p>

                      <h3 className="mt-2 text-4xl font-black text-white">
                        KMRT PANEL
                      </h3>
                    </div>
                  </div>

                  <p className="max-w-md text-lg leading-relaxed text-gray-300">
                    Gunakan akun administrator resmi untuk mengakses dashboard
                    dan melakukan pengelolaan sistem secara aman dan
                    profesional.
                  </p>
                </div>

                {/* ILLUSTRATION */}
                <div className="relative mt-16 rounded-sm border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                  <Image
                    src="/images/grids/grid-02.svg"
                    alt="KMRT"
                    width={500}
                    height={400}
                    className="mx-auto opacity-90"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="p-8 sm:p-12 lg:p-16">
              <div className="mb-10 border-l-4 border-[#c1121f] pl-5">
                <p className="mb-2 text-sm font-bold uppercase tracking-[0.3em] text-[#c1121f]">
                  Authentication
                </p>

                <h3 className="text-4xl font-black text-[#111827]">Sign In</h3>

                <p className="mt-3 text-gray-500">
                  Masukkan email dan password untuk melanjutkan.
                </p>
              </div>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="space-y-7">
                {/* EMAIL */}
                <div>
                  <label className="mb-3 block text-sm font-bold uppercase tracking-[0.15em] text-gray-700">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Masukkan email"
                    required
                    className="w-full border-b-2 border-gray-300 bg-transparent px-1 py-4 text-lg text-[#111827] outline-none transition focus:border-[#c1121f]"
                  />
                </div>

                {/* PASSWORD */}
                <div>
                  <label className="mb-3 block text-sm font-bold uppercase tracking-[0.15em] text-gray-700">
                    Password
                  </label>

                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Masukkan password"
                    required
                    className="w-full border-b-2 border-gray-300 bg-transparent px-1 py-4 text-lg text-[#111827] outline-none transition focus:border-[#c1121f]"
                  />
                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-6 flex h-16 w-full items-center justify-center bg-[#c1121f] text-base font-black uppercase tracking-[0.15em] text-white transition hover:bg-[#9d0b16] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? "Memproses..." : "Masuk ke Dashboard"}
                </button>
              </form>

              {/* FOOTER */}
              <div className="mt-10 border-t border-gray-200 pt-6 text-center">
                <p className="text-sm text-gray-500">
                  © {new Date().getFullYear()} KMRT. All Rights Reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
