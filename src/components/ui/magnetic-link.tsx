"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import Link from "next/link";
import {
  type AnchorHTMLAttributes,
  type MouseEvent,
  useRef,
} from "react";

/**
 * Subtle "magnetic" hover — element is pulled ~8px toward the cursor while
 * inside its bounding box. Smooth springed return on leave. Skipped when the
 * user prefers reduced motion.
 */
export function MagneticLink({
  href,
  children,
  className,
  external,
  strength = 12,
  ...rest
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
  strength?: number;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children">) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 22, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 22, mass: 0.4 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    x.set(((e.clientX - cx) / r.width) * strength);
    y.set(((e.clientY - cy) / r.height) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const linkProps = external
    ? { href, target: "_blank", rel: "noreferrer" }
    : { href };

  const inner = (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={reduce ? undefined : { x: sx, y: sy }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );

  if (external) {
    return (
      <a {...linkProps} className={className} {...rest}>
        {inner}
      </a>
    );
  }
  return (
    <Link {...linkProps} className={className} {...rest}>
      {inner}
    </Link>
  );
}
