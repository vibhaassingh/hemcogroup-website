import Link from "next/link";
import {
  type SectorEntry,
  venturesInSector,
} from "@/content/sectors";
import { imagery } from "@/content/imagery";
import { ImageReveal } from "@/components/ui/image-reveal";

export function SectorTile({ sector }: { sector: SectorEntry }) {
  const ventures = venturesInSector(sector.slug);
  const heroImg = imagery[sector.hero];
  return (
    <Link
      href={`/sectors/${sector.slug}`}
      className="group relative block overflow-hidden"
      data-tone="image"
    >
      <ImageReveal
        className="relative aspect-[4/5] overflow-hidden"
        imageProps={{
          src: heroImg.src,
          alt: heroImg.alt,
          fill: true,
          sizes:
            "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw",
          className:
            "object-cover transition-transform duration-[1600ms] group-hover:scale-[1.05]",
          style: { filter: "saturate(0.88) contrast(1.05)" },
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(13,40,24,0.05) 0%, rgba(13,40,24,0.05) 40%, rgba(13,40,24,0.85) 100%)",
          }}
        />
        <div className="absolute inset-x-5 bottom-5 md:inset-x-7 md:bottom-7 text-white">
          <div className="glass-light glass-sheen p-6 md:p-7 rounded-[6px]">
            <p
              className="caption mb-3"
              style={{ color: "var(--color-gold-300)" }}
            >
              Sector {sector.ordinal} · {ventures.length}{" "}
              {ventures.length === 1 ? "venture" : "ventures"}
            </p>
            <h3 className="display text-[clamp(2rem,3.6vw,3rem)] leading-[0.98] mb-3">
              {sector.name}
            </h3>
            <p className="lede max-w-md opacity-90 mb-5">{sector.ethos}</p>
            <div
              className="caption inline-flex items-center gap-2 transition-colors group-hover:text-[color:var(--color-gold-300)]"
            >
              Enter sector
              <span aria-hidden>→</span>
            </div>
          </div>
        </div>
      </ImageReveal>
    </Link>
  );
}
