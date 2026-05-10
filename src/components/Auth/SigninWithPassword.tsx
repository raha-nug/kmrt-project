"use client";
import Swal from "sweetalert2";
import { EmailIcon, PasswordIcon } from "@/assets/icons";
import React, { useState } from "react";
import InputGroup from "../FormElements/InputGroup";
import { useRouter } from "next/navigation";
// 1. Import signIn dari next-auth
import { signIn } from "next-auth/react";

export default function SigninWithPassword() {
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    Swal.fire({
      title: "Loading...",
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      // 2. Gunakan fungsi signIn dari NextAuth
      // Kita arahkan ke provider "credentials"
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false, // Kita set false agar bisa handle SweetAlert dulu
      });

      // 3. NextAuth mengembalikan object res yang berisi error atau status
      if (res?.error) {
        // Jika error (misal: password salah atau user tidak ditemukan)
        throw new Error("Email atau Password salah!");
      }

      if (res?.ok) {
        await Swal.fire({
          icon: "success",
          title: "Berhasil Login",
          text: "Anda akan diarahkan ke dashboard.",
          timer: 1500,
          showConfirmButton: false,
        });

        // 4. Redirect manual ke dashboard setelah sukses
        router.push("/dashboard");
        router.refresh(); // Memastikan server component mendapatkan data session terbaru
      }
    } catch (error: any) {
      await Swal.fire({
        icon: "error",
        title: "Login Gagal",
        text: error.message || "Terjadi kesalahan saat login.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup
        type="email"
        label="Email"
        className="mb-4 [&_input]:py-[15px]"
        placeholder="Enter your email"
        name="email"
        handleChange={handleChange}
        value={data.email}
        icon={<EmailIcon />}
      />

      <InputGroup
        type="password"
        label="Password"
        className="mb-5 [&_input]:py-[15px]"
        placeholder="Enter your password"
        name="password"
        handleChange={handleChange}
        value={data.password}
        icon={<PasswordIcon />}
      />

      <div className="mb-4.5">
        <button
          type="submit"
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90"
        >
          Sign In
        </button>
      </div>
    </form>
  );
}
