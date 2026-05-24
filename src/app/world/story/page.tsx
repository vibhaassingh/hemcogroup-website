import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Section, GoldRule } from "@/components/ui/section";
import { CinematicSection } from "@/components/ui/cinematic-section";
import { ToneBridge } from "@/components/ui/tone-bridge";
import { Reveal } from "@/components/ui/reveal";
import { MaskReveal } from "@/components/ui/mask-reveal";
import { CountUp } from "@/components/ui/count-up";
import { MagneticLink } from "@/components/ui/magnetic-link";
import { ScrollProgress } from "@/components/ui/scroll-progress";

export const metadata: Metadata = {
  title: "Our story",
  description:
    "Twenty-eight years from a single workshop in India to a house of twelve brands across seven sectors. The history of Hemco Group, founded in 1998.",
  alternates: { canonical: "/world/story" },
  openGraph: {
    title: "Our story · Hemco Group",
    description:
      "Twenty-eight years from a single workshop in India to a house of twelve brands across seven sectors.",
    url: "/world/story",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our story · Hemco Group",
    description: "From a single workshop in India to a house of twelve brands.",
  },
};

/**
 * Story page — redesigned as a magazine monograph.
 *
 *   Cover (cinematic photo + single italic line + dateline stamp)
 *   Standfirst (large opening passage, two-column editorial)
 *   By the numbers (forest band, three big counts)
 *   Pull-quote interlude
 *   Five eras (full-bleed images alternating left/right with Roman
 *     numerals, year-range, era title, paragraph, ventures founded)
 *   Pull-quote interlude
 *   Operating principles (five large editorial rows)
 *   Coda (foundation reference + colophon)
 *
 * All imagery has been swapped to local brand photography under
 * /public/brand/, so no Unsplash placeholders remain on the page.
 */

const eras = [
  {
    numeral: "I",
    range: "1998 — 2008",
    title: "The workshop floor.",
    body: "Hemco opens in India as a stainless fabrication and refrigeration shop, building commercial kitchens for the country's hotels and restaurants. The first decade is about discipline at the metal — sheet stock to finished installation, under one roof, by people who could read a kitchen drawing and a service line equally well.",
    foundedNote: "Hemco Kitchens established · 1998",
    image: "/brand/keystonne-hero.jpg",
    alt: "Two chefs working through a stainless pass — the works in service",
    side: "left" as const,
  },
  {
    numeral: "II",
    range: "2008 — 2018",
    title: "The works become a system.",
    body: "Ten years of compounding. Cooking, refrigeration, extraction, and stainless fabrication move from line items to an integrated kitchen system, specified together. The works ship for hotels, cloud kitchens, bakeries and fine-dining restaurants across the subcontinent and start finding their first international homes.",
    foundedNote: "Connected kitchen begins to take shape",
    image: "/brand/culinary-hero.jpg",
    alt: "Chef on a Hemco-built prep line — operations at scale",
    side: "right" as const,
  },
  {
    numeral: "III",
    range: "2018 — 2024",
    title: "Design, intelligence, commerce.",
    body: "The works gets a brand. Kerning Studio is set up to give the kitchen system a voice, then Kerning AI to keep the operations efficient, then Keystonne to take the catalogue national. The house stops being one company and starts being a system of companies, each making the others stronger.",
    foundedNote: "Kerning Studio · Kerning AI · Keystonne",
    image: "/brand/kerning-ai-hero.jpg",
    alt: "Robotic welding cell on the production floor — the works gets intelligent",
    side: "left" as const,
  },
  {
    numeral: "IV",
    range: "2024 — 2026",
    title: "Sovereign ventures begin.",
    body: "Lumonn enters its first build phase — a Low Energy Nuclear Reactor module sized for distributed clean baseload. Consortium is chartered for decision intelligence inside Indian institutions; Cronuss Associates is set up as the in-house counsel for the group; CDR is incorporated for sovereign defence manufacturing. The frontier ventures all start the same year, on purpose.",
    foundedNote: "Lumonn · Consortium · CDR · Cronuss",
    image: "/brand/lumonn-device.jpg",
    alt: "Lumonn LENR module on a cobalt-lit pedestal — frontier energy",
    side: "right" as const,
  },
  {
    numeral: "V",
    range: "2026 →",
    title: "Twelve brands, seven sectors.",
    body: "The house, today: a culinary works, a design atelier, an intelligence stack, a hospitality consultancy, a sovereign portfolio, a chambers practice, and a foundation. Twenty-eight years compounding — and still inside walking distance, mostly, of the workshop floor we started on.",
    foundedNote: "MVV Foundation returns the practice to the city",
    image: "/brand/mvv-hero.jpg",
    alt: "Students focused on their work — the foundation arm",
    side: "left" as const,
  },
];

const stats = [
  { to: 12, label: "Operating brands" },
  { to: 7, label: "Sectors" },
  { to: 28, label: "Years compounding" },
];

const principles = [
  {
    n: "01",
    title: "Built in-house.",
    body: "From the foundry to the software that runs it. If a capability is core to the business, we build it ourselves — we do not subcontract the things that compound.",
  },
  {
    n: "02",
    title: "Compounding.",
    body: "Every brand in the house earns its keep by making the others stronger. Intelligence serves the works. Design serves commerce. Counsel serves them all. Nothing in the portfolio is an island.",
  },
  {
    n: "03",
    title: "India first.",
    body: "We begin with the problems closest to home. The ones we solve well are the ones that travel — to the EU, to the UK, to the Gulf, to the institutions that buy what India is now ready to ship.",
  },
  {
    n: "04",
    title: "Long horizons.",
    body: "We invest in decades, not quarters. Most of our brands are still inside walking distance of the original works, and the team that runs them measures success in years that begin with two.",
  },
  {
    n: "05",
    title: "Quiet ambition.",
    body: "Brand and craft, in equal measure. We say less than we make and make more than we say. Press follows delivery — never the other way around.",
  },
];

export default function StoryPage() {
  return (
    <>
      <ScrollProgress />

      {/* ── Cover — single cinematic photo, italic sentence, dateline */}
      <CinematicSection
        image="/brand/hemco-hero.jpg"
        alt="The founding works in India — chef seasoning at a Hemco-built stainless line"
        height="92vh"
        align="bottom"
        overlayCss="linear-gradient(180deg, rgba(8,12,22,0) 0%, rgba(8,12,22,0.18) 50%, rgba(6,9,17,0.78) 100%)"
        priority
      >
        <div className="max-w-5xl">
          <Reveal>
            <p
              className="caption mb-7 flex items-center gap-3 flex-wrap"
              style={{ color: "var(--color-gold-300)" }}
            >
              <span
                aria-hidden
                className="inline-block h-px w-10"
                style={{ background: "var(--color-gold-500)" }}
              />
              Our story
              <span aria-hidden style={{ opacity: 0.55 }}>·</span>
              MCMXCVIII — MMXXVI
              <span aria-hidden style={{ opacity: 0.55 }}>·</span>
              India
            </p>
          </Reveal>
          <MaskReveal
            as="h1"
            text="A workshop floor,"
            delay={0.05}
            className="display text-[clamp(2.75rem,9vw,9rem)] leading-[0.94] mb-1 text-white"
          />
          <Reveal delay={0.25}>
            <p
              className="display-italic text-[clamp(2.5rem,8vw,8.5rem)] leading-[0.94] mb-9"
              style={{ color: "var(--color-gold-300)" }}
            >
              and what came of it.
            </p>
          </Reveal>
          <Reveal delay={0.5}>
            <p
              className="lede max-w-2xl"
              style={{ color: "rgba(255,255,255,0.92)" }}
            >
              Twenty-eight years from a single workshop in India to a house
              of twelve brands across seven sectors — written in our own
              words, in five eras.
            </p>
          </Reveal>
        </div>
      </CinematicSection>

      {/* ── Standfirst — long opening passage, two-column editorial. */}
      <Section tone="ivory" pad="xl">
        <div className="grid gap-12 md:grid-cols-12 items-start">
          <div className="md:col-span-4">
            <p className="eyebrow">Origin</p>
            <GoldRule className="mt-3 w-12" variant="solid" />
            <p
              className="caption mt-7"
              style={{ color: "var(--color-ink-soft)", letterSpacing: "0.18em" }}
            >
              Standfirst — the founding question, in one paragraph.
            </p>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <p className="display-tight text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.22] mb-9">
              Hemco began in 1998 in a single workshop in India — stainless
              fabrication, refrigeration, and the people who made them. Every
              venture in the house today still traces back to a question that
              workshop asked of itself: how do you build the thing that
              powers the kitchen, instead of buying it from someone who
              builds it for everyone?
            </p>
            <p
              className="body-sans"
              style={{ color: "var(--color-ink-soft)" }}
            >
              The answer is the rest of this page. Five eras, twelve brands,
              one through-line: the conviction that an industrial group is
              measured not by what it announces, but by what it still ships
              twenty years on. The works remain the spine; the rest of the
              house is what the works decided it needed.
            </p>
          </div>
        </div>
      </Section>

      {/* ── By the numbers — anchored early on a forest band so the
          reader has a scale before stepping into the eras. */}
      <ToneBridge from="ivory" to="forest" />
      <Section tone="forest" pad="lg">
        <div className="grid gap-10 md:gap-16 md:grid-cols-3">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="md:border-l md:pl-9"
              style={{
                borderColor:
                  i === 0
                    ? "transparent"
                    : "color-mix(in srgb, var(--color-gold-500) 40%, transparent)",
              }}
            >
              <span
                className="display data text-[clamp(3.5rem,8vw,7rem)] leading-none block mb-5"
                style={{ color: "var(--color-gold-300)" }}
              >
                <CountUp to={s.to} />
              </span>
              <span
                className="caption"
                style={{
                  color: "var(--color-mist)",
                  letterSpacing: "0.22em",
                }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Pull-quote — operating philosophy, single italic sentence. */}
      <Section tone="forest" pad="xl">
        <div className="max-w-4xl mx-auto text-center">
          <GoldRule className="mb-9 mx-auto w-16" variant="solid" />
          <p
            className="display-italic text-[clamp(1.6rem,3.4vw,2.5rem)] leading-[1.28]"
            style={{ color: "var(--color-mist)" }}
          >
            &ldquo;A house of industries is judged not by what it announces,
            but by what it still ships, twenty years on.&rdquo;
          </p>
          <p
            className="caption mt-9"
            style={{
              color: "var(--color-gold-300)",
              letterSpacing: "0.32em",
            }}
          >
            HEMCO GROUP · OPERATING PHILOSOPHY
          </p>
        </div>
      </Section>

      {/* ── Eras — five full-bleed editorial spreads, alternating side.
          Each era carries a Roman numeral overlay, year range, title,
          long paragraph, and a small "founded" note row. */}
      <ToneBridge from="forest" to="ivory" />
      {eras.map((e, i) => (
        <Section
          key={e.numeral}
          tone={i % 2 === 0 ? "ivory" : "warm-ivory"}
          pad="xl"
        >
          <div
            className={`grid gap-10 md:grid-cols-12 md:gap-16 items-center ${
              e.side === "right" ? "md:[direction:rtl]" : ""
            }`}
          >
            {/* Image plate — full-bleed photo with Roman numeral
                overlaid in the corner opposite the body copy. */}
            <div className="md:col-span-7 md:[direction:ltr]">
              <div
                className="relative aspect-[5/4] overflow-hidden"
                style={{ background: "var(--color-ivory-2)" }}
              >
                <Image
                  src={e.image}
                  alt={e.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover"
                  style={{ filter: "saturate(0.92) contrast(1.04)" }}
                />
                <p
                  className={`display absolute text-[clamp(4rem,11vw,9rem)] leading-none ${
                    e.side === "right" ? "right-6 top-5" : "left-6 top-5"
                  }`}
                  style={{
                    color: "var(--color-ivory)",
                    textShadow: "0 2px 36px rgba(0,0,0,0.5)",
                    fontStyle: "italic",
                  }}
                >
                  {e.numeral}
                </p>
              </div>
            </div>

            {/* Type plate */}
            <div className="md:col-span-4 md:col-start-9 md:[direction:ltr]">
              <p
                className="caption mb-4"
                style={{ color: "var(--color-gold-500)" }}
              >
                Era {e.numeral} · {e.range}
              </p>
              <GoldRule className="mb-7 w-12" variant="solid" />
              <h2
                className="display text-[clamp(2rem,3.6vw,3rem)] leading-[1.05] mb-6"
                style={{ color: "var(--color-ink)" }}
              >
                {e.title}
              </h2>
              <p
                className="body-sans mb-7"
                style={{ color: "var(--color-ink-soft)" }}
              >
                {e.body}
              </p>
              <p
                className="caption pt-5"
                style={{
                  color: "var(--color-ink-soft)",
                  letterSpacing: "0.22em",
                  borderTop:
                    "1px solid color-mix(in srgb, var(--color-gold-500) 38%, transparent)",
                }}
              >
                <span style={{ color: "var(--color-gold-700)" }}>+</span>{" "}
                {e.foundedNote}
              </p>
            </div>
          </div>
        </Section>
      ))}

      {/* ── Pull-quote interlude — second one, between chronology and
          the operating principles. Anchors the back half of the page. */}
      <Section tone="ivory" pad="xl">
        <div className="max-w-4xl mx-auto text-center">
          <GoldRule className="mb-9 mx-auto w-16" variant="solid" />
          <p className="display-italic text-[clamp(1.6rem,3.4vw,2.5rem)] leading-[1.28]">
            &ldquo;The works remain the spine. The rest of the house is what
            the works decided it needed.&rdquo;
          </p>
          <p
            className="caption mt-9"
            style={{
              color: "var(--color-gold-500)",
              letterSpacing: "0.32em",
            }}
          >
            FROM THE FOUNDER&apos;S NOTE
          </p>
        </div>
      </Section>

      {/* ── Operating principles — five editorial rows. Replaces the
          previous 2-up grid with a more confident vertical rhythm. */}
      <Section tone="ivory" pad="xl">
        <div className="grid gap-12 md:grid-cols-12 mb-14">
          <div className="md:col-span-4">
            <p className="eyebrow mb-5">Operating principles</p>
            <GoldRule className="mb-8 w-12" variant="solid" />
            <h2 className="display text-[clamp(2rem,4vw,3.25rem)] leading-[1.0]">
              How the group{" "}
              <span className="display-italic opacity-60">works.</span>
            </h2>
          </div>
          <div className="md:col-span-7 md:col-start-6 md:pt-6">
            <p
              className="lede"
              style={{ color: "var(--color-ink-soft)" }}
            >
              Five operating rules — written down once, applied across every
              brand in the house. They are not values; they are the working
              contract under which the house decides what to build, what to
              say, and what to ship.
            </p>
          </div>
        </div>
        <ol className="grid gap-0">
          {principles.map((p, i) => (
            <li
              key={p.n}
              className="grid grid-cols-[64px_1fr] md:grid-cols-[110px_1fr_2fr] gap-6 md:gap-12 py-9 md:py-11 items-baseline"
              style={{
                borderTop:
                  i === 0
                    ? "1px solid color-mix(in srgb, var(--color-ink) 22%, transparent)"
                    : "1px solid color-mix(in srgb, var(--color-ink) 14%, transparent)",
                borderBottom:
                  i === principles.length - 1
                    ? "1px solid color-mix(in srgb, var(--color-ink) 22%, transparent)"
                    : "none",
              }}
            >
              <span
                className="display-italic data text-[clamp(2rem,3vw,3rem)] leading-none"
                style={{ color: "var(--color-gold-500)" }}
              >
                {p.n}
              </span>
              <h3
                className="display text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.05]"
                style={{ color: "var(--color-ink)" }}
              >
                {p.title}
              </h3>
              <p
                className="body-sans md:pt-2 md:col-start-3"
                style={{ color: "var(--color-ink-soft)" }}
              >
                {p.body}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* ── Coda — foundation reference + colophon. */}
      <ToneBridge from="ivory" to="forest" />
      <Section tone="forest" pad="xl">
        <div className="grid gap-12 md:grid-cols-12 items-end">
          <div className="md:col-span-7">
            <p
              className="eyebrow mb-5"
              style={{ color: "var(--color-gold-300)" }}
            >
              Coda
            </p>
            <GoldRule className="mb-8 w-12" variant="solid" />
            <h2
              className="display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] mb-7"
              style={{ color: "var(--color-mist)" }}
            >
              We return what we&apos;ve learned to{" "}
              <span
                className="display-italic"
                style={{ color: "var(--color-gold-300)" }}
              >
                the city that taught us.
              </span>
            </h2>
            <p
              className="lede mb-10 max-w-2xl"
              style={{ color: "var(--color-mist)" }}
            >
              The MVV Foundation is the philanthropic arm of the group —
              culinary skilling for cooks from underserved communities,
              scholarship support and school partnerships in the towns
              where Hemco operates, and community kitchens designed and
              supplied at cost by the works.
            </p>
            <MagneticLink
              href="/ventures/mvv-foundation"
              className="btn btn-primary"
            >
              Visit the Foundation
            </MagneticLink>
          </div>
          <div className="md:col-span-4 md:col-start-9 md:text-right">
            <p
              className="caption mb-4"
              style={{
                color: "var(--color-gold-300)",
                letterSpacing: "0.32em",
              }}
            >
              END OF STORY
            </p>
            <p
              className="display-italic text-[clamp(1.1rem,1.6vw,1.4rem)] mb-3"
              style={{ color: "rgba(240,236,224,0.85)" }}
            >
              Set in our own words.
            </p>
            <p
              className="caption"
              style={{
                color: "rgba(240,236,224,0.55)",
                letterSpacing: "0.32em",
              }}
            >
              HEMCO GROUP · MCMXCVIII · IN
            </p>
            <Link
              href="/world"
              className="caption mt-9 inline-flex items-center gap-2"
              style={{
                color: "var(--color-gold-300)",
                letterSpacing: "0.22em",
              }}
            >
              ← Back to the issue
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
