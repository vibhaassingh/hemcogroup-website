"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

/**
 * Looping editorial video — silent, autoplay, plays-inline. No overlay text.
 * Behaves identically to EditorialImage (slow opacity reveal + 12% parallax),
 * with a poster image as fallback.
 */
export function EditorialVideo({
  src,
  poster,
  caption,
  aspect = "5/4",
  className = "",
  parallax = true,
}: {
  src: string;
  poster?: string;
  caption?: string;
  aspect?: "4/5" | "3/4" | "16/10" | "1/1" | "5/4" | "21/9";
  className?: string;
  parallax?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <figure className={`relative ${className}`}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden bg-bone-2"
        style={{ aspectRatio: aspect.replace("/", " / ") }}
      >
        <motion.div
          className="absolute inset-[-6%]"
          style={parallax ? { y } : undefined}
        >
          <video
            src={src}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="h-full w-full object-cover"
            aria-hidden
          />
        </motion.div>
      </motion.div>
      {caption && (
        <figcaption className="mt-4 text-[10.5px] font-medium uppercase tracking-[0.24em] text-ink/55">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
