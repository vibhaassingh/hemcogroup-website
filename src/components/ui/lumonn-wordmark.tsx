/**
 * Lumonn brand lockup.
 *
 * Path data inlined directly from the studio's official SVGs:
 *   /brand/lumonn-icon.svg  — the two interlocked bracket marks
 *                              (viewBox 138.83 × 88.65, brand blue #004cff)
 *   /brand/lumonn-text.svg  — the LUMONN wordmark, set in GC EPICPRO
 *                              ExtraBold. Since that font is not on the
 *                              web, we render the wordmark with the
 *                              site's display sans cascade at weight
 *                              900 with tight tracking — visually close,
 *                              and tintable via currentColor.
 *
 * Three pieces:
 *   - LumonnMark — the bracket-pair icon glyph.
 *   - LumonnText — the LUMONN wordmark (HTML, geometric sans, weight 900).
 *   - LumonnLogo — both stacked, optically aligned, ready for hero use.
 */

import type { CSSProperties } from "react";

/* ── Mark — interlocked brackets (icon glyph) ─────────────────────── */

const MARK_VB_W = 138.83;
const MARK_VB_H = 88.65;
const MARK_ASPECT = MARK_VB_W / MARK_VB_H;

export function LumonnMark({
  className,
  size = 96,
  title = "Lumonn",
  style,
}: {
  className?: string;
  /** Rendered height in CSS pixels. Width derives from aspect ratio. */
  size?: number;
  title?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox={`0 0 ${MARK_VB_W} ${MARK_VB_H}`}
      width={size * MARK_ASPECT}
      height={size}
      role={title ? "img" : "presentation"}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
      className={className}
      fill="currentColor"
      style={{ display: "block", ...style }}
    >
      {title ? <title>{title}</title> : null}
      {/* Lower-left bracket */}
      <path d="M94.81,86.8c0,1.02-.83,1.84-1.84,1.84h-55.55c-7.04,0-13.68-3.09-18.21-8.48l-13.64-16.23c-3.6-4.28-5.57-9.7-5.57-15.29V1.84C0,.83.83,0,1.84,0h25.7c1.02,0,1.84.83,1.84,1.84v40.81c0,2.55.9,5.01,2.54,6.96l4.86,5.79c2.06,2.45,5.09,3.86,8.29,3.86h47.9c1.02,0,1.84.83,1.84,1.84v25.7Z" />
      {/* Upper-right bracket */}
      <path d="M44.02,1.84c0-1.02.83-1.84,1.84-1.84h55.55c7.04,0,13.68,3.09,18.21,8.48l13.64,16.23c3.6,4.28,5.57,9.7,5.57,15.29v46.79c0,1.02-.83,1.84-1.84,1.84h-25.7c-1.02,0-1.84-.83-1.84-1.84v-40.81c0-2.55-.9-5.01-2.54-6.96l-4.86-5.79c-2.06-2.45-5.09-3.86-8.29-3.86h-47.9c-1.02,0-1.84-.83-1.84-1.84V1.84Z" />
    </svg>
  );
}

/** The brand's electric blue. Matches `#004cff` on the icon SVG. */
export const LUMONN_BLUE = "#004cff";

/* ── Text — LUMONN wordmark ───────────────────────────────────────── */

/* Source viewBox of the official outlined text SVG (lumonn new text.svg).
   Each glyph is now a true vector path — no font dependency. */
const TEXT_VB_W = 292.45;
const TEXT_VB_H = 38.05;
const TEXT_ASPECT = TEXT_VB_W / TEXT_VB_H;

/* ── LUMONN — official outline paths ─────────────────────────────────
   Path data inlined directly from /brand/lumonn-text.svg. The original
   `#f2f2f2` fill is replaced with `currentColor` so the wordmark tints
   to whatever the ancestor sets (soft white over the deep blue hero,
   navy on light surfaces). */
function LumonnTextPaths() {
  return (
    <>
      {/* L */}
      <path d="M0,.58h9.8v27.38h27.1v9.51H0V.58Z" />
      {/* U */}
      <path d="M48.71.58v19.2c0,2.77.83,4.92,2.48,6.46,1.65,1.54,3.98,2.31,6.98,2.31h5.94c5.92,0,8.88-2.92,8.88-8.76V.58h9.8v19.25c0,5.84-1.6,10.34-4.81,13.49s-7.81,4.73-13.81,4.73h-7.21c-5.77,0-10.21-1.58-13.35-4.73-3.13-3.15-4.7-7.65-4.7-13.49V.58h9.8Z" />
      {/* M */}
      <path d="M110.11,26.46L123.6.58h10.38v36.9h-9.8v-15.68h-.58l-8.19,15.68h-11.18l-8.19-15.68h-.58v15.68h-9.8V.58h10.38l13.49,25.88h.58Z" />
      {/* O */}
      <path d="M136.86,19.25c0-3,.46-5.68,1.38-8.04.92-2.36,2.26-4.38,4.01-6.05,1.75-1.67,3.87-2.95,6.37-3.83,2.5-.88,5.3-1.33,8.42-1.33h20.81c3.23,0,6.12.44,8.68,1.33,2.56.88,4.73,2.16,6.51,3.83,1.79,1.67,3.16,3.69,4.12,6.05.96,2.36,1.44,5.04,1.44,8.04s-.47,5.6-1.41,7.93c-.94,2.33-2.3,4.29-4.06,5.91-1.77,1.61-3.94,2.84-6.51,3.69-2.58.84-5.5,1.27-8.76,1.27h-20.81c-3.15,0-5.98-.43-8.47-1.3-2.5-.86-4.61-2.1-6.34-3.72-1.73-1.61-3.06-3.58-3.98-5.91s-1.38-4.95-1.38-7.87ZM147.23,19.2c0,2.92.84,5.16,2.51,6.72s4.14,2.33,7.41,2.33h20.81c1.5,0,2.87-.16,4.12-.49,1.25-.33,2.33-.85,3.26-1.58.92-.73,1.63-1.67,2.13-2.83.5-1.15.75-2.54.75-4.15,0-3.23-.96-5.6-2.88-7.12-1.92-1.52-4.38-2.28-7.38-2.28h-20.81c-3.19,0-5.64.82-7.35,2.45-1.71,1.63-2.57,3.95-2.57,6.95Z" />
      {/* N */}
      <path d="M234.86,23.58h.58V.58h9.8v36.9h-10.38l-23-23h-.58v23h-9.8V.58h10.38l23,23Z" />
      {/* N */}
      <path d="M282.07,23.58h.58V.58h9.8v36.9h-10.38l-23-23h-.58v23h-9.8V.58h10.38l23,23Z" />
    </>
  );
}

export function LumonnText({
  className,
  height = 48,
  style,
}: {
  className?: string;
  /** Rendered height of the wordmark in CSS pixels. Width derives from aspect. */
  height?: number;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox={`0 0 ${TEXT_VB_W} ${TEXT_VB_H}`}
      width={height * TEXT_ASPECT}
      height={height}
      role="img"
      aria-label="Lumonn"
      className={className}
      fill="currentColor"
      style={{ display: "block", color: "currentColor", ...style }}
    >
      <LumonnTextPaths />
    </svg>
  );
}

/* ── Stacked lockup — mark + wordmark, hero-ready ─────────────────── */

export function LumonnLogo({
  className,
  height = 200,
  /** When true, only the mark renders (no wordmark). */
  markOnly = false,
  style,
}: {
  className?: string;
  /** Total lockup height in CSS pixels. Mark and text are auto-proportioned. */
  height?: number;
  markOnly?: boolean;
  style?: CSSProperties;
}) {
  if (markOnly) {
    return <LumonnMark size={height} style={style} className={className} />;
  }
  // Proportion the lockup so the bracket mark dominates and the
  // wordmark sits beneath as a quieter base — matches the brand-deck
  // hero composition (LUMONN small, mark large).
  const total = 100;
  const markSize = Math.round(height * (62 / total));
  const gap = Math.round(height * (10 / total));
  const textHeight = Math.round(height * (24 / total));
  return (
    <span
      className={className}
      role="img"
      aria-label="Lumonn"
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap,
        color: "currentColor",
        ...style,
      }}
    >
      <LumonnMark size={markSize} title="" />
      <LumonnText height={textHeight} />
    </span>
  );
}
