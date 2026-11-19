import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  MIN_FILL_MS,
  checkSubmission,
  createRateLimiter,
  looksLikeGibberish,
} from "./spam-guard.ts";

const human = {
  honeypot: "",
  elapsedMs: 45_000,
  name: "Asha Verma",
  message: "We're opening a 120-cover restaurant in Pune and need a kitchen.",
};

describe("looksLikeGibberish", () => {
  // The three strings from the bot enquiry received on 19 Nov 2026.
  for (const junk of [
    "NHnuqMkcwjcZcrycgfJ",
    "hksFjbobePZjBOrxL",
    "RoUVufVwUnYRxynNKYOkEd",
  ]) {
    it(`flags the random string ${junk}`, () => {
      assert.equal(looksLikeGibberish(junk), true);
    });
  }

  it("flags several random strings separated by spaces", () => {
    assert.equal(
      looksLikeGibberish("NHnuqMkcwjcZcrycgfJ  hksFjbobePZjBOrxL"),
      true,
    );
  });

  for (const real of [
    "Asha Verma",
    "McDonald",
    "GlaxoSmithKline",
    "PricewaterhouseCoopers",
    "internationalisation",
    "Hello",
    "厨房設備についてお問い合わせします",
    "https://www.linkedin.com/in/SomeLongProfileName",
    human.message,
  ]) {
    it(`accepts ${real}`, () => {
      assert.equal(looksLikeGibberish(real), false);
    });
  }

  it("accepts an empty string", () => {
    assert.equal(looksLikeGibberish(""), false);
  });
});

describe("checkSubmission", () => {
  it("passes a normal human submission", () => {
    assert.equal(checkSubmission(human), null);
  });

  it("rejects when the hidden honeypot field is filled", () => {
    assert.equal(
      checkSubmission({ ...human, honeypot: "http://spam.example" }),
      "honeypot",
    );
  });

  it("rejects a submission sent faster than a person can type", () => {
    assert.equal(
      checkSubmission({ ...human, elapsedMs: MIN_FILL_MS - 1 }),
      "too-fast",
    );
  });

  it("rejects a direct API post that carries no timing", () => {
    assert.equal(
      checkSubmission({ ...human, elapsedMs: undefined }),
      "too-fast",
    );
  });

  it("rejects timing sent as a string", () => {
    assert.equal(checkSubmission({ ...human, elapsedMs: "45000" }), "too-fast");
  });

  it("rejects a random-string name", () => {
    assert.equal(
      checkSubmission({ ...human, name: "NHnuqMkcwjcZcrycgfJ" }),
      "gibberish",
    );
  });

  it("rejects a random-string message", () => {
    assert.equal(
      checkSubmission({ ...human, message: "RoUVufVwUnYRxynNKYOkEd" }),
      "gibberish",
    );
  });
});

describe("createRateLimiter", () => {
  it("allows requests up to the limit, then blocks", () => {
    const allow = createRateLimiter(2, 1000);
    assert.equal(allow("1.2.3.4", 0), true);
    assert.equal(allow("1.2.3.4", 10), true);
    assert.equal(allow("1.2.3.4", 20), false);
  });

  it("allows again once the window has passed", () => {
    const allow = createRateLimiter(1, 1000);
    assert.equal(allow("1.2.3.4", 0), true);
    assert.equal(allow("1.2.3.4", 999), false);
    assert.equal(allow("1.2.3.4", 1000), true);
  });

  it("counts each address separately", () => {
    const allow = createRateLimiter(1, 1000);
    assert.equal(allow("1.2.3.4", 0), true);
    assert.equal(allow("5.6.7.8", 0), true);
  });
});
