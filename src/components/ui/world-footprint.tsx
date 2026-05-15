"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { footprint } from "@/content/footprint";
import { LAND_PATH } from "./world-land-path";

const project = (lat: number, lon: number) => ({
  x: ((lon + 180) * 1000) / 360,
  y: ((90 - lat) * 500) / 180,
});

/**
 * Atmospheric world atlas.
 *
 * Quieter, more editorial than a data-viz map — no graticule, no
 * equator dashes, no pulsing rings. The continents sit as a soft ivory
 * silhouette on a forest canvas; gold pins glow faintly through a
 * radial halo. Hovering or focusing a pin lifts a single ring, names
 * the city in serif italic, and dims the rest of the field.
 *
 * Below the map, a compact register of countries and cities — set as
 * an editorial index rather than a 3-up grid of data rows.
 */
export function WorldFootprint() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="w-full">
      {/* Atlas card — fluted glass over the forest band, with a soft
          gold radial bloom anchored low so the map feels lit from
          within rather than printed on a flat panel. */}
      <div
        className="relative overflow-hidden rounded-[6px] p-5 md:p-10"
        style={{
          background:
            "radial-gradient(80% 60% at 50% 110%, rgba(212,168,58,0.10) 0%, rgba(212,168,58,0.03) 40%, transparent 70%), linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)",
          border: "1px solid color-mix(in srgb, var(--color-gold-500) 22%, transparent)",
          boxShadow: "0 30px 80px -40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)",
          backdropFilter: "blur(12px) saturate(1.05)",
          WebkitBackdropFilter: "blur(12px) saturate(1.05)",
        }}
      >
        {/* Quiet vertical fluting — picks up the brand's ribbed-glass
            motif at very low alpha so the map still dominates. */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 9px)",
            mixBlendMode: "screen",
          }}
        />

        <svg
          viewBox="0 0 1000 500"
          className="w-full h-auto block relative"
          role="img"
          aria-label="Hemco Group's global footprint"
        >
          <defs>
            {/* Soft gold halo for the pin glow */}
            <radialGradient id="pin-halo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--color-gold-300)" stopOpacity="0.55" />
              <stop offset="55%" stopColor="var(--color-gold-500)" stopOpacity="0.18" />
              <stop offset="100%" stopColor="var(--color-gold-500)" stopOpacity="0" />
            </radialGradient>
            {/* Active-state ring glow — brighter, larger */}
            <radialGradient id="pin-halo-active" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--color-gold-200)" stopOpacity="0.85" />
              <stop offset="50%" stopColor="var(--color-gold-300)" stopOpacity="0.45" />
              <stop offset="100%" stopColor="var(--color-gold-500)" stopOpacity="0" />
            </radialGradient>
            {/* Soft drop shadow for the land silhouette */}
            <filter id="land-soften" x="-2%" y="-2%" width="104%" height="104%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="0.4" />
            </filter>
          </defs>

          {/* Landmass — soft ivory silhouette, no harsh stroke. The
              filter de-aliases the path so the coastline reads as
              vapour-soft rather than a vector outline. */}
          <path
            d={LAND_PATH}
            fill="var(--color-mist)"
            fillOpacity="0.085"
            filter="url(#land-soften)"
            fillRule="evenodd"
          />

          {/* A second land pass with a faint warm tint, slightly inset
              — gives the silhouette a subtle dimensional edge without
              a hard outline. */}
          <path
            d={LAND_PATH}
            fill="none"
            stroke="var(--color-gold-500)"
            strokeOpacity="0.18"
            strokeWidth="0.5"
            vectorEffect="non-scaling-stroke"
            fillRule="evenodd"
          />

          {/* Faint ambient stars scattered across the canvas — purely
              decorative, ignored by reduced-motion since they're static. */}
          {STARS.map((s, i) => (
            <circle
              key={`star-${i}`}
              cx={s.x}
              cy={s.y}
              r={s.r}
              fill="var(--color-gold-300)"
              fillOpacity={s.o}
            />
          ))}

          {/* Pins — sorted west→east for the drop-in sweep. The
              `originalIndex` keys the active state so it still maps
              into footprint correctly. */}
          {footprint
            .map((p, originalIndex) => ({ p, originalIndex }))
            .sort((a, b) => a.p.lon - b.p.lon)
            .map(({ p, originalIndex }, i) => {
              const { x, y } = project(p.lat, p.lon);
              const isActive = active === originalIndex;
              const dy = (p.labelDy ?? -10) - 4;
              const anchor = p.labelAnchor ?? "start";
              const dx = p.labelDx ?? 0;
              return (
                <g
                  key={`${p.country}-${p.city}`}
                  transform={`translate(${x} ${y})`}
                  style={{
                    opacity: active !== null && !isActive ? 0.42 : 1,
                    transition: "opacity 400ms var(--ease-cinema)",
                  }}
                >
                  <motion.g
                    onMouseEnter={() => setActive(originalIndex)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(originalIndex)}
                    onBlur={() => setActive(null)}
                    tabIndex={0}
                    style={{ cursor: "pointer", outline: "none" }}
                    initial={
                      reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }
                    }
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{
                      duration: reduce ? 0 : 0.7,
                      delay: reduce ? 0 : i * 0.07,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {/* Halo — soft gold radial bloom under the pin.
                        Larger and brighter when active. */}
                    <circle
                      r={isActive ? 22 : 12}
                      fill={isActive ? "url(#pin-halo-active)" : "url(#pin-halo)"}
                      style={{ transition: "r 400ms var(--ease-cinema)" }}
                    />

                    {/* Active ring — only renders when the pin is
                        focused / hovered. Hairline gold outline. */}
                    {isActive && (
                      <circle
                        r={9}
                        fill="none"
                        stroke="var(--color-gold-300)"
                        strokeOpacity="0.9"
                        strokeWidth="1"
                        vectorEffect="non-scaling-stroke"
                      />
                    )}

                    {/* The pin itself — solid dot + brighter inner core */}
                    <circle r={3.2} fill="var(--color-gold-500)" />
                    <circle r={1.4} fill="var(--color-gold-200)" />

                    {/* City label — only renders when active. Italic
                        serif, with a subtle dark halo via paint-order
                        so it reads on either land or ocean. */}
                    {isActive && (
                      <text
                        x={dx || 12}
                        y={dy}
                        textAnchor={anchor}
                        fontFamily="var(--font-fraunces, serif)"
                        fontSize="13"
                        fontStyle="italic"
                        fontWeight="500"
                        letterSpacing="0.4"
                        fill="var(--color-mist)"
                        style={{
                          paintOrder: "stroke",
                          stroke: "rgba(11, 22, 16, 0.85)",
                          strokeWidth: "3.5",
                          strokeLinejoin: "round",
                        }}
                      >
                        {p.city}
                      </text>
                    )}
                  </motion.g>
                </g>
              );
            })}
        </svg>

        {/* Caption strip — the count + the active locus + a compass-
            style direction hint. Quieter typography than before. */}
        <div className="relative mt-7 flex items-center justify-between flex-wrap gap-4">
          <p
            className="caption"
            style={{
              color: "var(--color-gold-500)",
              letterSpacing: "0.28em",
            }}
          >
            {footprint.length} locations · {countContinents()} continents
          </p>
          <p
            className="caption"
            style={{ color: "var(--tone-fg-mute)" }}
          >
            {active !== null ? (
              <span style={{ color: "var(--color-gold-300)" }}>
                {footprint[active].country} ·{" "}
                <span className="display-italic" style={{ fontStyle: "italic" }}>
                  {footprint[active].city}
                </span>
              </span>
            ) : (
              "Hover any pin to read the city"
            )}
          </p>
        </div>
      </div>

      {/* Editorial register — country / city, with the brand register
          stripped to a single column-flowing list. Cleaner than the
          previous 3-up data grid, reads as the back-page index of a
          travel issue. */}
      <ul className="mt-14 grid gap-x-12 gap-y-0 sm:grid-cols-2 lg:grid-cols-3">
        {footprint.map((p, i) => (
          <li
            key={`${p.country}-list-${i}`}
            className="grid grid-cols-[34px_1fr] items-baseline gap-4 py-4"
            style={{
              borderTop:
                "1px solid color-mix(in srgb, var(--tone-fg) 14%, transparent)",
            }}
          >
            <span
              className="caption data"
              style={{
                color: "var(--color-gold-500)",
                letterSpacing: "0.18em",
              }}
            >
              {p.code}
            </span>
            <span className="text-[15px]" style={{ lineHeight: 1.35 }}>
              <span
                className="block"
                style={{ color: "var(--color-mist)" }}
              >
                {p.country}
              </span>
              <span
                className="display-italic block mt-0.5 text-[13px]"
                style={{ color: "var(--tone-fg-mute)" }}
              >
                {p.city}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* Static decorative stars — placed once and re-rendered server-side so
   they don't shift between SSR and CSR. Coordinates are in the same
   1000×500 viewBox as the atlas. Kept low-density and low-alpha. */
const STARS: { x: number; y: number; r: number; o: number }[] = [
  { x: 120, y: 80, r: 0.9, o: 0.35 },
  { x: 245, y: 40, r: 0.7, o: 0.28 },
  { x: 410, y: 70, r: 1.1, o: 0.4 },
  { x: 580, y: 35, r: 0.8, o: 0.32 },
  { x: 720, y: 95, r: 0.9, o: 0.36 },
  { x: 870, y: 55, r: 0.7, o: 0.3 },
  { x: 175, y: 410, r: 0.8, o: 0.32 },
  { x: 340, y: 460, r: 1.0, o: 0.38 },
  { x: 540, y: 425, r: 0.7, o: 0.28 },
  { x: 690, y: 470, r: 0.9, o: 0.34 },
  { x: 825, y: 415, r: 0.8, o: 0.3 },
  { x: 60, y: 250, r: 0.7, o: 0.26 },
  { x: 940, y: 220, r: 0.8, o: 0.3 },
  { x: 480, y: 250, r: 0.6, o: 0.22 },
];

function countContinents(): number {
  const continents = new Set<string>();
  for (const l of footprint) {
    if (l.lon >= -25 && l.lon <= 60 && l.lat >= 35) continents.add("Europe");
    else if (l.lon >= 60 && l.lon <= 150 && l.lat >= 0) continents.add("Asia");
    else if (l.lon >= 95 && l.lon <= 145 && l.lat < 5) continents.add("Asia");
    else if (l.lon >= -170 && l.lon <= -50 && l.lat >= 15)
      continents.add("North America");
    else if (l.lon >= -90 && l.lon <= -30 && l.lat < 15)
      continents.add("South America");
    else if (l.lon >= -20 && l.lon <= 55 && l.lat < 35) continents.add("Africa");
    else if (l.lon >= 110 && l.lon <= 180 && l.lat < -10)
      continents.add("Oceania");
  }
  return continents.size;
}
