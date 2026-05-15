"use client";

import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";
import { ParametricGradient } from "./parametric-gradient";

/**
 * Pinned cinematic hero. A parametric WebGL gradient (or video / poster
 * fallback) stays full-bleed while the headline content scales down + fades
 * as the user scrolls past the first viewport.
 */
export function CinematicHero({
  videoSrc,
  poster,
  gradient = false,
  children,
}: {
  videoSrc?: string;
  poster?: string;
  gradient?: boolean;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  useEffect(() => {
    document.body.dataset.heroOnPhoto = "1";
    return () => {
      delete document.body.dataset.heroOnPhoto;
    };
  }, []);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, reduce ? 1 : 0]);
  const blurPx = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 8]);
  const filter = useMotionTemplate`blur(${blurPx}px)`;

  return (
    <section ref={ref} className="relative h-[110vh]" style={{ position: "relative" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-night">
        {/* Background — parametric gradient by default; video / poster fallbacks */}
        {gradient ? (
          <ParametricGradient />
        ) : videoSrc ? (
          <video
            src={videoSrc}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover opacity-60"
            aria-hidden
            style={{ filter: "saturate(0.6) brightness(0.55) contrast(1.1)" }}
          />
        ) : poster ? (
          <div
            aria-hidden
            className="absolute inset-0 h-full w-full bg-cover bg-center opacity-70"
            style={{
              backgroundImage: `url(${poster})`,
              filter: "saturate(0.6) brightness(0.55) contrast(1.05)",
            }}
          />
        ) : null}

        {/* Vignette + soft bottom + base darken to lift type */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 40%, transparent 0%, rgba(11,11,12,0.45) 80%, rgba(11,11,12,0.65) 100%), linear-gradient(180deg, rgba(11,11,12,0) 0%, rgba(11,11,12,0.35) 55%, rgba(11,11,12,0.7) 88%, var(--color-bone) 100%)",
          }}
        />

        {/* Subtle ember glow behind the headline */}
        <div
          aria-hidden
          className="hero-glow pointer-events-none absolute inset-x-0 bottom-0 h-2/3"
        />

        {/* Content */}
        <motion.div
          style={{ scale, opacity, filter }}
          className="relative z-10 flex h-full flex-col justify-end pb-24 md:pb-32"
        >
          <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10">
            {children}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function ScrollHint({
  label = "Scroll",
  tone = "ink",
}: {
  label?: string;
  tone?: "ink" | "light";
}) {
  const colorText = tone === "light" ? "text-white/70" : "text-ink/55";
  const colorBar = tone === "light" ? "bg-white/70" : "bg-ink/55";
  return (
    <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center md:bottom-10">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className={`mono flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.28em] ${colorText}`}
      >
        <span>{label}</span>
        <motion.span
          className={`block h-6 w-px ${colorBar}`}
          animate={{ scaleY: [0.4, 1, 0.4], originY: 0 }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
}
