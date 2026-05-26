import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Section, GoldRule } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { ToneBridge } from "@/components/ui/tone-bridge";
import {
  sectorOrder,
  sectors,
  venturesInSector,
} from "@/content/sectors";
import { imagery } from "@/content/imagery";
import {
  BRAND_COUNT,
  SECTOR_COUNT,
  yearsCompounding,
  toRoman,
  numberWordCap,
} from "@/content/site-facts";

export const metadata: Metadata = {
  title: "Sectors",
  description:
    "Seven sectors, thirteen operating brands. Hemco Group's house of industries spans culinary, design, AI & automation, hospitality, defence, energy, architecture, legal and social.",
  alternates: { canonical: "/sectors" },
  openGraph: {
    title: "Sectors · Hemco Group",
    description: "Seven sectors, thirteen brands. The shape of Hemco's house of industries.",
    url: "/sectors",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sectors · Hemco Group",
    description: "Seven sectors, thirteen brands. The shape of Hemco's house of industries.",
  },
};

export default function SectorsIndex() {
  // Featured sector for the hero — first in the order. The rest fill the
  // grid below in 2-row Apple-lineup style.
  const featuredSlug = sectorOrder[0];
  const featured = sectors[featuredSlug];
  const featuredImg = imagery[featured.hero];
  const featuredVentures = venturesInSector(featuredSlug);
  const restSlugs = sectorOrder.slice(1);

  return (
    <>
      {/* ── Cinematic header on ivory ────────────────────────────────
          A restrained Apple-style "intro" panel: tiny mono eyebrow,
          oversized two-line headline, lede paragraph, and a counter
          row at the bottom (VII · XI · MCMXCVIII) that anchors the
          page. No imagery — the typography carries the hero. */}
      <Section tone="ivory" pad="xl">
        <div className="pt-24 md:pt-32 pb-4 md:pb-8">
          <div className="grid gap-12 md:grid-cols-12 items-end">
            <div className="md:col-span-8">
              <Reveal>
                <p
                  className="eyebrow mb-7"
                  style={{
                    color:
                      "color-mix(in srgb, var(--color-ink) 55%, transparent)",
                  }}
                >
                  The compass — sectors index
                </p>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="display text-[clamp(3rem,8vw,7.5rem)] leading-[0.94] tracking-[-0.018em] mb-10">
                  {numberWordCap(SECTOR_COUNT)} sectors.
                  <br />
                  <span className="display-italic opacity-50">
                    {numberWordCap(BRAND_COUNT)} brands.
                  </span>
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="lede measure-wide" style={{ opacity: 0.72 }}>
                  Hemco is organised by sector, not by sentiment. Each sector
                  licenses a discipline the others can compound on — and
                  each brand within it earns its place on its own balance
                  sheet.
                </p>
              </Reveal>
            </div>

            {/* Counter plate — fluted glass, sits on the right with the
                house-at-a-glance numerals. Reacts to the ivory canvas
                behind it via `mix-blend-mode: screen` on the fluting. */}
            <div className="md:col-span-4">
              <Reveal delay={0.15}>
                <div
                  className="fluted fluted-soft fluted-glint relative rounded-[18px] overflow-hidden p-7"
                  style={{
                    background:
                      "linear-gradient(150deg, color-mix(in srgb, var(--color-ink) 5%, transparent) 0%, color-mix(in srgb, var(--color-ink) 2%, transparent) 100%)",
                    border:
                      "1px solid color-mix(in srgb, var(--color-ink) 14%, transparent)",
                    boxShadow:
                      "inset 0 1px 0 rgba(255,255,255,0.45), 0 18px 48px color-mix(in srgb, var(--color-ink) 8%, transparent)",
                  }}
                >
                  <span aria-hidden className="fluted-glint__streak" />
                  <p
                    className="caption mb-5"
                    style={{
                      color:
                        "color-mix(in srgb, var(--color-ink) 50%, transparent)",
                      letterSpacing: "0.24em",
                    }}
                  >
                    The house, by the numerals
                  </p>
                  <dl className="grid grid-cols-3 gap-4">
                    {[
                      { k: toRoman(SECTOR_COUNT), v: "Sectors" },
                      { k: toRoman(BRAND_COUNT), v: "Brands" },
                      { k: toRoman(yearsCompounding()), v: "Years" },
                    ].map((row) => (
                      <div key={row.k} className="flex flex-col">
                        <dt
                          className="display text-[clamp(1.5rem,2.4vw,2rem)] leading-none mb-2"
                          style={{ color: "var(--color-ink)" }}
                        >
                          {row.k}
                        </dt>
                        <dd
                          className="caption"
                          style={{
                            color:
                              "color-mix(in srgb, var(--color-ink) 55%, transparent)",
                            letterSpacing: "0.20em",
                          }}
                        >
                          {row.v}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <div
                    className="h-px w-full my-6"
                    style={{
                      background:
                        "color-mix(in srgb, var(--color-ink) 14%, transparent)",
                    }}
                  />
                  <p
                    className="caption"
                    style={{
                      color:
                        "color-mix(in srgb, var(--color-ink) 65%, transparent)",
                      letterSpacing: "0.22em",
                    }}
                  >
                    Established · MCMXCVIII · India
                  </p>
                </div>
              </Reveal>
            </div>
          </div>

          <GoldRule className="mt-20 w-32" variant="solid" />
        </div>
      </Section>

      {/* ── Featured sector — large editorial spread ─────────────────
          The first sector in the order gets a full-width treatment:
          big landscape image on the left, fluted-glass info plate on
          the right with the sector ordinal, name, ethos, brand list,
          and a discreet "Enter" link. Sets the visual rhythm for the
          grid below. */}
      <Section tone="ivory" pad="lg">
        <Link
          href={`/sectors/${featuredSlug}`}
          className="group block"
        >
          <div className="grid gap-6 md:grid-cols-12 md:gap-8 items-stretch">
            <div className="md:col-span-7">
              <div
                className="relative aspect-[5/4] md:aspect-[16/10] overflow-hidden rounded-[20px] md:rounded-[24px]"
                style={{ background: "var(--color-ivory-2)" }}
              >
                <Image
                  src={featuredImg.src}
                  alt={featuredImg.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  style={{ filter: "saturate(0.9) contrast(1.05)" }}
                  priority
                />
                {/* Tiny featured pill on top-left of the image */}
                <div className="absolute top-5 left-5">
                  <span
                    className="caption inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                    style={{
                      background: "rgba(255,255,255,0.85)",
                      color: "var(--color-ink)",
                      letterSpacing: "0.22em",
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                    }}
                  >
                    Sector № {featured.ordinal} · Featured
                  </span>
                </div>
              </div>
            </div>

            <div className="md:col-span-5 flex">
              <div
                className="fluted fluted-soft fluted-glint relative rounded-[20px] md:rounded-[24px] overflow-hidden p-8 md:p-10 flex flex-col w-full"
                style={{
                  background:
                    "linear-gradient(150deg, color-mix(in srgb, var(--color-ink) 6%, transparent) 0%, color-mix(in srgb, var(--color-gold-500) 6%, transparent) 100%)",
                  border:
                    "1px solid color-mix(in srgb, var(--color-ink) 12%, transparent)",
                }}
              >
                <span aria-hidden className="fluted-glint__streak" />
                <div className="flex items-baseline justify-between mb-7">
                  <span
                    className="caption data"
                    style={{
                      color:
                        "color-mix(in srgb, var(--color-ink) 60%, transparent)",
                      letterSpacing: "0.24em",
                    }}
                  >
                    {featured.ordinal}
                  </span>
                  <span
                    className="caption data"
                    style={{
                      color:
                        "color-mix(in srgb, var(--color-ink) 50%, transparent)",
                      letterSpacing: "0.20em",
                    }}
                  >
                    {String(featuredVentures.length).padStart(2, "0")}{" "}
                    {featuredVentures.length === 1 ? "BRAND" : "BRANDS"}
                  </span>
                </div>

                <h2 className="display text-[clamp(2.5rem,5vw,4rem)] leading-[0.96] tracking-[-0.012em] mb-5">
                  {featured.name}
                </h2>
                <p
                  className="display-italic text-[clamp(1.1rem,1.5vw,1.35rem)] mb-8"
                  style={{
                    color:
                      "color-mix(in srgb, var(--color-ink) 60%, transparent)",
                  }}
                >
                  {featured.ethos}
                </p>

                <div
                  className="h-px w-full mb-7"
                  style={{
                    background:
                      "color-mix(in srgb, var(--color-ink) 14%, transparent)",
                  }}
                />

                <ul className="space-y-2 mb-auto">
                  {featuredVentures.map((v) => (
                    <li
                      key={v.slug}
                      className="flex items-baseline justify-between text-[15px]"
                      style={{ color: "var(--color-ink)" }}
                    >
                      <span>{v.name}</span>
                      <span
                        className="caption"
                        style={{
                          color:
                            "color-mix(in srgb, var(--color-ink) 45%, transparent)",
                          letterSpacing: "0.18em",
                        }}
                      >
                        {v.status}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 pt-7" style={{
                  borderTop:
                    "1px solid color-mix(in srgb, var(--color-ink) 14%, transparent)",
                }}>
                  <span
                    className="caption inline-flex items-center gap-2 transition-colors group-hover:text-[color:var(--color-gold-500)]"
                    style={{
                      color: "var(--color-ink)",
                      letterSpacing: "0.22em",
                    }}
                  >
                    Enter {featured.name}
                    <span
                      aria-hidden
                      className="inline-block transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5"
                    >
                      →
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </Section>

      {/* ── Bridge into the dark lineup ──────────────────────────── */}
      <ToneBridge from="ivory" to="forest" />

      {/* ── The lineup — six remaining sectors on a forest canvas ──
          Apple-style 3×2 grid where each card is a tall portrait with
          full-bleed image and a fluted-glass info plate at the bottom.
          The plate refracts the dark forest backdrop, picking up the
          gold cast at low intensity. */}
      <Section tone="forest" pad="xl">
        <div className="mb-14 md:mb-20 max-w-3xl">
          <p
            className="eyebrow mb-5"
            style={{ color: "var(--color-gold-500)" }}
          >
            The lineup
          </p>
          <GoldRule className="mb-9 w-16" variant="solid" />
          <h2
            className="display text-[clamp(2.25rem,4.4vw,4rem)] leading-[1.0] tracking-[-0.012em]"
            style={{ color: "var(--color-mist)" }}
          >
            Six more disciplines,
            <br />
            <span
              className="display-italic"
              style={{ color: "var(--color-gold-300)" }}
            >
              compounding.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {restSlugs.map((s) => {
            const sec = sectors[s];
            const img = imagery[sec.hero];
            const ventures = venturesInSector(s);
            return (
              <Link
                key={s}
                href={`/sectors/${s}`}
                className="group fluted-glint relative block aspect-[3/4] overflow-hidden rounded-[20px] md:rounded-[22px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold-500)]"
                data-tone="image"
                style={{ background: "#0a0e18" }}
              >
                <span aria-hidden className="fluted-glint__streak" />
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                  style={{ filter: "saturate(0.88) contrast(1.04) brightness(0.86)" }}
                />

                {/* Two-stop scrim — uniform tint + a stronger bottom-
                    weighted gradient so the type sits on a near-opaque
                    floor regardless of how bright the image is (the
                    Atelier orange is the worst case). */}
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{ background: "rgba(8,12,18,0.22)" }}
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(180deg,
                      rgba(8,12,18,0.55) 0%,
                      rgba(8,12,18,0.20) 18%,
                      rgba(8,12,18,0.05) 32%,
                      rgba(8,12,18,0.05) 44%,
                      rgba(8,12,18,0.55) 64%,
                      rgba(8,12,18,0.92) 86%,
                      rgba(8,12,18,0.98) 100%)`,
                  }}
                />

                {/* Top mono row sits directly on the imagery (no plate)
                    so the ordinal and brand-count read as a watermark
                    over the photograph. */}
                <div className="absolute top-0 inset-x-0 p-5 md:p-6 flex items-baseline justify-between text-white z-[3]">
                  <span
                    className="caption data"
                    style={{
                      color: "rgba(255,255,255,0.92)",
                      letterSpacing: "0.22em",
                    }}
                  >
                    {sec.ordinal}
                  </span>
                  <span
                    className="caption data"
                    style={{
                      color: "rgba(255,255,255,0.78)",
                      letterSpacing: "0.18em",
                    }}
                  >
                    {String(ventures.length).padStart(2, "0")}{" "}
                    {ventures.length === 1 ? "BRAND" : "BRANDS"}
                  </span>
                </div>

                {/* Bottom fluted-glass plate — flush with the card's
                    bottom and side edges (no inset, no nested rounded
                    corners). The card's `overflow-hidden` plus its own
                    rounded corners take care of clipping the bottom
                    radii cleanly. The plate's top edge is a soft fade
                    from transparent → glass tint, so it dissolves into
                    the photograph above instead of cutting a hard
                    horizontal line. The `.fluted` class is applied to
                    an INNER wrapper because `.fluted` sets
                    `position: relative` — which would otherwise fight
                    the Tailwind `absolute` utility we need on the
                    outer positioning shell. */}
                <div
                  className="absolute inset-x-0 bottom-0 z-[3]"
                  style={{
                    background: `linear-gradient(180deg,
                      rgba(8,12,18,0.00) 0%,
                      rgba(8,12,18,0.55) 28%,
                      rgba(8,12,18,0.85) 60%,
                      rgba(8,12,18,0.94) 100%)`,
                    backdropFilter: "blur(14px) saturate(170%)",
                    WebkitBackdropFilter: "blur(14px) saturate(170%)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.14)",
                  }}
                >
                  <div className="fluted fluted-soft p-5 md:p-6 pt-12 md:pt-14 text-white">
                    <h3
                      className="display text-[clamp(1.85rem,2.6vw,2.5rem)] leading-[0.96] mb-3 tracking-[-0.01em]"
                      style={{ color: "#ffffff" }}
                    >
                      {sec.name}
                    </h3>
                    <p
                      className="text-[14px] leading-[1.55] mb-5 max-w-[30ch]"
                      style={{ color: "rgba(255,255,255,0.86)" }}
                    >
                      {sec.ethos}
                    </p>
                    <div
                      className="h-px w-full mb-4"
                      style={{ background: "rgba(255,255,255,0.18)" }}
                    />
                    <div className="flex items-center justify-between gap-3">
                      <p
                        className="text-[12px] leading-[1.4] truncate"
                        style={{ color: "rgba(255,255,255,0.68)" }}
                      >
                        {ventures.map((v) => v.name).join(" · ")}
                      </p>
                      <span
                        className="caption inline-flex items-center gap-1.5 shrink-0 transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
                        style={{
                          color: "var(--color-gold-300)",
                          letterSpacing: "0.22em",
                        }}
                      >
                        Enter
                        <span aria-hidden>→</span>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* ── Bridge back to ivory for the closing band ──────────── */}
      <ToneBridge from="forest" to="ivory" />

      {/* ── Closing band — "Build with us" ─────────────────────── */}
      <Section tone="ivory" pad="xl">
        <div className="grid gap-12 md:grid-cols-12 items-end">
          <div className="md:col-span-8">
            <p
              className="caption mb-6"
              style={{ color: "var(--color-gold-500)" }}
            >
              The directory is open
            </p>
            <h2 className="display text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.98] tracking-[-0.012em] mb-7">
              An industrial group is{" "}
              <span
                className="display-italic"
                style={{
                  color:
                    "color-mix(in srgb, var(--color-ink) 55%, transparent)",
                }}
              >
                a long conversation.
              </span>
            </h2>
            <p className="lede measure-wide" style={{ opacity: 0.72 }}>
              For partnerships, careers, or a brief on a specific brand —
              start a conversation with the right desk.
            </p>
          </div>
          <div className="md:col-span-4 flex flex-wrap items-center gap-3">
            <Link href="/contact" className="btn btn-primary">
              Get in touch
            </Link>
            <Link href="/world/story" className="btn btn-secondary">
              Our story
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
