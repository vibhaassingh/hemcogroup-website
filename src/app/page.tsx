import Link from "next/link";
import Image from "next/image";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/reveal";
import { CountUp } from "@/components/ui/count-up";
import { CinematicHero, ScrollHint } from "@/components/ui/cinematic-hero";
import { MaskReveal } from "@/components/ui/mask-reveal";
import { MagneticLink } from "@/components/ui/magnetic-link";
import { NewsCard } from "@/components/ui/news-card";
import { Section, GoldRule } from "@/components/ui/section";
import { ToneBridge } from "@/components/ui/tone-bridge";
import { ventures } from "@/content/ventures";
import { imagery } from "@/content/imagery";
import { journal } from "@/content/journal";
import { sectorOrder, sectors } from "@/content/sectors";

const stats = [
  { to: 11, label: "Operating brands" },
  { to: 7, label: "Sectors" },
  { to: 28, label: "Years compounding" },
  { to: 1998, label: "Established", noFormat: true },
];

const SITE_URL = "https://hemcogroup.com";
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Hemco Group?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Hemco Group is a privately held industrial holding company from India, founded in 1998. It operates eleven brands across seven sectors — culinary, design, AI & automation, hospitality, defence, energy, architecture, legal and social.",
      },
    },
    {
      "@type": "Question",
      name: "Where is Hemco Group headquartered?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Hemco Group is headquartered in India. Its AI venture, Kerning AI, also operates a European base in the Netherlands.",
      },
    },
    {
      "@type": "Question",
      name: "When was Hemco Group founded?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Hemco Group was founded in 1998 and has been operating for more than twenty-eight years.",
      },
    },
    {
      "@type": "Question",
      name: "What brands does Hemco Group operate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Hemco Group operates eleven brands: Hemco Kitchens, Keystonne, Kerning Studio, Kerning Architecture & Design, Kerning Hospitality, Kerning AI, Consortium, Consortium Defence & Robotics, Lumonn, Cronuss Associates, and MVV Foundation.",
      },
    },
    {
      "@type": "Question",
      name: "Is Hemco Group publicly listed?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Hemco Group is privately held and funds growth from internal operations. Strategic partnership and alliance enquiries are welcomed at corporate@hemcogroup.com.",
      },
    },
  ],
};

export default function Home() {
  const recent = journal.slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <CinematicHero gradient>
        <div className="grid gap-10 md:grid-cols-12 md:gap-12 items-end">
          <div className="md:col-span-8">
            <Reveal>
              <p
                className="caption"
                style={{ color: "var(--color-gold-300)" }}
              >
                <span
                  className="inline-block h-px w-10 mr-3 align-middle"
                  style={{ background: "var(--color-gold-500)" }}
                />
                Hemco Group · India · Est. 1998
              </p>
            </Reveal>
            <h1 className="display mt-8 text-[clamp(2.75rem,8vw,8.5rem)] text-white leading-[0.94]">
              <MaskReveal as="span" split="char" text="A house of" delay={0.15} />
              <br />
              <MaskReveal as="span" split="char" text="industries," delay={0.25} />
              <br />
              <MaskReveal
                as="span"
                split="char"
                text="built in India."
                delay={0.4}
                className="display-italic"
              />
            </h1>
            <Reveal delay={0.7}>
              <GoldRule className="mt-12 w-32" variant="solid" />
            </Reveal>
          </div>
          <div className="md:col-span-4">
            <Reveal delay={0.7}>
              <div className="glass-light glass-sheen fluted fluted-soft fluted-glint rounded-[6px] p-6 md:p-7 max-w-md">
                <span aria-hidden className="fluted-glint__streak" />
                <p className="text-[15px] leading-[1.65] text-white/90">
                  Eleven brands. Seven sectors. One operating philosophy:
                  own what you build, and build what serves the works.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <MagneticLink href="/sectors" className="btn btn-on-photo">
                    The sectors
                  </MagneticLink>
                  <MagneticLink href="/world/story" className="btn btn-on-photo-ghost">
                    Our story
                  </MagneticLink>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
        <ScrollHint label="Discover" tone="light" />
      </CinematicHero>

      {/* Sectors — Apple-style product grid.
          Single restrained header, then 7 sector cards + 1 "all sectors" CTA
          card laid out on a 1/2/4-column responsive grid. Each card is a
          full-bleed image with a soft graduated overlay, a tiny mono ordinal
          + brand-count up top, an oversized serif sector name pinned to the
          bottom, and a quiet caption-and-arrow affordance. Rounded 24-28px
          corners, hover lifts the image and slides the arrow — the rest stays
          completely still. No chrome, no chips, no drag. */}
      <Section tone="ivory" pad="xl" id="sectors">
        <div className="mb-16 md:mb-24 max-w-5xl">
          <Reveal>
            <p
              className="eyebrow mb-7"
              style={{ color: "var(--color-ink)", opacity: 0.55 }}
            >
              The compass
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display text-[clamp(2.5rem,6vw,5.75rem)] leading-[0.96] mb-9 tracking-[-0.015em]">
              Seven sectors,
              <br />
              <span className="display-italic opacity-50">one house.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lede max-w-2xl" style={{ opacity: 0.7 }}>
              Culinary. Atelier. Intelligence. Hospitality. Sovereign.
              Chambers. Foundation. Each is a discipline the others compound
              on.
            </p>
          </Reveal>
        </div>

        <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {sectorOrder.map((s) => {
            const sec = sectors[s];
            const img = imagery[sec.hero];
            const count = sec.ventureSlugs.length;
            return (
              <StaggerItem key={s}>
                <Link
                  href={`/sectors/${s}`}
                  className="group relative block aspect-[4/5] overflow-hidden rounded-[22px] md:rounded-[26px] bg-[var(--color-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold-500)]"
                  data-tone="image"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.045]"
                    style={{ filter: "saturate(0.88) contrast(1.04) brightness(0.88)" }}
                  />
                  {/* Two-stop scrim: a soft uniform tint covering the whole
                      card so bright imagery (kitchens, sky, sun-orange)
                      doesn't blow out the type, and a stronger gradient
                      darkening both the top (for ordinal + brand count)
                      and the bottom (for title / ethos / CTA). The middle
                      band stays clear so the photograph still reads as a
                      photograph. */}
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background: "rgba(8,12,18,0.18)",
                    }}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(180deg,
                        rgba(8,12,18,0.62) 0%,
                        rgba(8,12,18,0.32) 14%,
                        rgba(8,12,18,0.05) 32%,
                        rgba(8,12,18,0.05) 48%,
                        rgba(8,12,18,0.55) 72%,
                        rgba(8,12,18,0.88) 88%,
                        rgba(8,12,18,0.96) 100%)`,
                    }}
                  />
                  {/* Hairline rim — gives the rounded corners a Vision-Pro
                      glass edge against the ivory page. */}
                  <div
                    aria-hidden
                    className="absolute inset-0 rounded-[22px] md:rounded-[26px] pointer-events-none"
                    style={{
                      boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.10)",
                    }}
                  />

                  <div className="absolute inset-0 p-6 md:p-7 flex flex-col text-white">
                    <div className="flex items-baseline justify-between">
                      <span
                        className="caption data"
                        style={{
                          color: "rgba(255,255,255,0.78)",
                          letterSpacing: "0.22em",
                        }}
                      >
                        {sec.ordinal}
                      </span>
                      <span
                        className="caption data"
                        style={{
                          color: "rgba(255,255,255,0.65)",
                          letterSpacing: "0.18em",
                        }}
                      >
                        {String(count).padStart(2, "0")}{" "}
                        {count === 1 ? "BRAND" : "BRANDS"}
                      </span>
                    </div>

                    <div className="mt-auto">
                      <h3
                        className="display text-[clamp(1.85rem,2.6vw,2.5rem)] leading-[0.96] mb-3 tracking-[-0.01em]"
                        style={{ color: "#ffffff" }}
                      >
                        {sec.name}
                      </h3>
                      <p
                        className="text-[14px] leading-[1.55] mb-6 max-w-[28ch]"
                        style={{ color: "rgba(255,255,255,0.84)" }}
                      >
                        {sec.ethos}
                      </p>
                      <span
                        className="caption inline-flex items-center gap-2 transition-colors"
                        style={{
                          color: "rgba(255,255,255,0.92)",
                          letterSpacing: "0.22em",
                        }}
                      >
                        Discover
                        <span
                          aria-hidden
                          className="inline-block transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5"
                        >
                          →
                        </span>
                      </span>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}

          {/* 8th cell — clean ink "directory" card. Apple's lineup pages
              always close the grid with a "Compare all" or "See the lineup"
              tile that takes you to the index. */}
          <StaggerItem>
            <Link
              href="/sectors"
              className="group fluted fluted-glint relative block aspect-[4/5] overflow-hidden rounded-[22px] md:rounded-[26px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold-500)]"
              data-tone="image"
              style={{
                background:
                  "radial-gradient(120% 90% at 100% 0%, rgba(8,82,189,0.22) 0%, transparent 60%), linear-gradient(180deg, #0a0e18 0%, #050810 100%)",
              }}
            >
              <span aria-hidden className="fluted-glint__streak" />
              <div
                aria-hidden
                className="absolute inset-0 rounded-[22px] md:rounded-[26px] pointer-events-none"
                style={{
                  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.10)",
                  zIndex: 2,
                }}
              />
              <div className="absolute inset-0 p-6 md:p-7 flex flex-col text-white">
                <span
                  className="caption data"
                  style={{
                    color: "rgba(255,255,255,0.62)",
                    letterSpacing: "0.22em",
                  }}
                >
                  Index
                </span>
                <div className="mt-auto">
                  <h3
                    className="display text-[clamp(1.85rem,2.6vw,2.5rem)] leading-[0.96] mb-3 tracking-[-0.01em]"
                    style={{ color: "#ffffff" }}
                  >
                    All sectors,
                    <br />
                    <span className="display-italic opacity-60">
                      side by side.
                    </span>
                  </h3>
                  <p
                    className="text-[14px] leading-[1.55] mb-6 max-w-[28ch]"
                    style={{ color: "rgba(255,255,255,0.78)" }}
                  >
                    The full lineup — seven sectors, eleven brands, one house.
                  </p>
                  <span
                    className="caption inline-flex items-center gap-2"
                    style={{
                      color: "var(--color-gold-300)",
                      letterSpacing: "0.22em",
                    }}
                  >
                    Open the directory
                    <span
                      aria-hidden
                      className="inline-block transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5"
                    >
                      →
                    </span>
                  </span>
                </div>
              </div>
            </Link>
          </StaggerItem>
        </StaggerGroup>
      </Section>

      <ToneBridge from="ivory" to="forest" />

      {/* Manifesto on forest */}
      <Section tone="forest" pad="xl">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-3">
            <p
              className="caption"
              style={{ color: "var(--color-gold-500)" }}
            >
              Manifesto · 00
            </p>
          </div>
          <div className="md:col-span-9">
            <p
              className="display-tight text-[clamp(1.5rem,2.6vw,2.5rem)] leading-[1.25]"
              style={{ color: "var(--color-mist)" }}
            >
              We started on a workshop floor in India and never quite left.
              The kitchens we built in 1998 still ship; the design studio we
              set up to brand them still runs; the AI we wrote to keep them
              efficient is now its own brand. Every part of the group is
              here because the works asked for it — and because we like to
              make our own tools.
            </p>
            <GoldRule className="mt-14 w-24" variant="solid" />
            <p
              className="caption mt-5"
              style={{ color: "var(--color-gold-300)" }}
            >
              Hemco Group · Since 1998
            </p>
          </div>
        </div>
      </Section>

      {/* By the numbers — flows directly out of the manifesto on the same
          forest canvas, so no bridge between them. */}
      <Section tone="forest" pad="lg">
        <p
          className="eyebrow mb-12"
          style={{ color: "var(--color-gold-500)" }}
        >
          By the numbers
        </p>
        <GoldRule className="mb-16 w-full" variant="tone" />
        <StaggerGroup
          className="grid gap-12 md:grid-cols-4 md:gap-10"
          staggerChildren={0.08}
        >
          {stats.map((s) => (
            <StaggerItem key={s.label} className="flex flex-col gap-4">
              <span
                className="display data text-[clamp(3rem,7vw,5.75rem)] leading-none"
                style={{ color: "var(--color-gold-300)" }}
              >
                {s.noFormat ? <span>{s.to}</span> : <CountUp to={s.to} />}
              </span>
              <span
                className="caption"
                style={{ color: "var(--color-mist)" }}
              >
                {s.label}
              </span>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      <ToneBridge from="forest" to="ivory" />

      {/* Journal */}
      <Section tone="ivory" pad="xl">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="eyebrow mb-5">Journal</p>
            <h2 className="display text-[clamp(2.25rem,4.6vw,4rem)]">
              Recent notes,
              <br />
              <span className="display-italic opacity-60">in our own words.</span>
            </h2>
          </div>
          <MagneticLink href="/world/journal" className="btn btn-secondary">
            All notes
          </MagneticLink>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {recent.map((entry, i) => (
            <NewsCard key={entry.slug} entry={entry} index={i} />
          ))}
        </div>
      </Section>

      <ToneBridge from="ivory" to="forest" />

      {/* Final CTA on forest */}
      <Section tone="forest" pad="xl">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <p
              className="caption mb-6"
              style={{ color: "var(--color-gold-500)" }}
            >
              Build with us
            </p>
            <h2
              className="display text-[clamp(2.5rem,5.4vw,5.5rem)]"
              style={{ color: "var(--color-mist)" }}
            >
              An industrial group is{" "}
              <span
                className="display-italic"
                style={{ color: "var(--color-gold-300)" }}
              >
                a long conversation.
              </span>
            </h2>
          </div>
          <div className="md:col-span-5 md:flex md:flex-col md:justify-end">
            <p
              className="measure body-sans"
              style={{ color: "var(--color-mist)" }}
            >
              Whether you&apos;re a partner, a future colleague, or a customer
              — start a conversation. We&apos;ll route you to the right desk.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <MagneticLink href="/contact" className="btn btn-gold">
                Get in touch
              </MagneticLink>
              <MagneticLink href="/careers" className="btn btn-secondary">
                Open roles
              </MagneticLink>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
