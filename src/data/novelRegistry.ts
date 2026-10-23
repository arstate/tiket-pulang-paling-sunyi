import { NovelData, NovelMetadata } from "../types/novel";
import { TIKET_PULANG_DATA } from "./novels/tiket-pulang-paling-sunyi";

// Central Novel Registry
const NOVELS_DB: Record<string, NovelData> = {
  "tiket-pulang-paling-sunyi": TIKET_PULANG_DATA,
};

// Pentalogi Semesta Tiket Pulang Catalog
const CATALOG_METADATA: NovelMetadata[] = [
  {
    slug: "sebelum-kereta-ke-jogja",
    title: "Sebelum Kereta ke Jogja",
    subtitle: "Sebuah Novel Karya Bachtiar Aryansyah Putra",
    seriesName: "Pentalogi Semesta Tiket Pulang",
    seriesPart: "Buku Kesatu: Awal Magang & Ujian Jogja",
    tagline: "Tentang gerbong kelas ekonomi, tugas studio desain, dan rasa yang tak pernah selesai diucap",
    author: "Bachtiar Aryansyah Putra",
    genre: "Romansa Kampus / Perjalanan Mahasiswa",
    totalChapters: 8,
    totalWords: 9400,
    totalReadTimeMinutes: 45,
    synopsis: "Kisah bermula di studio desain grafis kampus Surabaya. Arga yang pendiam dan Fira yang enerjik dipertemukan dalam kelompok magang ke Yogyakarta. Di tengah gerbong kereta ekonomi Sri Tanjung yang berderak malam hari, secangkir teh nasgitel stasiun, dan lembaran sketsa tugas akhir yang berantakan, benih-benih cinta pertama kali tumbuh dalam diam.",
    quote: "Sebelum peluit kondektur kereta berbunyi membelah malam, aku sudah tahu: ke mana pun langkah kakiku berkelana, matamulah stasiun akhir tempat hatiku ingin pulang.",
    status: "Segera Terbit",
    publishDate: "Segera Hadir",
    coverAccent: "#2E5C6E",
    featured: false,
  },
  {
    slug: "buket-bunga-dan-toga",
    title: "Buket Bunga dan Toga",
    subtitle: "Sebuah Novel Karya Bachtiar Aryansyah Putra",
    seriesName: "Pentalogi Semesta Tiket Pulang",
    seriesPart: "Buku Kedua: Sidoarjo, Jember & Surprise Wisuda",
    tagline: "Menempuh ratusan kilometer aspal malam demi lima belas menit senyuman di hari wisuda",
    author: "Bachtiar Aryansyah Putra",
    genre: "Drama Realis / Perjuangan Cinta LDR",
    totalChapters: 10,
    totalWords: 11200,
    totalReadTimeMinutes: 52,
    synopsis: "Jarak ratusan kilometer antara Sidoarjo dan Jember menjadi saksi perjuangan Arga. Dengan sepeda motor bebek tua dan saku celana yang nyaris kosong, ia menembus dinginnya jalur Gumitir di tengah malam hanya demi mengantarkan sebuket bunga edelweis dan menyaksikan Fira mengenakan toga wisuda.",
    quote: "Toga itu mungkin tanda kelulusanmu dari universitas, Fira. Tapi bagiku, senyummu di bawah terik podium wisuda adalah awal dari sumpah baktiku seumur hidup.",
    status: "Segera Terbit",
    publishDate: "Segera Hadir",
    coverAccent: "#6B4C7D",
    featured: false,
  },
  {
    slug: "di-balik-pintu-agensi",
    title: "Di Balik Pintu Agensi",
    subtitle: "Sebuah Novel Karya Bachtiar Aryansyah Putra",
    seriesName: "Pentalogi Semesta Tiket Pulang",
    seriesPart: "Buku Ketiga: Dunia Agensi & Kuliah DKV",
    tagline: "Begadang demi revisi klien ke-14, lembur demi tabungan masa depan bersama",
    author: "Bachtiar Aryansyah Putra",
    genre: "Drama Karir / Realitas Kreatif & Cinta Urban",
    totalChapters: 10,
    totalWords: 12500,
    totalReadTimeMinutes: 58,
    synopsis: "Memasuki babak baru kehidupan profesional di Surabaya. Arga dan Fira berjuang merintis karir di industri kreatif periklanan seraya menyelesaikan kuliah DKV. Menghadapi klien korporat yang kejam, deadline tender yang mencekik, monitor komputer yang hang saat rendering tengah malam, serta mimpi nekat mendirikan studio agensi independen mereka sendiri.",
    quote: "Layar monitor boleh menyala sampai subuh dan klien boleh mencaci, tapi alasan aku tak pernah melempar handuk adalah secangkir kopi hitam yang kau letakkan di samping keyboard-ku.",
    status: "Segera Terbit",
    publishDate: "Segera Hadir",
    coverAccent: "#1E5E4E",
    featured: false,
  },
  {
    slug: "cincin-dan-jeratan-42-juta",
    title: "Cincin & Jeratan 42 Juta",
    subtitle: "Sebuah Novel Karya Bachtiar Aryansyah Putra",
    seriesName: "Pentalogi Semesta Tiket Pulang",
    seriesPart: "Buku Keempat: Semester Akhir & Utang Vendor",
    tagline: "Ketika cinta harus bertarung melawan jeratan tagihan vendor dan sebuah janji cincin safir",
    author: "Bachtiar Aryansyah Putra",
    genre: "Drama Finansial / Ujian Pranikah / Tragedi",
    totalChapters: 10,
    totalWords: 13100,
    totalReadTimeMinutes: 60,
    synopsis: "Prequel paling krusial sebelum Tiket Pulang Paling Sunyi. Demi mewujudkan pernikahan impian dan modal agensi, Arga mengambil proyek pameran raksasa di Jatim Expo Surabaya. Malapetaka terjadi saat vendor kabur dan EO wanprestasi, meninggalkan tanggungan utang Rp 42 juta di pundak Arga. Di tengah teror penagih utang, Arga diam-diam memesan cincin safir dengan gravir rahasia yang kelak ditemukan di saku jaketnya.",
    quote: "Bukan uang empat puluh dua juta yang meremukkan dadaku, Fira. Yang membuatku gemetar adalah ketakutan jika nafasku habis sebelum aku sempat menyematkan cincin ini di jari manismu.",
    status: "Segera Terbit",
    publishDate: "Segera Hadir",
    coverAccent: "#8C4A2E",
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
