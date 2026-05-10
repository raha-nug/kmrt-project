"use client";

import { useState } from "react";

interface Props {
  name: string;
  defaultValue?: boolean;
}

export default function SwitcherOne({ name, defaultValue = false }: Props) {
  const [enabled, setEnabled] = useState(defaultValue);

  return (
    <label className="flex cursor-pointer select-none items-center gap-3">
      {/* value untuk form */}
      <input type="hidden" name={name} value={enabled ? "1" : "0"} />

      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={enabled}
          onChange={() => setEnabled(!enabled)}
        />

        {/* TRACK */}
        <div
          className={`h-8 w-14 rounded-full transition-colors duration-200 ${
            enabled ? "bg-primary" : "bg-gray-300 dark:bg-[#5A616B]"
          }`}
        />

        {/* KNOB */}
        <div
          className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-white shadow transition-all duration-200 ${
            enabled ? "translate-x-6" : ""
          }`}
        />
      </div>

      <span className="text-sm font-medium">
        {enabled ? "Aktif" : "Nonaktif"}
      </span>
    </label>
  );
}
