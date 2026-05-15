import type { Metadata } from "next";
import { Reveal } from "@/components/ui/reveal";
import { Section, GoldRule } from "@/components/ui/section";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Hemco Group HQ in India, or write to a specific venture's desk — general, careers, press, corporate, or foundation.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact · Hemco Group",
    description:
      "Talk to the right desk — general, careers, press, corporate or foundation enquiries.",
    url: "/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact · Hemco Group",
    description: "General, careers, press, corporate, foundation.",
  },
};

const routes = [
  { label: "General enquiries", email: "hello@hemcogroup.com" },
  { label: "Careers", email: "careers@hemcogroup.com" },
  { label: "Press & media", email: "press@hemcogroup.com" },
  { label: "Corporate & partnerships", email: "corporate@hemcogroup.com" },
  { label: "Foundation", email: "foundation@hemcogroup.com" },
];

export default function ContactPage() {
  return (
    <>
      <Section tone="ivory" pad="xl">
        <div className="pt-24 md:pt-32">
          <Reveal>
            <p className="eyebrow mb-9">Contact</p>
          </Reveal>
          <h1 className="display max-w-[16ch] text-[clamp(2.5rem,6.4vw,5.75rem)] leading-[0.96]">
            Talk to the{" "}
            <span className="display-italic opacity-60">right desk.</span>
          </h1>
          <Reveal delay={0.2}>
            <p className="lede measure-wide mt-10 opacity-80">
              Hemco Group is headquartered in India. Send a note
              below — we&apos;ll route it to the right desk inside the group
              and reply from there.
            </p>
          </Reveal>
          <GoldRule className="mt-16 w-24" variant="solid" />
        </div>
      </Section>

      <Section tone="ivory" pad="xl">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <p
              className="caption mb-3"
              style={{ color: "var(--color-gold-500)" }}
            >
              Headquarters
            </p>
            <p className="display text-[1.5rem] leading-tight">Hemco Group</p>
            <p className="body-sans mt-2 opacity-75">
              India
            </p>
            <p
              className="caption mt-10 mb-3"
              style={{ color: "var(--color-gold-500)" }}
            >
              Office hours
            </p>
            <p className="body-sans opacity-75">
              Monday — Saturday
              <br />
              10:00 to 18:30 IST
            </p>

            <p
              className="caption mt-10 mb-4"
              style={{ color: "var(--color-gold-500)" }}
            >
              Or write directly
            </p>
            <ul
              style={{
                borderTop:
                  "1px solid color-mix(in srgb, var(--color-ink) 18%, transparent)",
              }}
            >
              {routes.map((r) => (
                <li
                  key={r.email}
                  className="grid grid-cols-12 items-baseline gap-4 py-5"
                  style={{
                    borderBottom:
                      "1px solid color-mix(in srgb, var(--color-ink) 14%, transparent)",
                  }}
                >
                  <span className="caption col-span-12 opacity-65 md:col-span-5">
                    {r.label}
                  </span>
                  <a
                    href={`mailto:${r.email}`}
                    className="gold-underline-hover col-span-12 mono text-[13.5px] md:col-span-7"
                    style={{ color: "var(--color-forest-700)" }}
                  >
                    {r.email}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-7">
            <p
              className="caption mb-7"
              style={{ color: "var(--color-gold-500)" }}
            >
              Send a note
            </p>
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}
