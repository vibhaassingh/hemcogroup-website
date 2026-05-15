"use client";

import { useEffect, useRef, type ReactNode } from "react";
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

const FRAG = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uHasTexture;

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
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;

    // Frosted-glass displacement driven by slow-scrolling fbm
    float n1 = fbm(uv * 4.5 + vec2(uTime * 0.06, uTime * -0.04));
    float n2 = fbm(uv * 7.0 + vec2(-uTime * 0.05, uTime * 0.03));
    vec2 disp = vec2(n1 - 0.5, n2 - 0.5) * 0.05;

    // Sample the underlying video, contracted toward the card center so the
    // sample window fakes a refractive look-through. If the texture isn't
    // ready yet (CORS pending, etc.) fall back to a forest tint so the card
    // still reads as glass.
    vec2 sampleUv = clamp((uv + disp) * 0.7 + 0.15, 0.0, 1.0);
    vec3 video = texture2D(uTexture, sampleUv).rgb;
    vec3 fallback = vec3(0.07, 0.13, 0.10);
    vec3 col = mix(fallback, video, uHasTexture);

    // Frosted desaturation + brightness lift
    float l = dot(col, vec3(0.299, 0.587, 0.114));
    col = mix(col, vec3(l), 0.7);
    col = col * 0.8 + 0.2;

    // 135deg brand gradient (white 18 -> 6 -> 10)
    float g = clamp((uv.x + (1.0 - uv.y)) * 0.5, 0.0, 1.0);
    float gradAlpha = mix(0.18, 0.06, smoothstep(0.0, 0.55, g));
    gradAlpha = mix(gradAlpha, 0.10, smoothstep(0.55, 1.0, g));
    col = mix(col, vec3(1.0), gradAlpha);

    // Top-edge inset highlight
    float topHL = smoothstep(0.0, 0.04, vUv.y);
    col = mix(col, vec3(1.0), (1.0 - topHL) * 0.32);

    // Bottom-edge soft inset
    float botHL = smoothstep(1.0, 0.96, vUv.y);
    col = mix(col, vec3(1.0), (1.0 - botHL) * 0.06);

    // Top-left specular hint (subtle — CSS .glass-sheen overlay does the rest)
    float spec = smoothstep(0.55, 0.0, length(uv - vec2(0.18, 0.0))) * 0.14;
    col += vec3(spec);

    gl_FragColor = vec4(col, 0.94);
  }
`;

/**
 * WebGL-driven liquid-glass card. Mounts a canvas inside its container that
 * samples a hidden cross-origin clone of the hero video, applies a frosted
 * refraction shader, and overlays the brand gradient + edge highlights.
 *
 * Falls back to whatever the parent's CSS already provides (e.g. .glass-light)
 * when WebGL isn't available, the user prefers reduced motion, or the device
 * is small / save-data.
 *
 * Use as a sibling overlay inside a `glass-light glass-sheen` card so the
 * sheen highlight stays on top and the box-shadow / border come from CSS.
 */
export function GlassRefraction({
  videoSrc,
  className,
  children,
}: {
  videoSrc: string;
  className?: string;
  children?: ReactNode;
}) {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce) return;
    if (typeof window === "undefined") return;
    if (window.innerWidth < 768) return;
    type Conn = { saveData?: boolean };
    const conn = (navigator as Navigator & { connection?: Conn }).connection;
    if (conn?.saveData) return;

    const container = containerRef.current;
    if (!container) return;

    let frameId: number | null = null;
    let cleanup: (() => void) | null = null;
    let cancelled = false;

    (async () => {
      try {
        const ogl = await import("ogl");
        const { Renderer, Geometry, Program, Mesh, Texture } = ogl;
        if (cancelled) return;

        // Hidden cross-origin video for texture sampling
        const tex = document.createElement("video");
        tex.src = videoSrc;
        tex.muted = true;
        tex.loop = true;
        tex.autoplay = true;
        tex.playsInline = true;
        tex.crossOrigin = "anonymous";
        tex.preload = "auto";
        tex.style.position = "absolute";
        tex.style.width = "1px";
        tex.style.height = "1px";
        tex.style.opacity = "0";
        tex.style.pointerEvents = "none";
        tex.setAttribute("aria-hidden", "true");
        document.body.appendChild(tex);
        try {
          await tex.play();
        } catch {
          /* autoplay rejection — texture stays empty, shader uses fallback */
        }

        const renderer = new Renderer({
          alpha: true,
          antialias: false,
          dpr: Math.min(window.devicePixelRatio, 2),
        });
        const gl = renderer.gl;
        gl.canvas.style.position = "absolute";
        gl.canvas.style.inset = "0";
        gl.canvas.style.width = "100%";
        gl.canvas.style.height = "100%";
        gl.canvas.style.borderRadius = "inherit";
        gl.canvas.style.pointerEvents = "none";
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

        const texture = new Texture(gl, {
          generateMipmaps: false,
          minFilter: gl.LINEAR,
          magFilter: gl.LINEAR,
          wrapS: gl.CLAMP_TO_EDGE,
          wrapT: gl.CLAMP_TO_EDGE,
        });

        const program = new Program(gl, {
          vertex: VERT,
          fragment: FRAG,
          uniforms: {
            uTexture: { value: texture },
            uTime: { value: 0 },
            uHasTexture: { value: 0 },
          },
          transparent: true,
        });

        const mesh = new Mesh(gl, { geometry, program });

        const resize = () => {
          const r = container.getBoundingClientRect();
          renderer.setSize(r.width || 1, r.height || 1);
        };
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(container);

        const start = performance.now();
        let lastTime = -1;
        let throttle = 0;
        const render = () => {
          // Throttle to ~30fps — the underlying video runs at 30, and a
          // smaller hit on the main thread keeps mid-tier devices happy.
          throttle = (throttle + 1) % 2;
          if (throttle === 0) {
            if (
              tex.readyState >= 2 &&
              tex.videoWidth > 0 &&
              tex.currentTime !== lastTime
            ) {
              try {
                (texture as unknown as { image: HTMLVideoElement }).image = tex;
                texture.needsUpdate = true;
                program.uniforms.uHasTexture.value = 1;
                lastTime = tex.currentTime;
              } catch {
                program.uniforms.uHasTexture.value = 0;
              }
            }
          }
          program.uniforms.uTime.value = (performance.now() - start) / 1000;
          renderer.render({ scene: mesh });
          frameId = requestAnimationFrame(render);
        };
        frameId = requestAnimationFrame(render);

        cleanup = () => {
          if (frameId !== null) cancelAnimationFrame(frameId);
          ro.disconnect();
          if (gl.canvas.parentElement === container) {
            container.removeChild(gl.canvas);
          }
          if (tex.parentElement === document.body) {
            document.body.removeChild(tex);
          }
          tex.pause();
          tex.removeAttribute("src");
          tex.load();
          gl.getExtension("WEBGL_lose_context")?.loseContext();
        };
      } catch {
        /* WebGL or ogl import failed — leave CSS fallback intact */
      }
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [reduce, videoSrc]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        borderRadius: "inherit",
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
}
