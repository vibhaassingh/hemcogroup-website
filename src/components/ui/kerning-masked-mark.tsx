"use client";

import { useEffect, useRef } from "react";

/**
 * Kerning masked-mark — the H monogram acts as a window, with a hot
 * orange→red→black radial bloom behind it that follows the cursor across
 * the section. The mark itself is rendered as a CSS mask, so we get
 * crisp vector edges at any size while the gradient stays GPU-cheap.
 *
 * Sits on the pure-black canvas, between the orange-silhouette hero and
 * the rest of the page. The hero's bottom-vignette fades to pure black,
 * so the eye reads the hero + this section as one continuous surface.
 */
export function KerningMaskedMark() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.style.setProperty("--bloom-x", "50%");
      el.style.setProperty("--bloom-y", "55%");
      return;
    }

    let mx = 0.5;
    let my = 0.55;
    let cx = mx;
    let cy = my;
    let raf = 0;
    let inside = false;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      // Map window-pointer to local 0..1 inside the masked element. Allow
      // values outside the element so the bloom drifts toward the cursor
      // even when it's not literally over the mark.
      mx = (e.clientX - rect.left) / rect.width;
      my = (e.clientY - rect.top) / rect.height;
      inside = true;
    };

    const tick = () => {
      // Spring back toward centre when the cursor isn't actively in the
      // viewport area; otherwise ease toward the cursor.
      const tx = inside ? mx : 0.5;
      const ty = inside ? my : 0.55;
      cx += (tx - cx) * 0.10;
      cy += (ty - cy) * 0.10;
      el.style.setProperty("--bloom-x", `${cx * 100}%`);
      el.style.setProperty("--bloom-y", `${cy * 100}%`);
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <section
      aria-label="Kerning monogram"
      className="relative overflow-hidden"
      style={{ background: "#000" }}
    >
      <div
        className="shell relative"
        style={{
          paddingTop: "clamp(4rem, 9vh, 7rem)",
          paddingBottom: "clamp(5rem, 11vh, 9rem)",
        }}
      >
        {/* The masked layer. The radial gradient is the artwork; the
            kerning monogram SVG is the mask, so the bloom is only
            visible inside the H silhouette. */}
        <div
          ref={ref}
          className="relative mx-auto"
          style={{
            width: "min(88vw, 1180px)",
            // Match the source viewBox (53.56 × 33.47) exactly.
            aspectRatio: `${53.56} / ${33.47}`,
            // Hot core → orange → ember → black, following the cursor.
            background: `
              radial-gradient(60% 70% at var(--bloom-x, 50%) var(--bloom-y, 55%),
                rgba(255, 220, 200, 1) 0%,
                rgba(255, 110, 70, 1) 18%,
                rgba(255, 79, 44, 1) 34%,
                rgba(168, 49, 24, 0.92) 55%,
                rgba(40, 12, 6, 1) 78%,
                rgba(0, 0, 0, 1) 100%
              )
            `,
            WebkitMaskImage: "url(/brand/kerning-monogram.svg)",
            maskImage: "url(/brand/kerning-monogram.svg)",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
            WebkitMaskPosition: "center",
            maskPosition: "center",
            // Ensure the mask uses alpha (not luminance) so the SVG's
            // black fill defines opaque areas correctly.
            maskMode: "alpha",
          }}
        />

        {/* Brand tagline beneath the mark — quiet, ®-restrained */}
        <p
          className="caption mt-10 md:mt-14 text-center"
          style={{
            color: "rgba(255,255,255,0.55)",
            letterSpacing: "0.32em",
          }}
        >
          Reducing the space between
        </p>
      </div>
    </section>
  );
}
