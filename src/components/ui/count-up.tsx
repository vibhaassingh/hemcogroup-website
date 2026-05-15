"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  animate,
} from "motion/react";
import { useEffect, useRef } from "react";

/**
 * Animated stat counter — counts from 0 to `to` when scrolled into view.
 * Respects prefers-reduced-motion: jumps to final value with a fade.
 *
 * Example: <CountUp to={11} suffix=" companies" />
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
  const value = useMotionValue(0);
  const display = useTransform(value, (n) => Math.floor(n).toLocaleString());

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      value.set(to);
      return;
    }
    const controls = animate(value, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [inView, to, duration, reduce, value]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}
