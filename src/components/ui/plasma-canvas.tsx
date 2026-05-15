"use client";

import { useEffect, useRef } from "react";

type Palette = {
  bgA: [number, number, number];
  bgB: [number, number, number];
  glowA: [number, number, number];
  glowB: [number, number, number];
};

/**
 * Brand-aligned palettes for the flowing plasma hero.
 *   navy   — site default; deep polo navy with champagne-gold glows.
 *   forest — fallback for the previous green-on-navy treatment.
 *   green  — the original neon-green palette (kept for completeness).
 *   amber  — warm amber.
 */
const palettes: Record<string, Palette> = {
  navy: {
    bgA: [8, 22, 44],
    bgB: [14, 36, 70],
    glowA: [200, 165, 91],
    glowB: [228, 207, 154],
  },
  forest: {
    bgA: [10, 28, 22],
    bgB: [18, 50, 36],
    glowA: [200, 165, 91],
    glowB: [228, 207, 154],
  },
  green: {
    bgA: [5, 26, 46],
    bgB: [8, 40, 60],
    glowA: [120, 255, 140],
    glowB: [180, 255, 180],
  },
  amber: {
    bgA: [30, 15, 5],
    bgB: [50, 25, 8],
    glowA: [255, 180, 60],
    glowB: [255, 220, 140],
  },
};

export type PlasmaPalette = keyof typeof palettes;

interface PlasmaCanvasProps {
  /** Palette name. Default "navy" — brand-aligned. */
  palette?: PlasmaPalette;
  /** Animation speed (1–20). Default 6 (slower than the demo's 8). */
  speed?: number;
  /** Pattern intensity (1–10). Default 6. */
  intensity?: number;
  /**
   * Render-resolution divisor. The canvas runs at width × height ÷ scale²
   * so we trade fidelity for frame-time. Default 2.6 keeps it crisp on
   * desktop while staying sub-millisecond on mobile.
   */
  resolutionScale?: number;
  className?: string;
}

/**
 * Three-blob plasma rendered to an off-screen ImageData buffer and
 * blitted into a CSS-sized canvas every frame. Falls back to a static
 * frame when prefers-reduced-motion is set.
 *
 * Adapted from the user's original `flowing_plasma_hero_neon_green.html`
 * — same maths, same look, brand palette, no demo controls.
 */
export function PlasmaCanvas({
  palette = "navy",
  speed = 6,
  intensity = 6,
  resolutionScale = 2.6,
  className = "",
}: PlasmaCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const pal = palettes[palette];
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 1;
    let H = 1;
    let imgData = ctx.createImageData(1, 1);
    let buf = imgData.data;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      W = Math.max(1, Math.floor(r.width / resolutionScale));
      H = Math.max(1, Math.floor(r.height / resolutionScale));
      canvas.width = W;
      canvas.height = H;
      imgData = ctx.createImageData(W, H);
      buf = imgData.data;
    };
    resize();

    const lerp = (a: number, b: number, k: number) => a + (b - a) * k;

    let t = 0;
    let raf = 0;
    let alive = true;

    const draw = () => {
      const sp = (speed / 1000) * (reduce ? 0 : 1);
      const sc = intensity * 1.2;
      t += sp;

      const cx1 = Math.cos(t * 0.7) * 0.4 + 0.5;
      const cy1 = Math.sin(t * 0.9) * 0.4 + 0.5;
      const cx2 = Math.cos(t * 1.1 + 1.5) * 0.4 + 0.5;
      const cy2 = Math.sin(t * 0.6 + 0.8) * 0.4 + 0.5;
      const cx3 = Math.cos(t * 0.5 + 3.1) * 0.45 + 0.5;
      const cy3 = Math.sin(t * 1.3 + 2.2) * 0.45 + 0.5;

      for (let y = 0; y < H; y++) {
        const ny = y / H;
        for (let x = 0; x < W; x++) {
          const nx = x / W;
          const dx1 = nx - cx1;
          const dy1 = ny - cy1;
          const dx2 = nx - cx2;
          const dy2 = ny - cy2;
          const dx3 = nx - cx3;
          const dy3 = ny - cy3;
          const d1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
          const d2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          const d3 = Math.sqrt(dx3 * dx3 + dy3 * dy3);

          let v =
            Math.sin(d1 * 8 * sc - t * 2) +
            Math.sin(d2 * 7 * sc + t * 1.7) +
            Math.sin(d3 * 9 * sc - t * 1.3) +
            Math.sin((nx + ny) * 6 * sc + t);
          v = (v + 4) / 8;

          const glow = Math.pow(v, 2.2);
          const dim = 1 - glow;

          const r =
            lerp(pal.bgA[0], pal.glowA[0], glow) * dim +
            lerp(pal.bgB[0], pal.glowB[0], glow) * (1 - dim);
          const g =
            lerp(pal.bgA[1], pal.glowA[1], glow) * dim +
            lerp(pal.bgB[1], pal.glowB[1], glow) * (1 - dim);
          const b =
            lerp(pal.bgA[2], pal.glowA[2], glow) * dim +
            lerp(pal.bgB[2], pal.glowB[2], glow) * (1 - dim);

          const i = (y * W + x) * 4;
          buf[i] = r;
          buf[i + 1] = g;
          buf[i + 2] = b;
          buf[i + 3] = 255;
        }
      }
      ctx.putImageData(imgData, 0, 0);
    };

    const tick = () => {
      if (!alive) return;
      draw();
      raf = requestAnimationFrame(tick);
    };

    if (reduce) {
      // Single static frame — no animation.
      draw();
    } else {
      raf = requestAnimationFrame(tick);
    }

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    // Pause when the tab is not visible.
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else if (!reduce) {
        raf = requestAnimationFrame(tick);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [palette, speed, intensity, resolutionScale]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`block w-full h-full ${className}`}
      style={{ imageRendering: "auto" }}
    />
  );
}
