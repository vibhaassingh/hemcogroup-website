"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";

type Routing = "general" | "careers" | "press" | "corporate" | "foundation";

const routingLabels: Record<Routing, string> = {
  general: "General enquiries",
  careers: "Careers",
  press: "Press & media",
  corporate: "Corporate & partnerships",
  foundation: "Foundation",
};

interface SubmissionRecord {
  ts: string;
  name: string;
  email: string;
  organisation: string;
  routing: Routing;
  message: string;
}

const STORE_KEY = "hemco.contact.submissions.v1";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [routing, setRouting] = useState<Routing>("general");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status !== "idle") return;
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Name, email, and message are required.");
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError("That email doesn't look right.");
      return;
    }
    setError(null);
    setStatus("submitting");

    const record: SubmissionRecord = {
      ts: new Date().toISOString(),
      name: name.trim(),
      email: email.trim(),
      organisation: organisation.trim(),
      routing,
      message: message.trim(),
    };

    // Best-effort local copy so a connection error doesn't lose the
    // sender's note before we get a chance to retry.
    try {
      const existing = JSON.parse(
        localStorage.getItem(STORE_KEY) || "[]",
      ) as SubmissionRecord[];
      existing.push(record);
      localStorage.setItem(STORE_KEY, JSON.stringify(existing));
    } catch {
      /* localStorage may be unavailable */
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: record.name,
          email: record.email,
          organisation: record.organisation,
          routing: record.routing,
          message: record.message,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!res.ok || !data.ok) {
        setError(
          data.error ||
            "Couldn't send right now. Please try again or write directly to hello@hemcogroup.com.",
        );
        setStatus("idle");
        return;
      }
      setStatus("sent");
    } catch {
      setError(
        "Network problem — please try again, or write directly to hello@hemcogroup.com.",
      );
      setStatus("idle");
    }
  };

  const reset = () => {
    setName("");
    setEmail("");
    setOrganisation("");
    setRouting("general");
    setMessage("");
    setStatus("idle");
    setError(null);
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status === "sent" ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="border border-bone-3 bg-bone-2/50 p-10 md:p-12"
          >
            <p className="eyebrow mb-4 text-brass">● Received</p>
            <h3 className="display-tight text-[clamp(1.5rem,2.4vw,2rem)]">
              Thanks — your note is in.
            </h3>
            <p className="measure-wide mt-5 text-[1rem] leading-[1.7] text-ink-2/75">
              We&apos;ll route this to the {routingLabels[routing].toLowerCase()}{" "}
              desk and reply from the same address. If something is urgent in
              the meantime, write directly to{" "}
              <a
                href="mailto:hello@hemcogroup.com"
                className="rise-underline text-ink"
              >
                hello@hemcogroup.com
              </a>
              .
            </p>
            <button
              type="button"
              onClick={reset}
              className="btn btn-secondary mt-9"
            >
              Send another
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onSubmit={onSubmit}
            noValidate
            className="grid gap-7"
          >
            <div className="grid gap-7 md:grid-cols-2 md:gap-8">
              <Field
                label="Your name"
                value={name}
                onChange={setName}
                autoComplete="name"
                required
              />
              <Field
                label="Email"
                type="email"
                value={email}
                onChange={setEmail}
                autoComplete="email"
                required
              />
            </div>
            <Field
              label="Organisation (optional)"
              value={organisation}
              onChange={setOrganisation}
              autoComplete="organization"
            />
            <div>
              <label className="eyebrow text-ink/65">Route to</label>
              <div className="mt-3 flex flex-wrap gap-2">
                {(Object.keys(routingLabels) as Routing[]).map((r) => {
                  const active = r === routing;
                  return (
                    <button
                      type="button"
                      key={r}
                      onClick={() => setRouting(r)}
                      className={`rounded-full border px-4 py-2 text-[13px] transition-colors duration-300 ${
                        active
                          ? "border-ink bg-ink text-bone"
                          : "border-bone-3 bg-transparent text-ink/70 hover:border-ink/40 hover:text-ink"
                      }`}
                    >
                      {routingLabels[r]}
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <label
                htmlFor="message"
                className="eyebrow block text-ink/65"
              >
                Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                required
                className="mt-3 w-full resize-none border-b border-bone-3 bg-transparent py-3 text-[15px] leading-[1.6] text-ink outline-none transition-colors focus:border-ink"
                placeholder="What are you working on?"
              />
            </div>
            {error && (
              <p className="text-[13px] text-brass" role="alert">
                {error}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="btn btn-primary disabled:opacity-60"
              >
                {status === "submitting" ? "Sending…" : "Send message"}
              </button>
              <p className="text-[12px] text-ink/55">
                We reply from the same address. No newsletters, no lists.
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="eyebrow text-ink/65">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        autoComplete={autoComplete}
        className="mt-3 w-full border-b border-bone-3 bg-transparent py-3 text-[15px] text-ink outline-none transition-colors focus:border-ink"
      />
    </label>
  );
}
