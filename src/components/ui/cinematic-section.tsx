"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef, type ReactNode } from "react";

/**
 * Pinned full-bleed editorial section with subtle parallax.
 * Use for sector heroes, manifesto panels, venture origin stories.
 */
export function CinematicSection({
  image,
  alt,
  video,
  poster,
  children,
  height = "100vh",
  align = "center",
  overlay = "vignette",
  overlayCss,
  parallax = true,
  tone = "image",
  priority = false,
  glassPlate = true,
}: {
  /** Image src, used when no `video` is provided or as the poster background. */
  image: string;
  alt: string;
  /** Optional looped video — replaces the image as the cinematic background. */
  video?: string;
  /** Optional explicit poster src for the video. Defaults to `image`. */
  poster?: string;
  children?: ReactNode;
  height?: string;
  align?: "top" | "center" | "bottom";
  overlay?: "vignette" | "dim" | "none";
  /** Bespoke CSS background string painted over the hero. Overrides `overlay` when set. */
  overlayCss?: string;
  parallax?: boolean;
  tone?: "image" | "forest";
  priority?: boolean;
  /** When false, child content renders without the glass plate (useful when
   * the children manage their own surface or are simple typography). */
  glassPlate?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], parallax ? ["-8%", "8%"] : ["0%", "0%"]);
  const scale = useTransform(scrollYProgress, [0, 1], parallax ? [1.08, 1] : [1, 1]);

  const alignCls =
    align === "top"
      ? "items-start pt-32"
      : align === "bottom"
      ? "items-end pb-24"
      : "items-center";

  return (
    <section
      ref={ref}
      data-tone={tone}
      className="relative overflow-hidden w-full"
      style={{ height, position: "relative" }}
    >
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        {video ? (
          <video
            src={video}
            poster={poster ?? image}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
            style={{ filter: "saturate(0.92) contrast(1.06)" }}
          />
        ) : (
          <Image
            src={image}
            alt={alt}
            fill
            sizes="100vw"
            priority={priority}
            className="object-cover"
            style={{ filter: "saturate(0.92) contrast(1.06)" }}
          />
        )}
      </motion.div>
      {overlayCss ? (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: overlayCss }}
        />
      ) : (
        overlay !== "none" && (
          <div
            className={`absolute inset-0 ${overlay === "vignette" ? "hero-vignette" : ""}`}
            style={
              overlay === "dim"
                ? { background: "linear-gradient(180deg, rgba(13,40,24,0.35), rgba(13,40,24,0.65))" }
                : undefined
            }
          />
        )
      )}
      <div className={`relative z-10 flex h-full ${alignCls}`}>
        <div className="shell w-full">
          {children ? (
            glassPlate ? (
              <div className="glass-light glass-sheen rounded-[6px] p-7 md:p-10 max-w-5xl">
                {children}
              </div>
            ) : (
              <div className="max-w-5xl">{children}</div>
            )
          ) : null}
        </div>
      </div>
    </section>
  );
}
