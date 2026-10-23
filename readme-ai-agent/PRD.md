# 📋 Product Requirements Document (PRD) — Multi-Novel Platform

## 1. Visi Produk
Menjadikan platform ini sebagai ruang baca sastra digital imersif yang memuat koleksi karya novel karya Bachtiar Aryansyah Putra (dimulai dari *Tiket Pulang Paling Sunyi* dan novel-novel berikutnya) dengan pengalaman baca mewah tanpa gangguan iklan, disertai iringan musik ambient dinamis (*Equal-Power Audio Dissolve*).

## 2. Target Pengguna & Karakteristik
- Pembaca fiksi drama, emosional, romansa realis, dan sastra kontemporer Indonesia.
- Mengutamakan kenyamanan membaca di layar HP dalam durasi lama (10-60 menit) tanpa kelelahan mata.
- Menginginkan suasana imersif melalui iringan audio tematik per bab.

## 3. Fitur Utama & Kebutuhan Fungsional

### A. Beranda Katalog Novel (`/`)
1. **Hero Spotlight**: Memperkenalkan novel unggulan (*Tiket Pulang Paling Sunyi*) lengkap dengan sinopsis, kutipan emosional, statistik kata/bab, dan tombol CTA *"Baca Sekarang"*.
2. **Widget "Lanjutkan Membaca"**: Secara otomatis mendeteksi progress baca terakhir dari `localStorage`, menampilkan kartu cepat untuk melompat langsung ke bab terakhir yang dibaca.
3. **Katalog Koleksi**: Grid kartu novel terbit dan slot *"Segera Terbit"* (Upcoming) dengan filter genre dan status kelengkapan.
4. **Sorotan Pengalaman Baca**: Informasi fitur kenyamanan (Audio Dissolve, 3 Tema Warna, Ukuran Font Fleksibel, 100% Bebas Iklan).

### B. Pembaca Interaktif Tiap Novel (`/[novelSlug]/`)
1. **Routing Otomatis**: Setiap novel yang didaftarkan di `src/data/novelRegistry.ts` otomatis menghasilkan rute bersih `domain.com/[novelSlug]/` via `generateStaticParams()`.
2. **Navigasi Bab Lengkap**: Drawer Daftar Isi (ToC) mencakup seluruh bab beserta estimasi menit baca dan ringkasan cuplikan.
3. **Pengaturan Tampilan Membaca**:
   - 5 Tema warna: Krem Kertas (default), Sepia Lembut, Malam Temaram, Gelap OLED, Putih Bersih.
   - 3 Pilihan font sastra: Merriweather, Lora, Georgia.
   - Pengatur ukuran huruf (A- / A+) dan perataan teks.
4. **Sound Engine Terisolasi**:
   - BGM spesifik per novel dengan transisi Audio Dissolve equal-power ($\cos/\sin$).
   - Kontrol audio sticky dan izin autoplay ramah browser.
5. **Navigasi Global**: Tombol cepat untuk kembali ke Sampul Novel (Bab 0) atau kembali ke Katalog Utama (`/`).

## 4. Kebutuhan Non-Fungsional
- **Biaya Server**: Rp 0 (100% Static Export `output: 'export'` di Vercel Edge).
- **Kecepatan**: Largest Contentful Paint (LCP) < 1.0 detik di jaringan 4G.
- **Offline PWA**: Cache-first Service Worker untuk membaca bab tanpa koneksi internet.
