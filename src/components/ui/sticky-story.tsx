"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef, type ReactNode } from "react";

export interface Step {
  index: string;
  eyebrow: string;
  title: string;
  body: string;
  image: { src: string; alt: string };
}

/**
 * One cross-fading image in the sticky column. Extracted into its own
 * component so each useTransform sits at the top level of a component
 * (satisfies react-hooks/rules-of-hooks) instead of inside a .map callback.
 */
function StickyImage({
  step,
  index,
  total,
  scrollYProgress,
}: {
  step: Step;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const start = index / total;
  const peak = (index + 0.5) / total;
  const end = (index + 1) / total;
  const opacity = useTransform(
    scrollYProgress,
    [
      Math.max(0, start - 0.05),
      Math.max(0, start + 0.02),
      peak,
      Math.min(1, end - 0.02),
      Math.min(1, end + 0.05),
    ],
    index === 0
      ? [1, 1, 1, 1, 0]
      : index === total - 1
        ? [0, 1, 1, 1, 1]
        : [0, 1, 1, 1, 0],
  );
  const scale = useTransform(
    scrollYProgress,
    [start, peak, end],
    [1.05, 1, 1.05],
  );
  return (
    <motion.div style={{ opacity, scale }} className="absolute inset-0">
      <Image
        src={step.image.src}
        alt={step.image.alt}
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover"
      />
    </motion.div>
  );
}

/**
 * Apple-style sticky storytelling. The image column pins to the viewport
 * while the text column scrolls; the active image cross-fades based on
 * which step is centred.
 *
 * Honours prefers-reduced-motion: image stays as a static collage,
 * steps render as a regular list.
 */
export function StickyStory({
  eyebrow,
  heading,
  steps,
}: {
  eyebrow?: string;
  heading: ReactNode;
  steps: Step[];
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <section className="relative py-32 md:py-40">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10">
          {eyebrow && <p className="eyebrow mb-8">{eyebrow}</p>}
          <h2 className="display max-w-3xl text-[clamp(2rem,4vw,3.75rem)]">
            {heading}
          </h2>
          <div className="mt-16 space-y-16">
            {steps.map((s) => (
              <div key={s.index} className="grid gap-8 md:grid-cols-12">
                <div className="md:col-span-6">
                  <div className="relative aspect-[5/4] overflow-hidden bg-bone-2">
                    <Image
                      src={s.image.src}
                      alt={s.image.alt}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="md:col-span-6">
                  <p className="eyebrow idx mb-4 text-ink/60">
                    {s.index} · {s.eyebrow}
                  </p>
                  <h3 className="display-tight text-[clamp(1.5rem,2.4vw,2rem)]">
                    {s.title}
                  </h3>
                  <p className="measure mt-5 text-ink/75">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return <StickyStoryAnimated eyebrow={eyebrow} heading={heading} steps={steps} />;
}

function StickyStoryAnimated({
  eyebrow,
  heading,
  steps,
}: {
  eyebrow?: string;
  heading: ReactNode;
  steps: Step[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        {eyebrow && <p className="eyebrow mb-8">{eyebrow}</p>}
        <h2 className="display max-w-3xl text-[clamp(2rem,4vw,3.75rem)]">
          {heading}
        </h2>
      </div>

      <div ref={ref} className="relative mt-16">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            {/* Sticky image column */}
            <div className="md:col-span-6">
              <div className="md:sticky md:top-32">
                <div className="relative aspect-[5/4] overflow-hidden rounded-[14px] bg-bone-2">
                  {steps.map((s, i) => (
                    <StickyImage
                      key={s.index}
                      step={s}
                      index={i}
                      total={steps.length}
                      scrollYProgress={scrollYProgress}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Text column — each step matches its sticky image window */}
            <div className="md:col-span-6">
              <div className="flex flex-col">
                {steps.map((s) => (
                  <motion.div
                    key={s.index}
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ margin: "-30% 0px -30% 0px" }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="flex min-h-screen flex-col justify-center md:min-h-[100vh]"
                  >
                    <p className="eyebrow idx mb-5 text-ink/60">
                      {s.index} · {s.eyebrow}
                    </p>
                    <h3 className="display-tight text-[clamp(1.75rem,3vw,2.5rem)]">
                      {s.title}
                    </h3>
                    <p className="measure mt-6 text-[1.0625rem] leading-[1.7] text-ink-2/80">
                      {s.body}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
