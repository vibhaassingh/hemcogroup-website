"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type Tone = "ivory" | "forest" | "image" | "warm-ivory" | "ink";
type Pad = "lg" | "xl" | "cinematic";

const padMap: Record<Pad, string> = {
  lg: "section-pad",
  xl: "section-pad-lg",
  cinematic: "min-h-screen flex items-center section-pad-lg",
};

export function Section({
  children,
  tone = "ivory",
  pad = "lg",
  className = "",
  id,
  bleed = false,
}: {
  children: ReactNode;
  tone?: Tone;
  pad?: Pad;
  className?: string;
  id?: string;
  bleed?: boolean;
}) {
  return (
    <section
      id={id}
      data-tone={tone}
      className={`relative overflow-hidden ${padMap[pad]} ${className}`}
    >
      {bleed ? (
        children
      ) : (
        <div className="shell relative">{children}</div>
      )}
    </section>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  highlight,
  lede,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  highlight?: string;
  lede?: string;
  align?: "left" | "center";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={`mb-16 max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {eyebrow && (
        <p className="eyebrow mb-5 inline-flex items-center gap-2">
          <span
            className="inline-block h-px w-8"
            style={{ background: "var(--color-gold-500)" }}
          />
          {eyebrow}
        </p>
      )}
      <h2
        className="display text-[clamp(2.25rem,5vw,4.75rem)]"
        style={{ color: "var(--tone-fg)" }}
      >
        {title}
        {highlight && (
          <>
            {" "}
            <span className="display-italic opacity-60">{highlight}</span>
          </>
        )}
      </h2>
      {lede && (
        <p
          className="mt-7 lede max-w-2xl"
          style={{ color: "var(--tone-fg-mute)" }}
        >
          {lede}
        </p>
      )}
    </motion.div>
  );
}

export function GoldRule({
  className = "",
  variant = "fade",
}: {
  className?: string;
  variant?: "fade" | "solid" | "tone";
}) {
  const reduce = useReducedMotion();
  const cls =
    variant === "solid"
      ? "gold-rule-solid"
      : variant === "tone"
      ? "tone-rule"
      : "gold-rule";
  return (
    <motion.div
      role="separator"
      className={`${cls} ${className}`}
      style={{ transformOrigin: "left center" }}
      initial={{ scaleX: reduce ? 1 : 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-60px", amount: 0.6 }}
      transition={{ duration: reduce ? 0.2 : 1.0, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}
