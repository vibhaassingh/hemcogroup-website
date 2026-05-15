import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  sectorOrder,
  sectors,
  venturesInSector,
  type SectorSlug,
} from "@/content/sectors";
import { imagery } from "@/content/imagery";
import { Section, GoldRule } from "@/components/ui/section";
import { CinematicSection } from "@/components/ui/cinematic-section";
import { MaskReveal } from "@/components/ui/mask-reveal";
import { Reveal } from "@/components/ui/reveal";
import { ToneBridge } from "@/components/ui/tone-bridge";

export function generateStaticParams() {
  return sectorOrder.map((s) => ({ sector: s }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ sector: string }>;
}): Promise<Metadata> {
  const { sector } = await params;
  const sec = sectors[sector as SectorSlug];
  if (!sec) return {};
  const url = `/sectors/${sec.slug}`;
  return {
    title: sec.name,
    description: `${sec.ethos} ${sec.thesis.slice(0, 140)}…`,
    alternates: { canonical: url },
    openGraph: {
      title: `${sec.name} · Hemco Group`,
      description: sec.ethos,
      url,
      type: "article",
      siteName: "Hemco Group",
    },
    twitter: {
      card: "summary_large_image",
      title: `${sec.name} · Hemco Group`,
      description: sec.ethos,
    },
  };
}

export default async function SectorPage({
  params,
}: {
  params: Promise<{ sector: string }>;
}) {
  const { sector: slug } = await params;
  if (!sectorOrder.includes(slug as SectorSlug)) notFound();
  const sec = sectors[slug as SectorSlug];
  const heroImg = imagery[sec.hero];
  const ventures = venturesInSector(sec.slug);

  // Adjacent sectors for the prev/next pager (cyclical).
  const idx = sectorOrder.indexOf(sec.slug);
  const prevSlug = sectorOrder[(idx - 1 + sectorOrder.length) % sectorOrder.length];
  const nextSlug = sectorOrder[(idx + 1) % sectorOrder.length];
  const prev = sectors[prevSlug];
  const next = sectors[nextSlug];

  // All other sectors for the closing rail.
  const otherSectors = sectorOrder.filter((s) => s !== sec.slug);

  // Per-sector hero video — when present, plays behind the hero plate
  // in place of the still image. The image still serves as the poster.
  const sectorHeroVideo: Partial<Record<SectorSlug, string>> = {
    intelligence: "/videos/intelligence-hero.mp4",
    hospitality: "/videos/hospitality-hero.mp4",
    sovereign: "/videos/sovereign-hero.mp4",
    chambers: "/videos/chambers-hero.mp4",
  };
  const heroVideo = sectorHeroVideo[sec.slug];

  const SITE_URL = "https://hemcogroup.com";
  const sectorUrl = `${SITE_URL}/sectors/${sec.slug}`;
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Hemco Group", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Sectors", item: `${SITE_URL}/sectors` },
      { "@type": "ListItem", position: 3, name: sec.name, item: sectorUrl },
    ],
  };
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": sectorUrl,
    name: `${sec.name} — Hemco Group`,
    description: sec.thesis,
    url: sectorUrl,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    hasPart: ventures.map((v) => ({
      "@type": "Organization",
      name: v.name,
      url: `${SITE_URL}/ventures/${v.slug}`,
      description: v.positioning,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      {/* ── Hero — cinematic backdrop with a bottom-anchored fluted-
          glass plate carrying the breadcrumb, sector name, ethos, and
          a tiny brand-count line. The plate refracts the dark hero
          gradient through its vertical ribs. */}
      <CinematicSection
        image={heroImg.src}
        alt={heroImg.alt}
        video={heroVideo}
        height="94vh"
        align="bottom"
        glassPlate={false}
        priority
      >
        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 md:col-span-9 lg:col-span-8">
            {/* Breadcrumb row */}
            <Reveal>
              <p
                className="caption mb-7 flex items-center gap-3"
                style={{ color: "rgba(255,255,255,0.78)" }}
              >
                <Link href="/sectors" className="hover:text-white transition-colors">
                  Sectors
                </Link>
                <span aria-hidden style={{ opacity: 0.5 }}>/</span>
                <span style={{ color: "var(--color-gold-300)" }}>
                  Sector {sec.ordinal} of VII
                </span>
              </p>
            </Reveal>

            <MaskReveal
              as="h1"
              split="char"
              text={sec.name}
              delay={0.1}
              className="display text-[clamp(3rem,9vw,9rem)] leading-[0.94] tracking-[-0.02em] mb-8 max-w-5xl text-white"
            />

            {/* Fluted-glass plate carrying ethos + count */}
            <Reveal delay={0.4}>
              <div
                className="fluted fluted-soft fluted-glint relative max-w-2xl rounded-[18px] overflow-hidden p-6 md:p-7"
                style={{
                  background:
                    "linear-gradient(150deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 100%)",
                  backdropFilter: "blur(22px) saturate(180%)",
                  WebkitBackdropFilter: "blur(22px) saturate(180%)",
                  border: "1px solid rgba(255,255,255,0.20)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.32), 0 18px 48px rgba(0,0,0,0.30)",
                }}
              >
                <span aria-hidden className="fluted-glint__streak" />
                <p
                  className="display-italic text-[clamp(1.15rem,1.7vw,1.5rem)] mb-5"
                  style={{ color: "rgba(255,255,255,0.95)" }}
                >
                  {sec.ethos}
                </p>
                <div
                  className="h-px w-full mb-5"
                  style={{ background: "rgba(255,255,255,0.20)" }}
                />
                <div className="flex items-baseline justify-between">
                  <span
                    className="caption data"
                    style={{
                      color: "rgba(255,255,255,0.78)",
                      letterSpacing: "0.22em",
                    }}
                  >
                    {String(ventures.length).padStart(2, "0")}{" "}
                    {ventures.length === 1 ? "BRAND" : "BRANDS"}
                  </span>
                  <span
                    className="caption"
                    style={{
                      color: "var(--color-gold-300)",
                      letterSpacing: "0.22em",
                    }}
                  >
                    Read the thesis ↓
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </CinematicSection>

      {/* ── Thesis spread ─────────────────────────────────────────
          Editorial pull-quote layout: tiny mono label on the left,
          large display-tight prose on the right. The shell is ivory
          so the eye reads this as "the page proper" beginning. */}
      <Section tone="ivory" pad="xl">
        <div className="grid gap-12 md:grid-cols-12 items-start">
          <div className="md:col-span-3">
            <Reveal>
              <p
                className="caption mb-5"
                style={{ color: "var(--color-gold-500)", letterSpacing: "0.24em" }}
              >
                The thesis
              </p>
              <GoldRule className="w-12" variant="solid" />
              <p
                className="caption mt-5"
                style={{
                  color:
                    "color-mix(in srgb, var(--color-ink) 50%, transparent)",
                  letterSpacing: "0.20em",
                }}
              >
                Sector {sec.ordinal}
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-8 md:col-start-5">
            <Reveal delay={0.05}>
              <p className="display-tight text-[clamp(1.5rem,2.5vw,2.5rem)] leading-[1.22] tracking-[-0.005em]">
                {sec.thesis}
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ── Bridge into the brand lineup ──────────────────────── */}
      <ToneBridge from="ivory" to="forest" />

      {/* ── Brand lineup — editorial spreads on a forest canvas.
          Each brand: full-bleed image on one side (alternating left/
          right), fluted-glass info plate on the other carrying name,
          tagline, description, status pill, and a discreet visit link.
          The plate refracts the dark canvas behind it. */}
      <Section tone="forest" pad="xl">
        <div className="mb-16 md:mb-20 max-w-3xl">
          <Reveal>
            <p
              className="caption mb-4"
              style={{ color: "var(--color-gold-500)", letterSpacing: "0.24em" }}
            >
              The lineup
            </p>
            <h2
              className="display text-[clamp(2.25rem,4.4vw,4rem)] leading-[1.0] tracking-[-0.012em]"
              style={{ color: "var(--color-mist)" }}
            >
              {ventures.length === 1 ? "One brand," : `${ventures.length} brands,`}
              <br />
              <span
                className="display-italic"
                style={{ color: "var(--color-gold-300)" }}
              >
                under one discipline.
              </span>
            </h2>
          </Reveal>
        </div>

        <div className="space-y-20 md:space-y-28">
          {ventures.map((v, i) => {
            const img = imagery[v.imagery];
            const reverse = i % 2 === 1;
            return (
              <div key={v.slug} className="grid gap-6 md:gap-8 md:grid-cols-12 items-stretch">
                {/* IMAGE */}
                <div
                  className={`md:col-span-7 ${reverse ? "md:order-2" : ""}`}
                >
                  <Link
                    href={`/ventures/${v.slug}`}
                    className="group block"
                  >
                    <div
                      className="relative aspect-[5/4] md:aspect-[16/11] overflow-hidden rounded-[20px] md:rounded-[24px]"
                      style={{ background: "var(--color-ivory-3)" }}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 60vw"
                        className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                        style={{ filter: "saturate(0.9) contrast(1.05)" }}
                      />
                      {/* Tiny number pill */}
                      <div className="absolute top-5 left-5">
                        <span
                          className="caption inline-flex items-center gap-2 px-3 py-1.5 rounded-full data"
                          style={{
                            background: "rgba(255,255,255,0.85)",
                            color: "var(--color-ink)",
                            letterSpacing: "0.24em",
                            backdropFilter: "blur(12px)",
                            WebkitBackdropFilter: "blur(12px)",
                          }}
                        >
                          {String(i + 1).padStart(2, "0")}
                          <span style={{ opacity: 0.4 }}>/</span>
                          {String(ventures.length).padStart(2, "0")}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>

                {/* INFO PLATE */}
                <div className={`md:col-span-5 flex ${reverse ? "md:order-1" : ""}`}>
                  <div
                    className="fluted fluted-soft fluted-glint relative rounded-[20px] md:rounded-[24px] overflow-hidden p-7 md:p-9 flex flex-col w-full"
                    style={{
                      background:
                        "linear-gradient(150deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)",
                      backdropFilter: "blur(20px) saturate(180%)",
                      WebkitBackdropFilter: "blur(20px) saturate(180%)",
                      border: "1px solid rgba(255,255,255,0.14)",
                      boxShadow:
                        "inset 0 1px 0 rgba(255,255,255,0.20), 0 16px 48px rgba(0,0,0,0.32)",
                    }}
                  >
                    <span aria-hidden className="fluted-glint__streak" />
                    <div className="flex items-baseline justify-between mb-6">
                      <span
                        className="caption data"
                        style={{
                          color: "var(--color-gold-300)",
                          letterSpacing: "0.24em",
                        }}
                      >
                        {v.sector}
                      </span>
                      <span
                        className="caption"
                        style={{
                          color: "rgba(255,255,255,0.55)",
                          letterSpacing: "0.20em",
                        }}
                      >
                        {v.status}
                        {v.founded ? ` · ${v.founded}` : ""}
                      </span>
                    </div>

                    <h3
                      className="display text-[clamp(2.25rem,4vw,3.25rem)] leading-[0.98] tracking-[-0.012em] mb-4"
                      style={{ color: "#ffffff" }}
                    >
                      {v.name}
                    </h3>
                    <p
                      className="display-italic text-[clamp(1.05rem,1.4vw,1.25rem)] mb-6"
                      style={{ color: "rgba(255,255,255,0.78)" }}
                    >
                      {v.tagline}
                    </p>

                    <div
                      className="h-px w-full mb-6"
                      style={{ background: "rgba(255,255,255,0.16)" }}
                    />

                    <p
                      className="text-[14.5px] leading-[1.6] mb-auto"
                      style={{ color: "rgba(255,255,255,0.78)" }}
                    >
                      {v.description}
                    </p>

                    <div className="mt-8 pt-6 flex items-center justify-between"
                      style={{
                        borderTop: "1px solid rgba(255,255,255,0.16)",
                      }}
                    >
                      {v.domain ? (
                        <span
                          className="caption"
                          style={{
                            color: "rgba(255,255,255,0.62)",
                            letterSpacing: "0.20em",
                          }}
                        >
                          {v.domain}
                        </span>
                      ) : (
                        <span
                          className="caption"
                          style={{
                            color: "rgba(255,255,255,0.45)",
                            letterSpacing: "0.20em",
                          }}
                        >
                          In development
                        </span>
                      )}
                      <Link
                        href={`/ventures/${v.slug}`}
                        className="caption inline-flex items-center gap-2 group transition-colors hover:text-[color:var(--color-gold-300)]"
                        style={{
                          color: "#ffffff",
                          letterSpacing: "0.22em",
                        }}
                      >
                        Visit {v.wordmark}
                        <span
                          aria-hidden
                          className="inline-block transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5"
                        >
                          →
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* ── Bridge back to ivory for the pager + rail ────────── */}
      <ToneBridge from="forest" to="ivory" />

      {/* ── Prev / Next pager ──────────────────────────────────── */}
      <Section tone="ivory" pad="lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          <Link
            href={`/sectors/${prevSlug}`}
            className="group fluted fluted-soft fluted-glint relative block rounded-[18px] md:rounded-[20px] overflow-hidden p-6 md:p-7"
            style={{
              background:
                "linear-gradient(135deg, color-mix(in srgb, var(--color-ink) 5%, transparent) 0%, color-mix(in srgb, var(--color-ink) 1%, transparent) 100%)",
              border:
                "1px solid color-mix(in srgb, var(--color-ink) 12%, transparent)",
            }}
          >
            <span aria-hidden className="fluted-glint__streak" />
            <p
              className="caption mb-4 inline-flex items-center gap-2"
              style={{
                color:
                  "color-mix(in srgb, var(--color-ink) 50%, transparent)",
                letterSpacing: "0.22em",
              }}
            >
              <span
                aria-hidden
                className="inline-block transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-1.5"
              >
                ←
              </span>
              Previous · Sector {prev.ordinal}
            </p>
            <h3 className="display text-[clamp(1.75rem,2.8vw,2.25rem)] leading-[1.0] mb-2 tracking-[-0.005em]">
              {prev.name}
            </h3>
            <p
              className="text-[14px] leading-[1.5]"
              style={{
                color:
                  "color-mix(in srgb, var(--color-ink) 60%, transparent)",
              }}
            >
              {prev.ethos}
            </p>
          </Link>

          <Link
            href={`/sectors/${nextSlug}`}
            className="group fluted fluted-soft fluted-glint relative block rounded-[18px] md:rounded-[20px] overflow-hidden p-6 md:p-7 text-right"
            style={{
              background:
                "linear-gradient(135deg, color-mix(in srgb, var(--color-ink) 5%, transparent) 0%, color-mix(in srgb, var(--color-gold-500) 5%, transparent) 100%)",
              border:
                "1px solid color-mix(in srgb, var(--color-ink) 12%, transparent)",
            }}
          >
            <span aria-hidden className="fluted-glint__streak" />
            <p
              className="caption mb-4 inline-flex items-center gap-2"
              style={{
                color:
                  "color-mix(in srgb, var(--color-ink) 50%, transparent)",
                letterSpacing: "0.22em",
              }}
            >
              Next · Sector {next.ordinal}
              <span
                aria-hidden
                className="inline-block transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5"
              >
                →
              </span>
            </p>
            <h3 className="display text-[clamp(1.75rem,2.8vw,2.25rem)] leading-[1.0] mb-2 tracking-[-0.005em]">
              {next.name}
            </h3>
            <p
              className="text-[14px] leading-[1.5]"
              style={{
                color:
                  "color-mix(in srgb, var(--color-ink) 60%, transparent)",
              }}
            >
              {next.ethos}
            </p>
          </Link>
        </div>
      </Section>

      {/* ── Continue — compact rail of all other sectors ──────── */}
      <Section tone="ivory" pad="xl">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p
              className="eyebrow mb-4"
              style={{ color: "var(--color-gold-500)" }}
            >
              The rest of the house
            </p>
            <h2 className="display text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.0] tracking-[-0.005em]">
              Continue browsing
            </h2>
          </div>
          <Link href="/sectors" className="btn btn-secondary hidden md:inline-flex">
            All sectors
          </Link>
        </div>
        <GoldRule className="mb-12 w-full" variant="tone" />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {otherSectors.map((s) => {
            const o = sectors[s];
            const oImg = imagery[o.hero];
            const oCount = venturesInSector(s).length;
            return (
              <Link
                key={s}
                href={`/sectors/${s}`}
                className="group fluted-glint relative block aspect-[3/4] overflow-hidden rounded-[14px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold-500)]"
                data-tone="image"
                style={{ background: "#0a0e18" }}
              >
                <span aria-hidden className="fluted-glint__streak" />
                <Image
                  src={oImg.src}
                  alt={oImg.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover transition-transform duration-[1400ms] group-hover:scale-105"
                  style={{ filter: "saturate(0.88) contrast(1.04) brightness(0.85)" }}
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(180deg,
                      rgba(8,12,18,0.40) 0%,
                      rgba(8,12,18,0.10) 35%,
                      rgba(8,12,18,0.65) 75%,
                      rgba(8,12,18,0.95) 100%)`,
                  }}
                />
                <div className="absolute inset-0 p-4 flex flex-col text-white z-[3]">
                  <span
                    className="caption data"
                    style={{
                      color: "rgba(255,255,255,0.78)",
                      letterSpacing: "0.22em",
                    }}
                  >
                    {o.ordinal}
                  </span>
                  <div className="mt-auto">
                    <p
                      className="display text-[clamp(1.05rem,1.3vw,1.25rem)] leading-[1.0] mb-1"
                      style={{ color: "#ffffff" }}
                    >
                      {o.name}
                    </p>
                    <p
                      className="caption"
                      style={{
                        color: "rgba(255,255,255,0.62)",
                        letterSpacing: "0.18em",
                        fontSize: "10px",
                      }}
                    >
                      {String(oCount).padStart(2, "0")}{" "}
                      {oCount === 1 ? "BRAND" : "BRANDS"}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 md:hidden">
          <Link href="/sectors" className="btn btn-secondary">
            All sectors
          </Link>
        </div>
      </Section>
    </>
  );
}
