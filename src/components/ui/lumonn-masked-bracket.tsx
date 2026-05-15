"use client";

import { useEffect, useRef } from "react";

/**
 * Lumonn masked bracket — the official interlocked-bracket mark acts
 * as a window onto a cursor-tracked electric-blue gradient. The mark
 * is a CSS mask, so we get crisp vector edges at any size while the
 * gradient stays GPU-cheap. Mirrors the Kerning Studio masked-H and
 * Consortium masked-diamond pattern, retuned for the LENR module's
 * cobalt palette.
 *
 * Sits between the hero and the body — a quiet but luminous beat
 * that reads as the device's reactor glow seen through its silhouette.
 */
export function LumonnMaskedBracket() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.style.setProperty("--core-x", "50%");
      el.style.setProperty("--core-y", "55%");
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
      el.style.setProperty("--core-x", `${cx * 100}%`);
      el.style.setProperty("--core-y", `${cy * 100}%`);
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
      aria-label="Lumonn bracket"
      className="relative overflow-hidden"
      style={{ background: "#03050f" }}
    >
      <div
        className="shell relative"
        style={{
          paddingTop: "clamp(5rem, 11vh, 9rem)",
          paddingBottom: "clamp(5rem, 11vh, 9rem)",
        }}
      >
        {/* Quiet vertical fluting across the canvas — picks up the
            ridged-light striations of the brand-deck reactor imagery. */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "repeating-linear-gradient(90deg, rgba(122,166,255,0.05) 0 1px, transparent 1px 8px)",
            mixBlendMode: "screen",
          }}
        />

        {/* The masked layer. The radial gradient is the artwork; the
            lumonn-icon SVG is the mask, so the cobalt core is only
            visible inside the bracket silhouette. */}
        <div
          ref={ref}
          className="relative mx-auto"
          style={{
            width: "min(60vw, 460px)",
            // Source viewBox 138.83 × 88.65.
            aspectRatio: `${138.83} / ${88.65}`,
            // Hot blue-white core → electric blue → deep navy → ink,
            // following the cursor across the section.
            background: `
              radial-gradient(60% 70% at var(--core-x, 50%) var(--core-y, 55%),
                rgba(220, 232, 255, 1) 0%,
                rgba(122, 166, 255, 1) 16%,
                rgba(0, 76, 255, 1) 36%,
                rgba(20, 42, 110, 0.94) 60%,
                rgba(6, 10, 28, 1) 82%,
                rgba(3, 5, 15, 1) 100%
              )
            `,
            WebkitMaskImage: "url(/brand/lumonn-icon.svg)",
            maskImage: "url(/brand/lumonn-icon.svg)",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
            WebkitMaskPosition: "center",
            maskPosition: "center",
            // Use alpha so the icon's electric-blue fills define the
            // opaque region; the bracket silhouette becomes the window.
            maskMode: "alpha",
          }}
        />

        {/* Tagline beneath the mark — quiet, restrained. */}
        <p
          className="caption mt-12 md:mt-16 text-center"
          style={{
            color: "rgba(255,255,255,0.55)",
            letterSpacing: "0.34em",
          }}
        >
          ENDLESS ENERGY · LENR · BUILT IN INDIA
        </p>
      </div>
    </section>
  );
}
