# Project Context: Multi-Novel Web Reader Platform

- **Framework**: Next.js 14 (App Router, TypeScript, Tailwind CSS)
- **Deployment**: Vercel Static Export (`output: 'export'`, Zero Serverless Invocations)
- **Live URL**: https://tiket-pulang-paling-sunyi.vercel.app
- **URL Architecture**:
  - `/` -> Multi-Novel Catalog / Library Hub Homepage
  - `/[novelSlug]/` -> Individual Novel Interactive Reader (e.g. `/tiket-pulang-paling-sunyi/`)
- **Brain Documentation**: See `./readme-ai-agent/` for the complete 12-file project architecture.
- **Rules**:
  - Maintain `output: 'export'` compatibility (always use `generateStaticParams()` for dynamic routes).
  - Preserve Audio Dissolve Equal-Power engine & PWA Service Worker Cache-First zero-bandwidth shield.
  - No AI clichés, no generic `#6366f1` purple, warm cream/paper literary design aesthetic.
