# SocialPully — Frontend

Next.js 14 (App Router) marketing site and download UI for SocialPully. All pages
are JavaScript (`.js`) — there is no TypeScript source despite the `tsconfig.json`
kept around for the `@/*` path alias.

## Stack

- Next.js 14 (App Router, server components by default)
- React 18
- Tailwind CSS 3 + `@tailwindcss/typography` (used by the blog)
- `lucide-react` for icons
- ESLint via `next/core-web-vitals` (`.eslintrc.json`)

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

Open http://localhost:3000.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build (also runs ESLint) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint only |
| `ANALYZE=true npm run build` | Build with the bundle analyzer |

## Environment

See `.env.example`. `NEXT_PUBLIC_API_BASE` points at the Django backend in
`../../backend/video_downloader`; without it the components fall back to the
deployed Railway URL.

## Layout

```
app/                  Routes (one directory per page) + /api proxy, robots.txt, sitemap.xml
components/           Shared UI (DownloadForm is the main interactive piece)
lib/                  Blog content, SEO metadata and JSON-LD schema builders
middleware.js         301/308 redirects for legacy and short URLs
public/               Static assets
```
