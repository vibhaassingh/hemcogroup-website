"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "motion/react";
import {
  type CSSProperties,
  type ReactNode,
  useRef,
} from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

type BaseProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
  style?: CSSProperties;
  /** Distance to travel on enter, in px. Default 24. */
  y?: number;
};

/**
 * Apple-style fade + slight rise, scroll-triggered.
 * Honours prefers-reduced-motion: collapses to a quick opacity fade.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  once = true,
  style,
  y = 24,
}: BaseProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{
        duration: reduce ? 0.3 : 0.9,
        delay: reduce ? 0 : delay,
        ease: EASE,
      }}
    >
      {children}
    </motion.div>
  );
}

/** Backwards-compat alias for the older FadeUp name. */
export const FadeUp = Reveal;

/** Word-by-word headline reveal with a rising mask. */
export function WordReveal({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  if (reduce) {
    return <span className={className}>{text}</span>;
  }
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ staggerChildren: 0.06, delayChildren: delay }}
    >
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          className="inline-block overflow-hidden align-bottom"
        >
          <motion.span
            className="inline-block will-change-transform"
            variants={
              {
                hidden: { y: "100%", opacity: 0 },
                visible: { y: 0, opacity: 1 },
              } satisfies Variants
            }
            transition={{ duration: 0.9, ease: EASE }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/** Stagger a grid of children. Children must use StaggerItem. */
export function StaggerGroup({
  children,
  className,
  staggerChildren = 0.08,
  delayChildren = 0,
}: {
  children: ReactNode;
  className?: string;
  staggerChildren?: number;
  delayChildren?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: reduce ? 0 : staggerChildren,
            delayChildren: reduce ? 0 : delayChildren,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  style,
  y = 24,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      style={style}
      variants={
        {
          hidden: { opacity: 0, y: reduce ? 0 : y },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: reduce ? 0.3 : 0.9, ease: EASE },
          },
        } satisfies Variants
      }
    >
      {children}
    </motion.div>
  );
}

export function DrawHairline({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={`h-px origin-left bg-bone-3 ${className}`}
      initial={{ scaleX: reduce ? 1 : 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.2, ease: EASE }}
    />
  );
}

export function useInViewOnce() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return { ref, inView };
}
