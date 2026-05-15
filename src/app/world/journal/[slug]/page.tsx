import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/ui/reveal";
import { NewsCard } from "@/components/ui/news-card";
import { Section, GoldRule } from "@/components/ui/section";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { journal, journalBySlug } from "@/content/journal";

export function generateStaticParams() {
  return journal.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = journalBySlug[slug];
  if (!entry) return {};
  const url = `/world/journal/${entry.slug}`;
  return {
    title: entry.title,
    description: entry.dek,
    alternates: { canonical: url },
    openGraph: {
      title: entry.title,
      description: entry.dek,
      url,
      type: "article",
      siteName: "Hemco Group",
      publishedTime: entry.date,
      authors: entry.byline ? [entry.byline] : ["Hemco Group"],
      section: entry.category,
    },
    twitter: {
      card: "summary_large_image",
      title: entry.title,
      description: entry.dek,
    },
  };
}

export default async function JournalEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = journalBySlug[slug];
  if (!entry) notFound();

  const related = (entry.related ?? [])
    .map((s) => journalBySlug[s])
    .filter(Boolean);
  const fallback = journal.filter((j) => j.slug !== entry.slug).slice(0, 3);
  const recommended = (related.length ? related : fallback).slice(0, 3);

  const SITE_URL = "https://hemcogroup.com";
  const entryUrl = `${SITE_URL}/world/journal/${entry.slug}`;
  // Journal dates ship as "YYYY.MM" — turn into ISO 8601 for schema.
  const [yy, mm] = entry.date.split(".").map(Number);
  const isoDate = yy && mm ? new Date(Date.UTC(yy, mm - 1, 1)).toISOString() : undefined;
  const articleBody = entry.body.join("\n\n");

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Hemco Group", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "World", item: `${SITE_URL}/world` },
      { "@type": "ListItem", position: 3, name: "Journal", item: `${SITE_URL}/world/journal` },
      { "@type": "ListItem", position: 4, name: entry.title, item: entryUrl },
    ],
  };
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "@id": entryUrl,
    mainEntityOfPage: entryUrl,
    headline: entry.title,
    description: entry.dek,
    articleSection: entry.category,
    articleBody,
    datePublished: isoDate,
    dateModified: isoDate,
    author: {
      "@type": entry.byline ? "Organization" : "Organization",
      name: entry.byline ?? "Hemco Group",
    },
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-IN",
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <ScrollProgress />
      <Section tone="ivory" pad="lg">
        <div className="pt-24 md:pt-32 max-w-[1100px] mx-auto">
          <Reveal>
            <Link
              href="/world/journal"
              className="caption mb-10 inline-block"
              style={{ color: "var(--color-gold-500)" }}
            >
              ← Back to journal
            </Link>
          </Reveal>
          <Reveal delay={0.05}>
            <p
              className="caption mb-9"
              style={{ color: "var(--color-gold-500)" }}
            >
              {entry.category} · <span className="data opacity-70">{entry.date}</span>
            </p>
          </Reveal>
          <h1 className="display max-w-[22ch] text-[clamp(2.5rem,5.8vw,5rem)] leading-[1.0]">
            {entry.title}
          </h1>
          <Reveal delay={0.18}>
            <p className="lede mt-9 max-w-3xl opacity-80">{entry.dek}</p>
          </Reveal>
          {entry.byline && (
            <Reveal delay={0.3}>
              <p className="caption mt-12 opacity-65">By {entry.byline}</p>
            </Reveal>
          )}
          <GoldRule className="mt-16 w-24" variant="solid" />
        </div>
      </Section>

      <Section tone="ivory" pad="lg">
        <div className="max-w-[1100px] mx-auto grid gap-12 md:grid-cols-12">
          <aside className="md:col-span-3">
            <div className="md:sticky md:top-32 space-y-7">
              <div
                className="pt-5"
                style={{
                  borderTop:
                    "1px solid color-mix(in srgb, var(--color-ink) 18%, transparent)",
                }}
              >
                <p className="caption opacity-65">Filed</p>
                <p className="data mt-2">{entry.date}</p>
              </div>
              <div
                className="pt-5"
                style={{
                  borderTop:
                    "1px solid color-mix(in srgb, var(--color-ink) 18%, transparent)",
                }}
              >
                <p className="caption opacity-65">Category</p>
                <p className="mt-2">{entry.category}</p>
              </div>
              <div
                className="pt-5"
                style={{
                  borderTop:
                    "1px solid color-mix(in srgb, var(--color-ink) 18%, transparent)",
                }}
              >
                <p className="caption opacity-65">Share</p>
                <p className="body-sans mt-2 opacity-75 text-[14px]">
                  Quote freely — credit Hemco Group.
                </p>
              </div>
            </div>
          </aside>
          <div className="md:col-span-9">
            <article className="space-y-7 body-sans opacity-85">
              {entry.body.map((para, i) => (
                <p key={i} className="measure-wide">
                  {para}
                </p>
              ))}
            </article>
            <div
              className="mt-16 pt-8"
              style={{
                borderTop:
                  "1px solid color-mix(in srgb, var(--color-ink) 18%, transparent)",
              }}
            >
              <p className="caption mb-2" style={{ color: "var(--color-gold-500)" }}>
                For press
              </p>
              <p className="body-sans opacity-75">
                Quotes, interviews and additional context — write to{" "}
                <a
                  href="mailto:press@hemcogroup.com"
                  className="gold-underline-hover"
                  style={{ color: "var(--color-forest-700)" }}
                >
                  press@hemcogroup.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="ivory" pad="xl">
        <div className="mb-12 flex items-end justify-between">
          <h2 className="display text-[clamp(1.75rem,2.6vw,2.25rem)]">
            Continue reading
          </h2>
          <Link
            href="/world/journal"
            className="caption"
            style={{ color: "var(--color-gold-500)" }}
          >
            All notes →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {recommended.map((e, i) => (
            <NewsCard key={e.slug} entry={e} index={i} />
          ))}
        </div>
      </Section>
    </>
  );
}
