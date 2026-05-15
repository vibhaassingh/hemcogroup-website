"use client";

import { useEffect, useRef } from "react";

/**
 * Kerning Architecture spread.
 *
 * A draughtsman's section drawing, rendered in SVG on a warm-ivory canvas:
 * a measured cross-section through an imagined room, with hairlines for
 * structure, hatching for ground, dimension lines, an annotated title
 * block, and the KERNING + ARCHITECTURE lockup set into the page like a
 * stamp on a drawing sheet.
 *
 * On mount the drawing strokes itself in — the lines draw left-to-right
 * over ~2.4s, the hatch fades up, and the dimension labels come last.
 * Honours prefers-reduced-motion (renders fully drawn, no animation).
 *
 * Inspired by the Kerning masked-mark beat (the studio's section between
 * hero and body), but the material is paper-and-pencil instead of
 * orange-on-black — fitting the practice's draughtsman sensibility.
 */
export function KerningArchitectureSpread() {
  const ref = useRef<HTMLDivElement>(null);

  // The drawing animates itself once the section scrolls into view.
  // We toggle a `.is-drawn` class on the SVG via IntersectionObserver;
  // the actual animation is pure CSS (@keyframes), so it doesn't depend
  // on React re-renders to play correctly.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = ref.current;
    if (!el) return;
    const svg = el.querySelector<SVGElement>(".arch-svg");
    if (!svg) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      svg.classList.add("is-drawn");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            svg.classList.add("is-drawn");
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.05 },
    );
    io.observe(el);
    // Fallback: if the section is already in view at mount, IO can
    // miss the initial entry — kick the animation after a beat anyway.
    const fallback = window.setTimeout(() => svg.classList.add("is-drawn"), 700);
    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <section
      aria-label="Kerning Architecture — section drawing"
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #f4ecd8 0%, #efe5cb 60%, #ebdfc0 100%)",
      }}
    >
      {/* Subtle paper grain — repeating diagonal hairlines, very low alpha,
          gives the canvas the feel of cartridge paper rather than a flat fill. */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "repeating-linear-gradient(45deg, rgba(122,110,62,0.04) 0 1px, transparent 1px 5px), repeating-linear-gradient(-45deg, rgba(122,110,62,0.03) 0 1px, transparent 1px 7px)",
        }}
      />

      <div
        ref={ref}
        className="shell relative"
        style={{
          paddingTop: "clamp(5rem, 11vh, 9rem)",
          paddingBottom: "clamp(5rem, 11vh, 9rem)",
        }}
      >
        {/* Top corner stamp — like the title block of an architectural sheet */}
        <div className="flex items-baseline justify-between mb-10 md:mb-14">
          <p
            className="caption"
            style={{
              color: "#7a6e3e",
              letterSpacing: "0.32em",
            }}
          >
            DRG · 001 / SECTION A–A
          </p>
          <p
            className="caption"
            style={{
              color: "#7a6e3e",
              letterSpacing: "0.32em",
            }}
          >
            SCALE 1 : 50 · ALL DIMS IN MM
          </p>
        </div>

        {/* The drawing itself — a measured section through a room with a
            kitchen on one side, a gathering space on the other, daylight
            from above. Drawn in olive hairlines on the ivory paper. */}
        <div
          className="relative w-full"
          style={{ aspectRatio: "16 / 7.2" }}
        >
          <svg
            viewBox="0 0 1600 720"
            preserveAspectRatio="xMidYMid meet"
            className="absolute inset-0 w-full h-full arch-svg"
            aria-hidden
          >
            {/* Draw-on stylesheet — applied per-child line so the cascade
                works reliably across browsers (some skip inheritance of
                stroke-dashoffset from a <g> when set via CSS). */}
            <style>{`
              .arch-svg .lines line, .arch-svg .lines circle {
                stroke-dasharray: 4800;
                stroke-dashoffset: 4800;
              }
              .arch-svg.is-drawn .lines line,
              .arch-svg.is-drawn .lines circle {
                animation: arch-draw 2400ms cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
              }
              .arch-svg .fills { opacity: 0; }
              .arch-svg.is-drawn .fills {
                animation: arch-fade 600ms ease 1800ms forwards;
              }
              .arch-svg .dims { opacity: 0; }
              .arch-svg.is-drawn .dims {
                animation: arch-fade 700ms ease 2200ms forwards;
              }
              @keyframes arch-draw { to { stroke-dashoffset: 0; } }
              @keyframes arch-fade { to { opacity: 1; } }
            `}</style>
            <defs>
              {/* Hatch pattern for ground — diagonal hairlines */}
              <pattern
                id="ground-hatch"
                patternUnits="userSpaceOnUse"
                width="10"
                height="10"
                patternTransform="rotate(45)"
              >
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="10"
                  stroke="#7a6e3e"
                  strokeWidth="0.8"
                  opacity="0.42"
                />
              </pattern>
              {/* Wall fill hatch — denser */}
              <pattern
                id="wall-hatch"
                patternUnits="userSpaceOnUse"
                width="6"
                height="6"
                patternTransform="rotate(45)"
              >
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="6"
                  stroke="#7a6e3e"
                  strokeWidth="0.6"
                  opacity="0.35"
                />
              </pattern>
            </defs>

            {/* Common stroke style for the drawing. The dasharray /
                dashoffset live on each child line via the .stroke-anim
                class — set above in the SVG <style> block. */}
            <g
              fill="none"
              stroke="#3a3320"
              strokeWidth="1.2"
              strokeLinecap="square"
              className="lines"
            >
              {/* Ground line — full sheet width */}
              <line x1="40" y1="600" x2="1560" y2="600" />
              {/* Roof line / ceiling profile — a long shed slope */}
              <line x1="120" y1="120" x2="980" y2="120" />
              <line x1="980" y1="120" x2="1480" y2="240" />
              {/* Left wall */}
              <line x1="120" y1="120" x2="120" y2="600" />
              {/* Right wall (sloped roof base) */}
              <line x1="1480" y1="240" x2="1480" y2="600" />
              {/* Internal partition — the line between kitchen and dining */}
              <line x1="780" y1="240" x2="780" y2="600" />
              {/* Counter / bar — a level horizontal element on the dining side */}
              <line x1="820" y1="500" x2="1260" y2="500" />
              <line x1="820" y1="500" x2="820" y2="600" />
              <line x1="1260" y1="500" x2="1260" y2="600" />
              {/* Range / kitchen island on the kitchen side */}
              <line x1="320" y1="520" x2="600" y2="520" />
              <line x1="320" y1="520" x2="320" y2="600" />
              <line x1="600" y1="520" x2="600" y2="600" />
              {/* Hood / extraction over range */}
              <line x1="340" y1="380" x2="580" y2="380" />
              <line x1="340" y1="380" x2="340" y2="460" />
              <line x1="580" y1="380" x2="580" y2="460" />
              {/* Skylight cut on the roof */}
              <line x1="440" y1="120" x2="640" y2="120" />
              <line x1="440" y1="120" x2="460" y2="180" />
              <line x1="640" y1="120" x2="620" y2="180" />
              <line x1="460" y1="180" x2="620" y2="180" />
              {/* Tall window on the right wall */}
              <line x1="1480" y1="320" x2="1480" y2="540" />
              <line x1="1480" y1="320" x2="1440" y2="320" />
              <line x1="1480" y1="540" x2="1440" y2="540" />
              <line x1="1440" y1="320" x2="1440" y2="540" />
              {/* People silhouettes — schematic, two figures at the bar */}
              <line x1="900" y1="500" x2="900" y2="440" />
              <circle cx="900" cy="430" r="9" />
              <line x1="1100" y1="500" x2="1100" y2="440" />
              <circle cx="1100" cy="430" r="9" />
              {/* Daylight rays — three diagonal hairlines from the skylight */}
              <line x1="490" y1="180" x2="430" y2="500" strokeDasharray="3 6" opacity="0.55" />
              <line x1="540" y1="180" x2="540" y2="500" strokeDasharray="3 6" opacity="0.55" />
              <line x1="590" y1="180" x2="650" y2="500" strokeDasharray="3 6" opacity="0.55" />
            </g>

            {/* Filled regions — drawn after the linework finishes */}
            <g className="fills">
              {/* Ground hatching beneath the floor line */}
              <rect x="40" y="600" width="1520" height="80" fill="url(#ground-hatch)" />
              {/* Wall hatch on the leftmost wall */}
              <rect x="108" y="120" width="12" height="480" fill="url(#wall-hatch)" />
              {/* Wall hatch on the rightmost wall */}
              <rect x="1480" y="240" width="12" height="360" fill="url(#wall-hatch)" />
              {/* Internal partition hatch */}
              <rect x="774" y="240" width="6" height="360" fill="url(#wall-hatch)" />
            </g>

            {/* Dimension lines + labels — comes in last */}
            <g
              fill="#7a6e3e"
              stroke="#7a6e3e"
              strokeWidth="0.7"
              className="dims"
            >
              {/* Top horizontal dimension run */}
              <line x1="120" y1="78" x2="1480" y2="78" />
              <line x1="120" y1="68" x2="120" y2="88" />
              <line x1="780" y1="68" x2="780" y2="88" />
              <line x1="1480" y1="68" x2="1480" y2="88" />
              <text
                x="450"
                y="64"
                fontSize="14"
                fontFamily="Geist Mono, ui-monospace, monospace"
                textAnchor="middle"
                stroke="none"
                letterSpacing="2"
              >
                6600
              </text>
              <text
                x="1130"
                y="64"
                fontSize="14"
                fontFamily="Geist Mono, ui-monospace, monospace"
                textAnchor="middle"
                stroke="none"
                letterSpacing="2"
              >
                7000
              </text>
              {/* Right vertical dimension */}
              <line x1="1538" y1="120" x2="1538" y2="600" />
              <line x1="1528" y1="120" x2="1548" y2="120" />
              <line x1="1528" y1="600" x2="1548" y2="600" />
              <text
                x="1554"
                y="365"
                fontSize="14"
                fontFamily="Geist Mono, ui-monospace, monospace"
                stroke="none"
                letterSpacing="2"
              >
                4800
              </text>
              {/* Annotation callouts — pointer + label for kitchen, bar, skylight */}
              <g fontSize="12" fontFamily="Geist Mono, ui-monospace, monospace" stroke="none" letterSpacing="2">
                <line x1="460" y1="540" x2="460" y2="650" stroke="#7a6e3e" strokeWidth="0.7" />
                <text x="460" y="668" textAnchor="middle">A · KITCHEN</text>

                <line x1="1040" y1="500" x2="1040" y2="650" stroke="#7a6e3e" strokeWidth="0.7" />
                <text x="1040" y="668" textAnchor="middle">B · DINING</text>

                <line x1="540" y1="120" x2="540" y2="42" stroke="#7a6e3e" strokeWidth="0.7" />
                <text x="540" y="32" textAnchor="middle">C · SKYLIGHT</text>

                <line x1="1460" y1="430" x2="1380" y2="430" stroke="#7a6e3e" strokeWidth="0.7" />
                <text x="1372" y="434" textAnchor="end">D · GLAZING</text>
              </g>
            </g>
          </svg>
        </div>

        {/* Below the drawing — a wide caption row with KERNING ·
            ARCHITECTURE, the studio's framing line, and a project locus.
            Reads like the legend at the bottom of a drawing sheet. */}
        <div className="grid gap-8 md:grid-cols-12 mt-12 md:mt-16">
          <div className="md:col-span-4">
            <p
              className="caption mb-3"
              style={{ color: "#7a6e3e", letterSpacing: "0.32em" }}
            >
              ISSUE · 001
            </p>
            <p
              className="display-tight text-[clamp(1.4rem,2.2vw,1.85rem)] leading-[1.18]"
              style={{ color: "#3a3320" }}
            >
              KERNING{" "}
              <span style={{ color: "#a89868" }}>·</span>{" "}
              <span className="display-italic">Architecture</span>
            </p>
          </div>
          <div className="md:col-span-5 md:col-start-6">
            <p
              className="body-sans text-[15px]"
              style={{ color: "rgba(58,51,32,0.80)" }}
            >
              The drawing above is not a project — it is the studio's
              shorthand for how we think. A room with a kitchen at one end,
              a table at the other, daylight from above, and the section cut
              that proves all three are in tension with each other.
            </p>
          </div>
          <div className="md:col-span-2 md:col-start-11 md:text-right">
            <p
              className="caption"
              style={{ color: "#7a6e3e", letterSpacing: "0.32em" }}
            >
              STUDIO · IN
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
