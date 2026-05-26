"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useInView, useReducedMotion } from "motion/react";
import { sectorOrder, sectors, venturesInSector } from "@/content/sectors";
import { BRAND_COUNT, SECTOR_COUNT, numberWordCap } from "@/content/site-facts";
import type { Venture } from "@/content/ventures";

/**
 * The Hemco Operating Map.
 *
 * A single, registry-driven view of the whole group: a central hub, the
 * seven sectors fanned radially, and all thirteen ventures as nodes hung
 * within their sector. Brand families (the Kerning ventures, the Consortium
 * ventures) and the one explicit `parent` link are drawn as arcs through the
 * interior — so the picture reads as one house with cross-sector ties rather
 * than a flat logo wall.
 *
 * Motion is a progressive enhancement: nodes lock in and arcs draw on scroll.
 * Under prefers-reduced-motion the full map renders static. Every node is a
 * focusable link with an aria-label, so the structure is legible without JS
 * and to screen-readers; hover/focus reveals a detail panel (enhancement).
 */

const CX = 500;
const CY = 360;
const RV = 250; // radius of the venture node ring
const RL = 324; // radius of the sector labels

const polar = (r: number, deg: number) => {
  const a = ((deg - 90) * Math.PI) / 180; // 0° = top, clockwise
  return { x: CX + r * Math.cos(a), y: CY + r * Math.sin(a) };
};

interface MapNode {
  v: Venture;
  sectorSlug: string;
  sectorName: string;
  x: number;
  y: number;
}

// ---- Static layout, computed once from the registry ------------------------

const NODES: MapNode[] = [];
sectorOrder.forEach((s, si) => {
  const vs = venturesInSector(s);
  const base = si * (360 / sectorOrder.length);
  const gap = 15; // angular spread between sibling ventures
  vs.forEach((v, k) => {
    const offset = (k - (vs.length - 1) / 2) * gap;
    const { x, y } = polar(RV, base + offset);
    NODES.push({ v, sectorSlug: s, sectorName: sectors[s].name, x, y });
  });
});

const POS: Record<string, MapNode> = {};
NODES.forEach((n) => {
  POS[n.v.slug] = n;
});

const SECTOR_LABELS = sectorOrder.map((s, si) => {
  const base = si * (360 / sectorOrder.length);
  const p = polar(RL, base);
  const anchor: "start" | "middle" | "end" =
    Math.abs(p.x - CX) < 40 ? "middle" : p.x > CX ? "start" : "end";
  return { slug: s, name: sectors[s].name, ordinal: sectors[s].ordinal, x: p.x, y: p.y, anchor };
});

// Brand-family + parent edges (derived from existing fields, no new data).
const FAMILY_ANCHOR: Record<string, string> = {
  kerning: "kerning-ai",
  consortium: "consortium",
};
const familyOf = (slug: string): string | null =>
  slug.startsWith("kerning")
    ? "kerning"
    : slug.startsWith("consortium")
      ? "consortium"
      : null;

const EDGES: { a: string; b: string }[] = [];
const ADJ: Record<string, Set<string>> = {};
{
  const seen = new Set<string>();
  const addEdge = (a: string, b: string) => {
    if (a === b || !POS[a] || !POS[b]) return;
    const key = [a, b].sort().join("|");
    if (seen.has(key)) return;
    seen.add(key);
    EDGES.push({ a, b });
    if (!ADJ[a]) ADJ[a] = new Set();
    if (!ADJ[b]) ADJ[b] = new Set();
    ADJ[a].add(b);
    ADJ[b].add(a);
  };
  NODES.forEach(({ v }) => {
    const fam = familyOf(v.slug);
    if (fam && FAMILY_ANCHOR[fam] !== v.slug) addEdge(v.slug, FAMILY_ANCHOR[fam]);
    if (v.parent) addEdge(v.slug, v.parent);
  });
}

const edgePath = (a: MapNode, b: MapNode) => {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const qx = CX + (mx - CX) * 0.25; // bow the arc toward the hub
  const qy = CY + (my - CY) * 0.25;
  return `M ${a.x} ${a.y} Q ${qx} ${qy} ${b.x} ${b.y}`;
};

const statusLabel: Record<Venture["status"], string> = {
  Operational: "Operational",
  Upcoming: "Upcoming",
  TBC: "In development",
};

// ---- Component --------------------------------------------------------------

export function OperatingMap() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const show = reduce || inView;
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const router = useRouter();

  const active = activeSlug ? POS[activeSlug] : null;
  const isLit = (slug: string) =>
    !!activeSlug && (slug === activeSlug || ADJ[activeSlug]?.has(slug));

  return (
    <div ref={ref} className="w-full">
      <div className="grid items-center gap-8 lg:grid-cols-[1.55fr_1fr] lg:gap-12">
        {/* Map */}
        <div className="relative">
          <svg
            viewBox="0 0 1000 720"
            className="block h-auto w-full select-none"
            role="img"
            aria-label={`Operating map of Hemco Group — ${BRAND_COUNT} ventures across ${SECTOR_COUNT} sectors`}
          >
            <defs>
              <radialGradient id="om-hub" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="var(--color-gold-300)" stopOpacity="0.30" />
                <stop offset="100%" stopColor="var(--color-gold-500)" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Faint radial spokes: every venture hangs off the centre */}
            <g stroke="var(--color-mist)" strokeOpacity="0.10">
              {NODES.map((n) => (
                <line key={`spoke-${n.v.slug}`} x1={CX} y1={CY} x2={n.x} y2={n.y} />
              ))}
            </g>

            {/* Brand-family / parent arcs */}
            <g fill="none">
              {EDGES.map((e, i) => {
                const a = POS[e.a];
                const b = POS[e.b];
                const lit = isLit(e.a) && isLit(e.b);
                return (
                  <motion.path
                    key={`edge-${e.a}-${e.b}`}
                    d={edgePath(a, b)}
                    stroke={lit ? a.v.accentSoft : "var(--color-gold-300)"}
                    strokeWidth={lit ? 1.8 : 1}
                    strokeOpacity={lit ? 0.85 : activeSlug ? 0.12 : 0.22}
                    style={{ transition: "stroke-opacity .25s, stroke-width .25s, stroke .25s" }}
                    initial={reduce ? false : { pathLength: 0 }}
                    animate={show ? { pathLength: 1 } : { pathLength: 0 }}
                    transition={
                      reduce ? { duration: 0 } : { duration: 0.9, delay: 0.15 + i * 0.06, ease: [0.16, 1, 0.3, 1] }
                    }
                  />
                );
              })}
            </g>

            {/* Sector labels */}
            <g>
              {SECTOR_LABELS.map((s) => (
                <text
                  key={`label-${s.slug}`}
                  x={s.x}
                  y={s.y}
                  textAnchor={s.anchor}
                  dominantBaseline="middle"
                  className="fill-[color:var(--color-mist)]"
                  style={{
                    fontSize: 15,
                    letterSpacing: "0.04em",
                    fontFamily: "var(--font-fraunces, Georgia, serif)",
                    opacity: activeSlug ? 0.4 : 0.78,
                    transition: "opacity .25s",
                  }}
                >
                  {s.name}
                </text>
              ))}
            </g>

            {/* Central hub */}
            <g>
              <circle cx={CX} cy={CY} r={92} fill="url(#om-hub)" />
              <circle
                cx={CX}
                cy={CY}
                r={46}
                fill="var(--color-forest-900)"
                stroke="var(--color-gold-500)"
                strokeOpacity="0.5"
              />
              <text
                x={CX}
                y={CY - 6}
                textAnchor="middle"
                className="fill-[color:var(--color-gold-300)]"
                style={{ fontSize: 17, letterSpacing: "0.12em", fontFamily: "var(--font-fraunces, Georgia, serif)" }}
              >
                HEMCO
              </text>
              <text
                x={CX}
                y={CY + 14}
                textAnchor="middle"
                className="fill-[color:var(--color-mist)]"
                style={{ fontSize: 9, letterSpacing: "0.30em", opacity: 0.7 }}
              >
                GROUP
              </text>
            </g>

            {/* Venture nodes */}
            {NODES.map((n, i) => {
              const v = n.v;
              const activeNode = activeSlug === v.slug;
              const lit = isLit(v.slug);
              const dimmed = !!activeSlug && !lit;
              const operational = v.status === "Operational";
              const tbc = v.status === "TBC";
              return (
                <a
                  key={n.v.slug}
                  href={`/ventures/${v.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    router.push(`/ventures/${v.slug}`);
                  }}
                  onMouseEnter={() => setActiveSlug(v.slug)}
                  onFocus={() => setActiveSlug(v.slug)}
                  aria-label={`${v.name} — ${n.sectorName}, ${statusLabel[v.status]}`}
                  style={{ cursor: "pointer" }}
                >
                  <motion.g
                    initial={reduce ? false : { opacity: 0 }}
                    animate={show ? { opacity: 1 } : { opacity: 0 }}
                    transition={reduce ? { duration: 0 } : { duration: 0.5, delay: 0.45 + i * 0.045 }}
                  >
                    <title>{`${v.name} · ${n.sectorName}`}</title>
                    {/* hit target */}
                    <circle cx={n.x} cy={n.y} r={18} fill="transparent" />
                    <g
                      style={{
                        transformBox: "fill-box",
                        transformOrigin: "center",
                        transform: activeNode ? "scale(1.6)" : dimmed ? "scale(0.85)" : "scale(1)",
                        transition: "transform .25s cubic-bezier(.16,1,.3,1)",
                        opacity: dimmed ? 0.35 : 1,
                      }}
                    >
                      {/* Light bone rim on every node so even dark accents
                          (e.g. Kerning AI's near-black) stay legible on the
                          navy field. Brand colour is the fill (Operational) or
                          an inner dot (hollow Upcoming / In-development nodes). */}
                      <circle
                        cx={n.x}
                        cy={n.y}
                        r={8}
                        fill={operational ? v.accentSoft : "var(--color-forest-900)"}
                        stroke="var(--color-bone)"
                        strokeOpacity={tbc ? 0.5 : 0.85}
                        strokeWidth={1.25}
                        strokeDasharray={tbc ? "2.5 3" : undefined}
                      />
                      {!operational && (
                        <circle cx={n.x} cy={n.y} r={3.2} fill={v.accentSoft} fillOpacity={tbc ? 0.7 : 1} />
                      )}
                    </g>
                  </motion.g>
                </a>
              );
            })}

            {/* Active node name (floats by the node) */}
            {active && (
              <text
                x={active.x}
                y={active.y - 20}
                textAnchor="middle"
                className="fill-[color:var(--color-bone)]"
                style={{ fontSize: 14, fontFamily: "var(--font-fraunces, Georgia, serif)", pointerEvents: "none" }}
              >
                {active.v.name}
              </text>
            )}
          </svg>
        </div>

        {/* Detail panel */}
        <div className="lg:pl-2">
          {active ? (
            <div className="rounded-[8px] border border-[color:var(--color-gold-500)]/25 bg-white/[0.03] p-7 backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-2.5">
                <span
                  aria-hidden
                  className="inline-block h-2.5 w-2.5 rounded-full"
                  style={{ background: active.v.accentSoft }}
                />
                <span className="caption" style={{ color: "var(--color-gold-300)" }}>
                  {active.sectorName} · {statusLabel[active.v.status]}
                </span>
              </div>
              <h3 className="display text-[clamp(1.5rem,2.6vw,2.1rem)] leading-[1.05] text-[color:var(--color-bone)]">
                {active.v.name}
              </h3>
              <p className="lede mt-3 text-[15px] leading-[1.6] text-[color:var(--color-mist)]">
                {active.v.positioning}
              </p>
              <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-[13px]">
                <div>
                  <dt className="caption" style={{ color: "var(--color-gold-300)" }}>
                    Founded
                  </dt>
                  <dd className="text-[color:var(--color-bone)]">{active.v.founded ?? "—"}</dd>
                </div>
                <div>
                  <dt className="caption" style={{ color: "var(--color-gold-300)" }}>
                    Reach
                  </dt>
                  <dd className="text-[color:var(--color-bone)]">
                    {active.v.domain ?? "In development"}
                  </dd>
                </div>
              </dl>
              <Link
                href={`/ventures/${active.v.slug}`}
                className="mt-6 inline-flex items-center gap-1.5 text-[14px] text-[color:var(--color-gold-300)] underline-offset-4 hover:underline"
              >
                Open {active.v.name} <span aria-hidden>→</span>
              </Link>
            </div>
          ) : (
            <div className="lg:pr-6">
              <p className="display text-[clamp(1.5rem,2.6vw,2.1rem)] leading-[1.08] text-[color:var(--color-bone)]">
                {numberWordCap(BRAND_COUNT)} ventures, one house.
              </p>
              <p className="lede mt-4 text-[15px] leading-[1.65] text-[color:var(--color-mist)]">
                Every brand hangs off the centre and sits within its sector. The
                arcs trace the families that cross those sectors — the Kerning
                ventures, the Consortium ventures. Hover, tap or focus a node to
                explore; select one to enter it.
              </p>
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[12px] text-[color:var(--color-mist)]">
                <li className="flex items-center gap-2">
                  <span aria-hidden className="inline-block h-2.5 w-2.5 rounded-full bg-[color:var(--color-gold-300)]" />
                  Operational
                </li>
                <li className="flex items-center gap-2">
                  <span
                    aria-hidden
                    className="inline-block h-2.5 w-2.5 rounded-full border-2 border-[color:var(--color-gold-300)]"
                  />
                  Upcoming
                </li>
                <li className="flex items-center gap-2">
                  <span
                    aria-hidden
                    className="inline-block h-2.5 w-2.5 rounded-full border border-dashed border-[color:var(--color-mist)]"
                  />
                  In development
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
