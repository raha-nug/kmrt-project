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
import Swal from "sweetalert2";
import { useSession, signOut } from "next-auth/react";

export function UserInfo() {
  const [isOpen, setIsOpen] = useState(false);

  const { data: session } = useSession();

  const userName = session?.user?.name || "Administrator";
  const userEmail = session?.user?.email || "admin@kmrt.id";
  const userRole = session?.user?.role || "ADMIN";

  const handleLogout = async () => {
    // tutup dropdown dulu
    setIsOpen(false);

    const result = await Swal.fire({
      title: "Logout?",
      text: "Anda akan keluar dari dashboard",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Logout",
      cancelButtonText: "Batal",
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#9ca3af",
      background: "#ffffff",
      color: "#111827",

      customClass: {
        popup: "rounded-2xl",
      },
    });

    if (!result.isConfirmed) return;

    await signOut({
      callbackUrl: "/auth/sign-in",
    });
  };

  return (
    <Dropdown isOpen={isOpen} setIsOpen={setIsOpen}>
      <DropdownTrigger className="rounded-xl outline-none">
        <span className="sr-only">User Menu</span>

        <figure className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-3 py-2 shadow-sm">
          <Image
            src="/images/user.png"
            className="h-12 w-12 rounded-full border border-gray-200 object-cover"
            alt="User Avatar"
            width={200}
            height={200}
          />

          <figcaption className="flex items-center gap-2 max-[1024px]:sr-only">
            <div className="flex flex-col items-start text-left">
              <span className="text-sm font-semibold text-gray-900">
                {userName}
              </span>

              <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
                {userRole}
              </span>
            </div>

            <ChevronUpIcon
              aria-hidden
              className={cn(
                "rotate-180 text-gray-500 transition-transform duration-200",
                isOpen && "rotate-0",
              )}
              strokeWidth={1.5}
            />
          </figcaption>
        </figure>
      </DropdownTrigger>

      <DropdownContent
        className="min-w-[290px] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg"
        align="end"
      >
        <div className="border-b border-gray-100 bg-gray-50 px-5 py-4">
          <div className="flex items-center gap-3">
            <Image
              src="/images/user.png"
              className="h-14 w-14 rounded-full border border-gray-200 object-cover"
              alt="User Avatar"
              width={200}
              height={200}
            />

            <div className="flex-1">
              <h3 className="text-base font-bold text-gray-900">{userName}</h3>

              <p className="mt-0.5 text-sm text-gray-500">{userEmail}</p>

              <div className="mt-2 inline-flex rounded-full bg-blue-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-blue-700">
                {userRole}
              </div>
            </div>
          </div>
        </div>

        <div className="p-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              handleLogout();
            }}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-red-50 hover:text-red-600"
          >
            <LogOutIcon />

            <span>Logout</span>
          </button>
        </div>
      </DropdownContent>
    </Dropdown>
  );
}
