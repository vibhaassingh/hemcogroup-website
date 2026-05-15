"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

export interface TimelineMilestone {
  year: string;
  title: string;
  body: string;
  image: string;
}

/**
 * Draggable horizontal timeline. Drag the handle along the rail (or
 * click a year tick) to scrub through the group's milestones; the
 * featured image dissolves between states.
 */
export function TimelineScrubber({
  milestones,
}: {
  milestones: TimelineMilestone[];
}) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const railRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const handleFromX = (clientX: number) => {
    const r = railRef.current?.getBoundingClientRect();
    if (!r) return;
    const ratio = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
    const idx = Math.min(
      milestones.length - 1,
      Math.round(ratio * (milestones.length - 1)),
    );
    setActive(idx);
  };

  const m = milestones[active];
  const pct = (active / Math.max(1, milestones.length - 1)) * 100;

  return (
    <div className="w-full">
      <div
        className="relative aspect-[16/9] overflow-hidden mb-12"
        style={{ background: "var(--color-forest-900)" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={m.year}
            initial={{ opacity: 0, scale: reduce ? 1 : 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0.2 : 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={m.image}
              alt={m.title}
              fill
              sizes="100vw"
              className="object-cover"
              style={{ filter: "saturate(0.88) contrast(1.06)" }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(13,40,24,0.05) 0%, rgba(13,40,24,0.1) 50%, rgba(13,40,24,0.85) 100%)",
              }}
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-x-5 bottom-5 md:inset-x-10 md:bottom-10 text-white pointer-events-none max-w-4xl">
          <div className="glass-light glass-sheen rounded-[6px] p-7 md:p-10">
            <p
              className="caption mb-3 data"
              style={{ color: "var(--color-gold-300)" }}
            >
              {m.year}
            </p>
            <h3 className="display text-[clamp(1.75rem,3.6vw,3rem)] leading-[1.0] mb-4">
              {m.title}
            </h3>
            <p className="lede opacity-90">{m.body}</p>
          </div>
        </div>
      </div>

      {/* Rail */}
      <div
        ref={railRef}
        className="relative h-12 select-none"
        onPointerDown={(e) => {
          dragging.current = true;
          (e.target as Element).setPointerCapture(e.pointerId);
          handleFromX(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && handleFromX(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        <div
          className="absolute left-0 right-0 top-1/2 h-px"
          style={{
            background:
              "color-mix(in srgb, var(--tone-fg) 22%, transparent)",
          }}
        />
        <motion.div
          className="absolute top-1/2 h-px"
          animate={{ width: `${pct}%` }}
          transition={
            reduce
              ? { duration: 0 }
              : { type: "spring", stiffness: 120, damping: 22 }
          }
          style={{
            left: 0,
            background: "var(--color-gold-500)",
          }}
        />
        {milestones.map((ms, i) => (
          <button
            key={ms.year}
            type="button"
            onClick={() => setActive(i)}
            className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 group"
            style={{ left: `${(i / Math.max(1, milestones.length - 1)) * 100}%` }}
            aria-label={`${ms.year} — ${ms.title}`}
          >
            <span
              className="block w-2 h-2 rounded-full transition-transform group-hover:scale-150"
              style={{
                background:
                  i <= active ? "var(--color-gold-500)" : "color-mix(in srgb, var(--tone-fg) 28%, transparent)",
              }}
            />
            <span
              className={`absolute left-1/2 -translate-x-1/2 mt-4 caption data whitespace-nowrap transition-opacity ${
                i === active ? "opacity-100" : "opacity-50"
              }`}
              style={{
                color:
                  i === active ? "var(--color-gold-500)" : "var(--tone-fg-mute)",
              }}
            >
              {ms.year}
            </span>
          </button>
        ))}
        <motion.div
          className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 cursor-grab active:cursor-grabbing pointer-events-none"
          animate={{ left: `${pct}%` }}
          transition={
            reduce
              ? { duration: 0 }
              : { type: "spring", stiffness: 120, damping: 22 }
          }
        >
          <span
            className="block w-5 h-5 rounded-full"
            style={{
              background: "var(--color-gold-500)",
              boxShadow:
                "0 0 0 4px color-mix(in srgb, var(--color-gold-500) 22%, transparent)",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}
