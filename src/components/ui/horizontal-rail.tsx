"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef, type ReactNode } from "react";

/**
 * Apple/2050-style pinned horizontal rail.
 * The container is tall (~3× viewport), and the inner row translates
 * horizontally as the user scrolls vertically. Pinning is done via
 * sticky positioning on the inner viewport.
 *
 * Falls back to a normal horizontal scroller when prefers-reduced-motion.
 */
export function HorizontalRail({
  children,
  /** Total scroll length in viewport heights. */
  scrollLength = 3,
  /** Height of the sticky inner row, in viewport heights. */
  trackHeight = 1,
  /** Final translation as a percentage of the row width. -75 = scroll 75% to the left. */
  translatePercent = -72,
}: {
  children: ReactNode;
  scrollLength?: number;
  trackHeight?: number;
  translatePercent?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `${translatePercent}%`],
  );

  if (reduce) {
    return (
      <div
        className="overflow-x-auto"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <div className="flex gap-6 px-6 md:px-10">{children}</div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      style={{ height: `${scrollLength * 100}vh` }}
      className="relative"
    >
      <div
        className="sticky top-0 flex items-center overflow-hidden"
        style={{ height: `${trackHeight * 100}vh` }}
      >
        <motion.div
          style={{ x }}
          className="flex gap-6 will-change-transform"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
