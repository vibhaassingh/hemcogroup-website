"use client";

import { motion, useScroll, useSpring } from "motion/react";

/**
 * Gold scroll-progress hairline pinned to the top edge of the viewport.
 * Tracks the document's scroll position 0 → 1 and scales horizontally
 * from the left. Mounted on long-form pages (journal articles, story).
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.4,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed left-0 right-0 top-0 h-px"
      style={{
        zIndex: 60,
        scaleX,
        transformOrigin: "left center",
        background:
          "linear-gradient(90deg, var(--color-gold-300), var(--color-gold-500) 60%, var(--color-gold-300))",
        boxShadow:
          "0 0 8px color-mix(in srgb, var(--color-gold-500) 60%, transparent)",
      }}
    />
  );
}
