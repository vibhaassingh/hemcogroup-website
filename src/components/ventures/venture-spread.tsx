"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { EditorialImage } from "@/components/ui/editorial-image";
import { imagery } from "@/content/imagery";
import type { Venture } from "@/content/ventures";

/**
 * Two-thirds image / one-third text editorial spread.
 * Image side alternates per index — left on even, right on odd.
 */
export function VentureSpread({
  venture,
  index = 0,
  number,
}: {
  venture: Venture;
  index?: number;
  number?: number;
}) {
  const img = imagery[venture.imagery];
  const reversed = index % 2 === 1;

  return (
    <section className="relative py-24 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div
          className={`grid gap-10 md:grid-cols-12 md:gap-16 ${
            reversed ? "md:[&>*:first-child]:order-2" : ""
          }`}
        >
          {/* Image — eight columns */}
          <div className="md:col-span-8">
            <EditorialImage
              src={img.src}
              alt={img.alt}
              caption={img.caption}
              aspect="5/4"
            />
          </div>

          {/* Text — four columns, vertically centered */}
          <div className="flex flex-col justify-center md:col-span-4">
            {number !== undefined && (
              <p className="eyebrow mb-6">
                {String(number).padStart(2, "0")} ·{" "}
                <span className="text-ink/45">{venture.sector}</span>
              </p>
            )}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="display text-[clamp(2rem,3.4vw,3.25rem)] leading-[1.05]"
            >
              {venture.name}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 1,
                delay: 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="display-italic mt-4 text-[1.25rem] leading-snug text-ink/65"
            >
              {venture.tagline}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 1,
                delay: 0.25,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-8 text-[15px] leading-[1.75] text-ink-2/80"
            >
              {venture.description}
            </motion.p>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-[10.5px] font-medium uppercase tracking-[0.24em]">
              <Link
                href={`/ventures/${venture.slug}`}
                className="rise-underline text-ink/85 hover:text-ink"
              >
                Read more →
              </Link>
              {venture.domain && (
                <a
                  href={`https://${venture.domain}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rise-underline text-ink/55 hover:text-ink"
                >
                  Visit {venture.domain} ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
