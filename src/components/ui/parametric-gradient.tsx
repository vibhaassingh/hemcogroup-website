"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

const VERT = /* glsl */ `
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

// Domain-warped fbm aurora through the brand palette. The cursor warps
// the field toward itself with a soft falloff. Time advances slowly.
const FRAG = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uMouseInfluence;
  uniform float uScroll;

  // Brand palette
  const vec3 INK    = vec3(0.040, 0.040, 0.050);
  const vec3 NAVY   = vec3(0.039, 0.122, 0.239);   // #0a1f3d
  const vec3 NAVY2  = vec3(0.102, 0.196, 0.361);   // #1a325c
  const vec3 NAVY3  = vec3(0.165, 0.290, 0.510);   // #2a4a82
  const vec3 CLARET = vec3(0.420, 0.102, 0.173);   // #6b1a2c
  const vec3 GOLD   = vec3(0.784, 0.647, 0.357);   // #c8a55b
  const vec3 GOLD2  = vec3(0.894, 0.812, 0.604);   // #e4cf9a
  const vec3 IVORY  = vec3(0.957, 0.933, 0.878);   // #f4eee0

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p = p * 2.02;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    // Aspect-correct uv so circles stay round
    vec2 uv = vUv;
    vec2 auv = vUv;
    auv.x *= uResolution.x / max(uResolution.y, 1.0);

    // Cursor influence: pull the sample point toward the cursor with a soft
    // exponential falloff, so the aurora "leans in" near the cursor.
    vec2 mouse = uMouse;
    mouse.x *= uResolution.x / max(uResolution.y, 1.0);
    vec2 toMouse = mouse - auv;
    float md = length(toMouse);
    float pull = exp(-md * 2.4) * uMouseInfluence;
    vec2 warpedUv = uv + toMouse * pull * 0.18;

    // Slow time, augmented by scroll so depth shifts as the user enters
    // the page.
    float t = uTime * 0.06 + uScroll * 0.4;

    // Domain warp: stack two layers of fbm to bend the field
    vec2 q = vec2(
      fbm(warpedUv * 1.6 + vec2(0.0, t)),
      fbm(warpedUv * 1.6 + vec2(5.2, -t))
    );
    vec2 r = vec2(
      fbm(warpedUv * 1.8 + 3.0 * q + vec2(1.7, 9.2) + t * 1.2),
      fbm(warpedUv * 1.8 + 3.0 * q + vec2(8.3, 2.8) - t * 0.9)
    );
    float v = fbm(warpedUv * 2.0 + 4.0 * r);

    // Banded ramp through the palette — most of the field reads as deep
    // navy/ink with claret undertones; gold and ivory only flare in the
    // brightest streaks.
    vec3 col = INK;
    col = mix(col, NAVY, smoothstep(0.05, 0.30, v));
    col = mix(col, NAVY2, smoothstep(0.30, 0.50, v));
    col = mix(col, NAVY3, smoothstep(0.45, 0.62, v) * 0.85);
    col = mix(col, CLARET, smoothstep(0.55, 0.70, v) * 0.42);
    col = mix(col, GOLD, smoothstep(0.68, 0.82, v) * 0.78);
    col = mix(col, GOLD2, smoothstep(0.82, 0.92, v) * 0.55);
    col = mix(col, IVORY, smoothstep(0.92, 1.00, v) * 0.30);

    // Subtle radial glow following the cursor — gold ember bias
    float glow = exp(-md * 3.2) * 0.18 * uMouseInfluence;
    col += GOLD * glow;

    // Cinematic vignette
    vec2 vign = uv - 0.5;
    float vignAmt = smoothstep(0.30, 0.95, length(vign) * 1.25);
    col *= 1.0 - vignAmt * 0.55;

    // Film grain — keeps the gradient from looking like a render
    float g = (hash(uv * uResolution + uTime * 60.0) - 0.5) * 0.030;
    col += g;

    // Subtle gold inset light from top edge to lift the type rail
    float topLight = smoothstep(0.0, 0.45, 1.0 - vUv.y) * 0.12;
    col += GOLD * topLight * 0.4;

    gl_FragColor = vec4(col, 1.0);
  }
`;

/**
 * Full-bleed parametric WebGL gradient. A domain-warped fbm aurora rendered
 * through the Hemco brand palette (navy → claret → gold → ivory). The field
 * leans toward the cursor on hover and shifts depth on scroll. Falls back to
 * a static CSS gradient under prefers-reduced-motion or when WebGL isn't
 * available.
 */
export function ParametricGradient({
  className,
}: {
  className?: string;
}) {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce) return;
    if (typeof window === "undefined") return;

    const container = containerRef.current;
    if (!container) return;

    let frameId: number | null = null;
    let cleanup: (() => void) | null = null;
    let cancelled = false;

    (async () => {
      try {
        const ogl = await import("ogl");
        const { Renderer, Geometry, Program, Mesh, Vec2 } = ogl;
        if (cancelled) return;

        const renderer = new Renderer({
          alpha: false,
          antialias: false,
          dpr: Math.min(window.devicePixelRatio, 1.5),
        });
        const gl = renderer.gl;
        gl.clearColor(0.04, 0.04, 0.05, 1);
        gl.canvas.style.position = "absolute";
        gl.canvas.style.inset = "0";
        gl.canvas.style.width = "100%";
        gl.canvas.style.height = "100%";
        gl.canvas.style.display = "block";
        container.appendChild(gl.canvas);

        const geometry = new Geometry(gl, {
          position: {
            size: 2,
            data: new Float32Array([-1, -1, 3, -1, -1, 3]),
          },
          uv: {
            size: 2,
            data: new Float32Array([0, 0, 2, 0, 0, 2]),
          },
        });

        const program = new Program(gl, {
          vertex: VERT,
          fragment: FRAG,
          uniforms: {
            uTime: { value: 0 },
            uResolution: { value: new Vec2(1, 1) },
            uMouse: { value: new Vec2(0.5, 0.5) },
            uMouseInfluence: { value: 0 },
            uScroll: { value: 0 },
          },
        });

        const mesh = new Mesh(gl, { geometry, program });

        const resize = () => {
          const r = container.getBoundingClientRect();
          renderer.setSize(r.width || 1, r.height || 1);
          program.uniforms.uResolution.value.set(
            r.width || 1,
            r.height || 1,
          );
        };
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(container);

        // Smoothed cursor to avoid jitter; ease the influence in/out so a
        // sudden cursor entry doesn't hard-warp the field.
        const target = { x: 0.5, y: 0.5, infl: 0 };
        const current = { x: 0.5, y: 0.5, infl: 0 };

        const onMove = (e: PointerEvent) => {
          const r = container.getBoundingClientRect();
          target.x = (e.clientX - r.left) / r.width;
          target.y = 1 - (e.clientY - r.top) / r.height;
          target.infl = 1;
        };
        const onLeave = () => {
          target.infl = 0;
        };
        const onScroll = () => {
          const r = container.getBoundingClientRect();
          const v = Math.max(
            0,
            Math.min(1, 1 - r.bottom / window.innerHeight),
          );
          program.uniforms.uScroll.value = v;
        };

        // Track cursor at the window level so the cursor's pull keeps working
        // even when it crosses overlay elements (text, buttons) that sit on
        // top of the canvas.
        window.addEventListener("pointermove", onMove, { passive: true });
        window.addEventListener("pointerleave", onLeave);
        window.addEventListener("scroll", onScroll, { passive: true });

        const start = performance.now();
        const render = () => {
          // Smooth toward target
          current.x += (target.x - current.x) * 0.08;
          current.y += (target.y - current.y) * 0.08;
          current.infl += (target.infl - current.infl) * 0.04;

          program.uniforms.uTime.value =
            (performance.now() - start) / 1000;
          program.uniforms.uMouse.value.set(current.x, current.y);
          program.uniforms.uMouseInfluence.value = current.infl;
          renderer.render({ scene: mesh });
          frameId = requestAnimationFrame(render);
        };
        frameId = requestAnimationFrame(render);

        cleanup = () => {
          if (frameId !== null) cancelAnimationFrame(frameId);
          ro.disconnect();
          window.removeEventListener("pointermove", onMove);
          window.removeEventListener("pointerleave", onLeave);
          window.removeEventListener("scroll", onScroll);
          if (gl.canvas.parentElement === container) {
            container.removeChild(gl.canvas);
          }
          gl.getExtension("WEBGL_lose_context")?.loseContext();
        };
      } catch {
        /* WebGL or ogl import failed — CSS fallback covers it */
      }
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [reduce]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        // CSS fallback — a layered linear/radial composition that reads in
        // the same palette while the canvas is loading or under reduced-motion.
        background:
          "radial-gradient(120% 80% at 25% 30%, #1a325c 0%, #0a1f3d 38%, #050a14 70%, #020409 100%), linear-gradient(135deg, #0a1f3d 0%, #1a325c 45%, #2a4a82 100%)",
        backgroundBlendMode: "screen",
      }}
    />
  );
}
