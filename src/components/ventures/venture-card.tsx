"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { Venture } from "@/content/ventures";

export function VentureCard({ venture, index = 0 }: { venture: Venture; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
        delay: (index % 6) * 0.05,
      }}
      className="group relative"
    >
      <Link
        href={`/ventures/${venture.slug}`}
        className="block h-full overflow-hidden rounded-2xl border border-ink/10 bg-mute-50 transition-colors duration-500 hover:border-ink/25"
      >
        <div
          className="relative aspect-[4/3] overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${venture.accent} 0%, ${venture.accentSoft} 100%)`,
          }}
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-30 mix-blend-overlay"
            style={{
              background:
                "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.6), transparent 50%)",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <span
              className="display text-center text-[clamp(1.5rem,3vw,2.25rem)] leading-none text-white/95"
              style={{ letterSpacing: "-0.02em" }}
            >
              {venture.wordmark}
            </span>
          </div>
          {venture.status !== "Operational" && (
            <div className="absolute right-4 top-4">
              <span className="rounded-full bg-ink/80 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-bone backdrop-blur">
                {venture.status === "Upcoming" ? "Coming soon" : "TBC"}
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-3 p-6">
          <div className="flex items-center justify-between gap-3">
            <p className="eyebrow">{venture.sector}</p>
            {venture.domain && (
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/40">
                {venture.domain}
              </span>
            )}
          </div>
          <h3 className="display text-2xl leading-tight">{venture.name}</h3>
          <p className="text-sm leading-relaxed text-ink/65">{venture.tagline}</p>
          <div className="mt-2 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-ink/70 transition-transform duration-500 group-hover:translate-x-1">
            <span>Explore</span>
            <span aria-hidden>→</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
