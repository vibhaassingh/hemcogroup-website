/**
 * Consortium wordmark + lockup.
 *
 * Renders the official brand SVGs shipped from the studio:
 *   /brand/consortium-icon.svg  — the striated red diamond mark
 *                                  (viewBox 168.82 × 168.93, near-square)
 *   /brand/consortium-text.svg  — the wide-tracked CONSORTIUM wordmark
 *                                  (viewBox 701.33 × 45.17)
 *
 * Both files have the brand reds (#bb351c / #ad331c) baked into their
 * paths so they render exactly as designed when used as <img>. For
 * tinted / masked treatments (e.g. ConsortiumMaskedDiamond), the icon
 * also serves as a CSS mask over a gradient — the alpha channel is
 * what defines the silhouette; the bake-in colours are ignored.
 */

import type { CSSProperties } from "react";

export const CONSORTIUM_RED = "#bb351c";
export const CONSORTIUM_RED_DEEP = "#ad331c";

const ICON_ASPECT = 168.82 / 168.93;
const TEXT_ASPECT = 701.33 / 45.17;

export function ConsortiumIconImg({
  className,
  size = 80,
  alt = "Consortium",
  style,
}: {
  className?: string;
  size?: number;
  alt?: string;
  style?: CSSProperties;
}) {
  // The icon viewBox is near-square; rendering a square box with
  // object-fit: contain keeps proportions stable across any size.
  return (
    <img
      src="/brand/consortium-icon.svg"
      width={Math.round(size * ICON_ASPECT)}
      height={size}
      alt={alt}
      className={className}
      style={{ display: "block", ...style }}
    />
  );
}

export function ConsortiumTextImg({
  className,
  height = 28,
  alt = "Consortium",
  style,
}: {
  className?: string;
  height?: number;
  alt?: string;
  style?: CSSProperties;
}) {
  return (
    <img
      src="/brand/consortium-text.svg"
      width={Math.round(height * TEXT_ASPECT)}
      height={height}
      alt={alt}
      className={className}
      style={{ display: "block", ...style }}
    />
  );
}

/**
 * Stacked lockup — striated diamond above the wordmark, optically
 * centred. Used in the venture-page hero. The total height is split
 * roughly 0.62 / 0.38 between mark and wordmark with a 6% gap, which
 * matches the proportion in the brand reference imagery.
 */
export function ConsortiumLogo({
  className,
  height = 180,
  style,
}: {
  className?: string;
  /** Total lockup height in CSS pixels. */
  height?: number;
  style?: CSSProperties;
}) {
  const markSize = Math.round(height * 0.62);
  const textHeight = Math.round(height * 0.13);
  const gap = Math.round(height * 0.05);
  return (
    <span
      className={className}
      role="img"
      aria-label="Consortium"
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap,
        ...style,
      }}
    >
      <ConsortiumIconImg size={markSize} alt="" />
      <ConsortiumTextImg height={textHeight} alt="" />
    </span>
  );
}
