import { MetadataRoute } from "next";
import { getAllNovels } from "@/data/novelRegistry";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://tiket-pulang-paling-sunyi.vercel.app";
  const now = new Date();

  const novels = getAllNovels().filter((n) => n.status === "Tamat" || n.status === "Ongoing");

  const novelUrls: MetadataRoute.Sitemap = novels.map((novel) => ({
    url: `${baseUrl}/${novel.slug}/`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: novel.featured ? 1.0 : 0.8,
  }));

  return [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    ...novelUrls,
  ];
}
