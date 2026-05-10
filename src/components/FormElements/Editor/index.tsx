"use client";

import React, { useState, ComponentProps } from "react";
import dynamic from "next/dynamic";

// Import tipe saja untuk keperluan TypeScript
import type ReactQuillType from "react-quill-new";

// Load ReactQuill secara dinamis untuk menghindari error "document is not defined"
const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill-new");
    // Membuat wrapper agar TypeScript mengenali props dari ReactQuill
    return function QuillComponent({
      ...props
    }: ComponentProps<typeof ReactQuillType>) {
      return <RQ {...props} />;
    };
  },
  {
    ssr: false,
    loading: () => (
      <div className="dark:border-strokedark dark:bg-meta-4 flex h-[250px] w-full animate-pulse items-center justify-center rounded-lg border border-stroke bg-gray-100 text-sm text-gray-400">
        Memuat Editor...
      </div>
    ),
  },
);

interface EditorProps {
  label: string;
  name: string;
  placeholder?: string;
  defaultValue?: string;
}

export default function RichTextEditor({
  label,
  name,
  placeholder,
  defaultValue = "",
}: EditorProps) {
  const [value, setValue] = useState(defaultValue);

  // Konfigurasi Toolbar
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "clean"],
    ],
  };

  return (
    <div className="mb-4.5">
      <label className="mb-2.5 block font-medium text-black dark:text-white">
        {label}
      </label>
      <div className="dark:bg-form-input bg-white">
        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          modules={modules}
          placeholder={placeholder}
          className="rounded-lg pb-12"
        />
      </div>

      {/* Hidden input agar nilai editor terkirim saat form disubmit melalui Server Action */}
      <input type="hidden" name={name} value={value} />

      {/* Styling kustom agar selaras dengan tema dashboard */}
      <style jsx global>{`
        .ql-toolbar.ql-snow {
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
          border-color: #e2e8f0;
          background-color: #f8fafc;
        }
        .ql-container.ql-snow {
          border-bottom-left-radius: 8px;
          border-bottom-right-radius: 8px;
          border-color: #e2e8f0;
          min-height: 200px;
          font-family: inherit;
        }
        .dark .ql-toolbar.ql-snow {
          border-color: #3d4d60;
          background-color: #1d2a3a;
        }
        .dark .ql-container.ql-snow {
          border-color: #3d4d60;
          color: white;
        }
        .ql-editor {
          font-size: 16px;
          line-height: 1.6;
        }
        .ql-snow.ql-toolbar button:hover,
        .ql-snow .ql-toolbar button.ql-active {
          color: #3c50e0 !important;
          fill: #3c50e0 !important;
        }
      `}</style>
    </div>
  );
}
