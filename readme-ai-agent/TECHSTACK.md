# 🛠️ Tech Stack Contract — Multi-Novel Platform

| Komponen | Pilihan Teknologi | Alasan Arsitektural |
| :--- | :--- | :--- |
| **Framework** | Next.js 14 (App Router) | Dukungan routing modular `/[novelSlug]`, SSG optimal, dan ekosistem modern |
| **Export Mode** | `output: 'export'` (Static Export) | **Zero Serverless Functions (`0` Invocation)**, tahan 1M+ pembaca di Vercel Hobby + Cloudflare |
| **Styling** | Tailwind CSS v3 + CSS Variables | Desain responsif cepat, dukungan palet dinamis (Krem, Sepia, Malam) |
| **Bahasa** | TypeScript 5 (Strict Mode) | Type-safety untuk struktur bab novel, paragraph items, dan audio registry |
| **Audio API** | Native Web Audio API + HTML5 Audio | Dual-deck playback, equal-power cosine/sine crossfade, gain scheduling presisi |
| **Audio Compression** | FFmpeg libmp3lame (64kbps CBR, -16 LUFS) | Bobot ringan (~1.5MB - 2.5MB per lagu penuh), suara jernih, loading instan |
| **PWA & Offline** | Custom Service Worker Cache-First (`sw.js`) | Auto-purge versi cache lama (`novel-reader-bandwidth-v5`), zero bandwidth repeat visits |
| **Hosting & CDN** | Vercel Edge Network | Distribusi global, HTTPS HTTP/2 otomatis, integrasi Git push-to-deploy |

## Aturan Kuota & Bandwidth
1. Dilarang menggunakan serverless route (`/api/*`) yang memicu biaya komputasi Vercel; seluruh data novel di-bundle sebagai statis pada saat `npm run build`.
2. Gambar sampul menggunakan tag `<img>` standar atau `<Image unoptimized>` untuk menghindari kuota transformasi gambar Vercel.
