"use client";

import { useEffect, useState } from "react";
import { ventures } from "@/content/ventures";

const SESSION_KEY = "hemco.brandRibbonDismissed";
/** Coordinates with LoaderCurtain.TOTAL_MS (2700) so the bar doesn't
 *  flash through the curtain. Reduced-motion users skip the delay. */
const SHOW_AFTER_MS = 2900;

const HEMCO_GROUP = "__group__";

/**
 * Brand selector — modelled on Apple's country/region picker.
 *
 * A slim ivory bar at the top of every page that politely offers
 * visitors a path to any of the dedicated brand sites without
 * dominating the page chrome.
 *
 *   [advisory text]            [✓ Hemco Group ▾]  [Continue]  [✕]
 *
 * Defaults to "Hemco Group" (the current site). Selecting a brand
 * activates the Continue button which navigates to the brand's domain.
 * Dismissed state is persisted in sessionStorage. Pushes the fixed
 * nav down by its own height while open via `--brand-ribbon-h`.
 */
export function BrandRibbon() {
  const [shown, setShown] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [selected, setSelected] = useState<string>(HEMCO_GROUP);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(SESSION_KEY) === "1") {
      setDismissed(true);
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(true);
      return;
    }
    const t = window.setTimeout(() => setShown(true), SHOW_AFTER_MS);
    return () => window.clearTimeout(t);
  }, []);

  // Push the fixed nav down by the bar's height. The bar is 44px on
  // desktop, 64px on narrow viewports where the layout wraps.
  useEffect(() => {
    const el = document.documentElement;
    if (shown && !dismissed) {
      el.style.setProperty("--brand-ribbon-h", "var(--brand-ribbon-actual-h, 44px)");
    } else {
      el.style.setProperty("--brand-ribbon-h", "0px");
    }
    return () => {
      el.style.setProperty("--brand-ribbon-h", "0px");
    };
  }, [shown, dismissed]);

  if (dismissed || !shown) return null;

  const liveBrands = ventures.filter((v) => v.domain);

  const onDismiss = () => {
    try {
      window.sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* sessionStorage may be blocked — graceful no-op */
    }
    setDismissed(true);
  };

  const onContinue = () => {
    if (selected === HEMCO_GROUP) return;
    const v = liveBrands.find((b) => b.slug === selected);
    if (!v?.domain) return;
    window.location.href = `https://${v.domain}`;
  };

  const canContinue = selected !== HEMCO_GROUP;

  return (
    <div
      data-brand-ribbon
      role="region"
      aria-label="Brand selector"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 60,
        // Glassmorphic frosted surface — true see-through pane that
        // takes the colour of whatever's behind it through a strong
        // backdrop blur and saturate. Layered highlights mimic the
        // way light catches a real piece of frosted glass:
        //   1. A soft white sheen along the top quarter (specular).
        //   2. A diagonal cool/warm gradient (frost coloration).
        //   3. A faint warm pull from the bottom (gold under-light).
        // The base alpha stays low so the page colour reads through.
        background:
          "radial-gradient(140% 100% at 50% 0%, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0.10) 38%, transparent 70%), linear-gradient(115deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 32%, rgba(255,238,205,0.10) 70%, rgba(200,165,91,0.06) 100%), linear-gradient(180deg, rgba(247,241,228,0.42) 0%, rgba(232,222,200,0.32) 100%)",
        borderBottom:
          "1px solid color-mix(in srgb, var(--color-gold-500, #c8a55b) 32%, transparent)",
        color: "var(--color-ink, #1a1a1a)",
        // Stronger frosted blur so the bar reads as real glass; the
        // saturate/contrast lifts the colours behind it without dimming.
        backdropFilter: "blur(28px) saturate(1.4) contrast(1.05)",
        WebkitBackdropFilter: "blur(28px) saturate(1.4) contrast(1.05)",
        boxShadow:
          // Outer drop shadow so the bar floats off the page.
          "0 18px 44px -22px rgba(11,11,12,0.36), 0 4px 12px -8px rgba(11,11,12,0.18), " +
          // Inner top-edge rim-light (the brightest line in real glass).
          "inset 0 1px 0 rgba(255,255,255,0.68), " +
          // A second softer inner highlight one row down — gives depth.
          "inset 0 2px 0 rgba(255,255,255,0.18), " +
          // Faint gold inner-bottom — picks up the bottom border.
          "inset 0 -1px 0 color-mix(in srgb, var(--color-gold-500, #c8a55b) 26%, transparent)",
        // Override any cached animation/transform from earlier versions.
        animation: "none",
        transform: "none",
        overflow: "hidden",
      }}
    >
      {/* Vertical fluting overlay — fine ink-tinted pinstripes at very
          low alpha so the ivory base reads like ribbed glass, not a
          flat fill. Combined with a diagonal specular sheen that picks
          out the top-left edge. Pointer-events:none so it never
          intercepts clicks on the controls below. */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "repeating-linear-gradient(90deg, rgba(11,11,12,0.045) 0px, rgba(11,11,12,0) 2px, rgba(11,11,12,0.045) 5px, rgba(11,11,12,0.012) 8px), linear-gradient(115deg, rgba(255,255,255,0.35) 0%, transparent 25%, rgba(255,255,255,0.10) 60%, transparent 90%)",
          mixBlendMode: "soft-light",
        }}
      />
      <div
        className="brand-ribbon-inner"
        style={{
          position: "relative",
          height: "44px",
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 1.25rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.25rem",
          fontFamily: 'var(--font-inter, "Inter"), system-ui, sans-serif',
          fontSize: "12px",
          lineHeight: 1.3,
        }}
      >
        {/* Advisory text — exactly like Apple's, but for brands. A
            small gold rule precedes the line to give the bar an
            editorial mark. */}
        <p
          className="brand-ribbon-advisory"
          style={{
            margin: 0,
            color: "color-mix(in srgb, var(--color-ink, #1a1a1a) 78%, transparent)",
            flex: "0 1 auto",
            textAlign: "right",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.7rem",
          }}
        >
          <span
            aria-hidden
            style={{
              display: "inline-block",
              width: "20px",
              height: "1px",
              background: "var(--color-gold-500, #c8a55b)",
              opacity: 0.7,
            }}
          />
          Choose a Hemco brand to visit its dedicated site.
        </p>

        {/* Native select styled to look like Apple's region dropdown */}
        <div
          style={{
            position: "relative",
            display: "inline-flex",
            alignItems: "center",
            flex: "0 0 auto",
          }}
        >
          {/* Checkmark — only when a real brand is picked, mirroring
              Apple's "✓ India" treatment for the current selection. */}
          {selected !== HEMCO_GROUP && (
            <svg
              width="11"
              height="11"
              viewBox="0 0 11 11"
              aria-hidden
              style={{
                marginRight: "0.4rem",
                color: "var(--color-ink, #1a1a1a)",
                flexShrink: 0,
              }}
            >
              <path
                d="M1.5 5.8 L4.2 8.5 L9.5 2.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            aria-label="Select a Hemco brand"
            style={{
              appearance: "none",
              WebkitAppearance: "none",
              MozAppearance: "none",
              background: "transparent",
              border: "none",
              padding: "4px 22px 4px 0",
              fontFamily: "inherit",
              fontSize: "13px",
              fontWeight: 500,
              color: "var(--color-ink, #1a1a1a)",
              cursor: "pointer",
              outline: "none",
              minWidth: "140px",
            }}
          >
            <option value={HEMCO_GROUP}>Hemco Group</option>
            <optgroup label="Brands">
              {liveBrands.map((v) => (
                <option key={v.slug} value={v.slug}>
                  {v.name}
                </option>
              ))}
            </optgroup>
          </select>
          {/* Chevron — placed over the right edge of the select */}
          <svg
            width="9"
            height="6"
            viewBox="0 0 9 6"
            aria-hidden
            style={{
              position: "absolute",
              right: "4px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "color-mix(in srgb, var(--color-ink, #1a1a1a) 60%, transparent)",
              pointerEvents: "none",
            }}
          >
            <path
              d="M1 1 L4.5 4.5 L8 1"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Continue button — disabled until a real brand is chosen,
            then a small dark pill exactly like Apple's. */}
        <button
          type="button"
          onClick={onContinue}
          disabled={!canContinue}
          style={{
            // Gold-edged dark pill when active. When disabled, fades
            // into the fluted surface as a quiet ghost button.
            background: canContinue
              ? "linear-gradient(180deg, var(--color-ink, #1a1a1a) 0%, color-mix(in srgb, var(--color-ink, #1a1a1a) 90%, var(--color-gold-500, #c8a55b)) 100%)"
              : "color-mix(in srgb, var(--color-ink, #1a1a1a) 6%, transparent)",
            color: canContinue
              ? "var(--color-ivory, #f4eee0)"
              : "color-mix(in srgb, var(--color-ink, #1a1a1a) 32%, transparent)",
            border: canContinue
              ? "1px solid color-mix(in srgb, var(--color-gold-500, #c8a55b) 55%, transparent)"
              : "1px solid color-mix(in srgb, var(--color-ink, #1a1a1a) 14%, transparent)",
            borderRadius: "999px",
            padding: "5px 16px",
            fontFamily: "inherit",
            fontSize: "11.5px",
            fontWeight: 500,
            letterSpacing: "0.04em",
            cursor: canContinue ? "pointer" : "not-allowed",
            transition: "background 240ms, border-color 240ms, color 240ms, box-shadow 240ms",
            flexShrink: 0,
            boxShadow: canContinue
              ? "0 4px 12px -6px rgba(11,11,12,0.4), inset 0 1px 0 rgba(255,255,255,0.15)"
              : "none",
          }}
          onMouseEnter={(e) => {
            if (canContinue) {
              e.currentTarget.style.borderColor =
                "color-mix(in srgb, var(--color-gold-500, #c8a55b) 80%, transparent)";
              e.currentTarget.style.boxShadow =
                "0 6px 16px -6px rgba(11,11,12,0.45), inset 0 1px 0 rgba(255,255,255,0.2)";
            }
          }}
          onMouseLeave={(e) => {
            if (canContinue) {
              e.currentTarget.style.borderColor =
                "color-mix(in srgb, var(--color-gold-500, #c8a55b) 55%, transparent)";
              e.currentTarget.style.boxShadow =
                "0 4px 12px -6px rgba(11,11,12,0.4), inset 0 1px 0 rgba(255,255,255,0.15)";
            }
          }}
        >
          Continue
        </button>

        {/* Dismiss — minimal × on the right */}
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss brand selector"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "22px",
            height: "22px",
            background: "transparent",
            border: "none",
            color:
              "color-mix(in srgb, var(--color-ink, #1a1a1a) 50%, transparent)",
            cursor: "pointer",
            transition: "color 180ms",
            flexShrink: 0,
            padding: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--color-ink, #1a1a1a)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color =
              "color-mix(in srgb, var(--color-ink, #1a1a1a) 50%, transparent)";
          }}
        >
          <svg width="11" height="11" viewBox="0 0 11 11" aria-hidden>
            <line
              x1="1.5"
              y1="1.5"
              x2="9.5"
              y2="9.5"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <line
              x1="9.5"
              y1="1.5"
              x2="1.5"
              y2="9.5"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
