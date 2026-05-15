import type { Metadata } from "next";
import { Inter, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@/components/measurement/google-analytics";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { BrandRibbon } from "@/components/layout/brand-ribbon";
import { CursorOrb } from "@/components/ui/cursor-orb";
import { LoaderCurtain } from "@/components/ui/loader-curtain";
import { ventures } from "@/content/ventures";

const SITE_URL = "https://hemcogroup.com";
const SITE_NAME = "Hemco Group";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  axes: ["opsz", "SOFT"],
});

const mono = Geist_Mono({
  variable: "--font-mono-geist",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hemcogroup.com"),
  title: {
    default: "Hemco Group — A house of industries, built in India",
    template: "%s · Hemco Group",
  },
  description:
    "Hemco Group is a privately held industrial group from India, founded in 1998. Eleven operating brands across culinary, design, intelligence, hospitality, sovereign, legal and philanthropic sectors — including Hemco Kitchens, Kerning AI, Keystonne, Consortium, Lumonn, Cronuss Associates and MVV Foundation.",
  applicationName: "Hemco Group",
  authors: [{ name: "Hemco Group", url: "https://hemcogroup.com" }],
  creator: "Hemco Group",
  publisher: "Hemco Group",
  category: "Industrial holding company",
  keywords: [
    "Hemco Group",
    "Indian industrial group",
    "holding company India",
    "Hemco Kitchens",
    "Kerning AI",
    "Keystonne",
    "Lumonn",
    "Consortium",
    "Cronuss Associates",
    "MVV Foundation",
    "commercial kitchens India",
    "Industry 5.0 platform",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "Hemco Group",
    title: "Hemco Group — A house of industries, built in India",
    description:
      "A privately held industrial group from India. Eleven brands, seven sectors, twenty-eight years.",
    url: "https://hemcogroup.com",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hemco Group — A house of industries",
    description:
      "Eleven brands across seven sectors. Privately held, built in India since 1998.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_TOKEN,
    ...(process.env.NEXT_PUBLIC_BING_TOKEN && {
      other: { "msvalidate.01": process.env.NEXT_PUBLIC_BING_TOKEN },
    }),
  },
};

const subOrganizations = ventures
  .filter((v) => v.domain)
  .map((v) => ({
    "@type": "Organization",
    name: v.name,
    url: `https://${v.domain}`,
    description: v.positioning,
  }));

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Corporation",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: "Hemco",
  legalName: "Hemco Group",
  url: SITE_URL,
  logo: `${SITE_URL}/brand/logo.svg`,
  image: `${SITE_URL}/brand/hemco-hero.jpg`,
  description:
    "Hemco Group is a privately held industrial group from India, founded in 1998. Eleven operating brands across seven sectors — culinary, design, AI & automation, hospitality, defence, energy, architecture, legal and social.",
  foundingDate: "1998",
  foundingLocation: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN",
  },
  email: "hello@hemcogroup.com",
  numberOfEmployees: { "@type": "QuantitativeValue", minValue: 100 },
  sameAs: [
    "https://www.wikidata.org/wiki/Q139691420",
    "https://www.linkedin.com/company/hemcogroup",
    "https://www.facebook.com/hemcokitchens",
    "https://www.instagram.com/hemcokitchens",
    "https://hemco.ooo",
    "https://kerning.ooo",
    "https://studio.kerning.ooo",
    "https://kerningai.eu",
    "https://arch.kerning.ooo",
    "https://hospitality.kerning.ooo",
    "https://cronuss.in",
    "https://keystonne.in",
  ],
  subOrganization: subOrganizations,
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description: "The official site of Hemco Group — a privately held Indian industrial group.",
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-IN",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/world/journal?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} ${mono.variable} h-full`}
    >
      <body
        className="min-h-full grain flex flex-col antialiased"
        data-tone="ivory"
        // Some browser extensions (Grammarly, NewsGuard, etc.) inject
        // attributes onto <body> after hydration — silence the resulting
        // server/client attribute mismatch warning.
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <CursorOrb />
        <LoaderCurtain />
        <BrandRibbon />
        <Nav />
        <main className="relative flex-1">{children}</main>
        <Footer />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
