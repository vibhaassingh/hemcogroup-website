"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  animate,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * Animated stat counter — progressively enhanced.
 *
 * Truth first: the real value is rendered on the server, for no-JS
 * clients, for crawlers/screen-readers, and under prefers-reduced-motion.
 * Only after hydration AND once scrolled into view does it swap to the
 * 0→`to` count-up animation (screen-readers still read the true value
 * via aria-label). This avoids the old bug where SSR/no-JS showed "0".
 *
 * Example: <CountUp to={13} suffix=" companies" />
 */
export function CountUp({
  to,
  prefix = "",
  suffix = "",
  duration = 1.6,
  className,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const value = useMotionValue(0);
  const display = useTransform(value, (n) => Math.floor(n).toLocaleString());
  const finalText = `${prefix}${to.toLocaleString()}${suffix}`;

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted || !inView || reduce) return;
    const controls = animate(value, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [mounted, inView, reduce, to, duration, value]);

  // SSR, no-JS, reduced-motion, and pre-scroll all show the real number.
  if (!mounted || reduce || !inView) {
    return (
      <span ref={ref} className={className}>
        {finalText}
      </span>
    );
  }

  // Enhanced: animate 0→to once in view. aria-label keeps the truth for SR.
  return (
    <span ref={ref} className={className} aria-label={finalText}>
      {prefix}
      <motion.span aria-hidden>{display}</motion.span>
      {suffix}
    </span>
  );
}
