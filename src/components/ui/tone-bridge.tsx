type Tone = "ivory" | "warm-ivory" | "forest" | "ink";

const palette: Record<Tone, string> = {
  ivory: "var(--color-ivory)",
  "warm-ivory": "var(--color-bone, var(--color-ivory))",
  forest: "var(--color-forest-900)",
  ink: "var(--color-ink)",
};

/**
 * Tone bridge — fluted-glass transition between two sections.
 *
 * No animation. The bridge is a tall, very-smooth vertical gradient
 * from the FROM tone to the TO tone (eight `color-mix` stops so the
 * transition is buttery, no banding) with an ultra-faint vertical-rib
 * fluting laid over it via `mix-blend-mode: screen`. The ribs only
 * "appear" where there's enough darkness behind them to register, so
 * they fade in across the lower half of the bridge as the gradient
 * darkens — exactly like a sheet of architectural fluted glass mounted
 * between an ivory room and a forest one.
 *
 * `data-tone={to}` keeps the nav's tone-probe stable when scrolling
 * through the bridge.
 */
export function ToneBridge({
  from,
  to,
  className = "h-44 md:h-64",
}: {
  from: Tone;
  to: Tone;
  className?: string;
}) {
  const fromColor = palette[from];
  const toColor = palette[to];

  // Eight-stop gradient with `color-mix` for a continuous Bézier-feeling
  // transition. The two tones live in extended horizons (12% / 88%) and
  // every interior stop is a graded mix, so there are no perceptible
  // banding rings.
  const smoothGradient = `linear-gradient(180deg,
    ${fromColor} 0%,
    ${fromColor} 12%,
    color-mix(in srgb, ${fromColor} 88%, ${toColor}) 26%,
    color-mix(in srgb, ${fromColor} 65%, ${toColor}) 40%,
    color-mix(in srgb, ${fromColor} 38%, ${toColor}) 54%,
    color-mix(in srgb, ${toColor} 70%, ${fromColor}) 68%,
    color-mix(in srgb, ${toColor} 90%, ${fromColor}) 82%,
    ${toColor} 100%)`;

  return (
    <div
      aria-hidden
      className={`fluted-bridge relative w-full overflow-hidden ${className}`}
      data-tone={to}
      style={{ background: smoothGradient }}
    />
  );
}
