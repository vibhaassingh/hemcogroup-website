import { venturesBySlug } from "./ventures";

/**
 * Declarative brand-theme manifest.
 *
 * Consolidates each brand's visual register into typed tokens — the accent
 * pair (sourced from the venture registry so it never drifts) plus a coarse
 * tone / material / motion classification. The intent, per the site review,
 * is for pages to consume these tokens rather than relying on an ever-growing
 * stack of per-brand selectors (`.kerning-ai-page`, `.lumonn-page`, …) in
 * globals.css.
 *
 * Adoption is incremental: venture pages already emit `data-brand-tone` from
 * this manifest (see ventures/[slug]/page.tsx). The next step is to migrate
 * the per-brand `.X-page` CSS blocks onto a single token-driven `.brand-page`
 * rule set keyed off `[data-brand-tone]` — done once it can be visually
 * regression-checked.
 */

export type BrandTone =
  | "stainless"
  | "ink"
  | "ivory"
  | "forest"
  | "bronze"
  | "cobalt"
  | "stone";

export type BrandMaterial =
  | "brushed-steel"
  | "glass-console"
  | "fluted-glass"
  | "paper"
  | "matte";

export type BrandMotion = "panel-reveal" | "telemetry" | "draw" | "settle";

export interface BrandTheme {
  /** Brand accent — mirrors the venture registry. */
  accent: string;
  accentSoft: string;
  /** Coarse visual register the brand's page adopts. */
  tone: BrandTone;
  material: BrandMaterial;
  motion: BrandMotion;
}

type Register = Pick<BrandTheme, "tone" | "material" | "motion">;

const DEFAULT_REGISTER: Register = {
  tone: "ivory",
  material: "fluted-glass",
  motion: "settle",
};

// Qualitative register per brand. Accents are NOT duplicated here — they come
// from the venture registry below, so there is one source of truth for colour.
const REGISTER: Record<string, Register> = {
  "hemco-kitchens": { tone: "stainless", material: "brushed-steel", motion: "panel-reveal" },
  "kerning-studio": { tone: "ink", material: "matte", motion: "settle" },
  "kerning-ai": { tone: "ink", material: "glass-console", motion: "telemetry" },
  "kerning-architecture": { tone: "ivory", material: "paper", motion: "draw" },
  "kerning-hospitality": { tone: "ivory", material: "fluted-glass", motion: "settle" },
  consortium: { tone: "bronze", material: "fluted-glass", motion: "settle" },
  "consortium-defence-robotics": { tone: "bronze", material: "glass-console", motion: "telemetry" },
  lumonn: { tone: "cobalt", material: "fluted-glass", motion: "draw" },
  keystonne: { tone: "stone", material: "fluted-glass", motion: "panel-reveal" },
  voltverse: { tone: "ink", material: "glass-console", motion: "telemetry" },
  "cronuss-associates": { tone: "ink", material: "fluted-glass", motion: "settle" },
  indiabridg: { tone: "ivory", material: "fluted-glass", motion: "settle" },
  "mvv-foundation": { tone: "forest", material: "fluted-glass", motion: "settle" },
};

export function brandTheme(slug: string): BrandTheme {
  const v = venturesBySlug[slug];
  const reg = REGISTER[slug] ?? DEFAULT_REGISTER;
  return {
    accent: v?.accent ?? "#a37e2c",
    accentSoft: v?.accentSoft ?? "#c39a4e",
    ...reg,
  };
}
