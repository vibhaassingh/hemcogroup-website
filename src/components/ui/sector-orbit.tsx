"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  animate,
} from "motion/react";
import { sectorOrder, sectors } from "@/content/sectors";
import { imagery } from "@/content/imagery";

/**
 * Five-sector compass — sectors arranged on a horizontal carousel that
 * rotates as the user drags or scrolls. The frontmost sector is the
 * one whose image fills the central plate; the names fan out as a
 * radial menu around it.
 */
export function SectorOrbit() {
  const reduce = useReducedMotion();
  const items = sectorOrder.map((s) => sectors[s]);
  const count = items.length;
  const [active, setActive] = useState(0);
  const angle = useMotionValue(0);
  const angleSpring = useSpring(angle, {
    stiffness: reduce ? 400 : 80,
    damping: reduce ? 40 : 18,
    mass: 0.8,
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef<{ x: number; a: number } | null>(null);

  useEffect(() => {
    const unsub = angleSpring.on("change", (v) => {
      const step = 360 / count;
      const norm = ((Math.round(-v / step) % count) + count) % count;
      setActive(norm);
    });
    return () => unsub();
  }, [angleSpring, count]);

  const goTo = (i: number) => {
    const step = 360 / count;
    if (reduce) {
      angle.set(-i * step);
      return;
    }
    animate(angle, -i * step, { type: "spring", stiffness: 90, damping: 20 });
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    dragStart.current = { x: e.clientX, a: angle.get() };
    (e.target as Element).setPointerCapture(e.pointerId);
  };
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragStart.current) return;
    const dx = e.clientX - dragStart.current.x;
    angle.set(dragStart.current.a + dx * 0.5);
  };
  const handlePointerUp = () => {
    if (!dragStart.current) return;
    const step = 360 / count;
    const v = angle.get();
    const target = Math.round(v / step) * step;
    if (reduce) {
      angle.set(target);
    } else {
      animate(angle, target, { type: "spring", stiffness: 110, damping: 22 });
    }
    dragStart.current = null;
  };

  const activeSector = items[active];
  const heroImg = imagery[activeSector.hero];

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ minHeight: "min(720px, 90vh)" }}
    >
      {/* Center plate */}
      <div
        className="relative mx-auto"
        style={{
          width: "min(560px, 80vw)",
          aspectRatio: "4/5",
          perspective: "1400px",
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div
          className="relative w-full h-full overflow-hidden cursor-grab active:cursor-grabbing"
          style={{ background: "var(--color-forest-900)" }}
        >
          {items.map((s, i) => (
            <SectorPlate
              key={s.slug}
              index={i}
              count={count}
              angle={angleSpring}
              img={imagery[s.hero].src}
              alt={imagery[s.hero].alt}
            />
          ))}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, transparent 50%, rgba(13,40,24,0.85))",
            }}
          />
          <div className="absolute inset-x-5 bottom-5 md:inset-x-7 md:bottom-7 text-white pointer-events-none">
            <div className="glass-light glass-sheen rounded-[6px] p-6 md:p-7">
              <p
                className="caption mb-3"
                style={{ color: "var(--color-gold-300)" }}
              >
                Sector {activeSector.ordinal} of VII
              </p>
              <p className="display text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[0.98]">
                {activeSector.name}
              </p>
              <p className="lede mt-3 max-w-md opacity-90">{activeSector.ethos}</p>
            </div>
          </div>
        </div>

        <p
          className="caption text-center mt-6 select-none"
          style={{ color: "var(--tone-fg-mute)" }}
        >
          Drag to explore · {heroImg.caption}
        </p>
      </div>

      {/* Sector tab strip */}
      <div className="mt-10 md:mt-12 grid grid-cols-5 gap-1.5 md:gap-3 max-w-3xl mx-auto px-2">
        {items.map((s, i) => (
          <button
            key={s.slug}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Sector ${s.ordinal}, ${s.name}`}
            aria-pressed={i === active}
            className={`group flex flex-col items-center gap-1.5 md:gap-2 py-3 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[color:var(--color-gold-500)] focus-visible:ring-offset-2 ${
              i === active
                ? "text-[color:var(--color-gold-500)]"
                : "text-[color:var(--tone-fg-mute)] hover:text-[color:var(--tone-fg)]"
            }`}
          >
            <span
              className="block h-px w-full transition-colors"
              style={{
                background:
                  i === active
                    ? "var(--color-gold-500)"
                    : "color-mix(in srgb, var(--tone-fg) 18%, transparent)",
              }}
            />
            <span className="caption">{s.ordinal}</span>
            <span className="text-[10px] md:text-[12px] tracking-wide leading-tight text-center">
              {s.name}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          href={`/sectors/${activeSector.slug}`}
          className="btn btn-gold"
        >
          Enter {activeSector.name}
        </Link>
      </div>
    </div>
  );
}

function SectorPlate({
  index,
  count,
  angle,
  img,
  alt,
}: {
  index: number;
  count: number;
  angle: ReturnType<typeof useMotionValue<number>>;
  img: string;
  alt: string;
}) {
  const step = 360 / count;
  const rotateY = useTransform(angle, (v) => v + index * step);
  const opacity = useTransform(rotateY, (r) => {
    const m = ((r % 360) + 360) % 360;
    const dist = Math.min(m, 360 - m);
    return Math.max(0, 1 - dist / 60);
  });
  const z = useTransform(rotateY, (r) => {
    const m = ((r % 360) + 360) % 360;
    const dist = Math.min(m, 360 - m);
    return -dist;
  });
  return (
    <motion.div
      className="absolute inset-0"
      style={{ opacity, zIndex: z, willChange: "opacity" }}
    >
      <Image
        src={img}
        alt={alt}
        fill
        sizes="560px"
        className="object-cover pointer-events-none select-none"
        style={{ filter: "saturate(0.92) contrast(1.08)" }}
        draggable={false}
      />
    </motion.div>
  );
}
