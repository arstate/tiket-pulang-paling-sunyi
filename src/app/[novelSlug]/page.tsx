import { notFound } from "next/navigation";
import { getAllNovelSlugs, getNovelBySlug } from "@/data/novelRegistry";
import NovelReader from "@/components/NovelReader";
import type { Metadata } from "next";

interface NovelPageProps {
  params: {
    novelSlug: string;
  };
}

// 1. Pre-render all registered novel slugs at build time (Zero Serverless Invocations)
export function generateStaticParams() {
  return getAllNovelSlugs().map((slug) => ({
    novelSlug: slug,
  }));
}

// 2. Generate rich SEO/GEO metadata per novel
export function generateMetadata({ params }: NovelPageProps): Metadata {
  const novel = getNovelBySlug(params.novelSlug);
  if (!novel) {
    return {
      title: "Novel Tidak Ditemukan",
    };
  }

  const pageTitle = `${novel.title} — Baca Online Lengkap | Karya ${novel.author}`;
  const pageDesc = novel.synopsis.slice(0, 160);
  const pageUrl = `https://tiket-pulang-paling-sunyi.vercel.app/${novel.slug}/`;

  return {
    title: pageTitle,
    description: pageDesc,
    keywords: [
      novel.title,
      "baca novel online",
      "sastra indonesia",
      "novel emosional",
      novel.author,
      novel.genre,
    ],
    authors: [{ name: novel.author }],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: pageTitle,
      description: pageDesc,
      url: pageUrl,
      siteName: "Perpustakaan Novel Digital",
      type: "article",
      locale: "id_ID",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDesc,
    },
  };
}

export default function NovelPage({ params }: NovelPageProps) {
  const novel = getNovelBySlug(params.novelSlug);

  if (!novel) {
    notFound();
  }

  return <NovelReader novel={novel} />;
}
