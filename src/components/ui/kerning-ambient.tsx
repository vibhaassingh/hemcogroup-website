"use client";

import { useEffect, useRef } from "react";

/**
 * Kerning ambient — a fixed-position orange radial bloom that follows
 * the cursor across the viewport. Sits behind page content as an
 * atmospheric layer, lifting the otherwise pure-black surface with the
 * brand's Orange-Red emotional accent.
 *
 * - Skipped on coarse pointers (touch) — there's no cursor to follow.
 * - Honours prefers-reduced-motion: collapses to a static centred glow.
 * - Pointer position is written to CSS custom properties on the layer
 *   itself, so the actual paint stays on the GPU compositor.
 */
export function KerningAmbient() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (reduce || !fine) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let cx = mx;
    let cy = my;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const tick = () => {
      // Slight inertia — feels like the bloom drifts after the cursor
      // rather than snapping to it.
      cx += (mx - cx) * 0.08;
      cy += (my - cy) * 0.08;
      el.style.setProperty("--kerning-bloom-x", `${cx}px`);
      el.style.setProperty("--kerning-bloom-y", `${cy}px`);
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
    <div
      ref={ref}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        // Two layered glows — a hot near-white core, a warmer halo,
        // then a deep ember tint at the edges. All sized in vmax so the
        // gradient reads consistently regardless of aspect ratio.
        background: `
          radial-gradient(40vmax 40vmax at var(--kerning-bloom-x, 50%) var(--kerning-bloom-y, 50%),
            rgba(255, 184, 167, 0.10) 0%,
            rgba(255, 79, 44, 0.18) 22%,
            rgba(168, 49, 24, 0.10) 48%,
            transparent 70%),
          radial-gradient(80vmax 60vmax at 100% 0%, rgba(255,79,44,0.05) 0%, transparent 60%),
          radial-gradient(70vmax 55vmax at 0% 100%, rgba(255,79,44,0.04) 0%, transparent 60%)
        `,
        mixBlendMode: "screen",
      }}
    />
  );
}
