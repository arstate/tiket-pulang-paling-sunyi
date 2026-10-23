# 🔒 Security Policy — Multi-Novel Platform

## Kebijakan Keamanan 7-Lapisan

1. **Permukaan Serangan Nol Server (Zero Server Attack Surface)**:
   - Situs diekspor sebagai HTML/CSS/JS statis murni (`output: 'export'`).
   - Tidak ada runtime Node.js di sisi server yang rentan terhadap Remote Code Execution (RCE) atau Server-Side Request Forgery (SSRF).

2. **Content Security Policy (CSP) Ketat (`vercel.json`)**:
   - `default-src 'self'`.
   - `object-src 'none'`.
   - `frame-ancestors 'none'` (anti-clickjacking).
   - `media-src 'self' blob: data:` (hanya mengizinkan streaming audio dari domain sendiri).

3. **Sanitasi Konten Teks**:
   - Seluruh teks dialog dan kutipan novel disajikan melalui React JSX yang secara bawaan melakukan encoding XSS (anti-script injection).
   - Elemen penanda format dialog (`span`, `em`, `strong`) diproses secara aman tanpa `dangerouslySetInnerHTML` dari input liar luar.

4. **Kepatuhan Privasi Data Lokal**:
   - Riwayat baca (`last_read_chapter`, `settings`) hanya disimpan di `localStorage` peramban milik pengguna.
   - Tidak ada pengumpulan data pribadi atau pelacakan invasif tanpa izin.

5. **Header Proteksi Peramban**:
   - `X-Content-Type-Options: nosniff`.
   - `X-Frame-Options: DENY`.
   - `Referrer-Policy: strict-origin-when-cross-origin`.
   - `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`.
