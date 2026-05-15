"use client";

import { motion, useReducedMotion } from "motion/react";
import Image, { type ImageProps } from "next/image";
import type { CSSProperties, ReactNode } from "react";

type Direction = "top" | "bottom" | "left" | "right";

const insetFor: Record<Direction, string> = {
  top: "inset(100% 0 0 0)",
  bottom: "inset(0 0 100% 0)",
  left: "inset(0 100% 0 0)",
  right: "inset(0 0 0 100%)",
};

/**
 * Inset clip-path reveal for images. Wraps a fixed-aspect container; the image
 * fills it. Pass through any next/image props via `imageProps`. Children render
 * above the image (for overlays / captions) — they fade in once the clip lands.
 */
export function ImageReveal({
  imageProps,
  direction = "top",
  delay = 0,
  duration = 1.2,
  className,
  style,
  children,
}: {
  imageProps: ImageProps;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  const reduce = useReducedMotion();
  const start = reduce ? "inset(0 0 0 0)" : insetFor[direction];
  return (
    <div className={className} style={{ position: "relative", ...style }}>
      <motion.div
        style={{ position: "absolute", inset: 0, willChange: "clip-path" }}
        initial={{ clipPath: start }}
        whileInView={{ clipPath: "inset(0 0 0 0)" }}
        viewport={{ once: true, amount: 0.3, margin: "-40px" }}
        transition={{
          duration: reduce ? 0 : duration,
          delay: reduce ? 0 : delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <Image {...imageProps} />
      </motion.div>
      {children}
    </div>
  );
}
