# VCFO — Financial Intelligence Platform

The VCFO marketing website: **Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 ·
shadcn/ui + Radix UI · next-intl (Arabic/English, RTL/LTR) · server-first SEO**.

> **Migration note.** This site was migrated from a TanStack Start + TanStack Router
> implementation to Next.js App Router. The route map, page structure, sections, content,
> visual design and animations were preserved from the original application — this is a
> migration, not a redesign. The original route map was:

```
/                 →  home page (single page with all sections: Hero → TrustBar → Problem
                     → Solution → HowItWorks → FinancialTruth → Statements → CashFlow
                     → Analytics → HealthScore → MultiCompany → DataQuality
                     → ErrorResolution → Compliance → AICfo → AICapabilities → Scenarios
                     → Forecast → Pricing → Testimonials → CTA → FAQ)
/about            →  about page
/privacy          →  privacy policy
/terms            →  terms of use
/blog             →  blog index
/blog/$slug       →  dynamic blog article
```

No section became a page. The `[locale]` segment wraps the existing route structure:
`/ar`, `/en`, `/ar/blog`, `/en/blog/...`, with Arabic as the default language
(`/` → `/ar`, `lang="ar" dir="rtl"`).

## Tech stack

- **Next.js 16** (App Router, Turbopack) — Server Components by default, SSG for every
  public page, `generateStaticParams`, `generateMetadata`
- **TypeScript** (strict)
- **Tailwind CSS v4** + the original VCFO design tokens (`globals.css`)
- **shadcn/ui / Radix UI** (accordion for the FAQ, button primitives)
- **next-intl** — localized routing (`/ar`, `/en`), RTL/LTR, localized messages
- **next/font** — self-hosted IBM Plex Sans, IBM Plex Mono and Noto Sans Arabic
  (no runtime Google Fonts requests)
- **lucide-react** icons, **@vercel/analytics**, **schema-dts** (JSON-LD typing)

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # prebuild generates OG images, then static export of all routes
npm run start      # production server
npm run lint
```

Environment variables (public-only — see `.env.example`):

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 ID (empty = disabled) |
| `NEXT_PUBLIC_SALES_WHATSAPP_NUMBER` | Sales WhatsApp number for CTA links |

Never put secrets in client code — only `NEXT_PUBLIC_*` values are exposed to the browser.

## Architecture

```
app/
├── layout.tsx                # minimal root layout (passes children through)
├── page.tsx                  # "/" → redirects to the default locale (/ar)
├── proxy.ts                  # next-intl locale routing (middleware/proxy)
├── robots.ts                 # robots.txt (public pages allowed, /api /dashboard /admin blocked, AI crawlers welcome)
├── sitemap.ts                # dynamic sitemap: ar + en pages + all blog articles
├── manifest.ts               # web app manifest
├── not-found.tsx             # standalone 404 (invalid locales)
└── [locale]/
    ├── layout.tsx            # <html lang dir>, fonts, providers, Organization + WebSite JSON-LD
    ├── page.tsx              # home page (all sections in their original order)
    ├── about/page.tsx
    ├── privacy/page.tsx
    ├── terms/page.tsx
    ├── blog/
    │   ├── page.tsx          # blog index
    │   └── [slug]/page.tsx   # dynamic article (404 for unknown slugs)
    ├── [...rest]/page.tsx    # unknown paths → localized 404
    └── not-found.tsx         # localized 404

components/
├── ui/          # shadcn/ui primitives (button, accordion)
├── layout/      # navbar, footer, lang-switch, breadcrumbs, page-shell, logo
├── shared/      # reveal-on-scroll, count-up, GA bootstrap, analytics tracker
├── home/        # homepage sections (mirrors the original vcfo/ component split)
└── seo/         # JSON-LD renderer

lib/
├── seo/         # createPageMetadata, createBlogMetadata, canonical/hreflang, structured data
├── i18n/        # routing + navigation configuration
├── site.ts      # site-wide constants (URL, locales, brand)
├── fonts.ts     # self-hosted fonts (next/font/local)
├── analytics.ts # GA4 helpers (client-safe)
└── whatsapp.ts  # CTA link builder

content/blog/    # blog articles as data (posts.json) + typed helpers — content separated from presentation
messages/        # ar.json / en.json — every UI string localized
scripts/         # generate-og.mjs — build-time Open Graph image generation
src/assets/fonts # self-hosted font files
public/og/       # generated social images (default + per-article per-locale)
```

### Server-first rendering

Everything is a Server Component by default. The only `"use client"` files are genuinely
interactive leaves:

- `layout/navbar.tsx`, `layout/lang-switch.tsx` — scroll state, mobile menu, locale switch
- `home/pricing.tsx`, `home/scenarios.tsx` — interactive pricing cycle + what-if sliders
- `home/faq.tsx`, `ui/accordion.tsx` — FAQ disclosure (Radix, accessible)
- `home/ai-cfo.tsx`, `home/solution.tsx` — sequential reveal animations
- `home/charts.tsx`, `home/sparkline.tsx`, `home/forecast-chart.tsx`, `shared/count-up.tsx`,
  `shared/reveal.tsx` — scroll-triggered animations
- `shared/analytics-tracker.tsx` — delegated GA4 page-view/CTA tracking

Reveal animations respect `prefers-reduced-motion` and only hide content when JavaScript
is actually available (`.js` class on `<html>`), so crawlers always see the full
server-rendered content.

### SEO & GEO (AI search)

- **Per-page metadata** via `createPageMetadata()`: unique title, description, canonical
  URL, `hreflang` alternates (`ar`/`en`/`x-default`), Open Graph and Twitter/X cards.
- **Per-article metadata** via `createBlogMetadata()`: `og:type=article`,
  `publishedTime`/`modifiedTime`, authors, per-locale OG images.
- **Structured data (JSON-LD)**: `Organization`, `WebSite`, `SoftwareApplication`,
  `FAQPage` (mirrors the visible FAQ), `BlogPosting` + `BreadcrumbList` per article.
  Schemas are emitted only where they accurately describe visible content.
- **Sitemap** includes every public page in both locales plus every blog article
  automatically; private areas (`/api`, `/dashboard`, `/admin`, `/auth`) are excluded.
- **robots.txt** allows all public content and explicitly allows AI crawlers
  (GPTBot, ClaudeBot, PerplexityBot, Google-Extended).
- Key concepts (Financial Truth, cash flow analysis, data validation, AI CFO, …) are
  rendered as semantic, crawlable HTML — nothing important is hidden behind JavaScript.

### Internationalization

- Locale-prefixed URLs only: `/ar/...`, `/en/...` — no `?lang=` parameters.
- Arabic is the default locale; `/` redirects to `/ar`.
- `<html lang="ar" dir="rtl">` / `<html lang="en" dir="ltr">`; the UI uses logical
  properties (Tailwind `ms-`/`ps-`/`text-start`) so RTL is intentionally designed,
  not mirrored.
- All content lives in `messages/ar.json` + `messages/en.json`; blog content lives in
  `content/blog/posts.json` with per-locale titles, descriptions and bodies.

## Deployment

Standard Next.js deployment (Vercel, Node server, or `next start` in a container).
`npm run build` runs the OG-image generator (`scripts/generate-og.mjs`) before building,
so social images are always current.
