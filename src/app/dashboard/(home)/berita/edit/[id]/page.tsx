import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { getNewsById } from "../../actions"; // Pastikan path benar
import NewsEditForm from "./NewsEditForm";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditNewsPage({ params }: PageProps) {
  const { id } = await params;
  const news = await getNewsById(id);

  if (!news) {
    notFound(); // Menampilkan 404 jika ID tidak valid
  }

  return (
    <>
      <Breadcrumb pageName="Edit Berita" />

      <ShowcaseSection title="Edit Data Berita">
        <NewsEditForm news={news} />
      </ShowcaseSection>
    </>
  );
}
