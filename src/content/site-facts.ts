import { ventures } from "./ventures";
import { sectorOrder } from "./sectors";

/**
 * Single source of truth for the group's headline facts.
 *
 * Counts are DERIVED from the content registries so they can never drift
 * out of sync with the data (the old hardcoded "XI Brands" plate on the
 * sectors page was exactly this class of bug). Add a venture or a sector
 * and every stat plate, metadata string and schema value updates itself.
 */

/** The year Hemco's first works opened. */
export const FOUNDING_YEAR = 1998;

/** Number of operating brands — derived from the venture registry. */
export const BRAND_COUNT = ventures.length;

/** Number of sectors — derived from the sector registry. */
export const SECTOR_COUNT = sectorOrder.length;

/** Years compounding since founding. Auto-advances each calendar year. */
export function yearsCompounding(asOf: Date = new Date()): number {
  return asOf.getFullYear() - FOUNDING_YEAR;
}

const ROMAN: ReadonlyArray<readonly [number, string]> = [
  [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
  [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
  [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
];

/** Positive integer → Roman numeral (13 → "XIII", 7 → "VII"). */
export function toRoman(n: number): string {
  if (!Number.isInteger(n) || n <= 0) return String(n);
  let out = "";
  let rem = n;
  for (const [value, symbol] of ROMAN) {
    while (rem >= value) {
      out += symbol;
      rem -= value;
    }
  }
  return out;
}

const ONES = [
  "zero", "one", "two", "three", "four", "five", "six", "seven", "eight",
  "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen",
  "sixteen", "seventeen", "eighteen", "nineteen",
];
const TENS = [
  "", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy",
  "eighty", "ninety",
];

/** Non-negative integer (0–99) → English words. Falls back to digits. */
export function numberWord(n: number): string {
  if (!Number.isInteger(n) || n < 0) return String(n);
  if (n < 20) return ONES[n];
  if (n < 100) {
    const tens = TENS[Math.floor(n / 10)];
    const ones = n % 10;
    return ones ? `${tens}-${ONES[ones]}` : tens;
  }
  return String(n);
}

/** Capitalised word form (13 → "Thirteen"). */
export function numberWordCap(n: number): string {
  const word = numberWord(n);
  return word.charAt(0).toUpperCase() + word.slice(1);
}
