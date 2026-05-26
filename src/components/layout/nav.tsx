"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Wordmark } from "./wordmark";
import { sectorOrder, sectors, venturesInSector } from "@/content/sectors";
import { imagery } from "@/content/imagery";

const ease = [0.16, 1, 0.3, 1] as const;

const corporateLinks = [
  { href: "/world", label: "World of Hemco" },
  { href: "/careers", label: "Careers" },
  { href: "/investors", label: "Investors" },
];

type Tone = "ivory" | "forest" | "image";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [overPhoto, setOverPhoto] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState<null | "sectors">(null);
  const [tone, setTone] = useState<Tone>("ivory");
  const closeT = useRef<number | null>(null);

  useEffect(() => {
    const PROBE_Y = 60; // scan plane just below the nav baseline
    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      const declared = document.body.dataset.heroOnPhoto === "1";
      setOverPhoto(declared && y < window.innerHeight - 100);

      // Walk every [data-tone] section and find the innermost one whose
      // bounding rect spans the probe line. Innermost (last match) wins
      // because nested data-tone wrappers should override the outer.
      const sections = document.querySelectorAll<HTMLElement>(
        "main [data-tone], main[data-tone]"
      );
      let active: Tone = "ivory";
      sections.forEach((s) => {
        const r = s.getBoundingClientRect();
        if (r.top <= PROBE_Y && r.bottom > PROBE_Y) {
          const v = s.getAttribute("data-tone") as Tone | null;
          if (v === "ivory" || v === "forest" || v === "image") active = v;
        }
      });
      setTone(active);
    };
    update();
    // Run again after layout settles (fonts/images shift positions).
    const raf = requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const bodyObs = new MutationObserver(update);
    bodyObs.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-hero-on-photo"],
    });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      bodyObs.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open && !mega) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (open) setOpen(false);
      if (mega) setMega(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, mega]);

  const onPhoto = overPhoto && !scrolled;
  // Light = nav sits over an ivory section in scrolled state.
  // Dark = forest/image/photo. Default keeps everything white over hero.
  const lightSurface = !onPhoto && tone === "ivory";
  const txt = lightSurface ? "text-[color:var(--color-ink)]" : "text-white";
  // Nav links: mono micro-caps. Avoid the .caption class — it binds
  // color to var(--tone-fg-mute), which overrides Tailwind text-white.
  const navLink = lightSurface
    ? "font-mono uppercase text-[11px] tracking-[0.18em] transition-colors text-[color:var(--color-ink)]/70 hover:text-[color:var(--color-ink)]"
    : "font-mono uppercase text-[11px] tracking-[0.18em] transition-colors text-white/75 hover:text-white";

  const openMega = (k: "sectors") => {
    if (closeT.current) window.clearTimeout(closeT.current);
    setMega(k);
  };
  const scheduleClose = () => {
    if (closeT.current) window.clearTimeout(closeT.current);
    closeT.current = window.setTimeout(() => setMega(null), 120);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 z-50 transition-[background,border-color,padding,box-shadow] duration-500 ${
          scrolled ? "py-3" : "py-6"
        }`}
        style={{
          // Pushed down by the brand selector when it's mounted+visible.
          // Falls back to 0 when no selector (CSS var unset or 0px).
          top: "var(--brand-ribbon-h, 0px)",
          background: !scrolled
            ? "transparent"
            : lightSurface
            ? "linear-gradient(180deg, color-mix(in srgb, var(--color-ivory) 80%, transparent) 0%, color-mix(in srgb, var(--color-ivory) 60%, transparent) 100%)"
            : "linear-gradient(180deg, color-mix(in srgb, var(--color-forest-900) 55%, transparent) 0%, color-mix(in srgb, var(--color-forest-900) 38%, transparent) 100%)",
          backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
          borderBottom: scrolled
            ? "1px solid color-mix(in srgb, var(--color-gold-500) 36%, transparent)"
            : "1px solid transparent",
          boxShadow: !scrolled
            ? "none"
            : lightSurface
            ? "0 14px 38px color-mix(in srgb, var(--color-ink) 8%, transparent)"
            : "inset 0 1px 0 rgba(255,255,255,0.10), 0 18px 50px color-mix(in srgb, var(--color-forest-900) 28%, transparent)",
        }}
        onMouseLeave={scheduleClose}
      >
        <div className="shell grid grid-cols-[1fr_auto_1fr] items-center gap-6">
          <nav
            aria-label="Primary"
            className="hidden lg:flex items-center gap-8 justify-self-start col-start-1"
          >
            <button
              type="button"
              onMouseEnter={() => openMega("sectors")}
              onFocus={() => openMega("sectors")}
              onClick={() => setMega(mega === "sectors" ? null : "sectors")}
              aria-expanded={mega === "sectors"}
              className={navLink}
            >
              Sectors <span aria-hidden>▾</span>
            </button>
            <Link
              href="/world"
              onMouseEnter={scheduleClose}
              className={navLink}
            >
              World of Hemco
            </Link>
            <Link
              href="/careers"
              onMouseEnter={scheduleClose}
              className={navLink}
            >
              Careers
            </Link>
          </nav>

          <Link
            href="/"
            aria-label="Hemco Group, home"
            className={`col-start-2 justify-self-center transition-colors ${txt}`}
            onMouseEnter={scheduleClose}
          >
            <Wordmark size={scrolled ? "sm" : "md"} />
          </Link>

          <div className="col-start-3 flex items-center gap-6 justify-self-end">
            <Link
              href="/investors"
              onMouseEnter={scheduleClose}
              className={`hidden lg:inline-block ${navLink}`}
            >
              Investors
            </Link>
            <Link
              href="/contact"
              onMouseEnter={scheduleClose}
              className={`hidden md:inline-flex btn ${
                lightSurface ? "btn-primary" : "btn-on-photo"
              }`}
            >
              Contact
            </Link>
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className={`lg:hidden flex flex-col items-end gap-[5px] py-2 px-1 transition-colors ${txt}`}
            >
              <span className="block h-px w-7 bg-current" />
              <span className="block h-px w-5 bg-current" />
            </button>
          </div>
        </div>

        {/* Mega menu — fluted-glass panel.
            A floating rounded glass slab inspired by architectural fluted
            glass and Apple Vision Pro material. The fluting is a repeating
            vertical micro-band gradient that catches light unevenly across
            the surface; behind it sits a heavy backdrop blur so the page
            content refracts through. Each sector is rendered as a thin
            vertical pane separated by hairline dividers — hovering a pane
            fades in its hero image as a soft inset, like light blooming
            behind a single flute. */}
        <AnimatePresence>
          {mega === "sectors" && (
            <motion.div
              key="mega"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.55, ease }}
              onMouseEnter={() => openMega("sectors")}
              onMouseLeave={scheduleClose}
              className="absolute inset-x-0 top-full hidden lg:block px-6 pt-3 pb-12"
            >
              <div className="shell">
                <div
                  className="relative mx-auto overflow-hidden rounded-[26px]"
                  style={{
                    /* Fluted glass — three stacked layers:
                       1. vertical micro-band fluting (the texture)
                       2. diagonal specular sheen (makes it read as glass)
                       3. base ink tint that gives the menu its body */
                    backgroundImage: `
                      repeating-linear-gradient(90deg,
                        rgba(255,255,255,0.085) 0px,
                        rgba(255,255,255,0.015) 4px,
                        rgba(255,255,255,0.085) 9px,
                        rgba(255,255,255,0.030) 14px),
                      linear-gradient(115deg,
                        rgba(255,255,255,0.10) 0%,
                        rgba(255,255,255,0.00) 22%,
                        rgba(255,255,255,0.04) 55%,
                        rgba(255,255,255,0.00) 78%,
                        rgba(255,255,255,0.08) 100%),
                      linear-gradient(180deg,
                        rgba(14,20,32,0.62) 0%,
                        rgba(8,12,22,0.78) 100%)
                    `,
                    backdropFilter: "blur(44px) saturate(190%)",
                    WebkitBackdropFilter: "blur(44px) saturate(190%)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    boxShadow: `
                      inset 0 1px 0 rgba(255,255,255,0.22),
                      inset 0 -1px 0 rgba(0,0,0,0.28),
                      0 28px 72px rgba(4,8,16,0.45),
                      0 6px 18px rgba(4,8,16,0.30)
                    `,
                    color: "var(--color-mist)",
                  }}
                >
                  {/* Top specular bloom — soft white wash that sells the
                      glass as having an upper bevel catching room light. */}
                  <div
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-24 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(60% 100% at 30% 0%, rgba(255,255,255,0.16) 0%, transparent 70%)",
                    }}
                  />
                  {/* Bottom ambient — gentle darkening so the floor of the
                      panel grounds against the page below. */}
                  <div
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.18) 100%)",
                    }}
                  />

                  {/* Header strip — tiny editorial label and seven-sectors
                      pill, sitting on the glass surface. */}
                  <div
                    className="relative flex items-baseline justify-between px-8 pt-7 pb-5"
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <p
                      className="caption"
                      style={{
                        color: "rgba(255,255,255,0.62)",
                        letterSpacing: "0.26em",
                      }}
                    >
                      The compass — Sectors
                    </p>
                    <p
                      className="caption data"
                      style={{
                        color: "rgba(255,255,255,0.78)",
                        letterSpacing: "0.22em",
                      }}
                    >
                      VII · SECTORS
                    </p>
                  </div>

                  {/* Seven flutes — each a vertical pane separated by a
                      single hairline divider. The dividers are part of the
                      fluted aesthetic: glass that's been milled into seven
                      narrow channels. */}
                  <div className="relative grid grid-cols-7">
                    {sectorOrder.map((s, i) => {
                      const sec = sectors[s];
                      const ventures = venturesInSector(s);
                      const heroImg = imagery[sec.hero];
                      return (
                        <Link
                          key={s}
                          href={`/sectors/${s}`}
                          onClick={() => setMega(null)}
                          onMouseEnter={() => openMega("sectors")}
                          className="group relative block min-h-[280px] px-5 py-7 overflow-hidden focus-visible:outline-none"
                          style={{
                            borderRight:
                              i < sectorOrder.length - 1
                                ? "1px solid rgba(255,255,255,0.07)"
                                : "none",
                          }}
                        >
                          {/* Behind-the-flute hero bloom — fades in only on
                              hover, masked by an inner gradient so the glass
                              still reads as the dominant material. */}
                          <div
                            aria-hidden
                            className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                          >
                            <Image
                              src={heroImg.src}
                              alt=""
                              fill
                              sizes="(max-width: 1280px) 14vw, 200px"
                              className="object-cover"
                              style={{
                                filter:
                                  "saturate(0.85) contrast(1.08) brightness(0.85)",
                              }}
                            />
                            <div
                              className="absolute inset-0"
                              style={{
                                background:
                                  "linear-gradient(180deg, rgba(8,12,20,0.20) 0%, rgba(8,12,20,0.55) 55%, rgba(4,8,14,0.92) 100%)",
                              }}
                            />
                            {/* Re-apply flute texture on top of the image so
                                the hover state still reads as fluted glass. */}
                            <div
                              aria-hidden
                              className="absolute inset-0"
                              style={{
                                background: `repeating-linear-gradient(90deg,
                                  rgba(255,255,255,0.06) 0px,
                                  rgba(255,255,255,0.00) 4px,
                                  rgba(255,255,255,0.06) 9px,
                                  rgba(255,255,255,0.02) 14px)`,
                                mixBlendMode: "overlay",
                              }}
                            />
                          </div>

                          {/* Pane content */}
                          <div className="relative flex flex-col h-full">
                            <div className="flex items-baseline justify-between mb-5">
                              <span
                                className="caption data transition-colors duration-500 group-hover:text-[color:var(--color-gold-300)]"
                                style={{
                                  color: "rgba(255,255,255,0.55)",
                                  letterSpacing: "0.22em",
                                }}
                              >
                                {sec.ordinal}
                              </span>
                              <span
                                className="caption data"
                                style={{
                                  color: "rgba(255,255,255,0.38)",
                                  letterSpacing: "0.18em",
                                  fontSize: "10px",
                                }}
                              >
                                {String(ventures.length).padStart(2, "0")}
                              </span>
                            </div>

                            <h3
                              className="display text-[1.5rem] leading-[1.0] mb-4 tracking-[-0.005em] transition-colors duration-500 group-hover:text-white"
                              style={{ color: "rgba(255,255,255,0.92)" }}
                            >
                              {sec.name}
                            </h3>

                            <ul className="mt-auto space-y-[3px]">
                              {ventures.map((v) => (
                                <li
                                  key={v.slug}
                                  className="text-[12px] leading-[1.5] transition-colors duration-500"
                                  style={{
                                    color: "rgba(255,255,255,0.55)",
                                    fontFamily: "var(--font-sans)",
                                  }}
                                >
                                  {v.name}
                                </li>
                              ))}
                            </ul>

                            {/* Bottom hairline that slides out on hover —
                                the gold cue picked up from the rest of the
                                site, contained to the active flute. */}
                            <span
                              aria-hidden
                              className="absolute left-5 right-5 bottom-3 h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                              style={{
                                background:
                                  "linear-gradient(90deg, var(--color-gold-300), transparent)",
                              }}
                            />
                          </div>
                        </Link>
                      );
                    })}
                  </div>

                  {/* Footer — quiet utility row */}
                  <div
                    className="relative flex items-center justify-between px-8 py-5"
                    style={{
                      borderTop: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <p
                      className="caption"
                      style={{
                        color: "rgba(255,255,255,0.50)",
                        letterSpacing: "0.20em",
                      }}
                    >
                      Thirteen brands · One house
                    </p>
                    <Link
                      href="/sectors"
                      onClick={() => setMega(null)}
                      className="caption inline-flex items-center gap-2 transition-colors hover:text-[color:var(--color-gold-300)]"
                      style={{
                        color: "rgba(255,255,255,0.85)",
                        letterSpacing: "0.22em",
                      }}
                    >
                      Open the directory
                      <span aria-hidden>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease }}
            className="fixed inset-0 z-[60] flex flex-col"
            style={{ background: "var(--color-forest-900)", color: "var(--color-mist)" }}
            data-tone="forest"
          >
            <div className="flex items-center justify-between px-6 py-5 md:px-10">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                aria-label="Hemco Group, home"
                style={{ color: "var(--color-gold-300)" }}
              >
                <Wordmark size="md" />
              </Link>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="caption"
                style={{ color: "var(--color-gold-300)" }}
              >
                Close
              </button>
            </div>
            <nav
              aria-label="Primary mobile"
              className="flex flex-1 flex-col justify-center gap-1 px-6 md:px-10"
            >
              {sectorOrder.map((s, i) => (
                <motion.div
                  key={s}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.08 + i * 0.05,
                    ease,
                  }}
                >
                  <Link
                    href={`/sectors/${s}`}
                    onClick={() => setOpen(false)}
                    className="display block py-2 text-[clamp(2.25rem,8vw,3.75rem)] leading-tight"
                    style={{ color: "var(--color-gold-300)" }}
                  >
                    {sectors[s].name}
                  </Link>
                </motion.div>
              ))}
              <div
                className="mt-10 pt-8"
                style={{ borderTop: "1px solid color-mix(in srgb, var(--color-gold-500) 28%, transparent)" }}
              >
                {corporateLinks.concat({ href: "/contact", label: "Contact" }).map((l, i) => (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + i * 0.04, ease }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block py-2 text-[1.125rem]"
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </nav>
            <div className="px-6 pb-10 md:px-10">
              <p
                className="eyebrow"
                style={{ color: "var(--color-gold-500)" }}
              >
                Hemco Group · India · Since 1998
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
