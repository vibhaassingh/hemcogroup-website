import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { Section, GoldRule } from "@/components/ui/section";
import { MagneticLink } from "@/components/ui/magnetic-link";
import { ToneBridge } from "@/components/ui/tone-bridge";
import { leadership, type LeaderEntry } from "@/content/leadership";

const SITE_URL = "https://hemcogroup.com";

export const metadata: Metadata = {
  title: "Leadership",
  description:
    "The leadership of Hemco Group — Vishal Singh, Chairman, and Vibhaas Singh, Vice Chairman. Two chairs, one house of thirteen brands.",
  alternates: { canonical: "/leadership" },
  openGraph: {
    title: "Leadership · Hemco Group",
    description: "Two chairs, one house of thirteen brands.",
    url: "/leadership",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Leadership · Hemco Group",
    description: "Two chairs, one house of thirteen brands.",
  },
};

const leadershipSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Hemco Group leadership",
  itemListElement: leadership.map((person, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Person",
      name: person.name,
      jobTitle: person.role,
      image: `${SITE_URL}${person.portrait}`,
      worksFor: { "@id": `${SITE_URL}/#organization` },
    },
  })),
};

function Portrait({
  leader,
  caption,
}: {
  leader: LeaderEntry;
  caption: string;
}) {
  return (
    <Reveal>
      <div className="relative aspect-[3/4] overflow-hidden rounded-[22px] md:rounded-[26px]">
        <Image
          src={leader.portrait}
          alt={leader.alt}
          fill
          sizes="(min-width: 768px) 40vw, 100vw"
          className="object-cover"
          style={{
            filter: "grayscale(1) contrast(1.06)",
            objectPosition: leader.objectPosition,
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[22px] md:rounded-[26px]"
          style={{
            boxShadow:
              "inset 0 0 0 1px color-mix(in srgb, var(--tone-fg) 14%, transparent)",
          }}
        />
      </div>
      <figcaption
        className="mt-4 text-[10.5px] font-medium uppercase tracking-[0.24em]"
        style={{ color: "var(--tone-fg-mute)" }}
      >
        {caption}
      </figcaption>
    </Reveal>
  );
}

export default function LeadershipPage() {
  const [chairman, viceChairman] = leadership;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(leadershipSchema) }}
      />

      {/* Hero — typographic opening, careers-style */}
      <Section tone="ivory" pad="xl">
        <div className="pt-24 md:pt-32">
          <Reveal>
            <p className="eyebrow mb-9">Leadership</p>
          </Reveal>
          <h1 className="display max-w-[20ch] text-[clamp(2.5rem,6.4vw,5.75rem)] leading-[0.96]">
            One house,{" "}
            <span className="display-italic opacity-60">two chairs.</span>
          </h1>
          <Reveal delay={0.2}>
            <p className="lede measure-wide mt-10 opacity-80">
              The chairman built the works. The vice chairman builds what the
              works make possible. Between them sits every brand in the house —
              from the 1998 kitchens to the newest defence practice.
            </p>
          </Reveal>
          <GoldRule className="mt-16 w-24" variant="solid" />
        </div>
      </Section>

      {/* Spread 01 — Chairman, portrait left */}
      <Section tone="ivory" pad="xl">
        <div className="grid items-center gap-12 md:grid-cols-12 md:gap-16">
          <figure className="md:col-span-5">
            <Portrait
              leader={chairman}
              caption={`${chairman.name} · ${chairman.role} · Since 1998`}
            />
          </figure>
          <div className="md:col-span-6 md:col-start-7">
            <Reveal>
              <p
                className="caption data mb-6"
                style={{ color: "var(--color-gold-500)" }}
              >
                01 · {chairman.role}
              </p>
            </Reveal>
            <h2 className="display text-[clamp(2.25rem,4.6vw,4rem)] leading-[1.0]">
              {chairman.name}
            </h2>
            <GoldRule className="mt-7 w-16" variant="solid" />
            <Reveal delay={0.15}>
              <p className="lede mt-8 opacity-80">{chairman.bio}</p>
            </Reveal>
            <Reveal delay={0.25}>
              <p
                className="caption mt-8"
                style={{ color: "var(--color-gold-500)" }}
              >
                Hemco Kitchens · Est. 1998 · The original works
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Spread 02 — Vice Chairman, portrait right, warm-ivory */}
      <Section tone="warm-ivory" pad="xl">
        <div className="grid items-center gap-12 md:grid-cols-12 md:gap-16">
          <div className="order-2 md:order-1 md:col-span-6">
            <Reveal>
              <p
                className="caption data mb-6"
                style={{ color: "var(--color-gold-500)" }}
              >
                02 · {viceChairman.role}
              </p>
            </Reveal>
            <h2 className="display text-[clamp(2.25rem,4.6vw,4rem)] leading-[1.0]">
              {viceChairman.name}
            </h2>
            <GoldRule className="mt-7 w-16" variant="solid" />
            <Reveal delay={0.15}>
              <p className="lede mt-8 opacity-80">{viceChairman.bio}</p>
            </Reveal>
            <Reveal delay={0.25}>
              <p
                className="caption mt-8"
                style={{ color: "var(--color-gold-500)" }}
              >
                Kerning Studio · Kerning AI · Consortium · Defence &amp;
                Robotics · Architecture &amp; Design · Voltverse
              </p>
            </Reveal>
          </div>
          <figure className="order-1 md:order-2 md:col-span-5 md:col-start-8">
            <Portrait
              leader={viceChairman}
              caption={`${viceChairman.name} · ${viceChairman.role}`}
            />
          </figure>
        </div>
      </Section>

      {/* Closer — forest band */}
      <ToneBridge from="warm-ivory" to="forest" />
      <Section tone="forest" pad="xl">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <p
              className="caption mb-6"
              style={{ color: "var(--color-gold-500)" }}
            >
              The long conversation
            </p>
            <h2
              className="display text-[clamp(2.25rem,4.6vw,4rem)]"
              style={{ color: "var(--color-mist)" }}
            >
              A house this size answers{" "}
              <span
                className="display-italic"
                style={{ color: "var(--color-gold-300)" }}
              >
                to its people.
              </span>
            </h2>
          </div>
          <div className="md:col-span-5 md:flex md:flex-col md:justify-end">
            <p
              className="measure body-sans"
              style={{ color: "var(--color-mist)" }}
            >
              For partnerships, ventures, or anything that needs a chair&apos;s
              attention — write to us and we&apos;ll route it to the right desk.
            </p>
            <div className="mt-8">
              <MagneticLink href="/contact" className="btn btn-gold">
                Get in touch
              </MagneticLink>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
