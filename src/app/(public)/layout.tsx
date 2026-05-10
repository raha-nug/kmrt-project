import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { PropsWithChildren } from "react";

export default function PublicLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-grow">{children}</main>

      <Footer />
    </div>
  );
}
