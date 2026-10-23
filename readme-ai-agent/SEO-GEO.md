# 🌐 SEO, GEO & AI Search Optimization — Multi-Novel Platform

## 1. Pemetaan Struktur URL
- **Beranda Katalog**: `https://tiket-pulang-paling-sunyi.vercel.app/`
- **Novel 1**: `https://tiket-pulang-paling-sunyi.vercel.app/tiket-pulang-paling-sunyi/`
- **Novel Masa Depan**: `https://tiket-pulang-paling-sunyi.vercel.app/[novelSlug]/`

## 2. Metadata Dinamis per Halaman
Setiap halaman novel di-generate dengan tag meta spesifik:
- `title`: `[Judul Novel] — Baca Online Lengkap | Novel Karya [Penulis]`
- `description`: Cuplikan sinopsis resmi (140-160 karakter).
- `keywords`: Judul novel, baca novel online, sastra Indonesia, novel emosional, drama keluarga, Bachtiar Aryansyah Putra.
- `canonical`: URL absolut kanonik dengan trailing slash.
- `openGraph`: Gambar sampul novel, tipe `book`, judul, sinopsis, dan URL resmi.
- `twitter`: Kartu besar (`summary_large_image`).

## 3. Schema.org JSON-LD Terstruktur
- Tipe entitas: `Book` dan `WebSite`.
- Menyertakan properti: `name`, `author` (Person), `genre`, `numberOfPages` / `totalChapters`, `inLanguage: "id"`, `description`.

## 4. Berkas Mesin Pencari & AI Search (GEO)
- `src/app/sitemap.ts`: Menghasilkan `sitemap.xml` statis otomatis saat build time.
- `public/robots.txt`: Mengizinkan seluruh bot mesin pencari (`User-agent: *`, `Allow: /`).
- `public/llms.txt`: Menyajikan ringkasan teks novel terstruktur untuk mesin pencari berbasis AI (Perplexity, ChatGPT Search, Gemini).
