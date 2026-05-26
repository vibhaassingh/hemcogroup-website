import Link from "next/link";
import { sectorOrder, sectors, venturesInSector } from "@/content/sectors";
import { Wordmark } from "./wordmark";
import { GoldRule } from "@/components/ui/section";
import { MagneticLink } from "@/components/ui/magnetic-link";
import { ventures } from "@/content/ventures";

const worldLinks = [
  { href: "/world/story", label: "Our story" },
  { href: "/world/journal", label: "Journal" },
];

const corpLinks = [
  { href: "/careers", label: "Careers" },
  { href: "/investors", label: "Investors" },
  { href: "/contact", label: "Contact" },
];

// Sister sites — surfaces venture domains for cross-domain authority
// signals (visible siblings in the corporate graph for crawlers and
// human readers alike). Pulled from the ventures module so the list
// stays in sync.
const sisterSites = ventures
  .filter((v) => v.domain)
  .map((v) => ({
    name: v.name,
    url: `https://${v.domain}`,
    label: v.domain as string,
  }));

const socialSameAs = [
  { label: "LinkedIn", url: "https://www.linkedin.com/company/hemcogroup" },
  { label: "Instagram", url: "https://www.instagram.com/hemcokitchens" },
  { label: "Facebook", url: "https://www.facebook.com/hemcokitchens" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      data-tone="forest"
      className="relative"
      style={{ background: "var(--color-forest-900)", color: "var(--color-mist)" }}
    >
      <div className="shell pt-28 pb-10 md:pt-36">
        <GoldRule className="mb-16" variant="solid" />

        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <div style={{ color: "var(--color-gold-300)" }}>
              <Wordmark size="lg" />
            </div>
            <p
              className="measure mt-9 lede"
              style={{ color: "var(--color-mist)" }}
            >
              A privately held industrial group from India. Thirteen
              brands across seven sectors. A house of industries, built in
              India.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <MagneticLink href="/contact" className="btn btn-gold">
                Get in touch
              </MagneticLink>
              <MagneticLink href="/sectors" className="btn btn-secondary">
                Explore the group
              </MagneticLink>
            </div>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow mb-5" style={{ color: "var(--color-gold-300)" }}>
              Sectors
            </p>
            <ul className="space-y-3 text-[14px]">
              {sectorOrder.map((s) => (
                <li key={s}>
                  <Link
                    href={`/sectors/${s}`}
                    className="transition-colors hover:text-[color:var(--color-gold-300)]"
                  >
                    {sectors[s].name}
                    <span className="ml-2 caption opacity-50">
                      {venturesInSector(s).length}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="eyebrow mb-5" style={{ color: "var(--color-gold-300)" }}>
              World of Hemco
            </p>
            <ul className="space-y-3 text-[14px] mb-9">
              {worldLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="transition-colors hover:text-[color:var(--color-gold-300)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="eyebrow mb-5" style={{ color: "var(--color-gold-300)" }}>
              Corporate
            </p>
            <ul className="space-y-3 text-[14px]">
              {corpLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="transition-colors hover:text-[color:var(--color-gold-300)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow mb-5" style={{ color: "var(--color-gold-300)" }}>
              Headquarters
            </p>
            {/* Use <address> for semantic NAP (Name, Address, Phone) —
                helps Google's entity resolver disambiguate the org. */}
            <address
              className="text-[14px] leading-[1.7] not-italic"
              itemScope
              itemType="https://schema.org/Organization"
            >
              <span itemProp="name">Hemco Group</span>
              <br />
              <span
                itemProp="address"
                itemScope
                itemType="https://schema.org/PostalAddress"
              >
                <span itemProp="addressCountry">India</span>
              </span>
            </address>
            <p className="eyebrow mb-3 mt-9" style={{ color: "var(--color-gold-300)" }}>
              Direct
            </p>
            <ul className="space-y-2 text-[13px]">
              <li>
                General ·{" "}
                <a
                  className="gold-underline-hover"
                  style={{ color: "var(--color-gold-300)" }}
                  href="mailto:hello@hemcogroup.com"
                >
                  hello@hemcogroup.com
                </a>
              </li>
              <li>
                Press ·{" "}
                <a
                  className="gold-underline-hover"
                  style={{ color: "var(--color-gold-300)" }}
                  href="mailto:press@hemcogroup.com"
                >
                  press@hemcogroup.com
                </a>
              </li>
              <li>
                Careers ·{" "}
                <a
                  className="gold-underline-hover"
                  style={{ color: "var(--color-gold-300)" }}
                  href="mailto:careers@hemcogroup.com"
                >
                  careers@hemcogroup.com
                </a>
              </li>
            </ul>
            <p className="eyebrow mb-3 mt-9" style={{ color: "var(--color-gold-300)" }}>
              Elsewhere
            </p>
            <ul className="space-y-2 text-[13px]">
              {socialSameAs.map((s) => (
                <li key={s.url}>
                  <a
                    className="gold-underline-hover"
                    style={{ color: "var(--color-gold-300)" }}
                    href={s.url}
                    rel="me noopener"
                    target="_blank"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sister sites — visible cross-domain authority graph. Each
            venture domain is rel="me" so crawlers read the corporate
            family as one entity. */}
        <div
          className="mt-20 pt-10"
          style={{
            borderTop: "1px solid color-mix(in srgb, var(--color-gold-500) 22%, transparent)",
          }}
        >
          <p className="eyebrow mb-5" style={{ color: "var(--color-gold-300)" }}>
            Sister sites · The wider house
          </p>
          <ul className="grid grid-cols-2 gap-x-8 gap-y-3 text-[13px] md:grid-cols-3 lg:grid-cols-4">
            {sisterSites.map((s) => (
              <li key={s.url} className="flex items-baseline gap-2">
                <span className="opacity-80">{s.name}</span>
                <span className="opacity-30" aria-hidden>
                  ·
                </span>
                <a
                  className="gold-underline-hover"
                  style={{ color: "var(--color-gold-300)" }}
                  href={s.url}
                  rel="me noopener"
                  target="_blank"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="mt-16 flex flex-col items-start justify-between gap-3 pt-7 caption md:flex-row md:items-center"
          style={{
            borderTop: "1px solid color-mix(in srgb, var(--color-gold-500) 30%, transparent)",
            color: "var(--color-mist-2)",
          }}
        >
          <p>© {year} Hemco Group · India · Since 1998</p>
          <p>Privately held · All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
