"use client";

import { ChevronUpIcon } from "@/assets/icons";
import {
  Dropdown,
  DropdownContent,
  DropdownTrigger,
} from "@/components/ui/dropdown";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { LogOutIcon } from "./icons";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export function UserInfo() {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const handleLogout = async () => {
    try {
      const res = await fetch(`/api/auth/logout`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      const auth = await res.json();
      if (!auth?.success) throw new Error(auth.message || "Gagal logout");

      if (auth?.success) {
        await Swal.fire({
          icon: "success",
          title: auth?.message,
          text: "Anda akan diarahkan ke login page.",
          timer: 2000, // auto close setelah 2 detik
          showConfirmButton: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        router.push("/auth/sign-in");
      }
    } catch (error: any) {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Terjadi kesalahan saat logout.",
      });
    }
  };

  return (
    <Dropdown isOpen={isOpen} setIsOpen={setIsOpen}>
      <DropdownTrigger className="rounded align-middle outline-none ring-primary ring-offset-2 focus-visible:ring-1 dark:ring-offset-gray-dark">
        <span className="sr-only">My Account</span>

        <figure className="flex items-center gap-3">
          <Image
            src={"/images/user.png"}
            className="size-12"
            alt={`Avatar of ${"Admin"}`}
            role="presentation"
            width={200}
            height={200}
          />
          <figcaption className="flex items-center gap-1 font-medium text-dark dark:text-dark-6 max-[1024px]:sr-only">
            <span>{"Admin"}</span>

            <ChevronUpIcon
              aria-hidden
              className={cn(
                "rotate-180 transition-transform",
                isOpen && "rotate-0",
              )}
              strokeWidth={1.5}
            />
          </figcaption>
        </figure>
      </DropdownTrigger>

      <DropdownContent
        className="border border-stroke bg-white shadow-md dark:border-dark-3 dark:bg-gray-dark min-[230px]:min-w-[17.5rem]"
        align="end"
      >
        <h2 className="sr-only">User information</h2>

        <figure className="flex items-center gap-2.5 px-5 py-3.5">
          <Image
            src={"/images/user.png"}
            className="size-12"
            alt={`Avatar for ${"Admin"}`}
            role="presentation"
            width={200}
            height={200}
          />

          <figcaption className="space-y-1 text-base font-medium">
            <div className="mb-2 leading-none text-dark dark:text-white">
              {"Admin"}
            </div>

            <div className="leading-none text-gray-6">{}</div>
          </figcaption>
        </figure>

        <hr className="border-[#E8E8E8] dark:border-dark-3" />

        <div className="p-2 text-base text-[#4B5563] dark:text-dark-6">
          <button
            className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-[9px] hover:bg-gray-2 hover:text-dark dark:hover:bg-dark-3 dark:hover:text-white"
            onClick={() => handleLogout()}
          >
            <LogOutIcon />

            <span className="text-base font-medium">Log out</span>
          </button>
        </div>
      </DropdownContent>
    </Dropdown>
  );
}
