"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import type { Venture } from "@/content/ventures";
import { imagery } from "@/content/imagery";

/**
 * Refined image-on-top venture card. Border, restrained corners, hover lift.
 * Used in the home and /ventures grids.
 */
export function AreaCard({
  venture,
  index = 0,
  number,
}: {
  venture: Venture;
  index?: number;
  number?: number;
}) {
  const img = imagery[venture.imagery];
  const reduce = useReducedMotion();

  return (
    <motion.article
      initial={{ opacity: 0, y: reduce ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: reduce ? 0.3 : 0.9,
        delay: reduce ? 0 : (index % 6) * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link
        href={`/ventures/${venture.slug}`}
        className="card-surface group flex h-full flex-col"
      >
        <div className="card-image-wrap relative aspect-[4/3] bg-bone-2">
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col p-7 md:p-8">
          <div className="flex items-center justify-between gap-3">
            {number !== undefined && (
              <span className="eyebrow idx text-ink/45">
                {String(number).padStart(2, "0")}
              </span>
            )}
            <span className="eyebrow text-ink/55">{venture.sector}</span>
          </div>
          <h3 className="display-tight mt-5 text-[clamp(1.375rem,1.8vw,1.625rem)]">
            {venture.name}
          </h3>
          <p className="mt-3 text-[0.9375rem] leading-[1.6] text-ink-2/70">
            {venture.tagline}
          </p>
          <div className="mt-7 flex items-center justify-between border-t border-bone-3 pt-5">
            <span className="text-xs text-ink/55">
              {venture.domain ?? "In development"}
            </span>
            <span className="text-xs font-medium text-ink/85 transition-transform duration-500 group-hover:translate-x-1">
              Read →
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
