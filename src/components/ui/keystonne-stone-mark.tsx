"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Keystonne masked K — interactive.
 *
 * The architectural K monogram is cut as a window onto a slow specular
 * bloom of gold → sapphire → midnight that drifts toward the cursor.
 * Three layers of interactivity sit on top of that base reveal:
 *
 *   1. The bloom origin tracks the pointer (cursor-anywhere-on-canvas).
 *   2. The K itself tilts in 3D — a subtle perspective rotate driven by
 *      the cursor's offset from the K's centre, so it reads as a slab
 *      of polished stone catching the light at different angles.
 *   3. Hovering the K intensifies the bloom; clicking it fires off a
 *      gold ring that sweeps outward and fades.
 *
 * Inspired by KerningMaskedMark — same masking technique, a different
 * material (Kerning is hot orange-on-black, Keystonne is gold-on-navy)
 * and an extra interactive layer on top.
 */
export function KeystonneStoneMark() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLButtonElement>(null);
  const [pulses, setPulses] = useState<number[]>([]);
  const pulseId = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const section = sectionRef.current;
    const mask = maskRef.current;
    if (!section || !mask) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      section.style.setProperty("--bloom-x", "50%");
      section.style.setProperty("--bloom-y", "45%");
      section.style.setProperty("--tilt-x", "0deg");
      section.style.setProperty("--tilt-y", "0deg");
      return;
    }

    let mx = 0.5;
    let my = 0.45;
    let cx = mx;
    let cy = my;
    // Tilt is driven from the cursor's offset relative to the K's centre,
    // not the section — so it reads as the slab itself catching the light.
    let tiltX = 0;
    let tiltY = 0;
    let cTiltX = 0;
    let cTiltY = 0;
    let raf = 0;
    let inside = false;

    const onMove = (e: PointerEvent) => {
      const sectRect = section.getBoundingClientRect();
      mx = (e.clientX - sectRect.left) / sectRect.width;
      my = (e.clientY - sectRect.top) / sectRect.height;
      inside = true;

      // Tilt: cursor relative to mask centre, normalised to [-1, 1].
      const maskRect = mask.getBoundingClientRect();
      const dx = (e.clientX - (maskRect.left + maskRect.width / 2)) / (maskRect.width / 2);
      const dy = (e.clientY - (maskRect.top + maskRect.height / 2)) / (maskRect.height / 2);
      // Y rotation responds to horizontal cursor offset; X rotation to vertical.
      // Cap to ±9deg so it stays elegant rather than gimballing.
      tiltY = Math.max(-1, Math.min(1, dx)) * 9;
      tiltX = Math.max(-1, Math.min(1, -dy)) * 9;
    };

    const tick = () => {
      const tx = inside ? mx : 0.5;
      const ty = inside ? my : 0.45;
      cx += (tx - cx) * 0.10;
      cy += (ty - cy) * 0.10;
      cTiltX += (tiltX - cTiltX) * 0.08;
      cTiltY += (tiltY - cTiltY) * 0.08;
      section.style.setProperty("--bloom-x", `${cx * 100}%`);
      section.style.setProperty("--bloom-y", `${cy * 100}%`);
      section.style.setProperty("--tilt-x", `${cTiltX}deg`);
      section.style.setProperty("--tilt-y", `${cTiltY}deg`);
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  const onPulse = () => {
    const id = pulseId.current++;
    setPulses((p) => [...p, id]);
    // Auto-clean after the animation completes (matches CSS duration).
    setTimeout(() => {
      setPulses((p) => p.filter((x) => x !== id));
    }, 1200);
  };

  return (
    <section
      ref={sectionRef}
      aria-label="Keystonne monogram"
      className="relative overflow-hidden"
      style={{ background: "#06090f" }}
    >
      <div
        className="shell relative"
        style={{
          paddingTop: "clamp(5rem, 11vh, 9rem)",
          paddingBottom: "clamp(6rem, 13vh, 10rem)",
          // 3D scene root — gives the masked layer a perspective.
          perspective: "1400px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        {/* Quiet vertical fluting across the whole canvas — echoes the
            polished-stone striation motif from the brand book. */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "repeating-linear-gradient(90deg, rgba(255,255,255,0.022) 0 1px, transparent 1px 9px)",
            mixBlendMode: "screen",
          }}
        />

        {/* The mask + the click pulses share a wrapper so they can be
            tilted together. The button is the interactive surface. */}
        <div
          className="relative mx-auto"
          style={{
            height: "clamp(280px, 44vh, 460px)",
            aspectRatio: `${36} / ${56.3}`,
            transform:
              "rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))",
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
        >
          {/* Pulse rings — fired on click, sweep outward and fade. */}
          {pulses.map((id) => (
            <span
              key={id}
              aria-hidden
              className="keystonne-pulse"
            />
          ))}

          {/* The masked layer itself, also the click target. The radial
              gradient is the artwork; the K SVG is the mask, so the
              bloom is only visible inside the K silhouette. Hovering
              the layer brightens the bloom via the `--bloom-boost` var. */}
          <button
            ref={maskRef}
            type="button"
            onClick={onPulse}
            onPointerEnter={(e) => {
              e.currentTarget.style.setProperty("--bloom-boost", "1");
            }}
            onPointerLeave={(e) => {
              e.currentTarget.style.setProperty("--bloom-boost", "0");
            }}
            className="absolute inset-0 cursor-pointer"
            aria-label="Keystonne K — tap"
            style={{
              background: `
                radial-gradient(70% 75% at var(--bloom-x, 50%) var(--bloom-y, 45%),
                  rgba(255, 232, 170, calc(0.85 + 0.15 * var(--bloom-boost, 0))) 0%,
                  rgba(220, 178, 70, calc(0.96 + 0.04 * var(--bloom-boost, 0))) 14%,
                  rgba(124, 156, 196, 0.92) 32%,
                  rgba(42, 61, 102, 1) 52%,
                  rgba(20, 29, 51, 1) 72%,
                  rgba(6, 9, 15, 1) 100%
                )
              `,
              WebkitMaskImage: "url(/brand/keystonne-monogram-mark.svg)",
              maskImage: "url(/brand/keystonne-monogram-mark.svg)",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskSize: "100% 100%",
              maskSize: "100% 100%",
              WebkitMaskPosition: "center",
              maskPosition: "center",
              maskMode: "alpha",
              border: 0,
              padding: 0,
              transition: "filter 600ms ease",
              filter:
                "drop-shadow(0 0 32px rgba(220,178,70,calc(0.10 + 0.20 * var(--bloom-boost, 0))))",
            }}
          />
        </div>

        {/* Quiet brand line beneath the mark. */}
        <p
          className="caption mt-12 md:mt-16 text-center"
          style={{
            color: "rgba(255,255,255,0.55)",
            letterSpacing: "0.34em",
          }}
        >
          KEYSTONNE · KITCHEN
        </p>
      </div>

      {/* Pulse animation — a thin gold ring scaling outward from the K's
          centre and fading. Lives outside the masked layer so it isn't
          clipped by the K silhouette. */}
      <style jsx>{`
        .keystonne-pulse {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 60%;
          aspect-ratio: 1 / 1;
          border-radius: 50%;
          border: 1px solid rgba(220, 178, 70, 0.55);
          transform: translate(-50%, -50%) scale(0.6);
          animation: keystonne-pulse 1100ms cubic-bezier(0.22, 0.61, 0.36, 1)
            forwards;
          pointer-events: none;
        }
        @keyframes keystonne-pulse {
          0% {
            opacity: 0.85;
            transform: translate(-50%, -50%) scale(0.6);
            border-color: rgba(255, 232, 170, 0.85);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(2.2);
            border-color: rgba(220, 178, 70, 0);
          }
        }
      `}</style>
    </section>
  );
}
