/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Ekspor 100% HTML statis murni (Zero Serverless Functions)
  output: 'export',

  // 2. Normalisasi trailing slash untuk konsistensi caching
  trailingSlash: true,

  // 3. Matikan Vercel Image Optimization (0 Transform quota used)
  images: {
    unoptimized: true,
  },

  // 4. Kompresi output aset
  compress: true,

  // 5. Generate ETag untuk validasi cache Cloudflare & Browser
  generateEtags: true,

  // 6. Matikan header generator 'X-Powered-By'
  poweredByHeader: false,

  // 7. Optimasi React strict mode
  reactStrictMode: true,

  // 8. Abaikan eslint saat production export
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
