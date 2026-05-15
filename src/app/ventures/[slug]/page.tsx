import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/ui/reveal";
import { Section, GoldRule } from "@/components/ui/section";
import { CinematicSection } from "@/components/ui/cinematic-section";
import { MaskReveal } from "@/components/ui/mask-reveal";
import { MagneticLink } from "@/components/ui/magnetic-link";
import { SpecTable, type Spec } from "@/components/ui/spec-table";
import { HemcoWordmark } from "@/components/ui/hemco-wordmark";
import { KerningText } from "@/components/ui/kerning-wordmark";
import { KerningAmbient } from "@/components/ui/kerning-ambient";
import { KerningMaskedMark } from "@/components/ui/kerning-masked-mark";
import { KeystonneText } from "@/components/ui/keystonne-wordmark";
import { KeystonneStoneMark } from "@/components/ui/keystonne-stone-mark";
import { KerningArchitectureSpread } from "@/components/ui/kerning-architecture-spread";
import { KerningAILogo } from "@/components/ui/kerning-ai-logo";
import { ConsortiumLogo } from "@/components/ui/consortium-logo";
import { ConsortiumMaskedDiamond } from "@/components/ui/consortium-masked-diamond";
import { LumonnText } from "@/components/ui/lumonn-wordmark";
import { LumonnMaskedBracket } from "@/components/ui/lumonn-masked-bracket";
import { ventures, venturesBySlug } from "@/content/ventures";
import { imagery } from "@/content/imagery";
import { sectorOfVenture, venturesInSector, sectors } from "@/content/sectors";
import {
  ventureIdentity,
  defaultIdentity,
} from "@/content/venture-identity";

export function generateStaticParams() {
  return ventures.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const v = venturesBySlug[slug];
  if (!v) return {};
  const url = `/ventures/${v.slug}`;
  const ogTitle = `${v.name} — ${v.tagline}`;
  return {
    title: v.name,
    description: v.description,
    alternates: { canonical: url },
    openGraph: {
      title: ogTitle,
      description: v.description,
      url,
      type: "article",
      siteName: "Hemco Group",
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: v.positioning,
    },
  };
}

export default async function VenturePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const venture = venturesBySlug[slug];
  if (!venture) notFound();
  const img = imagery[venture.imagery];
  const sector = sectorOfVenture(venture.slug);
  const identity = ventureIdentity[venture.slug] ?? defaultIdentity;

  const specs: Spec[] = [
    { label: "Sector", value: sector?.name ?? venture.sector },
    { label: "Founded", value: venture.founded ?? "—" },
    { label: "Domain", value: venture.domain ?? "In development" },
    { label: "Headquartered", value: venture.hq ?? "India" },
  ];

  const peers = sector
    ? venturesInSector(sector.slug).filter((v) => v.slug !== venture.slug)
    : ventures.filter((v) => v.slug !== venture.slug).slice(0, 3);

  const SITE_URL = "https://hemcogroup.com";
  const ventureUrl = `${SITE_URL}/ventures/${venture.slug}`;
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Hemco Group", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Sectors", item: `${SITE_URL}/sectors` },
      ...(sector
        ? [
            {
              "@type": "ListItem",
              position: 3,
              name: sector.name,
              item: `${SITE_URL}/sectors/${sector.slug}`,
            },
          ]
        : []),
      {
        "@type": "ListItem",
        position: sector ? 4 : 3,
        name: venture.name,
        item: ventureUrl,
      },
    ],
  };
  const ventureSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${ventureUrl}#organization`,
    name: venture.name,
    alternateName: venture.wordmark,
    description: venture.description,
    slogan: venture.tagline,
    url: venture.domain ? `https://${venture.domain}` : ventureUrl,
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
    foundingDate: venture.founded,
    address: {
      "@type": "PostalAddress",
      addressCountry: venture.hq === "Netherlands" ? "NL" : "IN",
      ...(venture.hq && venture.hq !== "India" && venture.hq !== "Netherlands"
        ? { addressLocality: venture.hq }
        : {}),
    },
    knowsAbout: sector ? [sector.name, venture.sector] : [venture.sector],
  };

  // Per-venture accent CSS variables — picked up by the section's children
  // for accent rules, spec table, eyebrow underline, glints.
  const accentStyle = {
    "--v-accent": identity.accent,
    "--v-accent-soft": identity.accentSoft,
    "--v-accent-deep": identity.accentDeep,
  } as React.CSSProperties;

  const isKerning = identity.wordmarkComponent === "kerning";
  const isKeystonne = identity.wordmarkComponent === "keystonne";
  // Kerning is shared by Studio (orange-on-black) and Architecture
  // (warm-ivory paper). Only Studio takes the dark page chrome and the
  // masked-mark beat; Architecture gets the ivory canvas + section
  // drawing instead.
  const isKerningStudio = venture.slug === "kerning-studio";
  const isKerningArchitecture = venture.slug === "kerning-architecture";
  const isKerningAI = venture.slug === "kerning-ai";
  const isConsortium = venture.slug === "consortium";
  const isConsortiumDefence = venture.slug === "consortium-defence-robotics";
  const isLumonn = venture.slug === "lumonn";
  // Pages that share the fluted-glass premium treatment for pillars +
  // spec imprint. Add slugs here to opt them in.
  const isFlutedPremium =
    isKerningAI || isConsortium || isConsortiumDefence || isLumonn;

  return (
    <div
      style={accentStyle}
      className={
        isKerningStudio
          ? "kerning-page relative"
          : isKerningArchitecture
            ? "kerning-arch-page relative"
            : isKerningAI
              ? "kerning-ai-page relative"
              : isConsortium || isConsortiumDefence
                ? "consortium-page relative"
                : isLumonn
                  ? "lumonn-page relative"
                  : isKeystonne
                    ? "keystonne-page relative"
                    : undefined
      }
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ventureSchema) }}
      />
      {isKerningStudio && <KerningAmbient />}
      <CinematicSection
        image={img.src}
        alt={img.alt}
        video={identity.heroVideo}
        poster={img.src}
        height="92vh"
        align={identity.heroAlign}
        overlayCss={identity.heroOverlay}
        glassPlate={false}
        priority
      >
        <Reveal>
          <p
            className="caption mb-5"
            style={{ color: identity.accentSoft }}
          >
            <span
              className="inline-block h-px w-10 mr-3 align-middle"
              style={{ background: identity.accent }}
            />
            {identity.heroEyebrow}
          </p>
        </Reveal>
        {identity.wordmarkComponent === "hemco" ? (
          <Reveal delay={0.1}>
            <h1 className="mb-7 max-w-5xl">
              <span className="sr-only">{venture.name}</span>
              <HemcoWordmark
                title=""
                width={560}
                priority
                className="block h-auto w-[min(82vw,560px)]"
              />
            </h1>
          </Reveal>
        ) : identity.wordmarkComponent === "kerning" ? (
          /* Kerning hero: KERNING® text wordmark. For Architecture we
             add a small italic "Architecture" caption underneath, set in
             the practice's olive-bronze accent. The H icon lives below
             in the masked-mark section (studio only). */
          <Reveal delay={0.1}>
            <h1 className="mb-7 max-w-5xl">
              <span className="sr-only">{venture.name}</span>
              <KerningText
                title=""
                height={64}
                className="block"
                style={{ color: "#ffffff" }}
              />
              {isKerningArchitecture && (
                <span
                  className="display-italic mt-3 block"
                  style={{
                    fontSize: "clamp(1.25rem, 2vw, 1.65rem)",
                    color: identity.accentSoft,
                    letterSpacing: "0.02em",
                  }}
                >
                  Architecture
                </span>
              )}
            </h1>
          </Reveal>
        ) : identity.wordmarkComponent === "consortium" ? (
          /* Consortium family hero. For the parent venture we just show
             the wide-tracked CONSORTIUM wordmark — the striated diamond
             mark lives below in the masked-diamond section. For the
             Defence wing we instead render the full lockup (diamond +
             wordmark) with "Defence" set in italic underneath, mirroring
             the Kerning Studio / Architecture pattern of "shared
             wordmark, role-specific subtitle". */
          <Reveal delay={0.1}>
            <h1 className="mb-7 max-w-5xl">
              <span className="sr-only">{venture.name}</span>
              {isConsortiumDefence ? (
                <span className="block">
                  <ConsortiumLogo height={170} />
                  <span
                    className="display-italic mt-4 block"
                    style={{
                      fontSize: "clamp(1.5rem, 2.4vw, 2rem)",
                      color: "rgba(255,255,255,0.92)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    Defence
                  </span>
                </span>
              ) : (
                <img
                  src="/brand/consortium-text.svg"
                  alt=""
                  width={Math.round(56 * (701.33 / 45.17))}
                  height={56}
                  style={{
                    display: "block",
                    // The text SVG ships in the brand red; on the dark
                    // hero it stays in its native colour.
                    filter: "drop-shadow(0 1px 0 rgba(0,0,0,0.4))",
                  }}
                />
              )}
            </h1>
          </Reveal>
        ) : identity.wordmarkComponent === "lumonn" ? (
          /* Lumonn hero: just the LUMONN outlined wordmark, anchored
             bottom-left. The interlocked-bracket mark lives below in
             the masked-bracket beat — same pattern as Kerning Studio
             (H-monogram below) and Consortium (diamond below). */
          <Reveal delay={0.1}>
            <h1 className="mb-7 max-w-5xl">
              <span className="sr-only">{venture.name}</span>
              <LumonnText
                height={88}
                style={{ color: "#ffffff" }}
              />
            </h1>
          </Reveal>
        ) : identity.wordmarkComponent === "kerning-ai" ? (
          /* Kerning AI hero: the official KERNING.AI text wordmark
             rendered in white over the dark instrument-panel canvas. */
          <Reveal delay={0.1}>
            <h1 className="mb-7 max-w-5xl">
              <span className="sr-only">{venture.name}</span>
              <KerningAILogo
                title=""
                height={56}
                className="block"
                style={{ color: "#ffffff" }}
              />
            </h1>
          </Reveal>
        ) : identity.wordmarkComponent === "keystonne" ? (
          /* Keystonne hero: KEYSTONNE® wordmark — the K monogram lives
             below in the stone-mark section, sitting on a slab. */
          <Reveal delay={0.1}>
            <h1 className="mb-7 max-w-5xl">
              <span className="sr-only">{venture.name}</span>
              <KeystonneText
                title=""
                height={56}
                className="block"
                style={{ color: "#ffffff" }}
              />
            </h1>
          </Reveal>
        ) : (
          <MaskReveal
            as="h1"
            split="char"
            text={venture.name}
            delay={0.1}
            className="display text-[clamp(3rem,9vw,9rem)] leading-[0.94] mb-7 max-w-5xl text-white"
          />
        )}
        <Reveal delay={0.5}>
          <p
            className="lede max-w-2xl"
            style={{ color: "rgba(255,255,255,0.92)" }}
          >
            {venture.tagline}
          </p>
        </Reveal>
        {sector && (
          <Reveal delay={0.7}>
            <Link
              /* MVV Foundation is the only venture in the Foundation
                 sector, so /sectors/foundation redirects here. Point
                 the back-link at the sectors index instead so we don't
                 ship a link that bounces to itself. */
              href={
                venture.slug === "mvv-foundation"
                  ? "/sectors"
                  : `/sectors/${sector.slug}`
              }
              className="caption mt-10 inline-flex items-center gap-2"
              style={{ color: identity.accentSoft }}
            >
              ← Sector {sector.ordinal} · {sector.name}
            </Link>
          </Reveal>
        )}
      </CinematicSection>

      {/* Kerning monogram, masked over a cursor-tracked orange-red-black
          gradient. Studio venture only. */}
      {isKerningStudio && <KerningMaskedMark />}

      {/* Kerning Architecture spread — a draughtsman's section drawing
          on warm-ivory paper. Architecture venture only. */}
      {isKerningArchitecture && <KerningArchitectureSpread />}

      {/* Keystonne K monogram set into a stone slab. Mirrors the Kerning
          masked-mark beat — a quiet monumental section between hero and body. */}
      {isKeystonne && <KeystonneStoneMark />}

      {/* Consortium striated diamond, masked over a cursor-tracked
          ember-red gradient. Mirrors the Kerning Studio masked-mark
          beat — same technique, institutional terracotta palette. */}
      {isConsortium && <ConsortiumMaskedDiamond />}

      {/* Lumonn interlocked bracket, masked over a cursor-tracked
          electric-blue gradient. Same technique as the Kerning and
          Consortium beats, retuned for the LENR module's cobalt glow. */}
      {isLumonn && <LumonnMaskedBracket />}

      {/* Outcome line — single bold sentence, accent rule above.
          On the Kerning page, the section also carries `kerning-merge-black`
          so its top edge stays pure black (continuous with the masked-mark
          canvas above) and only fades back to the orange ambient near its
          base. Without this, a hard seam shows where the pure-black mark
          section meets the otherwise-transparent body section. */}
      {identity.outcomeLine && (
        <Section
          tone={identity.bodyTone}
          pad="xl"
          className={
            isKerningStudio
              ? "kerning-merge-black"
              : isKeystonne
                ? "keystonne-merge-stone"
                : isConsortium
                  ? "consortium-merge-slate"
                  : isLumonn
                    ? "lumonn-merge-ink"
                    : ""
          }
        >
          <div className="max-w-5xl">
            <div
              className="h-px w-24 mb-10"
              style={{ background: identity.accent }}
            />
            <p
              className="display-tight text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.2]"
              style={{ color: "var(--tone-fg)" }}
            >
              {identity.outcomeLine}
            </p>
          </div>
        </Section>
      )}

      {/* Lumonn device showcase — the LENR module on its cobalt-lit
          pedestal, full-bleed with letterboxed breathing room. Sits
          between the outcome line and the pillars so the page reads:
          promise → object → philosophy. The image already carries the
          LUMONN wordmark and "Endless energy." caption baked into the
          composition, so no overlay is layered on top. */}
      {isLumonn && (
        <section
          aria-label="Lumonn LENR module"
          className="relative overflow-hidden"
          style={{ background: "#03050f" }}
        >
          <div
            className="relative mx-auto"
            style={{
              width: "100%",
              maxWidth: "1600px",
              aspectRatio: "1376 / 768",
              padding: "clamp(2.5rem, 6vh, 5rem) clamp(1.25rem, 4vw, 3rem)",
            }}
          >
            <div
              className="relative w-full h-full overflow-hidden"
              style={{
                borderRadius: "4px",
                boxShadow:
                  "0 60px 120px -40px rgba(0,76,255,0.18), 0 30px 60px -30px rgba(0,0,0,0.7)",
              }}
            >
              <Image
                src="/brand/lumonn-device.jpg"
                alt="Lumonn LENR module on a cobalt-lit pedestal — Endless energy."
                fill
                sizes="(max-width: 1600px) 100vw, 1600px"
                className="object-cover"
                style={{ filter: "saturate(1.05) contrast(1.02)" }}
              />
              {/* Vertical fluting overlay — picks up the brand canvas
                  motif used elsewhere on the page. Very low alpha. */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 9px)",
                  mixBlendMode: "screen",
                }}
              />
            </div>
          </div>
        </section>
      )}

      {/* Pillars triptych — used by Hemco for Steel · Fire · Vision */}
      {identity.pillars && identity.pillars.length > 0 && (
        <Section tone={identity.bodyTone} pad="lg">
          <div className="grid gap-10 md:grid-cols-3 md:gap-12">
            {identity.pillars.map((p) => (
              <div
                key={p.title}
                className={`flex flex-col${
                  isFlutedPremium ? " kai-pillar" : ""
                }`}
              >
                <p
                  className="caption mb-5"
                  style={{ color: identity.accent }}
                >
                  {p.eyebrow}
                </p>
                <div
                  className="h-px w-12 mb-6"
                  style={{ background: identity.accent }}
                />
                <h3
                  className="display-tight text-[clamp(1.35rem,2.2vw,1.75rem)] leading-[1.18] mb-4"
                  style={{ color: "var(--tone-fg)" }}
                >
                  {p.title}
                </h3>
                <p
                  className="body-sans text-[15px]"
                  style={{ color: "var(--tone-fg-mute)" }}
                >
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Body — Positioning + Approach + Spec sidebar */}
      <Section tone={identity.bodyTone} pad="xl">
        <div className="grid gap-16 md:grid-cols-12">
          <aside className="md:col-span-4">
            <div className="md:sticky md:top-32">
              {/* Editorial imprint plate. Open layout instead of a card —
                  a thin Hemco-blue rail down the left edge holds the whole
                  thing together, like a typographer's specification sheet
                  rather than a SaaS data card. On the Kerning AI page,
                  the same plate gets a fluted-glass treatment via .kai-spec. */}
              <div
                className={`relative pl-7 md:pl-9 py-2${
                  isFlutedPremium ? " kai-spec" : ""
                }`}
              >
                {/* Vertical accent rail — fades at top and bottom so it
                    reads like an engraved line rather than a hard border. */}
                <span
                  aria-hidden
                  className="absolute left-0 top-1 bottom-1 w-px"
                  style={{
                    background: `linear-gradient(180deg, transparent, ${identity.accent} 14%, ${identity.accent} 86%, transparent)`,
                    opacity: 0.7,
                  }}
                />

                {/* Edition header — № 01 of the eleven-venture set */}
                <div className="flex items-baseline justify-between mb-5">
                  <p
                    className="caption data"
                    style={{ color: identity.accent, letterSpacing: "0.18em" }}
                  >
                    № 01 / 11
                  </p>
                  <p
                    className="caption"
                    style={{ color: "var(--tone-fg-mute)" }}
                  >
                    Imprint
                  </p>
                </div>

                {/* Display title — restrained, two-line serif */}
                <h2
                  className="display text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.02] mb-7"
                  style={{ color: "var(--tone-fg)" }}
                >
                  Specification
                  <br />
                  <span
                    className="display-italic opacity-60"
                    style={{ color: "var(--tone-fg)" }}
                  >
                    of the works.
                  </span>
                </h2>

                {/* Hairline above the data rows */}
                <div
                  className="h-px w-full mb-1"
                  style={{
                    background: `color-mix(in srgb, ${identity.accent} 28%, transparent)`,
                  }}
                />

                {/* Spec rows — kept in the existing mono treatment */}
                <SpecTable specs={specs} />

                {/* Engraved signature row — blue dot + Hemco · India · MCMXCVIII */}
                <div
                  className="mt-7 pt-6 flex items-center justify-between"
                  style={{
                    borderTop: `1px solid color-mix(in srgb, ${identity.accent} 28%, transparent)`,
                  }}
                >
                  <span className="flex items-center gap-2.5">
                    <span
                      aria-hidden
                      className="inline-block h-1.5 w-1.5 rounded-sm"
                      style={{ background: identity.accent }}
                    />
                    <span
                      className="caption"
                      style={{
                        color: "var(--tone-fg-mute)",
                        letterSpacing: "0.18em",
                      }}
                    >
                      Made in India
                    </span>
                  </span>
                  <span
                    className="display-italic text-[0.95rem] opacity-75"
                    style={{ color: "var(--tone-fg)" }}
                    title="1998"
                  >
                    Anno · MCMXCVIII
                  </span>
                </div>

                {/* CTAs — refined editorial links rather than pills.
                    The primary is a flat-edged stamp in the brand blue;
                    the secondary is a quiet text link with a chevron. */}
                <div className="mt-9 flex flex-col gap-1">
                  {venture.domain ? (
                    <MagneticLink
                      href={`https://${venture.domain}`}
                      external
                      className="group relative inline-flex items-center justify-between gap-4 py-4 px-5 transition-[background-color,letter-spacing] duration-500"
                      style={{
                        background: identity.accent,
                        color: "var(--color-ivory)",
                        border: `1px solid ${identity.accent}`,
                      }}
                    >
                      <span
                        className="caption"
                        style={{
                          color: "var(--color-ivory)",
                          letterSpacing: "0.22em",
                        }}
                      >
                        Visit {venture.domain}
                      </span>
                      <span
                        aria-hidden
                        className="text-[1.1rem] transition-transform duration-500 group-hover:translate-x-1.5"
                        style={{ color: "var(--color-ivory)" }}
                      >
                        →
                      </span>
                    </MagneticLink>
                  ) : (
                    <span
                      className="caption inline-flex items-center gap-2.5 py-4 px-5"
                      style={{
                        color: identity.accent,
                        border: `1px solid color-mix(in srgb, ${identity.accent} 38%, transparent)`,
                      }}
                    >
                      In development
                    </span>
                  )}
                  <MagneticLink
                    href="/contact"
                    className="group inline-flex items-center justify-between gap-4 py-4 px-5 transition-colors"
                    style={{
                      borderBottom: `1px solid color-mix(in srgb, ${identity.accent} 22%, transparent)`,
                    }}
                  >
                    <span
                      className="caption"
                      style={{
                        color: "var(--tone-fg)",
                        letterSpacing: "0.22em",
                      }}
                    >
                      Direct contact
                    </span>
                    <span
                      aria-hidden
                      className="text-[1.1rem] transition-transform duration-500 group-hover:translate-x-1.5"
                      style={{ color: identity.accent }}
                    >
                      →
                    </span>
                  </MagneticLink>
                </div>
              </div>
            </div>
          </aside>
          <div className="md:col-span-7 md:col-start-6">
            <p
              className="eyebrow mb-4"
              style={{ color: identity.accent }}
            >
              Positioning
            </p>
            <h2
              className="display-tight text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.18] mb-10"
              style={{ color: "var(--tone-fg)" }}
            >
              {venture.positioning}
            </h2>
            <p
              className="lede mb-12"
              style={{ color: "var(--tone-fg-mute)" }}
            >
              {venture.description}
            </p>
            <div
              className="h-px w-24 mb-12"
              style={{ background: identity.accent, opacity: 0.7 }}
            />
            <p
              className="eyebrow mb-4"
              style={{ color: identity.accent }}
            >
              Approach
            </p>
            <p
              className="body-sans mb-6"
              style={{ color: "var(--tone-fg-mute)" }}
            >
              {identity.approach}
            </p>
            {identity.approachContinued && (
              <p
                className="body-sans mb-6"
                style={{ color: "var(--tone-fg-mute)" }}
              >
                {identity.approachContinued}
              </p>
            )}
            {identity.approachExtra && (
              <p
                className="body-sans mb-6"
                style={{ color: "var(--tone-fg-mute)" }}
              >
                {identity.approachExtra}
              </p>
            )}
            {identity.motto && (
              <p
                className="display-italic mt-12 text-[clamp(1.25rem,2vw,1.75rem)]"
                style={{ color: identity.accent }}
              >
                “{identity.motto}”
              </p>
            )}
          </div>
        </div>
      </Section>

      {/* Capabilities — services list */}
      {identity.services.length > 0 && (
        <Section tone={identity.bodyTone} pad="xl">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <p
                className="eyebrow mb-4"
                style={{ color: identity.accent }}
              >
                Capabilities
              </p>
              <div
                className="h-px w-12 mb-7"
                style={{ background: identity.accent }}
              />
              <h2
                className="display text-[clamp(2rem,4vw,3.25rem)] leading-[1.0]"
                style={{ color: "var(--tone-fg)" }}
              >
                What {venture.wordmark}{" "}
                <span className="display-italic opacity-70">does.</span>
              </h2>
            </div>
            <ol className="md:col-span-7 md:col-start-6 space-y-0">
              {identity.services.map((s, i) => (
                <li
                  key={s.label}
                  className="grid grid-cols-[40px_1fr] gap-6 py-7"
                  style={{
                    borderTop: `1px solid color-mix(in srgb, ${identity.accent} 28%, transparent)`,
                    borderBottom:
                      i === identity.services.length - 1
                        ? `1px solid color-mix(in srgb, ${identity.accent} 28%, transparent)`
                        : "none",
                  }}
                >
                  <span
                    className="caption data pt-1"
                    style={{ color: identity.accent }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3
                      className="display-tight text-[1.25rem] mb-2"
                      style={{ color: "var(--tone-fg)" }}
                    >
                      {s.label}
                    </h3>
                    <p
                      className="body-sans text-[15px]"
                      style={{ color: "var(--tone-fg-mute)" }}
                    >
                      {s.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Section>
      )}

      {/* Values panel — Hemco's signature blue field with the brand values
          listed as a numbered grid. Lifted directly from the brand book. */}
      {identity.values && identity.values.items.length > 0 && (
        <section
          className="relative overflow-hidden"
          style={{
            background: `
              radial-gradient(80% 90% at 20% 0%, ${identity.accentSoft}33 0%, transparent 60%),
              radial-gradient(70% 80% at 90% 100%, ${identity.accent}55 0%, transparent 60%),
              linear-gradient(160deg, ${identity.accentDeep} 0%, ${identity.accent} 60%, ${identity.accentDeep} 100%)
            `,
          }}
        >
          {/* Vertical line texture — echoes the polished-metal striation
              motif from the brand book's gradient pages. */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none mix-blend-overlay"
            style={{
              background:
                "repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0 1px, transparent 1px 6px)",
              opacity: 0.55,
            }}
          />
          <div className="shell relative" style={{ paddingTop: "clamp(7rem,14vh,11rem)", paddingBottom: "clamp(7rem,14vh,11rem)" }}>
            <div className="grid gap-14 md:grid-cols-12 md:gap-12">
              <div className="md:col-span-5">
                <p
                  className="eyebrow mb-4"
                  style={{ color: "rgba(255,255,255,0.78)" }}
                >
                  {identity.values.sectionEyebrow}
                </p>
                <div
                  className="h-px w-12 mb-7"
                  style={{ background: "rgba(255,255,255,0.55)" }}
                />
                <h2 className="display text-[clamp(2.25rem,4.4vw,3.75rem)] leading-[1.0] mb-8 text-white">
                  {identity.values.sectionTitle}
                </h2>
                <p
                  className="lede max-w-md"
                  style={{ color: "rgba(255,255,255,0.88)" }}
                >
                  {identity.values.intro}
                </p>
              </div>
              <ol className="md:col-span-7">
                {identity.values.items.map((v, i) => (
                  <li
                    key={v.label}
                    className="grid grid-cols-[44px_1fr] gap-5 py-6"
                    style={{
                      borderTop: "1px solid rgba(255,255,255,0.22)",
                      borderBottom:
                        i === identity.values!.items.length - 1
                          ? "1px solid rgba(255,255,255,0.22)"
                          : "none",
                    }}
                  >
                    <span
                      className="caption data pt-1"
                      style={{ color: "rgba(255,255,255,0.78)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="display-tight text-[1.25rem] mb-1.5 text-white">
                        {v.label}
                      </h3>
                      <p
                        className="body-sans text-[15px]"
                        style={{ color: "rgba(255,255,255,0.82)" }}
                      >
                        {v.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      )}

      {/* Contact band */}
      <Section tone={identity.bodyTone} pad="lg">
        <div
          className="rounded-[6px] p-10 md:p-14 text-center max-w-3xl mx-auto"
          style={{
            background:
              "color-mix(in srgb, var(--tone-fg) 5%, transparent)",
            border: `1px solid color-mix(in srgb, ${identity.accent} 32%, transparent)`,
          }}
        >
          <p
            className="eyebrow mb-4"
            style={{ color: identity.accent }}
          >
            Direct
          </p>
          <p
            className="lede mb-8"
            style={{ color: "var(--tone-fg)" }}
          >
            For specifications, partnership enquiries, or to commission a
            project — write to us.
          </p>
          <a
            className="display text-[clamp(1.25rem,2.4vw,2rem)] hover:opacity-80 transition-opacity"
            style={{ color: identity.accent }}
            href={`mailto:hello@hemcogroup.com?subject=${encodeURIComponent(
              venture.name,
            )}`}
          >
            hello@hemcogroup.com
          </a>
        </div>
      </Section>

      {/* Peers / continue */}
      {peers.length > 0 && (
        <Section tone={identity.bodyTone} pad="xl">
          <p
            className="eyebrow mb-6"
            style={{ color: identity.accent }}
          >
            {sector ? `Also in ${sector.name}` : "Also in the group"}
          </p>
          <div
            className="h-px w-24 mb-12"
            style={{ background: identity.accent, opacity: 0.7 }}
          />
          <div className="grid gap-6 md:grid-cols-3">
            {peers.slice(0, 3).map((v) => {
              const pImg = imagery[v.imagery];
              const peerId = ventureIdentity[v.slug] ?? defaultIdentity;
              return (
                <Link
                  key={v.slug}
                  href={`/ventures/${v.slug}`}
                  className="group block"
                >
                  <div
                    className="relative aspect-[4/5] overflow-hidden mb-5"
                    style={{ background: "var(--color-ivory-2)" }}
                  >
                    <Image
                      src={pImg.src}
                      alt={pImg.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      style={{ filter: "saturate(0.88) contrast(1.04)" }}
                    />
                    <div
                      className="absolute inset-0 transition-opacity duration-700 opacity-0 group-hover:opacity-100"
                      style={{
                        background: `linear-gradient(180deg, transparent 50%, ${peerId.accentDeep})`,
                      }}
                    />
                  </div>
                  <p
                    className="caption mb-2"
                    style={{ color: peerId.accent }}
                  >
                    {v.sector}
                  </p>
                  <h3
                    className="display text-[1.65rem] leading-tight mb-2"
                    style={{ color: "var(--tone-fg)" }}
                  >
                    {v.name}
                  </h3>
                  <p
                    className="body-sans"
                    style={{ color: "var(--tone-fg-mute)" }}
                  >
                    {v.tagline}
                  </p>
                </Link>
              );
            })}
          </div>
          {sector && (
            <div className="mt-16">
              <MagneticLink
                href={`/sectors/${sector.slug}`}
                className="btn btn-secondary"
              >
                All of {sectors[sector.slug].name}
              </MagneticLink>
            </div>
          )}
        </Section>
      )}
    </div>
  );
}
