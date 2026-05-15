import { imagery, type ImageryKey } from "./imagery";
import { ventures, type Venture } from "./ventures";

export type SectorSlug =
  | "culinary"
  | "atelier"
  | "intelligence"
  | "hospitality"
  | "sovereign"
  | "chambers"
  | "foundation";

export interface SectorEntry {
  slug: SectorSlug;
  name: string;
  ordinal: string;
  ethos: string;
  thesis: string;
  hero: ImageryKey;
  ventureSlugs: string[];
}

export const sectorOrder: SectorSlug[] = [
  "culinary",
  "atelier",
  "intelligence",
  "hospitality",
  "sovereign",
  "chambers",
  "foundation",
];

export const sectors: Record<SectorSlug, SectorEntry> = {
  culinary: {
    slug: "culinary",
    name: "Culinary",
    ordinal: "I",
    ethos: "Twenty-eight years of practice — from sheet stock to plated.",
    thesis:
      "Hemco began in commercial kitchens, and the working kitchen remains the deepest practice in the house. Two ventures live here: the works that engineer the room — cooking lines, cold chain, fabrication, extraction — and the marketplace that stocks what runs through it. Together they cover the entire arc of how a commercial kitchen is specified, supplied, and run.",
    hero: "craftWide",
    ventureSlugs: ["hemco-kitchens", "keystonne"],
  },
  atelier: {
    slug: "atelier",
    name: "Atelier",
    ordinal: "II",
    ethos: "Form, type, and the rooms they live in.",
    thesis:
      "The house's design practice — a creative studio for brand, narrative and digital, paired with an architecture and interiors atelier that shapes the spaces those brands inhabit. Two studios, one set of standards: senior hands at every stage, fewer projects taken than offered, and craft that survives the build.",
    hero: "kerningStudio",
    ventureSlugs: ["kerning-studio", "kerning-architecture"],
  },
  intelligence: {
    slug: "intelligence",
    name: "Intelligence",
    ordinal: "III",
    ethos: "Software and decision systems for the institutions that run India.",
    thesis:
      "Where the works builds for the kitchen, intelligence builds for the floor above and the boardroom beyond. An applied AI venture for hospitality operations, and a decision-intelligence company for Indian enterprise and government. Built in India, for the institutions that run it.",
    hero: "kerningAI",
    ventureSlugs: ["kerning-ai", "consortium"],
  },
  hospitality: {
    slug: "hospitality",
    name: "Hospitality",
    ordinal: "IV",
    ethos: "Senior consultancy from kitchen design to opening night.",
    thesis:
      "With the marketplace and the architecture practice now standing in their own sectors, hospitality narrows to its core craft: a single team that walks operators from kitchen and service design through menu engineering, SOPs, training and the soft opening — drawing on the rest of the house for the build, the supply, and the surfaces guests actually meet.",
    hero: "hospitality",
    ventureSlugs: ["kerning-hospitality"],
  },
  sovereign: {
    slug: "sovereign",
    name: "Sovereign",
    ordinal: "V",
    ethos: "Decade-horizon ventures in clean energy and autonomous defence.",
    thesis:
      "The ventures the house builds for India's strategic autonomy. A first-of-its-kind micro low-energy reactor reshaping how clean power is generated and owned at the edge of the grid. A sovereign defence practice in precision munitions and autonomous platforms. These take longer, cost more, and matter most.",
    hero: "lumonn",
    ventureSlugs: ["lumonn", "consortium-defence-robotics"],
  },
  chambers: {
    slug: "chambers",
    name: "Chambers",
    ordinal: "VI",
    ethos: "Counsel for builders — written advice as standard.",
    thesis:
      "The house's law practice, set up to serve the way an industrial group actually operates. Senior partner-led counsel on corporate transactions, regulatory matters and commercial contracts, with a small number of selected external clients in similar shape. No RFP pitches; no juniors-on-juniors; senior counsel reachable on the phone.",
    hero: "cronuss",
    ventureSlugs: ["cronuss-associates"],
  },
  foundation: {
    slug: "foundation",
    name: "Foundation",
    ordinal: "VII",
    ethos: "Returning what we've learned to the city that taught us.",
    thesis:
      "The group's philanthropic arm — culinary skilling for cooks and kitchen technicians from underserved communities, scholarships and school partnerships in the towns where the ventures operate, and community kitchens designed and supplied at cost by the works. Funded by a fixed share of the group's distributable surplus and run as a long-horizon practice rather than a charitable wing.",
    hero: "mvv",
    ventureSlugs: ["mvv-foundation"],
  },
};

export function venturesInSector(slug: SectorSlug): Venture[] {
  const ids = sectors[slug].ventureSlugs;
  return ids
    .map((id) => ventures.find((v) => v.slug === id))
    .filter((v): v is Venture => Boolean(v));
}

export function sectorOfVenture(ventureSlug: string): SectorEntry | undefined {
  for (const s of sectorOrder) {
    if (sectors[s].ventureSlugs.includes(ventureSlug)) return sectors[s];
  }
  return undefined;
}

export function sectorHero(slug: SectorSlug) {
  return imagery[sectors[slug].hero];
}
