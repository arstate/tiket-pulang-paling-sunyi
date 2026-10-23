# 📝 Task Checklist — Multi-Novel Platform Transformation

## Fase 1: Perancangan & Dokumentasi Proyek
- [x] Inisialisasi folder otak proyek `readme-ai-agent/` dengan 12 file arsitektur standar.
- [x] Susun PRD, arsitektur routing multi-novel, dan kontrak tech stack.
- [x] Buat rencana implementasi teknis `plan_multi_novel_platform.md`.

## Fase 2: Data Layer & Novel Registry
- [ ] Buat registri novel pusat di `src/data/novelRegistry.ts`.
- [ ] Pindahkan data novel *Tiket Pulang Paling Sunyi* ke modul terisolasi `src/data/novels/tiket-pulang-paling-sunyi/index.ts`.
- [ ] Sediakan helper `getAllNovels()`, `getNovelBySlug()`, dan `getAllNovelSlugs()`.

## Fase 3: Komponen Modular & Decoupled Sound Engine
- [ ] Ekstrak logika pembaca interaktif ke `src/components/NovelReader.tsx`.
- [ ] Sesuaikan `SoundEngine.ts` agar dapat memuat soundscape audio per novel secara dinamis tanpa hardcode.
- [ ] Perbarui tombol navigasi `Header.tsx` untuk mendukung kembali ke Katalog Beranda (`/`).

## Fase 4: Routing App Router & Beranda Katalog
- [ ] Bangun halaman dinamis `src/app/[novelSlug]/page.tsx` dengan `generateStaticParams()` dan dynamic SEO metadata.
- [ ] Bangun halaman utama `src/app/page.tsx` sebagai Katalog Perpustakaan Novel (Hero, Resume Reading, Grid Koleksi, Highlight Fitur).
- [ ] Tambahkan generator sitemap otomatis di `src/app/sitemap.ts`.

## Fase 5: Verifikasi & Deploy Production
- [ ] Jalankan typecheck TypeScript: `npx tsc --noEmit`.
- [ ] Jalankan static build: `npm run build` (pastikan halaman `/` dan `/[novelSlug]` ter-export statis sempurna).
- [ ] Uji responsivitas 7-viewport (Mobile, Tablet, Desktop).
- [ ] Git commit & push ke GitHub main branch.
- [ ] Deploy ke Vercel production dan verifikasi domain live.
