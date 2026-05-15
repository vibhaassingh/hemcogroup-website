import { GoldRule } from "./section";

export function PullQuote({
  children,
  attribution,
  className = "",
}: {
  children: React.ReactNode;
  attribution?: string;
  className?: string;
}) {
  return (
    <figure className={`my-20 max-w-3xl mx-auto text-center ${className}`}>
      <GoldRule className="mx-auto mb-10 w-24" variant="solid" />
      <blockquote
        className="display-italic text-[clamp(1.75rem,3.4vw,3rem)] leading-[1.18]"
        style={{ color: "var(--tone-fg)" }}
      >
        “{children}”
      </blockquote>
      {attribution && (
        <figcaption
          className="caption mt-8"
          style={{ color: "var(--tone-fg-mute)" }}
        >
          {attribution}
        </figcaption>
      )}
    </figure>
  );
}
