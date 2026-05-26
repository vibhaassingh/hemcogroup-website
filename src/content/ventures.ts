export type Sector =
  | "Culinary"
  | "Design"
  | "AI & Automation"
  | "Commerce"
  | "Defence"
  | "Energy"
  | "Hospitality"
  | "Architecture"
  | "Legal"
  | "Social";

export type VentureStatus = "Operational" | "Upcoming" | "TBC";

import type { ImageryKey } from "./imagery";

export interface Venture {
  slug: string;
  name: string;
  wordmark: string;
  tagline: string;
  positioning: string;
  description: string;
  sector: Sector;
  status: VentureStatus;
  domain: string | null;
  founded?: string;
  /** Headquarters country/city. Defaults to "India" when omitted. */
  hq?: string;
  accent: string;
  accentSoft: string;
  parent?: string;
  /** Connected ventures (slugs) — explicit brand-family / spun-out links. */
  related?: string[];
  /** Regions / cities the venture operates in or is building toward. */
  geography?: string[];
  /** Structured proof points — what exists now — for the venture page + map. */
  proof?: { label: string; value: string }[];
  /** ISO date (YYYY-MM-DD) of the last meaningful content change. */
  updatedAt?: string;
  imagery: ImageryKey;
  featured?: boolean;
}

export const ventures: Venture[] = [
  {
    slug: "hemco-kitchens",
    name: "Hemco Kitchens",
    wordmark: "Hemco",
    tagline: "Engineered for the world's kitchens.",
    positioning: "Commercial kitchen equipment, designed as one system.",
    description:
      "Hemco designs and builds premium commercial kitchens for hotels, restaurants, cloud kitchens, QSR chains, institutions and hospitality projects. Cooking, refrigeration, extraction, stainless-steel fabrication and connected kitchen intelligence — specified together, as one system.",
    sector: "Culinary",
    status: "Operational",
    domain: "hemco.ooo",
    founded: "1998",
    accent: "#0d47f1",
    accentSoft: "#3b6bf5",
    proof: [
      { label: "Core output", value: "Commercial kitchen systems" },
      { label: "Footprint", value: "Four continents" },
      { label: "Capability", value: "Design · build · service" },
    ],
    updatedAt: "2026-05-26",
    imagery: "hemco",
    featured: true,
  },
  {
    slug: "kerning-studio",
    name: "Kerning Studio",
    wordmark: "Kerning",
    tagline: "Your brand's story, amplified.",
    positioning: "A creative studio — branding, content, and digital.",
    description:
      "Kerning is the group's creative studio: strategy, identity, content, social and digital marketing. Bold and confident in voice, exacting in craft — and as the team puts it, not in the business of managing feeds, but of crafting obsessions.",
    sector: "Design",
    status: "Operational",
    domain: "studio.kerning.ooo",
    accent: "#a37a2c",
    accentSoft: "#c39a4e",
    imagery: "kerningStudio",
  },
  {
    slug: "kerning-ai",
    name: "Kerning AI",
    wordmark: "Kerning AI",
    tagline: "Industry 5.0, on the floor.",
    positioning:
      "An operational intelligence platform for industries that build with their hands.",
    description:
      "Kerning AI is an operational intelligence platform for industries that build with their hands — kitchens, factories, hotel floors, automotive lines. It fuses sensors, machine telemetry, ERP and human input into a single living model of the operation, then runs agentic workflows on top: predictive maintenance, energy and utility optimisation, hygiene and compliance, decision-grade analytics. Built on an ontology layer rather than a dashboard — and tuned for Industry 5.0, where software works alongside the operators, not over them.",
    sector: "AI & Automation",
    status: "Operational",
    founded: "2021",
    hq: "Netherlands",
    domain: "kerningai.eu",
    accent: "#1a1a1a",
    accentSoft: "#3a3a3a",
    proof: [
      { label: "Core output", value: "Industrial decision systems" },
      { label: "Focus", value: "Industry 5.0 platforms" },
    ],
    updatedAt: "2026-05-26",
    imagery: "kerningAI",
    featured: true,
  },
  {
    slug: "consortium",
    name: "Consortium",
    wordmark: "Consortium",
    tagline: "Decision intelligence, built in India.",
    positioning: "Operational software for Indian enterprise and institutions.",
    description:
      "Consortium is the group's emerging decision-intelligence venture — data fusion, operational analytics and mission software for Indian enterprise and government. Built in India, for the institutions that run it.",
    sector: "AI & Automation",
    status: "Upcoming",
    founded: "2025",
    hq: "India",
    domain: "consortium.ooo",
    parent: "kerning-ai",
    accent: "#2a2520",
    accentSoft: "#4a4236",
    imagery: "consortium",
  },
  {
    slug: "lumonn",
    name: "Lumonn",
    wordmark: "Lumonn",
    tagline: "the Future is today.",
    positioning: "A first-of-its-kind micro low-energy reactor.",
    description:
      "Lumonn is a clean-energy venture developing the world's first micro low-energy nuclear reactor — reshaping how clean power is generated, distributed and owned at the edge of the grid.",
    sector: "Energy",
    status: "Upcoming",
    domain: null,
    accent: "#6b5b2e",
    accentSoft: "#a38848",
    imagery: "lumonn",
    featured: true,
  },
  {
    slug: "keystonne",
    name: "Keystonne",
    wordmark: "Keystonne",
    tagline: "India's first hospitality marketplace.",
    positioning:
      "The WebstaurantStore for India — and a value-engineered Keystonne kitchen line manufactured by Hemco.",
    description:
      "Keystonne is India's first end-to-end online marketplace for commercial kitchen and hospitality supply — equipment, smallwares, consumables, and back-of-house essentials, brought together in one catalogue and shipped pan-India. The marketplace runs alongside Keystonne's own value-engineered commercial kitchen line, manufactured by Hemco for operators who need Hemco-grade reliability at an entry price point.",
    sector: "Culinary",
    status: "Operational",
    domain: "keystonne.in",
    accent: "#b85c2e",
    accentSoft: "#d4794a",
    proof: [
      { label: "Core output", value: "India's hospitality marketplace" },
      { label: "Catalogue", value: "Kitchen & front-of-house supply" },
    ],
    updatedAt: "2026-05-26",
    imagery: "keystonne",
    featured: true,
  },
  {
    slug: "consortium-defence-robotics",
    name: "Consortium Defence & Robotics",
    wordmark: "CDR",
    tagline: "Autonomous defence, built in India.",
    positioning: "Arms, drones, and autonomous warfare hardware.",
    description:
      "Sovereign defence manufacturing: precision munitions, unmanned aerial and ground systems, and the autonomous software that commands them.",
    sector: "Defence",
    status: "Upcoming",
    founded: "2026",
    domain: "ord.consortium.ooo",
    accent: "#3a3a3a",
    accentSoft: "#5a5a5a",
    imagery: "defence",
  },
  {
    slug: "kerning-hospitality",
    name: "Kerning Hospitality",
    wordmark: "Kerning Hospitality",
    tagline: "Culinary consulting, end to end.",
    positioning: "Culinary and hospitality consultancy.",
    description:
      "From kitchen and service design to menu engineering and on-site training — a full-stack consultancy for restaurants, hotels, and institutional F&B.",
    sector: "Hospitality",
    status: "TBC",
    domain: "hospitality.kerning.ooo",
    accent: "#8a3a2e",
    accentSoft: "#b05a4a",
    imagery: "hospitality",
  },
  {
    slug: "kerning-architecture",
    name: "Kerning Architecture & Design",
    wordmark: "Kerning A+D",
    tagline: "Architecture, shaped by craft.",
    positioning: "Flagship architecture and interior design practice.",
    description:
      "The group's architecture practice — shaping commercial, hospitality, and institutional spaces with a deep material sensibility.",
    sector: "Architecture",
    status: "TBC",
    domain: "arch.kerning.ooo",
    accent: "#4a4536",
    accentSoft: "#6a6346",
    imagery: "architecture",
  },
  {
    slug: "cronuss-associates",
    name: "Cronuss Associates",
    wordmark: "Cronuss",
    tagline: "Counsel for builders.",
    positioning: "Corporate law firm.",
    description:
      "A corporate law practice advising on transactions, regulatory, and commercial matters across the group's industries.",
    sector: "Legal",
    status: "TBC",
    domain: null,
    accent: "#1e2a3a",
    accentSoft: "#3a4a5e",
    imagery: "cronuss",
  },
  {
    slug: "indiabridg",
    name: "IndiaBridg",
    wordmark: "IndiaBridg",
    tagline: "Regulatory clarity. Government engagement. No shortcuts.",
    positioning: "Corporate liaisoning, regulatory advisory and India market-entry.",
    description:
      "A New Delhi advisory firm helping Indian and international businesses engage with government, regulators and public institutions through lawful, documented, compliance-first processes — regulatory approvals, government relations, public policy, FDI and India entry, procurement and state incentives.",
    sector: "Legal",
    status: "Operational",
    founded: "2026",
    hq: "New Delhi",
    domain: "indiabridg.com",
    accent: "#b9975b",
    accentSoft: "#d9c39a",
    imagery: "indiabridg",
  },
  {
    slug: "voltverse",
    name: "Voltverse",
    wordmark: "Voltverse",
    tagline: "Every charger. One app.",
    positioning: "India's EV-charging aggregator — one app for every charge point operator.",
    description:
      "An India-first EV-charging aggregator — a single app, card and map to discover, start and pay for public charging across every Indian charge point operator (Tata Power, Statiq, ChargeZone, Jio-bp, Ather Grid and more). Localised for India: UPI payments, CCS2 and Bharat connectors, phone-OTP identity, GST-compliant invoicing, and a journey planner that routes by charge.",
    sector: "Energy",
    status: "Upcoming",
    founded: "2026",
    domain: null,
    accent: "#2fae66",
    accentSoft: "#7fd6a0",
    imagery: "voltverse",
  },
  {
    slug: "mvv-foundation",
    name: "MVV Foundation",
    wordmark: "MVV",
    tagline: "Philanthropy, with purpose.",
    positioning: "The Hemco Group non-profit foundation.",
    description:
      "The group's philanthropic arm — focused on education, culinary skilling, and the communities where Hemco ventures operate.",
    sector: "Social",
    status: "Operational",
    domain: null,
    accent: "#2e5a3a",
    accentSoft: "#4a7a56",
    imagery: "mvv",
  },
];

export const venturesBySlug = Object.fromEntries(
  ventures.map((v) => [v.slug, v] as const),
) as Record<string, Venture>;

export const sectors: Sector[] = Array.from(
  new Set(ventures.map((v) => v.sector)),
);
