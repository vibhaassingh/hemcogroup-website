/**
 * Keystonne Kitchen brand lockup.
 *
 * Path data is inlined directly from the studio's official SVGs (the
 * `keystonne-wordmark.svg` and `keystonne-monogram.svg` shipped from the
 * brand book). The original `#fff` fills are replaced with `currentColor`
 * so the marks can be tinted by any ancestor — Sapphire Navy on the
 * stone-grey surfaces, ivory when sitting over the dark hero.
 *
 * Two pieces:
 *   - KeystonneMonogram — the architectural "K" glyph (a vertical bar
 *     plus two curved blades, like a quoted column capital).
 *   - KeystonneText — KEYSTONNE® rendered as true vector paths in the
 *     brand's geometric sans, no font dependency, crisp at any size.
 *   - KeystonneWordmark — the lockup of the two, optically aligned.
 */

import type { CSSProperties } from "react";

/* ── Monogram — the architectural K glyph ──────────────────────────── */

export function KeystonneMonogram({
  className,
  size = 64,
  title = "Keystonne",
}: {
  className?: string;
  /** Rendered height in CSS pixels. Width derives from the aspect ratio. */
  size?: number;
  title?: string;
}) {
  // Source viewBox: 55.1 × 56.3
  const aspect = 55.1 / 56.3;
  return (
    <svg
      viewBox="0 0 55.1 56.3"
      width={size * aspect}
      height={size}
      role={title ? "img" : "presentation"}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
      className={className}
      fill="currentColor"
    >
      {title ? <title>{title}</title> : null}
      {/* Outer curved blade */}
      <path d="M34.9,56.3h-4.1c-.8,0-1.3-.3-1.5-1-1.7-5.8-4-11.5-5-17.6-.9-5.9-.3-11.6,1.5-17.3,1.1-3.5,2.2-7,3.3-10.6.3-1.1.9-1.7,2.1-1.6.7,0,1.3,0,2,0s1.4,0,2.1,0c1.4,0,1.6.2,1.2,1.6-1.1,3.6-2.1,7.2-3.3,10.7-2.8,7.8-2.8,15.6,0,23.4,1.2,3.4,2.2,7,3.3,10.5.5,1.7.4,1.9-1.5,1.9h0Z" />
      {/* Inner curved blade */}
      <path d="M24.2,56.2c-1.5,0-3,0-4.5,0-.9,0-1.4-.3-1.8-1.2-1.6-4.1-3.5-8.1-5-12.2-1.2-3.5-1.9-7-1.7-10.8-.2-5.7,1.6-10.9,3.8-16,.9-2.2,1.9-4.3,2.7-6.5.4-1,1-1.5,2.1-1.4,1.5,0,2.9,0,4.4,0,1.5,0,1.6.3,1,1.7-1.5,3.5-2.9,7.1-4.4,10.6-3.5,7.7-3.6,15.3-.2,23,1.6,3.6,3.1,7.3,4.6,11,.6,1.6.5,1.8-1.1,1.8h0Z" />
      {/* Vertical column / spine */}
      <path d="M7.2,32.2v22c0,1.9,0,2-2,2-1.2,0-2.4,0-3.6,0C.4,56.3,0,55.8,0,54.7c0-3,0-6,0-9C0,34,0,22.2,0,10.4c0-2.1,0-2.2,2.2-2.2h2.5c1.6,0,2.4.8,2.4,2.3,0,4.9,0,9.7,0,14.6v7.1h0,0Z" />
      {/* ® */}
      <path d="M55.1,5.4c0,3.1-2.4,5.5-5.5,5.5s-5.6-2.4-5.6-5.5S46.4,0,49.5,0s5.5,2.4,5.5,5.4ZM45.4,5.4c0,2.4,1.8,4.3,4.2,4.3s4.1-1.9,4.1-4.3-1.7-4.3-4.2-4.3-4.2,1.9-4.2,4.3h0ZM48.7,8.2h-1.2V2.8c.5,0,1.2-.2,2.1-.2s1.5.2,1.9.4c.3.2.5.7.5,1.2s-.5,1.1-1.1,1.2h0c.5.3.8.7,1,1.4.2.8.3,1.1.4,1.4h-1.3c-.2-.2-.3-.7-.4-1.3,0-.6-.4-.9-1.1-.9h-.6v2.2h0ZM48.7,5.2h.6c.7,0,1.2-.2,1.2-.8s-.4-.8-1.2-.8-.6,0-.7,0v1.6h0Z" />
    </svg>
  );
}

/* ── Wordmark — KEYSTONNE® text in the brand's heavy geometric sans ── */

function KeystonneTextPaths() {
  return (
    <>
      {/* K */}
      <path d="M0,17.96h7.3v17.82l15.01-17.82h8.7l-15.99,18.94v.56l15.99,19.92h-8.7l-15.01-17.96v17.96H0V17.96Z" />
      {/* E */}
      <path d="M38.86,17.96h25.68v6.45h-18.24v9.68h15.85v5.89h-15.85v10.8h18.1v6.45h-25.4V17.96h-.14Z" />
      {/* Y */}
      <path d="M83.06,43.77l-13.33-25.82h8.14l9.12,17.82,8.98-17.82h8l-13.61,25.82v13.47h-7.3v-13.47Z" />
      {/* S */}
      <path d="M115.75,44.48c.28,4.21,3.65,7.44,9.68,7.44s7.72-2.39,7.72-5.61-6.59-5.19-9.68-5.61c-7.02-1.12-14.17-2.95-14.17-11.79s5.89-11.65,15.15-11.65,15.71,4.77,16.28,13.19h-7.72c-.28-4.07-2.95-7.16-8.56-7.16s-7.58,2.24-7.58,5.47,3.79,4.63,9.26,5.61c6.87,1.12,14.73,2.53,14.73,11.22s-5.61,12.07-15.57,12.07-16.56-4.77-17.4-13.47h7.72l.14.28Z" />
      {/* T */}
      <path d="M157.42,24.41h-11.08v-6.59h29.32v6.59h-11.08v32.83h-7.3V24.41h.14Z" />
      {/* O */}
      <path d="M181.55,37.6c0-12.21,8.7-20.34,19.22-20.34s19.08,8.14,19.08,20.34-8.56,20.2-19.08,20.2-19.22-8.14-19.22-20.2ZM212.56,37.74c0-7.72-5.05-13.61-11.79-13.61s-11.79,5.89-11.79,13.61,5.19,13.61,11.93,13.61,11.65-5.89,11.65-13.61h0Z" />
      {/* N */}
      <path d="M228.84,17.96h5.33l19.22,24.97v-24.97h7.3v39.29h-5.33l-19.36-24.83v24.83h-7.3V17.96h.14Z" />
      {/* N */}
      <path d="M272.05,17.96h5.33l19.22,24.97v-24.97h7.3v39.29h-5.33l-19.36-24.83v24.83h-7.3V17.96h.14Z" />
      {/* E */}
      <path d="M315.26,17.96h25.68v6.45h-18.24v9.68h15.85v5.89h-15.85v10.8h18.1v6.45h-25.4V17.96h-.14Z" />
      {/* ® */}
      <path d="M359.18,7.58c0,4.35-3.37,7.72-7.72,7.72s-7.86-3.37-7.86-7.72,3.51-7.58,7.86-7.58,7.72,3.37,7.72,7.58ZM345.71,7.58c0,3.37,2.53,6.03,5.89,6.03s5.75-2.67,5.75-6.03-2.39-6.03-5.75-6.03-5.89,2.67-5.89,6.03h0ZM350.34,11.5h-1.68V3.93c.7,0,1.68-.28,2.95-.28s2.1.28,2.67.56c.42.28.7.98.7,1.68s-.7,1.54-1.54,1.68h0c.7.42,1.12.98,1.4,1.96.28,1.12.42,1.54.56,1.96h-1.96c-.28-.28-.42-.98-.56-1.82-.14-.84-.56-1.26-1.54-1.26h-.84v3.09h-.14ZM350.34,7.3h.84c.98,0,1.68-.28,1.68-.84s-.56-1.12-1.54-1.12-.84,0-.98,0v2.24h0Z" />
    </>
  );
}

export function KeystonneText({
  className,
  height = 56,
  title = "Keystonne",
  style,
}: {
  className?: string;
  /** Rendered height in CSS pixels. Width derives from the aspect ratio. */
  height?: number;
  title?: string;
  style?: CSSProperties;
}) {
  // Source viewBox: 359.18 × 57.81
  const aspect = 359.18 / 57.81;
  return (
    <svg
      viewBox="0 0 359.18 57.81"
      width={height * aspect}
      height={height}
      role={title ? "img" : "presentation"}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
      className={className}
      fill="currentColor"
      style={{ display: "block", ...style }}
    >
      {title ? <title>{title}</title> : null}
      <KeystonneTextPaths />
    </svg>
  );
}

export function KeystonneWordmark({
  className,
  height = 56,
  title = "Keystonne",
  /** When false, only the monogram is rendered. */
  withText = true,
  style,
}: {
  className?: string;
  height?: number;
  title?: string;
  withText?: boolean;
  style?: CSSProperties;
}) {
  if (!withText) {
    return <KeystonneMonogram size={height} title={title} className={className} />;
  }

  // Monogram + KEYSTONNE text — optically aligned on a shared baseline.
  // The monogram is taller than the cap-height of the text, so we render it
  // at ~1.35× the text height and let the flex centre handle vertical alignment.
  const monoSize = Math.round(height * 1.35);
  const textAspect = 359.18 / 57.81;
  const textWidth = height * textAspect;

  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: Math.round(height * 0.42),
        lineHeight: 1,
        color: "currentColor",
        ...style,
      }}
      aria-label={title || undefined}
      role={title ? "img" : "presentation"}
    >
      <KeystonneMonogram size={monoSize} title="" />
      <svg
        viewBox="0 0 359.18 57.81"
        height={height}
        width={textWidth}
        aria-hidden
        fill="currentColor"
        style={{ display: "block" }}
      >
        <KeystonneTextPaths />
      </svg>
    </span>
  );
}
