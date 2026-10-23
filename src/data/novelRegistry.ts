import { NovelData, NovelMetadata } from "../types/novel";
import { TIKET_PULANG_DATA } from "./novels/tiket-pulang-paling-sunyi";
import { SEBELUM_KERETA_KE_JOGJA_DATA } from "./novels/sebelum-kereta-ke-jogja";
import { BUKET_BUNGA_DAN_TOGA_DATA } from "./novels/buket-bunga-dan-toga";
import { DI_BALIK_PINTU_AGENSI_DATA } from "./novels/di-balik-pintu-agensi";
import { CINCIN_DAN_JERATAN_42_JUTA_DATA } from "./novels/cincin-dan-jeratan-42-juta";
import { GARIS_DETAK_KEDUA_DATA } from "./novels/garis-detak-kedua";

// Central Novel Registry
const NOVELS_DB: Record<string, NovelData> = {
  "sebelum-kereta-ke-jogja": SEBELUM_KERETA_KE_JOGJA_DATA,
  "buket-bunga-dan-toga": BUKET_BUNGA_DAN_TOGA_DATA,
  "di-balik-pintu-agensi": DI_BALIK_PINTU_AGENSI_DATA,
  "cincin-dan-jeratan-42-juta": CINCIN_DAN_JERATAN_42_JUTA_DATA,
  "tiket-pulang-paling-sunyi": TIKET_PULANG_DATA,
  "garis-detak-kedua": GARIS_DETAK_KEDUA_DATA,
};

// Semesta Tiket Pulang Catalog (Urutan Kronologis Buku 1 s/d Buku 6)
const CATALOG_METADATA: NovelMetadata[] = [
  {
    slug: SEBELUM_KERETA_KE_JOGJA_DATA.slug,
    title: SEBELUM_KERETA_KE_JOGJA_DATA.title,
    subtitle: SEBELUM_KERETA_KE_JOGJA_DATA.subtitle,
    seriesName: SEBELUM_KERETA_KE_JOGJA_DATA.seriesName,
    seriesPart: SEBELUM_KERETA_KE_JOGJA_DATA.seriesPart,
    tagline: SEBELUM_KERETA_KE_JOGJA_DATA.tagline,
    author: SEBELUM_KERETA_KE_JOGJA_DATA.author,
    genre: SEBELUM_KERETA_KE_JOGJA_DATA.genre,
    totalChapters: SEBELUM_KERETA_KE_JOGJA_DATA.totalChapters,
    totalWords: SEBELUM_KERETA_KE_JOGJA_DATA.totalWords,
    totalReadTimeMinutes: SEBELUM_KERETA_KE_JOGJA_DATA.totalReadTimeMinutes,
    synopsis: SEBELUM_KERETA_KE_JOGJA_DATA.synopsis,
    quote: SEBELUM_KERETA_KE_JOGJA_DATA.quote,
    status: SEBELUM_KERETA_KE_JOGJA_DATA.status,
    publishDate: SEBELUM_KERETA_KE_JOGJA_DATA.publishDate,
    coverAccent: SEBELUM_KERETA_KE_JOGJA_DATA.coverAccent,
    featured: false,
  },
  {
    slug: BUKET_BUNGA_DAN_TOGA_DATA.slug,
    title: BUKET_BUNGA_DAN_TOGA_DATA.title,
    subtitle: BUKET_BUNGA_DAN_TOGA_DATA.subtitle,
    seriesName: BUKET_BUNGA_DAN_TOGA_DATA.seriesName,
    seriesPart: BUKET_BUNGA_DAN_TOGA_DATA.seriesPart,
    tagline: BUKET_BUNGA_DAN_TOGA_DATA.tagline,
    author: BUKET_BUNGA_DAN_TOGA_DATA.author,
    genre: BUKET_BUNGA_DAN_TOGA_DATA.genre,
    totalChapters: BUKET_BUNGA_DAN_TOGA_DATA.totalChapters,
    totalWords: BUKET_BUNGA_DAN_TOGA_DATA.totalWords,
    totalReadTimeMinutes: BUKET_BUNGA_DAN_TOGA_DATA.totalReadTimeMinutes,
    synopsis: BUKET_BUNGA_DAN_TOGA_DATA.synopsis,
    quote: BUKET_BUNGA_DAN_TOGA_DATA.quote,
    status: BUKET_BUNGA_DAN_TOGA_DATA.status,
    publishDate: BUKET_BUNGA_DAN_TOGA_DATA.publishDate,
    coverAccent: BUKET_BUNGA_DAN_TOGA_DATA.coverAccent,
    featured: false,
  },
  {
    slug: DI_BALIK_PINTU_AGENSI_DATA.slug,
    title: DI_BALIK_PINTU_AGENSI_DATA.title,
    subtitle: DI_BALIK_PINTU_AGENSI_DATA.subtitle,
    seriesName: DI_BALIK_PINTU_AGENSI_DATA.seriesName,
    seriesPart: DI_BALIK_PINTU_AGENSI_DATA.seriesPart,
    tagline: DI_BALIK_PINTU_AGENSI_DATA.tagline,
    author: DI_BALIK_PINTU_AGENSI_DATA.author,
    genre: DI_BALIK_PINTU_AGENSI_DATA.genre,
    totalChapters: DI_BALIK_PINTU_AGENSI_DATA.totalChapters,
    totalWords: DI_BALIK_PINTU_AGENSI_DATA.totalWords,
    totalReadTimeMinutes: DI_BALIK_PINTU_AGENSI_DATA.totalReadTimeMinutes,
    synopsis: DI_BALIK_PINTU_AGENSI_DATA.synopsis,
    quote: DI_BALIK_PINTU_AGENSI_DATA.quote,
    status: DI_BALIK_PINTU_AGENSI_DATA.status,
    publishDate: DI_BALIK_PINTU_AGENSI_DATA.publishDate,
    coverAccent: DI_BALIK_PINTU_AGENSI_DATA.coverAccent,
    featured: false,
  },
  {
    slug: CINCIN_DAN_JERATAN_42_JUTA_DATA.slug,
    title: CINCIN_DAN_JERATAN_42_JUTA_DATA.title,
    subtitle: CINCIN_DAN_JERATAN_42_JUTA_DATA.subtitle,
    seriesName: CINCIN_DAN_JERATAN_42_JUTA_DATA.seriesName,
    seriesPart: CINCIN_DAN_JERATAN_42_JUTA_DATA.seriesPart,
    tagline: CINCIN_DAN_JERATAN_42_JUTA_DATA.tagline,
    author: CINCIN_DAN_JERATAN_42_JUTA_DATA.author,
    genre: CINCIN_DAN_JERATAN_42_JUTA_DATA.genre,
    totalChapters: CINCIN_DAN_JERATAN_42_JUTA_DATA.totalChapters,
    totalWords: CINCIN_DAN_JERATAN_42_JUTA_DATA.totalWords,
    totalReadTimeMinutes: CINCIN_DAN_JERATAN_42_JUTA_DATA.totalReadTimeMinutes,
    synopsis: CINCIN_DAN_JERATAN_42_JUTA_DATA.synopsis,
    quote: CINCIN_DAN_JERATAN_42_JUTA_DATA.quote,
    status: CINCIN_DAN_JERATAN_42_JUTA_DATA.status,
    publishDate: CINCIN_DAN_JERATAN_42_JUTA_DATA.publishDate,
    coverAccent: CINCIN_DAN_JERATAN_42_JUTA_DATA.coverAccent,
    featured: false,
  },
  {
    slug: TIKET_PULANG_DATA.slug,
    title: TIKET_PULANG_DATA.title,
    subtitle: TIKET_PULANG_DATA.subtitle,
    seriesName: TIKET_PULANG_DATA.seriesName,
    seriesPart: TIKET_PULANG_DATA.seriesPart,
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
    slug: GARIS_DETAK_KEDUA_DATA.slug,
    title: GARIS_DETAK_KEDUA_DATA.title,
    subtitle: GARIS_DETAK_KEDUA_DATA.subtitle,
    seriesName: GARIS_DETAK_KEDUA_DATA.seriesName,
    seriesPart: GARIS_DETAK_KEDUA_DATA.seriesPart,
    tagline: GARIS_DETAK_KEDUA_DATA.tagline,
    author: GARIS_DETAK_KEDUA_DATA.author,
    genre: GARIS_DETAK_KEDUA_DATA.genre,
    totalChapters: GARIS_DETAK_KEDUA_DATA.totalChapters,
    totalWords: GARIS_DETAK_KEDUA_DATA.totalWords,
    totalReadTimeMinutes: GARIS_DETAK_KEDUA_DATA.totalReadTimeMinutes,
    synopsis: GARIS_DETAK_KEDUA_DATA.synopsis,
    quote: GARIS_DETAK_KEDUA_DATA.quote,
    status: GARIS_DETAK_KEDUA_DATA.status,
    publishDate: GARIS_DETAK_KEDUA_DATA.publishDate,
    coverAccent: GARIS_DETAK_KEDUA_DATA.coverAccent,
    featured: false,
  },
];

export const allNovels = CATALOG_METADATA;

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
