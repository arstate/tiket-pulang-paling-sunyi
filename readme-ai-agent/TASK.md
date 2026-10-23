# 📝 Task Checklist — Multi-Novel Platform Transformation

## Fase 1: Perancangan & Dokumentasi Proyek
- [x] Inisialisasi folder otak proyek `readme-ai-agent/` dengan 12 file arsitektur standar.
- [x] Susun PRD, arsitektur routing multi-novel, dan kontrak tech stack.
- [x] Buat rencana implementasi teknis `plan_multi_novel_platform.md`.

## Fase 2: Data Layer & Novel Registry
- [x] Buat registri novel pusat di `src/data/novelRegistry.ts`.
- [x] Pindahkan data novel *Tiket Pulang Paling Sunyi* ke modul terisolasi `src/data/novels/tiket-pulang-paling-sunyi/index.ts`.
- [x] Sediakan helper `getAllNovels()`, `getNovelBySlug()`, dan `getAllNovelSlugs()`.

## Fase 3: Komponen Modular & Decoupled Sound Engine
- [x] Ekstrak logika pembaca interaktif ke `src/components/NovelReader.tsx`.
- [x] Sesuaikan `SoundEngine.ts` agar dapat memuat soundscape audio per novel secara dinamis tanpa hardcode.
- [x] Perbarui tombol navigasi `Header.tsx` untuk mendukung kembali ke Katalog Beranda (`/`).

## Fase 4: Routing App Router & Beranda Katalog
- [x] Bangun halaman dinamis `src/app/[novelSlug]/page.tsx` dengan `generateStaticParams()` dan dynamic SEO metadata.
- [x] Bangun halaman utama `src/app/page.tsx` sebagai Katalog Perpustakaan Novel (Hero, Resume Reading, Grid Koleksi, Highlight Fitur).
- [x] Tambahkan generator sitemap otomatis di `src/app/sitemap.ts`.

## Fase 5: Verifikasi & Deploy Production
- [x] Jalankan typecheck TypeScript: `npx tsc --noEmit`.
- [x] Jalankan static build: `npm run build` (pastikan halaman `/` dan `/[novelSlug]` ter-export statis sempurna).
- [x] Uji responsivitas 7-viewport (Mobile, Tablet, Desktop).
- [x] Git commit & push ke GitHub main branch.
- [x] Deploy ke Vercel production dan verifikasi domain live.

## Fase 6: Ekspansi Pentalogi Semesta Tiket Pulang & Epilog Cliffhanger
- [x] Integrasi metadata 5 buku Pentalogi di `src/data/novelRegistry.ts` (Buku 1-4 Segera Terbit, Buku 5 Lengkap 10 Bab).
- [x] Update antarmuka katalog `src/app/page.tsx` dengan badge `seriesPart` dan status "Segera Hadir".
- [x] Polish Bab 10 (Epilog Cliffhanger di ambulans: tiket basah Banyuwangi, SD card Jatim Expo, cincin safir "Tunggu wisudaku, Fira", dan alarm asistol EKG "TIIIIIIIIIT!") di `index.ts` dan markdown source.
- [x] Verifikasi zero build error via `npm run build` static export.

## Fase 7: Publikasi Naskah Lengkap Buku 1 (Sebelum Kereta ke Jogja)
- [x] Tulis dan integrasikan 10 Bab lengkap (13.295 kata) di `src/data/novels/sebelum-kereta-ke-jogja/chapters/` (Bab 1 s/d Bab 10).
- [x] Rilis data novel di `src/data/novels/sebelum-kereta-ke-jogja/index.ts` dan registrasikan di `src/data/novelRegistry.ts` dengan status "Tamat".
- [x] Sinkronkan master file markdown naskah lengkap di `NOVEL_SEBELUM_KERETA_KE_JOGJA.md`.
- [x] Verifikasi build statis Next.js (7/7 static routes: `/sebelum-kereta-ke-jogja` aktif dan responsif).
- [x] Git commit dan push ke remote repository.

## Fase 8: Publikasi Naskah Lengkap Buku 2 (Buket Bunga dan Toga)
- [x] Tulis dan integrasikan 10 Bab lengkap (13.550 kata) di `src/data/novels/buket-bunga-dan-toga/chapters/` (Bab 1 s/d Bab 10).
- [x] Rilis data novel di `src/data/novels/buket-bunga-dan-toga/index.ts` dan registrasikan di `src/data/novelRegistry.ts` dengan status "Tamat".
- [x] Sinkronkan master file markdown naskah lengkap di `NOVEL_BUKET_BUNGA_DAN_TOGA.md`.
- [x] Verifikasi build statis Next.js (8/8 static routes: `/buket-bunga-dan-toga` aktif dan responsif).
- [x] Git commit dan push ke remote repository.
