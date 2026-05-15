/**
 * Kerning Studio brand lockup.
 *
 * The path data is inlined directly from the studio's official SVG files
 * (kerning-text.svg and kerning-icon.svg, both in Graphite Black #3A3A3A).
 * The original `cls-1` fill is replaced with `currentColor` so the marks
 * can be tinted via CSS — Graphite Black on the Soft Stone surfaces, and
 * Soft Stone (warm off-white) when sitting over the dark hero.
 *
 * Two pieces:
 *   - KerningMonogram — the distinctive "H" mark + ® registered glyph.
 *   - KerningWordmark — the lockup: monogram + KERNING text, both as
 *     true vector paths (no font dependency, crisp at any size).
 */

import type { CSSProperties } from "react";

/* ── Monogram — official path data (kerning-icon.svg) ──────────── */

export function KerningMonogram({
  className,
  size = 96,
  title = "Kerning",
}: {
  className?: string;
  /** Rendered height in CSS pixels. Width derives from the aspect ratio. */
  size?: number;
  title?: string;
}) {
  // Source viewBox: 58.29 × 33.47
  const aspect = 58.29 / 33.47;
  return (
    <svg
      viewBox="0 0 58.29 33.47"
      width={size * aspect}
      height={size}
      role={title ? "img" : "presentation"}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
      className={className}
      fill="currentColor"
    >
      {title ? <title>{title}</title> : null}
      {/* H monogram */}
      <path d="M53.56,13.76V4.81c0-.29-.23-.52-.52-.52h-3.83c-.29,0-.52.23-.52.52v11.13c0,.29-.23.52-.52.52H5.38c-.29,0-.52-.23-.52-.52V4.81c0-.29-.23-.52-.52-.52H.52c-.29,0-.52.23-.52.52v28.15c0,.29.23.52.52.52h3.83c.29,0,.52-.23.52-.52v-11.13c0-.29.23-.52.52-.52h42.8c.29,0,.52.23.52.52v11.13c0,.29.23.52.52.52h3.83c.28,0,.52-.23.52-.52v-8.95c0-.19-.11-.37-.29-.46l-4.24-2.12c-.17-.09-.29-.27-.29-.46v-4.17c0-.2.11-.37.29-.46l4.24-2.12c.18-.09.29-.27.29-.46" />
      {/* ® registered mark */}
      <path d="M56.27,4.29c-1.24,0-2.05-.87-2.05-2.14s.8-2.15,2.05-2.15,2.03.83,2.03,2.15-.79,2.14-2.03,2.14M56.27,3.89c1.01,0,1.61-.65,1.61-1.74s-.58-1.75-1.61-1.75-1.62.67-1.62,1.75.59,1.74,1.62,1.74M56.43,2.86l-.31-.43h-.31v.83s-.05.1-.1.1h-.33s-.1-.05-.1-.1V1.03s.05-.1.1-.1h.85c.64,0,1.03.25,1.03.74,0,.36-.21.59-.57.69l.59.9s0,.09-.05.09h-.43c-.06,0-.12-.04-.15-.09l-.22-.41ZM56.25,1.32h-.45v.7h.45c.27,0,.47-.1.47-.35s-.17-.36-.47-.36" />
    </svg>
  );
}

/* ── Text wordmark — KERNING® text alone, no monogram ──────────── */

export function KerningText({
  className,
  height = 56,
  title = "Kerning",
  style,
}: {
  className?: string;
  /** Rendered height in CSS pixels. Width derives from the aspect ratio. */
  height?: number;
  title?: string;
  style?: CSSProperties;
}) {
  // Source viewBox: 158.78 × 29.18
  const aspect = 158.78 / 29.18;
  return (
    <svg
      viewBox="0 0 158.78 29.18"
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
      <KerningTextPaths />
    </svg>
  );
}

/* ── Wordmark — official path data (kerning-text.svg) ──────────── */

function KerningTextPaths() {
  return (
    <>
      {/* K */}
      <path d="M12.99,23.81l-5.33-8.02-2.73,3.37.04,9.14c0,.16-.16.32-.32.32H.32c-.16,0-.32-.16-.32-.32l.16-13.87L0,.88c0-.16.16-.32.32-.32h4.33c.16,0,.32.16.32.32l-.08,12.47L14.19.8c.12-.12.32-.24.52-.24h5.17c.12,0,.2.16.12.24l-9.14,11.1,11.19,16.44c.04.12,0,.28-.16.28h-5.41c-.2,0-.4-.12-.48-.28l-3.01-4.53Z" />
      {/* E */}
      <path d="M23.33,28.62c-.16,0-.32-.16-.32-.32l.16-13.91-.16-13.51c0-.16.16-.32.32-.32h18c.16,0,.32.16.32.32v3.21c0,.16-.16.32-.32.32h-13.35l-.12,7.42h12.39c.16,0,.32.16.32.32v3.21c0,.16-.16.32-.32.32h-12.39l.12,9.1h13.67c.16,0,.32.16.32.32v3.21c0,.16-.16.32-.32.32h-18.32Z" />
      {/* R */}
      <path d="M55.16,17.76h-6.45l.04,10.54c0,.16-.16.32-.32.32h-4.33c-.16,0-.32-.16-.32-.32l.16-14.91-.16-12.51c0-.16.16-.32.32-.32h10.66c6.69,0,10.7,2.81,10.7,8.26,0,3.77-2.04,6.09-5.41,7.02,3.09.4,4.69,2.29,5.17,5.93l.8,6.53c.04.16-.12.32-.28.32h-4.29c-.16,0-.32-.16-.36-.32l-.64-5.09c-.52-4.25-1.88-5.45-5.29-5.45M48.66,13.23v.72h6.49c3.13,0,5.53-1.36,5.53-4.81,0-3.17-2.09-4.77-5.69-4.77h-6.29l-.04,8.86Z" />
      {/* N */}
      <path d="M72.24,15.79l.04,12.51c0,.16-.16.32-.32.32h-4.01c-.16,0-.32-.16-.32-.32l.12-13.79-.12-13.63c0-.16.16-.32.32-.32h5.25c.2,0,.4.12.48.28l12.99,21.57-.04-1.4-.16-6.73V.88c0-.16.16-.32.32-.32h3.97c.16,0,.32.16.32.32l-.12,13.63.12,13.79c0,.16-.16.32-.32.32h-5.45c-.2,0-.4-.12-.48-.28l-12.79-21.25.08,1.96.12,6.73Z" />
      {/* I */}
      <path d="M94.16,28.62c-.16,0-.32-.16-.32-.32l.16-13.83-.16-13.59c0-.16.16-.32.32-.32h4.33c.16,0,.32.16.32.32l-.16,13.59.16,13.83c0,.16-.16.32-.32.32h-4.33Z" />
      {/* N */}
      <path d="M106.19,15.79l.04,12.51c0,.16-.16.32-.32.32h-4.01c-.16,0-.32-.16-.32-.32l.12-13.79-.12-13.63c0-.16.16-.32.32-.32h5.25c.2,0,.4.12.48.28l12.99,21.57-.04-1.4-.16-6.73V.88c0-.16.16-.32.32-.32h3.97c.16,0,.32.16.32.32l-.12,13.63.12,13.79c0,.16-.16.32-.32.32h-5.45c-.2,0-.4-.12-.48-.28l-12.79-21.25.08,1.96.12,6.73Z" />
      {/* G */}
      <path d="M149.36,28.62c-.16,0-.32-.16-.32-.32l.08-3.17c-1.96,2.69-4.97,4.05-8.82,4.05-7.98,0-13.39-5.81-13.39-14.63s5.37-14.55,13.43-14.55c6.62,0,10.86,3.37,12.27,9.26.04.16-.08.32-.24.32h-4.41c-.2,0-.36-.12-.4-.32-.92-3.53-3.41-5.33-7.22-5.33-5.33,0-8.34,4.17-8.34,10.7s3.17,10.62,8.54,10.62c4.73,0,7.3-2.89,7.5-7.82h-7.82c-.16,0-.32-.16-.32-.32v-3.09c0-.16.16-.32.32-.32h12.31c.16,0,.32.16.32.32v14.27c0,.16-.16.32-.32.32h-3.17Z" />
      {/* ® registered mark */}
      <path d="M156.75,4.86c-1.24,0-2.05-.87-2.05-2.14s.8-2.15,2.05-2.15,2.03.83,2.03,2.15-.79,2.14-2.03,2.14M156.75,4.47c1.01,0,1.61-.65,1.61-1.74s-.58-1.75-1.61-1.75-1.62.67-1.62,1.75.59,1.74,1.62,1.74M156.92,3.43l-.31-.43h-.31v.83s-.05.1-.1.1h-.33s-.1-.05-.1-.1V1.6s.05-.1.1-.1h.85c.64,0,1.03.25,1.03.74,0,.36-.21.59-.57.69l.59.9s0,.09-.05.09h-.43c-.06,0-.12-.04-.15-.09l-.22-.41ZM156.74,1.9h-.45v.7h.45c.27,0,.47-.1.47-.35s-.17-.36-.47-.36" />
    </>
  );
}

export function KerningWordmark({
  className,
  height = 64,
  title = "Kerning",
  /** When false, only the monogram is rendered (no text portion). */
  withText = true,
  style,
}: {
  className?: string;
  /** Rendered height of the wordmark in CSS pixels. */
  height?: number;
  title?: string;
  withText?: boolean;
  style?: CSSProperties;
}) {
  // Source viewBox of the text logo: 158.78 × 29.18
  const textAspect = 158.78 / 29.18;
  const textWidth = height * textAspect;

  if (!withText) {
    return <KerningMonogram size={height} title={title} className={className} />;
  }

  // Render the monogram + a gap + the wordmark text, optically aligned.
  // The two artworks share the brand's geometric construction so they
  // sit on the same baseline at matched cap-heights.
  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: Math.round(height * 0.32),
        lineHeight: 1,
        color: "currentColor",
        ...style,
      }}
      aria-label={title || undefined}
      role={title ? "img" : "presentation"}
    >
      <KerningMonogram size={height} title="" />
      <svg
        viewBox="0 0 158.78 29.18"
        height={height}
        width={textWidth}
        aria-hidden
        fill="currentColor"
        style={{ display: "block" }}
      >
        <KerningTextPaths />
      </svg>
    </span>
  );
}
