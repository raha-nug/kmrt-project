import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { PropsWithChildren } from "react";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: {
    template: "%s | KMRT",
    default: "KMRT",
  },
  description: "KMRT | Website Resmi KMRT",
  icons: {
    icon: "/images/logo/logo-kmrt.png", // Ganti dengan nama file logo Anda di folder public
    shortcut: "/images/logo/logo-kmrt.png",
    apple: "/images/logo/logo-kmrt.png", // Opsional: Untuk icon saat di-save ke home screen iPhone
  },
};

export default function PublicLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-grow">{children}</main>

      <Footer />
    </div>
  );
}
