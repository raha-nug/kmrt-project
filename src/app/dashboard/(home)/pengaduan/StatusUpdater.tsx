"use client";

import React from "react";
import { updateStatusPengaduan } from "./actions";
import Swal from "sweetalert2";

export default function StatusUpdater({
  id,
  currentStatus,
}: {
  id: string;
  currentStatus: string;
}) {
  const handleStatusChange = async (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newStatus = e.target.value;

    const result = await updateStatusPengaduan(id, newStatus);

    if (result.success) {
      Swal.fire({
        icon: "success",
        title: "Status Diperbarui",
        timer: 1000,
        showConfirmButton: false,
      });
    } else {
      Swal.fire("Error", "Gagal mengubah status", "error");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "MENUNGGU":
        return "bg-yellow-100 text-yellow-700";
      case "DIPROSES":
        return "bg-blue-100 text-blue-700";
      case "SELESAI":
        return "bg-green-100 text-green-700";
      case "DITOLAK":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <select
      defaultValue={currentStatus}
      onChange={handleStatusChange}
      className={`cursor-pointer rounded-full border-none px-3 py-1 text-xs font-bold focus:ring-0 ${getStatusColor(currentStatus)}`}
    >
      <option value="MENUNGGU">MENUNGGU</option>
      <option value="DIPROSES">DIPROSES</option>
      <option value="SELESAI">SELESAI</option>
      <option value="DITOLAK">DITOLAK</option>
    </select>
  );
}
