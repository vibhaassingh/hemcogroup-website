"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { CSSProperties } from "react";

/**
 * Headline reveal — text rises from a clipped mask with light blur dissolving
 * as it lands. `split` controls granularity: "word" (default) staggers by word,
 * "char" staggers per character for tighter cinematic titles. Used on the
 * cinematic hero. Honours prefers-reduced-motion.
 */
export function MaskReveal({
  text,
  className,
  delay = 0,
  staggerChildren,
  style,
  as = "h1",
  split = "word",
}: {
  text: string;
  className?: string;
  delay?: number;
  staggerChildren?: number;
  style?: CSSProperties;
  as?: "h1" | "h2" | "p" | "span";
  split?: "word" | "char";
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as] as typeof motion.span;
  const stagger = staggerChildren ?? (split === "char" ? 0.02 : 0.04);

  if (reduce) {
    return (
      <Tag className={className} style={style}>
        {text}
      </Tag>
    );
  }

  if (split === "char") {
    const chars = Array.from(text);
    return (
      <Tag
        className={className}
        style={style}
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: stagger, delayChildren: delay }}
      >
        {chars.map((c, i) => {
          if (c === " ") {
            return (
              <span key={`sp-${i}`} className="inline-block">
                {" "}
              </span>
            );
          }
          return (
            <span
              key={`${c}-${i}`}
              className="inline-block overflow-hidden align-bottom"
            >
              <motion.span
                className="inline-block will-change-transform"
                variants={
                  {
                    hidden: { y: "120%", opacity: 0, filter: "blur(8px)" },
                    visible: {
                      y: 0,
                      opacity: 1,
                      filter: "blur(0px)",
                      transition: {
                        duration: 1.05,
                        ease: [0.16, 1, 0.3, 1],
                      },
                    },
                  } satisfies Variants
                }
              >
                {c}
              </motion.span>
            </span>
          );
        })}
      </Tag>
    );
  }

  const words = text.split(" ");
  return (
    <Tag
      className={className}
      style={style}
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-bottom"
        >
          <motion.span
            className="inline-block will-change-transform"
            variants={
              {
                hidden: { y: "120%", opacity: 0, filter: "blur(8px)" },
                visible: {
                  y: 0,
                  opacity: 1,
                  filter: "blur(0px)",
                  transition: {
                    duration: 1.05,
                    ease: [0.16, 1, 0.3, 1],
                  },
                },
              } satisfies Variants
            }
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
