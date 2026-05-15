"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

/**
 * Editorial image primitive — slow fade + reveal + 12% parallax travel.
 * Caption sits below in small caps, museum-plaque style.
 *
 * Uses Next/Image with sizes hint for responsive loading.
 */
export function EditorialImage({
  src,
  alt,
  caption,
  aspect = "4/5",
  priority = false,
  className = "",
  parallax = true,
}: {
  src: string;
  alt: string;
  caption?: string;
  aspect?: "4/5" | "3/4" | "16/10" | "1/1" | "5/4" | "21/9";
  priority?: boolean;
  className?: string;
  parallax?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // 12% travel — subtle, never theatrical.
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
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 66vw, 100vw"
            className="object-cover"
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
