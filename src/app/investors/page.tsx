import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { Section, GoldRule } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Investors & Partnerships",
  description:
    "Hemco Group is a privately held industrial group from India. Investor relations, strategic partnerships, and alliance enquiries for the group and its twelve operating brands.",
  alternates: { canonical: "/investors" },
  openGraph: {
    title: "Investors & Partnerships · Hemco Group",
    description:
      "Investor relations, strategic partnerships and alliance enquiries for Hemco Group.",
    url: "/investors",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Investors & Partnerships · Hemco Group",
    description: "A privately held operating house. Strategic partnerships and alliance enquiries.",
  },
};

export default function InvestorsPage() {
  return (
    <>
      <Section tone="ivory" pad="xl">
        <div className="pt-24 md:pt-32">
          <Reveal>
            <p className="eyebrow mb-9">Investors & Partnerships</p>
          </Reveal>
          <h1 className="display max-w-[18ch] text-[clamp(2.5rem,6.4vw,5.75rem)] leading-[0.96]">
            A privately held{" "}
            <span className="display-italic opacity-60">operating house.</span>
          </h1>
          <Reveal delay={0.2}>
            <p className="lede measure-wide mt-10 opacity-80">
              Hemco Group is closely held and funds growth from internal
              accruals. We do, selectively, explore strategic capital, joint
              ventures, and distribution partnerships across specific
              brands — particularly Kerning AI, Keystonne, and Lumonn.
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
              How we work
            </p>
          </div>
          <div className="md:col-span-8">
            <div className="measure-wide space-y-7 body-sans opacity-85">
              <p>
                Conversations begin in person, in India or wherever the
                venture in question is based. We move slowly on capital
                decisions and quickly on operational ones — and we expect
                partners to do the same.
              </p>
              <p>
                We do not, as a rule, discuss specific transactions in public.
                For confidential conversations, please write to the corporate
                desk and one of us will reply.
              </p>
            </div>
            <Link
              href="mailto:corporate@hemcogroup.com"
              className="btn btn-primary mt-12"
            >
              corporate@hemcogroup.com
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
