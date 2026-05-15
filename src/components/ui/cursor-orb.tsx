"use client";

import { useEffect, useRef } from "react";

/**
 * Ambient cursor orb — a small ember dot that follows the cursor with
 * spring-like inertia and inflates on hoverable elements.
 * Skipped on touch devices and when prefers-reduced-motion is set.
 */
export function CursorOrb() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (reduce || !fine) return;

    const el = ref.current;
    if (!el) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let cx = mx;
    let cy = my;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      const t = e.target;
      const link =
        t instanceof Element
          ? t.closest("a, button, [role='button'], input, label, [data-cursor='link']")
          : null;
      el.classList.toggle("cursor-orb--link", !!link);
    };
    const onLeave = () => {
      el.style.opacity = "0";
    };
    const onEnter = () => {
      el.style.opacity = "0.9";
    };

    const tick = () => {
      cx += (mx - cx) * 0.18;
      cy += (my - cy) * 0.18;
      el.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerenter", onEnter);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerenter", onEnter);
    };
  }, []);

  return <div ref={ref} className="cursor-orb" aria-hidden />;
}
