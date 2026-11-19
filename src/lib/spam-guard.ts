/**
 * Spam checks for the contact form. Pure functions, no dependencies, so
 * they run in the route handler and under `npm test` alike.
 *
 * Layers, cheapest first:
 *  - honeypot: a field people never see, which form-filling bots fill.
 *  - timing: the form reports how long it was open; a direct API post
 *    carries no timing, and a script submits faster than anyone types.
 *  - gibberish: random mixed-case strings such as "NHnuqMkcwjcZcrycgfJ".
 *  - rate limit: a cap per address, held in memory per server instance,
 *    so it slows a burst but is not a hard guarantee across instances.
 */

/** Shortest time a person plausibly needs to fill the form. */
export const MIN_FILL_MS = 3000;

export type SpamReason = "honeypot" | "too-fast" | "gibberish";

export interface SubmissionSignals {
  honeypot: unknown;
  elapsedMs: unknown;
  name: string;
  message: string;
}

// A long, letters-only word that flips from lower to upper case three or
// more times. Real names and brands ("GlaxoSmithKline") flip at most twice.
const isRandomToken = (token: string) =>
  /^[A-Za-z]{12,}$/.test(token) &&
  (token.match(/[a-z](?=[A-Z])/g)?.length ?? 0) >= 3;

/** True when every word in `value` is a random mixed-case string. */
export function looksLikeGibberish(value: string): boolean {
  const tokens = value.trim().split(/\s+/).filter(Boolean);
  return tokens.length > 0 && tokens.every(isRandomToken);
}

/** Returns why a submission is spam, or null when it looks human. */
export function checkSubmission(input: SubmissionSignals): SpamReason | null {
  if (typeof input.honeypot === "string" && input.honeypot.trim() !== "") {
    return "honeypot";
  }
  if (
    typeof input.elapsedMs !== "number" ||
    !Number.isFinite(input.elapsedMs) ||
    input.elapsedMs < MIN_FILL_MS
  ) {
    return "too-fast";
  }
  if (looksLikeGibberish(input.name) || looksLikeGibberish(input.message)) {
    return "gibberish";
  }
  return null;
}

/**
 * Fixed-window limiter. The returned function reports whether `key` may
 * make another request, and counts it when it may.
 */
export function createRateLimiter(limit: number, windowMs: number) {
  const hits = new Map<string, { count: number; resetAt: number }>();

  return (key: string, now: number = Date.now()): boolean => {
    for (const [k, entry] of hits) {
      if (entry.resetAt <= now) hits.delete(k);
    }
    const entry = hits.get(key);
    if (!entry) {
      hits.set(key, { count: 1, resetAt: now + windowMs });
      return true;
    }
    if (entry.count >= limit) return false;
    entry.count += 1;
    return true;
  };
}
