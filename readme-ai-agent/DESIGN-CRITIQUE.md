# 👁️ Design Critique & Viewport Rubrics — Multi-Novel Platform

Pedoman evaluasi visual dan kualitas antarmuka pengguna berdasarkan prinsip *14-Pass Critique* dan pengujian 7-viewport.

## 1. Rubrik Audit 7-Ukuran Layar (7-Viewport QA)
- **Mobile Potret Sangat Sempit (360px - 390px)**:
  - Tidak ada teks yang terpotong atau overflow horizontal (`scrollWidth === clientWidth`).
  - Padding samping minimum 16px (`px-4`), tombol navigasi sentuh minimum 44x44px.
  - Floating player audio tidak menutupi baris teks terbawah saat scroll.
- **Mobile Potret Standar (390px - 430px)**:
  - Font body berukuran 17px - 18px nyaman dibaca pada jarak pegang tangan 30cm.
  - Line-height nyaman di `1.85`.
- **Tablet Potret (768px)**:
  - Lebar artikel novel dikunci di `max-w-3xl` agar baris kalimat tidak terlalu panjang.
  - Grid kartu novel di katalog menampilkan 2 kolom sejajar.
- **Desktop Layar Lebar (1280px+)**:
  - Tampilan terpusat dengan padding elegan, ToC drawer transisi lembut tanpa layout shift.
  - Grid katalog menampilkan 3 kolom dengan hover card halus.

## 2. Poin Penegakan Anti-Slop Visual
1. **Dilarang keras memakai gradien ungu tech generik (`#6366f1`)**: Selalu gunakan palet kertas sastra (`#FAF6EE`, `#C85A32`, `#3D3328`).
2. **Dilarang memakai teks placeholder "Lorem Ipsum"**: Seluruh kartu dan teks diisi data nyata.
3. **Dilarang memakai efek animasi berlebihan yang mengalihkan fokus**: Animasi hanya untuk transisi halus modal dan fade-in pergantian bab.
