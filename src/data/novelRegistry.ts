import { NovelData, NovelMetadata } from "../types/novel";
import { TIKET_PULANG_DATA } from "./novels/tiket-pulang-paling-sunyi";

// Central Novel Registry
const NOVELS_DB: Record<string, NovelData> = {
  "tiket-pulang-paling-sunyi": TIKET_PULANG_DATA,
};

// Catalog list including upcoming teaser novels
const CATALOG_METADATA: NovelMetadata[] = [
  {
    slug: TIKET_PULANG_DATA.slug,
    title: TIKET_PULANG_DATA.title,
    subtitle: TIKET_PULANG_DATA.subtitle,
    tagline: TIKET_PULANG_DATA.tagline,
    author: TIKET_PULANG_DATA.author,
    genre: TIKET_PULANG_DATA.genre,
    totalChapters: TIKET_PULANG_DATA.totalChapters,
    totalWords: TIKET_PULANG_DATA.totalWords,
    totalReadTimeMinutes: TIKET_PULANG_DATA.totalReadTimeMinutes,
    synopsis: TIKET_PULANG_DATA.synopsis,
    quote: TIKET_PULANG_DATA.quote,
    status: TIKET_PULANG_DATA.status,
    publishDate: TIKET_PULANG_DATA.publishDate,
    coverAccent: TIKET_PULANG_DATA.coverAccent,
    featured: true,
  },
  {
    slug: "langit-di-atas-merr",
    title: "Langit di Atas MERR",
    subtitle: "Sebuah Novel Karya Bachtiar Aryansyah Putra",
    tagline: "Tentang impian, gedung-gedung tinggi, dan janji yang tertinggal di perempatan jalan",
    author: "Bachtiar Aryansyah Putra",
    genre: "Drama Urban / Realis / Perjuangan",
    totalChapters: 12,
    totalWords: 14500,
    totalReadTimeMinutes: 70,
    synopsis: "Di balik gemerlap Surabaya Timur dan riuhnya laju kendaraan di jalur lingkar dalam MERR, seorang pemuda menantang kerasnya realitas ibu kota provinsi demi sebuah harga diri keluarga.",
    quote: "Lampu-lampu kota menyala seperti bintang jatuh yang tersangkut di aspal, tetapi tidak ada satupun yang menerangi jalan pulangku.",
    status: "Segera Terbit",
    publishDate: "Segera 2026",
    coverAccent: "#2E5C6E",
    featured: false,
  },
  {
    slug: "hujan-terakhir-di-ketintang",
    title: "Hujan Terakhir di Ketintang",
    subtitle: "Sebuah Novel Karya Bachtiar Aryansyah Putra",
    tagline: "Ketika aroma kopi hitam dan tetes air di kaca jendela merajut kenangan lama",
    author: "Bachtiar Aryansyah Putra",
    genre: "Romansa Melankolis / Nostalgia",
    totalChapters: 8,
    totalWords: 9800,
    totalReadTimeMinutes: 45,
    synopsis: "Pertemuan tak sengaja di sebuah kedai kopi gang sempit Ketintang menghidupkan kembali percakapan yang sempat terputus lima tahun silam.",
    quote: "Ada orang-orang yang hanya ditakdirkan singgah seperti rintik hujan di sore hari—menyejukkan sebentar, lalu menguap tanpa jejak.",
    status: "Segera Terbit",
    publishDate: "Segera 2026",
    coverAccent: "#5A4D6E",
    featured: false,
  },
];

export function getAllNovels(): NovelMetadata[] {
  return CATALOG_METADATA;
}

export function getFeaturedNovel(): NovelMetadata {
  return CATALOG_METADATA.find((n) => n.featured) || CATALOG_METADATA[0];
}

export function getNovelBySlug(slug: string): NovelData | null {
  return NOVELS_DB[slug] || null;
}

export function getAllNovelSlugs(): string[] {
  return Object.keys(NOVELS_DB);
}
