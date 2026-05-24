import type { Metadata } from "next";
import { Reveal } from "@/components/ui/reveal";
import { Section, GoldRule } from "@/components/ui/section";
import { ventures } from "@/content/ventures";
import { sectorOfVenture } from "@/content/sectors";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Build with Hemco Group across twelve operating brands and seven sectors. Open roles, the working culture, and how to apply at hemco.ooo, kerningai.eu, studio.kerning.ooo and more.",
  alternates: { canonical: "/careers" },
  openGraph: {
    title: "Careers · Hemco Group",
    description: "Build with us, across twelve brands.",
    url: "/careers",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers · Hemco Group",
    description: "Build with us, across twelve brands.",
  },
};

export default function CareersPage() {
  const hiring = ventures.filter((v) => v.status === "Operational");

  return (
    <>
      <Section tone="ivory" pad="xl">
        <div className="pt-24 md:pt-32">
          <Reveal>
            <p className="eyebrow mb-9">Careers</p>
          </Reveal>
          <h1 className="display max-w-[20ch] text-[clamp(2.5rem,6.4vw,5.75rem)] leading-[0.96]">
            Build with us,{" "}
            <span className="display-italic opacity-60">
              across twelve brands.
            </span>
          </h1>
          <Reveal delay={0.2}>
            <p className="lede measure-wide mt-10 opacity-80">
              We hire across engineering, design, operations, research and
              craft. Roles open across Hemco Group brands — write to us
              even if you don&apos;t see the exact fit. Our hiring landscape
              moves quickly.
            </p>
          </Reveal>
          <GoldRule className="mt-16 w-24" variant="solid" />
        </div>
      </Section>

      <Section tone="ivory" pad="xl">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <p
              className="caption mb-6"
              style={{ color: "var(--color-gold-500)" }}
            >
              Hiring houses
            </p>
            <h2 className="display text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.05]">
              Where you&apos;d sit.
            </h2>
          </div>
          <div className="md:col-span-8">
            <ol
              style={{
                borderTop:
                  "1px solid color-mix(in srgb, var(--color-ink) 16%, transparent)",
              }}
            >
              {hiring.map((v, i) => {
                const sec = sectorOfVenture(v.slug);
                return (
                  <Reveal key={v.slug} delay={i * 0.04}>
                    <li
                      className="grid grid-cols-12 gap-6 py-7"
                      style={{
                        borderBottom:
                          "1px solid color-mix(in srgb, var(--color-ink) 14%, transparent)",
                      }}
                    >
                      <span className="col-span-12 md:col-span-5">
                        <span className="display block text-[clamp(1.35rem,2vw,1.75rem)] leading-[1.1]">
                          {v.name}
                        </span>
                        <span
                          className="caption mt-2 block"
                          style={{ color: "var(--color-gold-500)" }}
                        >
                          {sec?.name ?? v.sector}
                        </span>
                      </span>
                      <span className="col-span-12 body-sans opacity-75 md:col-span-7">
                        {v.tagline}
                      </span>
                    </li>
                  </Reveal>
                );
              })}
            </ol>
          </div>
        </div>
      </Section>

      <Section tone="forest" pad="xl">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <p
              className="caption mb-6"
              style={{ color: "var(--color-gold-500)" }}
            >
              Open application
            </p>
            <h2
              className="display text-[clamp(2.25rem,4.6vw,4rem)] leading-[1.0]"
              style={{ color: "var(--color-mist)" }}
            >
              Don&apos;t see your role?{" "}
              <span
                className="display-italic"
                style={{ color: "var(--color-gold-300)" }}
              >
                Write anyway.
              </span>
            </h2>
          </div>
          <div className="md:col-span-5 md:flex md:flex-col md:justify-end">
            <p
              className="measure body-sans"
              style={{ color: "var(--color-mist)" }}
            >
              Tell us which venture draws you in, and what you&apos;d build if
              you joined.
            </p>
            <a
              href="mailto:careers@hemcogroup.com"
              className="btn btn-gold mt-8 self-start"
            >
              careers@hemcogroup.com
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
