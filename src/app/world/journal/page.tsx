import type { Metadata } from "next";
import Link from "next/link";
import { Section, GoldRule } from "@/components/ui/section";
import { journal } from "@/content/journal";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Notes from the works, in our own words. Announcements, essays and dispatches from Hemco Group and its eleven operating brands.",
  alternates: { canonical: "/world/journal" },
  openGraph: {
    title: "Journal · Hemco Group",
    description: "Notes from the works, in our own words.",
    url: "/world/journal",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Journal · Hemco Group",
    description: "Notes from the works, in our own words.",
  },
};

export default function JournalIndex() {
  const featured = journal[0];
  const rest = journal.slice(1);
  return (
    <>
      <Section tone="ivory" pad="xl">
        <div className="pt-24 md:pt-32 mb-20">
          <p className="eyebrow mb-7">Journal</p>
          <h1 className="display text-[clamp(3rem,8vw,7rem)] mb-10 leading-[0.96]">
            Notes from the works,
            <br />
            <span className="display-italic opacity-60">in our own words.</span>
          </h1>
          <GoldRule className="w-24" variant="solid" />
        </div>

        {featured && (
          <Link
            href={`/world/journal/${featured.slug}`}
            className="group block mb-24"
          >
            <p
              className="caption mb-4"
              style={{ color: "var(--color-gold-500)" }}
            >
              Latest · {featured.category} · {featured.date}
            </p>
            <h2 className="display text-[clamp(2.25rem,5.6vw,4.5rem)] leading-[1.0] mb-6 max-w-5xl group-hover:text-[color:var(--color-forest-700)] transition-colors">
              {featured.title}
            </h2>
            <p className="lede max-w-3xl opacity-80">{featured.dek}</p>
            <span
              className="caption mt-6 inline-flex items-center gap-2 group-hover:text-[color:var(--color-gold-500)] transition-colors"
            >
              Read note <span aria-hidden>→</span>
            </span>
          </Link>
        )}

        <GoldRule className="mb-16" variant="tone" />

        <div className="grid gap-x-12 gap-y-20 md:grid-cols-2">
          {rest.map((entry) => (
            <Link
              key={entry.slug}
              href={`/world/journal/${entry.slug}`}
              className="group block"
            >
              <div className="flex items-center justify-between mb-5">
                <span
                  className="caption"
                  style={{ color: "var(--color-gold-500)" }}
                >
                  {entry.category}
                </span>
                <span className="caption data opacity-60">{entry.date}</span>
              </div>
              <h3 className="display text-[clamp(1.5rem,2.4vw,2.25rem)] leading-[1.05] mb-4 group-hover:text-[color:var(--color-forest-700)] transition-colors">
                {entry.title}
              </h3>
              <p className="body-sans opacity-75">{entry.dek}</p>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
