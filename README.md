# 📖 Tiket Pulang Paling Sunyi — Next.js Reader

Aplikasi Web Reader modern, cepat, dan responsif berbasis **Next.js (App Router)** dan **Tailwind CSS** untuk novel *"Tiket Pulang Paling Sunyi"* karya **Danu Prasetya** (10 Bab Lengkap, 11.082 kata).

---

## 🎨 Fitur Utama

1. **Estetika Kertas Krem Hangat (Warm Paper Aesthetic)**:
   - Warna tema bawaan ramah mata (`#FAF6EE` / `#FFFDF9`, teks `#2C2621`, aksen cokelat tembikar `#9A5828`), bebas silau layar putih.
   - 5 Pilihan Tema Lengkap:
     - **Krem Hangat (Default)**: `#FAF6EE`
     - **Sepia Kertas Antik**: `#F3EBD8`
     - **Senja Slate**: `#1C2128`
     - **Hitam OLED Pekat**: `#121314`
     - **Putih Bersih**: `#FFFFFF`

2. **Tipografi Berdaya Baca Tinggi (Book Serif Mandate)**:
   - UI, tombol navigasi, dan header menggunakan **Plus Jakarta Sans / Inter** (sans-serif modern).
   - Teks isi novel menggunakan font **Book Serif**: **Merriweather** (default), **Lora**, dan **Georgia**.
   - Dilengkapi kontrol ukuran font dinamis:
     - Stepper `A−` / `A+` dengan preset cepat (`16px`, `18.5px`, `20.5px`, `23px`).
     - Jarak baris (*Line Spacing*): Rapat (1.6), Nyaman (1.85), Longgar (2.1).
     - Lebar halaman: Ramping (640px), Standar (720px), Lebar (840px).
     - Perataan teks: Rata Kiri & Rata Kanan-Kiri (*Justify*).

3. **Navigasi & Kemudahan Membaca**:
   - **Progress Bar Akurat (0-100%)**: Indikator persentase gulir posisi baca bab aktif menempel di bagian atas layar.
   - **Daftar Isi (Table of Contents Drawer)**: Drawer samping menampilkan 10 bab lengkap dengan jumlah kata, estimasi menit baca, cuplikan bab, serta status bab aktif (*Sedang Dibaca*).
   - **Navigasi Bab Cepat**: Tombol *Bab Sebelumnya* & *Bab Selanjutnya* di header atas, navigasi penutup bab, serta *Mobile Bottom Bar* yang otomatis bersembunyi di halaman sampul.
   - **Penyimpanan Otomatis (Local Storage)**: Menyimpan bab terakhir dibaca serta preferensi tema, ukuran huruf, jarak baris, dan jenis font secara otomatis.
   - **Synthesizer Ambiance Suara Hujan & Kereta Malam**: Audio ambient generatif berbasis Web Audio API murni (100% offline, tanpa file mp3 eksternal, hemat bandwidth, volume slider).
   - **Dukungan Pintasan Keyboard (Desktop)**:
     - `→` atau `]` atau `n`: Bab Selanjutnya
     - `←` atau `[` atau `p`: Bab Sebelumnya
     - `+` / `=`: Perbesar Ukuran Huruf (A+)
     - `-` / `_`: Perkecil Ukuran Huruf (A−)
     - `m`: Buka / Tutup Daftar Isi
     - `a` atau `t`: Buka / Tutup Pengaturan Huruf
     - `h`: Kembali ke Halaman Sampul & Sinopsis
     - `Esc`: Tutup Drawer / Modal

4. **100% Responsif & Static Export Ready**:
   - Tampilan optimal di HP (360px - 430px), Tablet (768px), hingga Desktop lebar (1280px+).
   - Terverifikasi bersih dengan `output: 'export'` (menghasilkan folder `out/` siap hosting di Vercel, Cloudflare Pages, atau GitHub Pages).

---

## 🚀 Panduan Menjalankan

### 1. Menjalankan Server Pengembangan (Dev)
```bash
cd "/mnt/HDD-2/BACKUP LINUX/FILE DATA/NOVEL/Tiket Pulang Paling Sunyi/nextjs-reader"
npm run dev
# Buka http://localhost:3000 di browser
```

### 2. Membangun Production Static Export
```bash
npm run build
# Hasil static HTML/CSS/JS siap deploy tersimpan di folder out/
```

### 3. Menjalankan Preview Static Build
```bash
npx serve out
```

---

## 📁 Struktur Direktori
```text
nextjs-reader/
├── public/
│   ├── favicon.svg          # Favicon buku & tiket kereta vintage
│   └── manifest.json        # Manifest web app
├── src/
│   ├── app/
│   │   ├── globals.css      # Custom theme CSS variables & prose typography
│   │   ├── layout.tsx       # Root layout, Google Fonts link, & metadata
│   │   └── page.tsx         # Main reader app & state manager
│   ├── components/
│   │   ├── ChapterContent.tsx      # Teks novel, drop-cap, dialog & footer nav
│   │   ├── Header.tsx              # Brand, chapter pill, audio & settings trigger
│   │   ├── HeroCover.tsx           # Halaman sampul, sinopsis, & kartu bab
│   │   ├── MobileBottomNav.tsx     # Navigasi melayang di mobile
│   │   ├── ReadingProgressBar.tsx  # Sticky progress bar 0-100%
│   │   ├── SettingsDrawer.tsx      # Drawer pengaturan tema, font & audio
│   │   ├── SoundEngine.ts          # Synthesizer Web Audio API hujan & kereta
│   │   └── TocDrawer.tsx           # Drawer daftar isi 10 bab lengkap
│   ├── data/
│   │   └── novelData.ts     # Data terstruktur 10 bab (11.082 kata)
│   └── types/
│       └── novel.ts         # TypeScript definitions
├── next.config.mjs          # Konfigurasi Next.js (output: 'export')
├── tailwind.config.ts       # Tema krem & palet warna Tailwind
├── tsconfig.json            # Konfigurasi TypeScript strict
└── package.json
```
