/**
 * Hemco wordmark + submark.
 *
 * Renders the official brand art shipped from the studio (white-on-transparent
 * PNGs sitting in /public/brand/). Both components are intended for dark
 * surfaces — the hero, the values panel, the dark sectors of the venture page.
 *
 * The original assets:
 *   /brand/hemco-wordmark-white.png   2163 × 329  (≈ 6.6 : 1)
 *   /brand/hemco-mark-white.png        328 × 321  (square — the lowercase "h"
 *                                                  with the brand-blue accent)
 */

import Image from "next/image";

const WORDMARK_SRC = "/brand/hemco-wordmark-white.png";
const WORDMARK_W = 2163;
const WORDMARK_H = 329;

const MARK_SRC = "/brand/hemco-mark-white.png";
const MARK_W = 328;
const MARK_H = 321;

export function HemcoWordmark({
  className,
  width = 480,
  title = "HEMCO",
  priority = false,
}: {
  className?: string;
  /** Display width in CSS pixels. Height is computed from the aspect ratio. */
  width?: number;
  /** Accessible alt text. Pass an empty string to mark the logo decorative. */
  title?: string;
  /** Mark as priority for above-the-fold placements (the venture hero). */
  priority?: boolean;
}) {
  const height = Math.round((WORDMARK_H / WORDMARK_W) * width);
  return (
    <Image
      src={WORDMARK_SRC}
      alt={title}
      width={width}
      height={height}
      priority={priority}
      className={className}
      sizes={`${width}px`}
    />
  );
}

export function HemcoMark({
  className,
  size = 56,
  title = "Hemco",
  priority = false,
}: {
  className?: string;
  /** Rendered side length in CSS pixels (the artwork is square). */
  size?: number;
  title?: string;
  priority?: boolean;
}) {
  const height = Math.round((MARK_H / MARK_W) * size);
  return (
    <Image
      src={MARK_SRC}
      alt={title}
      width={size}
      height={height}
      priority={priority}
      className={className}
      sizes={`${size}px`}
    />
  );
}
