"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import type { JournalEntry } from "@/content/journal";

export function NewsCard({
  entry,
  index = 0,
}: {
  entry: JournalEntry;
  index?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.article
      initial={{ opacity: 0, y: reduce ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: reduce ? 0.3 : 0.9,
        delay: reduce ? 0 : index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link
        href={`/world/journal/${entry.slug}`}
        className="card-surface group flex h-full flex-col p-7 md:p-8"
      >
        <div className="flex items-center justify-between">
          <span
            className="caption"
            style={{ color: "var(--color-gold-500)" }}
          >
            {entry.category}
          </span>
          <span className="caption data opacity-60">{entry.date}</span>
        </div>
        <h3 className="display mt-7 text-[clamp(1.5rem,2vw,1.85rem)] leading-[1.1]">
          {entry.title}
        </h3>
        <p className="mt-5 body-sans opacity-75">{entry.dek}</p>
        <span
          className="mt-auto pt-8 caption inline-flex items-center gap-2 transition-colors group-hover:text-[color:var(--color-gold-500)]"
        >
          Read note <span aria-hidden>→</span>
        </span>
      </Link>
    </motion.article>
  );
}
