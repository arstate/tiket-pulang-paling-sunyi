# 🐛 Bug & Fix Ledger — Multi-Novel Platform

Buku besar catatan seluruh bug yang pernah ditemukan dan solusi penyelesaiannya secara permanen.

| ID | Gejala Masalah | Akar Penyebab | Solusi Permanen | Status |
| :--- | :--- | :--- | :--- | :--- |
| **BF-01** | Nama karakter "Danu" / "Nu" masih muncul di beberapa dialog bab | Penamaan draf awal sebelum diganti menjadi "Arga" | Pemindaian regex menyeluruh pada semua file markdown dan TS; penggantian 100% tuntas ke Arga | **SOLVED** |
| **BF-02** | Lagu Hindia masih terpasang di reader | Preferensi pembaca melarang penggunaan lagu Hindia | Diganti dengan Dere - *Berisik* (Bab 1) dan Novo Amor - *Utican* (Bab 9) | **SOLVED** |
| **BF-03** | Teks footer mengandung kata-kata template AI slop | Draf footer awal menggunakan teks standar AI | Diganti dengan kutipan sastra mendalam dan hak cipta karya resmi | **SOLVED** |
| **BF-04** | Lagu di Vercel tidak mau terupdate di browser pengguna | Header HTTP `Cache-Control: immutable` (1 tahun) dan Service Worker cache-first menahan file audio lama di disk | Penambahan query parameter cache-busting (`?v=20261023_v5`) dan auto-purge Service Worker (`novel-reader-bandwidth-v5`) | **SOLVED** |
| **BF-05** | Musik terpotong pendek 75 detik dan ada jeda mati di akhir | Pemotongan audio awal dibatasi ke 75 detik untuk hemat kuota | Pembuatan Full Music (2-5 menit), pemotongan dead air di bawah -44 dB via analisis spektrum desibel | **SOLVED** |
| **BF-06** | Volume audio amblas (kempos) saat pergantian bab | Ramping linear pada Web Audio API menyebabkan penurunan -3 dB di titik tengah | Penggantian kurva crossfade dengan rumus fisika **Equal-Power Dissolve** ($\cos / \sin$) di Web Audio API | **SOLVED** |
| **BF-07** | Master markdown in-repo `nextjs-reader/NOVEL_TIKET_PULANG_PALING_SUNYI.md` tidak tersinkronisasi dengan cliffhanger ambulans | Perubahan hanya ditulis ke file induk luar repo | Sinkronisasi penuh file naskah in-repo dengan adegan ambulans, SD card, cincin safir, dan flatline EKG | **SOLVED** |
| **BF-08** | Bab 10 di `index.ts` terputus tanpa teaser Pentalogi | Tidak ada divider penutup dan teks canonical teaser | Ditambahkan divider `✦ ✦ ✦` dan `[BERSAMBUNG KE PENTALOGI SEMESTA TIKET PULANG]` | **SOLVED** |
| **BF-09** | Total kata di `TocDrawer.tsx` hardcoded ke "11.082 Kata" yang usang | Angka statis sebelum ekspansi Bab 10 cliffhanger | Menggunakan kalkulasi dinamis `chapters.reduce((sum, ch) => sum + ch.wordCount, 0).toLocaleString("id-ID")` | **SOLVED** |
| **BF-10** | Pembaca di ponsel (viewport mobile <640px) tidak punya tombol cepat kembali ke Katalog | Link `Katalog` di header menggunakan kelas `hidden sm:flex` | Ditampilkan ikon panah kembali ke Katalog di mobile Header dan ditambahkan entri Katalog di `TocDrawer` | **SOLVED** |
| **BF-11** | Kartu novel prekuel menampilkan teks dobel "Segera Hadir • Naskah Segera Hadir" | String `publishDate` sama dengan teks suffix | Disederhanakan menjadi badge bersih "Naskah Segera Hadir" dengan dot amber berdenyut | **SOLVED** |
