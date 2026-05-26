# Hemco Group — hemcogroup.com

The marketing site for **Hemco Group**, a privately held industrial group from India (founded 1998). One house, many systems: a registry-driven site that renders every venture, sector and journal entry from typed content files.

Built with **Next.js 16** (App Router, React 19), **TypeScript**, **Tailwind CSS v4**, **Motion** (Framer Motion), **Lenis** (smooth scroll) and **OGL** (WebGL atmospherics). Deployed on **Vercel**.

---

## Design philosophy

- **One house, many systems.** Every brand inherits a shared editorial system (typography, fluted glass, tone bridges) but carries its own accent and identity. The group should read as one organism, not a logo wall.
- **Truth first, motion second.** Server-rendered HTML always shows the real content — counts, copy, structure. Motion (count-ups, reveals, the operating map) is a progressive enhancement layered on after hydration and is disabled under `prefers-reduced-motion`.
- **Data-driven, never hand-counted.** Brand/sector counts, schema and metadata derive from the content registry (see `src/content/site-facts.ts`). Add a venture and the whole site updates itself.

## Content model (`src/content/`)

| File | What it holds |
| --- | --- |
| `ventures.ts` | The `Venture[]` registry — the source of truth for every brand (slug, name, sector, status, accent, domain, imagery, `parent`, …). |
| `sectors.ts` | The 7 `SectorEntry` records + `ventureSlugs` mapping and the `venturesInSector` / `sectorOfVenture` / `sectorOrder` helpers. |
| `site-facts.ts` | Derived headline facts: `BRAND_COUNT`, `SECTOR_COUNT`, `yearsCompounding()`, plus `toRoman()` / `numberWord()` / `numberWordCap()`. **Use these instead of hardcoding counts.** |
| `venture-identity.ts` | Per-venture identity (hero copy, services, pillars, accents) for the venture detail pages. |
| `brand-theme.ts` | Declarative per-brand theme tokens (tone / material / motion + accent). Venture pages emit `data-brand-tone` from it; the per-brand `.X-page` CSS blocks are migrating onto this token layer. |
| `imagery.ts` | Image registry (`u()` Unsplash helper + local `/brand/*` assets). |
| `footprint.ts` | Geographic locations (lat/lon) for the world map. |
| `journal.ts` | Journal / dispatch entries. |

Pages, `generateStaticParams`, sector grids, peer cards and JSON-LD all read from these — there is no per-page duplication of brand data.

## Local setup

```bash
npm install
npm run dev          # http://localhost:3002
```

### Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Dev server on port 3002. |
| `npm run build` | Production build (also type-checks generated route types). |
| `npm run start` | Serve the production build on 3002. |
| `npm run lint` | ESLint (flat config, `eslint-config-next`). |
| `npm run typecheck` | `tsc` over source (`tsconfig.typecheck.json`). |
| `npm run format` / `format:check` | Prettier write / check. |

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes (contact form) | Server-side Resend key used by `POST /api/contact`. |
| `NEXT_PUBLIC_GSC_TOKEN` | Optional | Google Search Console verification. |
| `NEXT_PUBLIC_BING_TOKEN` | Optional | Bing site verification. |
| `NEXT_PUBLIC_GA_ID` | Optional | Google Analytics measurement ID. |

Set these in Vercel (Project → Settings → Environment Variables) and in `.env.local` for local dev.

## Contact form

`src/components/contact-form.tsx` posts to `src/app/api/contact/route.ts`, which validates + HTML-escapes input and sends via Resend. The recipient and verified sender are configured in the route. Submissions are **not** persisted client-side.

## Imagery

Real brand assets live in `public/brand/`. The `u()` helper in `imagery.ts` is an Unsplash fallback for ventures without a bespoke asset. Keep raster heroes downscaled (≤1600px wide, ~q82) so they stay under Vercel's per-file limits.

## Animation & accessibility

- All motion components honour `useReducedMotion()` and degrade to a static, fully-legible layout.
- Stat counters (`CountUp`) render the true value on the server and for no-JS / screen-reader users; the animation is purely enhancement.
- Interactive visualisations are SVG-first and keyboard-navigable.

## SEO

- Metadata + Organization/Corporation JSON-LD live in `src/app/layout.tsx`; sub-organisations are generated from the venture registry.
- `sitemap.ts` and `robots.ts` are programmatic. `public/llms.txt` / `llms-full.txt` give AI crawlers a grounding summary.
- **Publishing checklist:** when adding a venture, only `src/content/*` needs editing — counts, schema, sitemap and grids follow automatically. Bump `SITE_UPDATED` in `sitemap.ts` on significant content changes.

## Deployment

Push to `main` → the GitHub → Vercel integration auto-deploys to production. Commits must be authored by a Vercel team member (`vibhaas.singh@kerning.ooo`) or the deploy is blocked.
