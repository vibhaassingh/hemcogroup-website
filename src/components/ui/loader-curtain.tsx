"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

const SESSION_KEY = "hemco.loaderShown";
const WORDMARK = "HEMCO GROUP";
const TAGLINE = "A house of industries";

/** Total time the curtain is on screen, including the split-exit. */
const TOTAL_MS = 2700;

const ease = [0.16, 1, 0.3, 1] as const;
const easeCurtain = [0.7, 0, 0.2, 1] as const;

/**
 * First-paint loader curtain — editorial overture.
 *
 * The brief: feel like the opening page of a monograph rather than a
 * generic spinner. Three movements:
 *   1. The frame settles. Hairline corner rules and tiny mono labels
 *      (established MCMXCVIII · north india · index counter) bracket the
 *      stage in the way an art-book half-title page does.
 *   2. The wordmark draws in letter by letter, gold rule under it sweeps
 *      out from the centre, the tagline fades in, the counter ticks 00 →
 *      100. Everything resolves on a single beat.
 *   3. The curtain splits. The top half lifts up, the bottom half sinks
 *      down — a cinematic iris rather than a single panel pull. The
 *      page beneath is revealed already settled.
 *
 * Runs once per session (sessionStorage gate) and is skipped entirely
 * under prefers-reduced-motion.
 */
export function LoaderCurtain() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduce) return;
    if (typeof window === "undefined") return;
    const shown = window.sessionStorage.getItem(SESSION_KEY);
    if (shown) return;
    setVisible(true);
    window.sessionStorage.setItem(SESSION_KEY, "1");
  }, [reduce]);

  useEffect(() => {
    if (!visible) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => {
      setVisible(false);
    }, TOTAL_MS);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prevOverflow;
    };
  }, [visible]);

  // Counter: animates 00 → 100 over ~1.4s, starting after the wordmark
  // has begun resolving. Uses a linear-ish curve so the digits feel like
  // a physical counter rather than a Bezier ease.
  useEffect(() => {
    if (!visible) return;
    const start = performance.now() + 350;
    const dur = 1400;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.max(0, Math.min(1, (now - start) / dur));
      // Slight ease-out so it lands cleanly on 100.
      const eased = 1 - Math.pow(1 - t, 1.6);
      setCount(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible]);

  // After the curtain lifts, nudge the nav so it re-probes tone immediately.
  useEffect(() => {
    if (visible) return;
    if (typeof window === "undefined") return;
    window.dispatchEvent(new Event("scroll"));
  }, [visible]);

  if (reduce) return null;

  const letters = Array.from(WORDMARK);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="curtain-root"
          aria-hidden
          className="fixed inset-0 pointer-events-none"
          style={{ zIndex: 110 }}
        >
          {/* Top half — lifts up on exit. */}
          <motion.div
            className="absolute inset-x-0 top-0 overflow-hidden"
            style={{
              height: "50%",
              background: "var(--color-ivory)",
              borderBottom:
                "1px solid color-mix(in srgb, var(--color-ink) 6%, transparent)",
            }}
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 1.05, ease: easeCurtain, delay: 0.05 }}
          >
            {/* Soft vertical fluted texture — picks up the fluted-glass
                language used in the mega menu. Ultra-subtle. */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.045] pointer-events-none"
              style={{
                background: `repeating-linear-gradient(90deg,
                  rgba(0,0,0,0.55) 0px,
                  rgba(0,0,0,0.00) 3px,
                  rgba(0,0,0,0.55) 7px,
                  rgba(0,0,0,0.00) 12px)`,
              }}
            />
            {/* Warm vignette — top corners catch a little gold. */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(60% 60% at 100% 0%, color-mix(in srgb, var(--color-gold-300) 14%, transparent) 0%, transparent 60%)",
              }}
            />
          </motion.div>

          {/* Bottom half — sinks down on exit. */}
          <motion.div
            className="absolute inset-x-0 bottom-0 overflow-hidden"
            style={{
              height: "50%",
              background: "var(--color-ivory)",
            }}
            initial={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 1.05, ease: easeCurtain, delay: 0.05 }}
          >
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.045] pointer-events-none"
              style={{
                background: `repeating-linear-gradient(90deg,
                  rgba(0,0,0,0.55) 0px,
                  rgba(0,0,0,0.00) 3px,
                  rgba(0,0,0,0.55) 7px,
                  rgba(0,0,0,0.00) 12px)`,
              }}
            />
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(60% 60% at 0% 100%, color-mix(in srgb, var(--color-gold-300) 12%, transparent) 0%, transparent 60%)",
              }}
            />
          </motion.div>

          {/* Editorial overlay — frame, wordmark, rule, tagline, counter.
              Lives on its own layer so it can fade out independently of the
              two splitting curtain panels. */}
          <motion.div
            className="absolute inset-0 flex flex-col"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease, delay: 0.15 }}
          >
            {/* Top frame — corner mono labels + hairline */}
            <div className="relative px-8 md:px-14 pt-8 md:pt-10">
              <motion.div
                className="flex items-baseline justify-between"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease, delay: 0.05 }}
              >
                <span
                  className="caption data"
                  style={{
                    color: "color-mix(in srgb, var(--color-ink) 60%, transparent)",
                    letterSpacing: "0.28em",
                    fontSize: "10.5px",
                  }}
                >
                  Established · MCMXCVIII
                </span>
                <span
                  className="caption data"
                  style={{
                    color: "color-mix(in srgb, var(--color-ink) 60%, transparent)",
                    letterSpacing: "0.28em",
                    fontSize: "10.5px",
                  }}
                >
                  North India
                </span>
              </motion.div>
              {/* Top hairline draws from the right */}
              <motion.div
                className="mt-5 h-px origin-right"
                style={{
                  background:
                    "color-mix(in srgb, var(--color-ink) 14%, transparent)",
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.0, ease, delay: 0.15 }}
              />
            </div>

            {/* Centre stage — wordmark + rule + tagline */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 -mt-2">
              {/* Wordmark — letter-by-letter rise */}
              <motion.div
                className="flex"
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ staggerChildren: 0.05, delayChildren: 0.25 }}
              >
                {letters.map((c, i) => (
                  <span
                    key={`${c}-${i}`}
                    className="inline-block overflow-hidden"
                    style={{ paddingBottom: "0.08em" }}
                  >
                    <motion.span
                      className="display inline-block will-change-transform text-[clamp(2.25rem,6vw,4.5rem)]"
                      style={{
                        letterSpacing: "0.32em",
                        color: "var(--color-ink)",
                        lineHeight: 1.05,
                      }}
                      variants={{
                        hidden: {
                          y: "115%",
                          opacity: 0,
                          filter: "blur(10px)",
                        },
                        visible: {
                          y: 0,
                          opacity: 1,
                          filter: "blur(0px)",
                          transition: { duration: 1.0, ease },
                        },
                        exit: {
                          opacity: 0,
                          transition: { duration: 0.35, ease },
                        },
                      }}
                    >
                      {c === " " ? " " : c}
                    </motion.span>
                  </span>
                ))}
              </motion.div>

              {/* Gold accent rule — sweeps out from centre */}
              <motion.div
                className="mt-7 h-[1.5px] w-24"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, var(--color-gold-500) 50%, transparent 100%)",
                  transformOrigin: "center",
                }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.95, ease, delay: 0.85 }}
              />

              {/* Tagline — quiet italic */}
              <motion.p
                className="display-italic mt-6 text-[clamp(0.95rem,1.4vw,1.2rem)]"
                style={{
                  color: "color-mix(in srgb, var(--color-ink) 62%, transparent)",
                  letterSpacing: "0.01em",
                }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease, delay: 1.05 }}
              >
                {TAGLINE}
              </motion.p>
            </div>

            {/* Bottom frame — counter + index */}
            <div className="relative px-8 md:px-14 pb-8 md:pb-10">
              {/* Bottom hairline draws from the left */}
              <motion.div
                className="mb-5 h-px origin-left"
                style={{
                  background:
                    "color-mix(in srgb, var(--color-ink) 14%, transparent)",
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.0, ease, delay: 0.2 }}
              />
              <motion.div
                className="flex items-baseline justify-between"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease, delay: 0.25 }}
              >
                <span
                  className="caption data"
                  style={{
                    color: "var(--color-ink)",
                    letterSpacing: "0.22em",
                    fontSize: "10.5px",
                  }}
                >
                  {String(count).padStart(3, "0")}
                  <span
                    style={{
                      color:
                        "color-mix(in srgb, var(--color-ink) 38%, transparent)",
                    }}
                  >
                    {" "}/ 100
                  </span>
                </span>
                <span
                  className="caption data"
                  style={{
                    color: "color-mix(in srgb, var(--color-ink) 60%, transparent)",
                    letterSpacing: "0.28em",
                    fontSize: "10.5px",
                  }}
                >
                  VII Sectors · XI Brands
                </span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
