/**
 * Hemco wordmark — pure typographic lockup, single line.
 * "HEMCO GROUP" in serif caps with wide tracking. Inherits color from
 * the surrounding tone via currentColor.
 */
export function Wordmark({
  size = "md",
  className,
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const text = {
    sm: "text-[0.78rem]",
    md: "text-[0.92rem]",
    lg: "text-[1.15rem]",
  }[size];

  return (
    <span
      className={`inline-block font-medium uppercase leading-none ${text} ${className ?? ""}`}
      style={{
        fontFamily: "var(--font-serif)",
        letterSpacing: "0.34em",
        paddingLeft: "0.34em",
      }}
    >
      Hemco Group
    </span>
  );
}
