import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Section, GoldRule } from "@/components/ui/section";
import { CinematicSection } from "@/components/ui/cinematic-section";
import { WorldFootprint } from "@/components/ui/world-footprint";
import { ToneBridge } from "@/components/ui/tone-bridge";
import { Reveal } from "@/components/ui/reveal";
import { MaskReveal } from "@/components/ui/mask-reveal";
import { imagery } from "@/content/imagery";

export const metadata: Metadata = {
  title: "World of Hemco",
  description:
    "The story, the journal, and the people behind Hemco Group — a privately held industrial group from India, founded in 1998.",
  alternates: { canonical: "/world" },
  openGraph: {
    title: "World of Hemco · Hemco Group",
    description: "The story, the journal, and the people behind Hemco Group.",
    url: "/world",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "World of Hemco · Hemco Group",
    description: "The story, the journal, and the people behind Hemco Group.",
  },
};

/**
 * World hub — redesigned as a magazine "issue".
 *
 * Replaces the previous 3-up card grid with an editorial spread:
 *   Cover — quiet typographic hero, a pull-quote and an issue stamp.
 *   Contents — a one-line standfirst announcing the four chapters.
 *   Chapters I · II · III — full-bleed asymmetric spreads (image
 *     offset to one side, large chapter number, title, lede, Continue
 *     link). Each chapter alternates left/right so the eye moves
 *     across the page rather than down through identical cards.
 *   Pull-quote interlude — a single italic sentence between II and III.
 *   Chapter IV · Footprint — the world map reframed as the closing
 *     chapter rather than a separate sub-section.
 *   Colophon — closing signature line on a forest band.
 */
/* Chapter image keys point at our actual brand photography — the
   founding works, the line in service, and a documentary craft frame —
   instead of the placeholder Unsplash stock that the rest of the
   imagery map still falls through to. */
const chapters = [
  {
    number: "I",
    href: "/world/story",
    title: "Our story",
    lede: "Twenty-eight years from a single workshop floor in India to a house of thirteen ventures across four continents. The thesis hasn't changed: build the works, ship the works, and stay close to the work.",
    image: imagery.hemco,
    side: "left" as const,
  },
  {
    number: "II",
    href: "/world/journal",
    title: "Journal",
    lede: "Notes from the works, in our own words. Operator dispatches, factory reports, and the long-form essays we write when something on the floor deserves more than a press note.",
    image: imagery.kerningAI,
    side: "right" as const,
  },
];

export default function WorldHub() {
  return (
    <>
      {/* ── Cover — front plate of an annual-report issue. The fractal-
          glass gradient video plays behind a low scrim so the type
          stays legible without dimming the plasma. Single bottom-left
          column — the eyebrow holds both the issue stamp and the
          founding-year mark, keeping the layout one continuous block. */}
      <CinematicSection
        image={imagery.craftWide.src}
        alt={imagery.craftWide.alt}
        video="/videos/world-hero.mp4"
        height="92vh"
        align="bottom"
        overlayCss="linear-gradient(180deg, rgba(8,12,22,0) 0%, rgba(8,12,22,0.10) 50%, rgba(6,9,17,0.55) 100%)"
        priority
      >
        <div className="max-w-5xl">
          <Reveal>
            <p
              className="caption mb-8 flex items-center gap-3 flex-wrap"
              style={{ color: "var(--color-gold-300)" }}
            >
              <span
                aria-hidden
                className="inline-block h-px w-10"
                style={{ background: "var(--color-gold-500)" }}
              />
              World of Hemco
              <span aria-hidden style={{ opacity: 0.55 }}>·</span>
              Issue No. 01
              <span aria-hidden style={{ opacity: 0.55 }}>·</span>
              MCMXCVIII
            </p>
          </Reveal>
          <MaskReveal
            as="h1"
            text="The house,"
            delay={0.05}
            className="display text-[clamp(2.75rem,8vw,8rem)] leading-[0.94] mb-1 text-white"
          />
          <Reveal delay={0.25}>
            <p
              className="display-italic text-[clamp(2.5rem,7.5vw,7.5rem)] leading-[0.94] mb-9"
              style={{ color: "var(--color-gold-300)" }}
            >
              in its own words.
            </p>
          </Reveal>
          <Reveal delay={0.5}>
            <p
              className="lede max-w-2xl"
              style={{ color: "rgba(255,255,255,0.92)" }}
            >
              Three chapters — the story, the journal, and the map. Read
              in any order. The order doesn&apos;t change the argument.
            </p>
          </Reveal>
        </div>
      </CinematicSection>

      {/* ── Contents — a single standfirst line, set as a magazine
          table-of-contents intro. Quiet, no card grid, no chrome. */}
      <Section tone="ivory" pad="xl">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p
              className="caption"
              style={{ color: "var(--color-gold-500)" }}
            >
              Contents
            </p>
            <GoldRule className="mt-3 w-12" variant="solid" />
            <p
              className="caption mt-7"
              style={{ color: "var(--color-ink-soft)", letterSpacing: "0.18em" }}
            >
              Three chapters · One house
            </p>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <p className="display-tight text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.22]">
              Most companies write {" "}
              <span className="display-italic opacity-70">about</span>{" "}
              themselves. We&apos;d rather you read what we ship, hear from
              the people who ship it, and see where the works actually
              touch the ground. This is that.
            </p>
          </div>
        </div>
      </Section>

      {/* ── Chapters I, II, III — asymmetric editorial spreads.
          Each chapter alternates side so the eye moves across the page
          (image left → image right → image left). The chapter number
          sits as a giant numeral over the spread; the title, lede and
          Continue link sit on the opposite half. */}
      {chapters.map((c, i) => (
        <Section
          key={c.number}
          tone={i % 2 === 0 ? "ivory" : "warm-ivory"}
          pad="xl"
        >
          <div
            className={`grid gap-10 md:grid-cols-12 md:gap-16 items-center ${
              c.side === "right" ? "md:[direction:rtl]" : ""
            }`}
          >
            {/* Image plate */}
            <Link
              href={c.href}
              className="group block md:col-span-7 md:[direction:ltr]"
              aria-label={`${c.title} — read more`}
            >
              <div
                className="relative aspect-[5/4] overflow-hidden"
                style={{ background: "var(--color-ivory-2)" }}
              >
                <Image
                  src={c.image.src}
                  alt={c.image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-[1.04]"
                  style={{ filter: "saturate(0.86) contrast(1.05)" }}
                />
                {/* Chapter numeral — sits over the image, top-corner,
                    ivory ink with a subtle shadow so it reads on any
                    photo. The corner alternates with the side. */}
                <p
                  className={`display absolute text-[clamp(4rem,10vw,8rem)] leading-none ${
                    c.side === "right" ? "right-6 top-5" : "left-6 top-5"
                  }`}
                  style={{
                    color: "var(--color-ivory)",
                    textShadow: "0 2px 32px rgba(0,0,0,0.45)",
                    fontStyle: "italic",
                  }}
                >
                  {c.number}
                </p>
              </div>
            </Link>

            {/* Type plate */}
            <div className="md:col-span-4 md:col-start-9 md:[direction:ltr]">
              <p
                className="caption mb-5"
                style={{ color: "var(--color-gold-500)" }}
              >
                Chapter {c.number}
              </p>
              <GoldRule className="mb-7 w-12" variant="solid" />
              <h2
                className="display text-[clamp(2rem,3.6vw,3rem)] leading-[1.05] mb-6"
                style={{ color: "var(--color-ink)" }}
              >
                {c.title}
              </h2>
              <p
                className="body-sans mb-9"
                style={{ color: "var(--color-ink-soft)" }}
              >
                {c.lede}
              </p>
              <Link
                href={c.href}
                className="caption inline-flex items-center gap-2 transition-[gap] duration-500 hover:gap-3"
                style={{
                  color: "var(--color-gold-700)",
                  letterSpacing: "0.22em",
                }}
              >
                Read chapter {c.number}
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>

          {/* Pull-quote interlude — sits between chapter II and III.
              A single italic line that breathes, on its own row. */}
          {i === 1 && (
            <div className="mt-24 md:mt-32 max-w-4xl mx-auto text-center">
              <GoldRule className="mb-9 mx-auto w-16" variant="solid" />
              <p
                className="display-italic text-[clamp(1.4rem,2.8vw,2.1rem)] leading-[1.32]"
                style={{ color: "var(--color-ink-soft)" }}
              >
                &ldquo;The works remain the spine of the group. The rest of
                the map is where it ships, sells, and stays in touch.&rdquo;
              </p>
              <p
                className="caption mt-7"
                style={{ color: "var(--color-gold-500)", letterSpacing: "0.32em" }}
              >
                — From the founder&apos;s note
              </p>
            </div>
          )}
        </Section>
      ))}

      {/* ── Final chapter — Footprint. Reframed as the closing
          chapter rather than a separate footer module, so it reads as
          part of the issue. Forest band continues the editorial rhythm. */}
      <ToneBridge from="warm-ivory" to="forest" />
      <Section tone="forest" pad="xl">
        <div className="grid gap-12 md:grid-cols-12 mb-16">
          <div className="md:col-span-5">
            <p
              className="caption"
              style={{ color: "var(--color-gold-300)", letterSpacing: "0.22em" }}
            >
              Chapter III
            </p>
            <GoldRule className="mt-3 w-12" variant="solid" />
            <h2
              className="display text-[clamp(2.25rem,4.6vw,4rem)] leading-[1.0] mt-7"
              style={{ color: "var(--color-mist)" }}
            >
              The map,
              <br />
              <span
                className="display-italic"
                style={{ color: "var(--color-gold-300)" }}
              >
                from the works.
              </span>
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7 md:pt-8">
            <p className="lede mb-6" style={{ color: "var(--color-mist)" }}>
              Hemco is headquartered in India and operates across ten cities
              on four continents. The works remain the spine of the group;
              the rest of the map is where it ships, sells and partners.
            </p>
            <p
              className="body-sans"
              style={{ color: "rgba(240,236,224,0.78)" }}
            >
              Use the footprint to find the office or the shipping address
              that matters. For everything else, the leadership chapter has
              the names and the email.
            </p>
          </div>
        </div>
        <WorldFootprint />
      </Section>

      {/* ── Colophon — quiet closing signature on the forest band. */}
      <Section tone="forest" pad="lg">
        <div className="text-center max-w-3xl mx-auto">
          <GoldRule className="mb-9 mx-auto w-16" variant="solid" />
          <p
            className="caption"
            style={{
              color: "var(--color-gold-300)",
              letterSpacing: "0.32em",
            }}
          >
            END OF ISSUE
          </p>
          <p
            className="display-italic mt-5 text-[clamp(1.25rem,2vw,1.65rem)]"
            style={{ color: "rgba(240,236,224,0.85)" }}
          >
            For specifications, partnerships, or to commission a project —
            write to us.
          </p>
          <a
            className="display mt-7 inline-block text-[clamp(1.25rem,2.4vw,1.75rem)] hover:opacity-80 transition-opacity"
            style={{ color: "var(--color-gold-300)" }}
            href="mailto:hello@hemcogroup.com"
          >
            hello@hemcogroup.com
          </a>
        </div>
      </Section>
    </>
  );
}
