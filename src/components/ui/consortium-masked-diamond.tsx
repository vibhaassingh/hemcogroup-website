"use client";

import { useEffect, useRef } from "react";

/**
 * Consortium masked diamond — the official striated diamond mark acts
 * as a window onto a cursor-tracked ember-red gradient. The mark is a
 * CSS mask, so we get crisp vector edges at any size while the
 * gradient stays GPU-cheap.
 *
 * Inspired by KerningMaskedMark (the H-monogram-as-window beat between
 * hero and body). Same masking technique, different palette and
 * silhouette — Consortium is institutional terracotta on slate, where
 * Kerning is hot orange-on-black.
 *
 * Sits on a deep slate canvas so the page reads as a continuous
 * institutional surface from hero through to body.
 */
export function ConsortiumMaskedDiamond() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.style.setProperty("--ember-x", "50%");
      el.style.setProperty("--ember-y", "55%");
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
      mx = (e.clientX - rect.left) / rect.width;
      my = (e.clientY - rect.top) / rect.height;
      inside = true;
    };

    const tick = () => {
      const tx = inside ? mx : 0.5;
      const ty = inside ? my : 0.55;
      cx += (tx - cx) * 0.10;
      cy += (ty - cy) * 0.10;
      el.style.setProperty("--ember-x", `${cx * 100}%`);
      el.style.setProperty("--ember-y", `${cy * 100}%`);
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
      aria-label="Consortium diamond"
      className="relative overflow-hidden"
      style={{ background: "#0a0907" }}
    >
      <div
        className="shell relative"
        style={{
          paddingTop: "clamp(5rem, 11vh, 9rem)",
          paddingBottom: "clamp(5rem, 11vh, 9rem)",
        }}
      >
        {/* Quiet horizontal striations across the whole canvas — echoes
            the brand book's woven-stripe motif baked into the diamond. */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "repeating-linear-gradient(0deg, rgba(187,53,28,0.05) 0 1px, transparent 1px 6px)",
            mixBlendMode: "screen",
          }}
        />

        {/* The masked layer. The radial gradient is the artwork; the
            consortium-icon SVG is the mask, so the ember is only visible
            inside the diamond silhouette. */}
        <div
          ref={ref}
          className="relative mx-auto"
          style={{
            width: "min(56vw, 380px)",
            // The icon viewBox is near-square (168.82 × 168.93).
            aspectRatio: `${168.82} / ${168.93}`,
            // Hot core → terracotta → ember → black, following the cursor.
            background: `
              radial-gradient(60% 65% at var(--ember-x, 50%) var(--ember-y, 55%),
                rgba(255, 220, 200, 1) 0%,
                rgba(232, 110, 70, 1) 16%,
                rgba(187, 53, 28, 1) 36%,
                rgba(120, 32, 18, 0.94) 58%,
                rgba(36, 12, 8, 1) 80%,
                rgba(10, 9, 7, 1) 100%
              )
            `,
            WebkitMaskImage: "url(/brand/consortium-icon.svg)",
            maskImage: "url(/brand/consortium-icon.svg)",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
            WebkitMaskPosition: "center",
            maskPosition: "center",
            // Use alpha so the icon's coloured fills define opaque areas.
            maskMode: "alpha",
          }}
        />

        {/* Tagline beneath the mark — quiet, institutional. */}
        <p
          className="caption mt-12 md:mt-16 text-center"
          style={{
            color: "rgba(255,255,255,0.55)",
            letterSpacing: "0.34em",
          }}
        >
          DECISION INTELLIGENCE · BUILT IN INDIA
        </p>
      </div>
    </section>
  );
}
