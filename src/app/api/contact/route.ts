import { NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * Contact-form delivery endpoint.
 *
 * POST { name, email, organisation, routing, message } → forwards the
 * enquiry to vibhaas.singh@kerning.ooo via Resend, with a Reply-To
 * pointing at the sender so a direct reply lands in their inbox.
 *
 * The `RESEND_API_KEY` env var must be set in production (Vercel) and
 * locally (.env.local). The sender address must use a verified domain
 * on Resend; until the group's domain is verified, we use Resend's
 * `onboarding@resend.dev` as the FROM. Update `FROM_ADDRESS` once
 * `hemcogroup.com` (or another preferred sender domain) is verified.
 */

const TO_ADDRESS = "vibhaas.singh@kerning.ooo";
// Sender uses the verified `noreply.hemco.ooo` subdomain on Resend so
// the email isn't bound by the `onboarding@resend.dev` recipient
// allow-list, has correct DKIM/SPF, and lands in the inbox cleanly.
const FROM_ADDRESS = "Hemco Group <enquiries@noreply.hemco.ooo>";

type Routing = "general" | "careers" | "press" | "corporate" | "foundation";

const routingLabels: Record<Routing, string> = {
  general: "General enquiries",
  careers: "Careers",
  press: "Press & media",
  corporate: "Corporate & partnerships",
  foundation: "Foundation",
};

interface SubmissionPayload {
  name?: unknown;
  email?: unknown;
  organisation?: unknown;
  routing?: unknown;
  message?: unknown;
}

const isString = (v: unknown): v is string =>
  typeof v === "string" && v.trim().length > 0;

const escape = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export async function POST(req: Request) {
  // Validate env early so failures are explicit and fast.
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: "Email service is not configured." },
      { status: 500 },
    );
  }

  let body: SubmissionPayload;
  try {
    body = (await req.json()) as SubmissionPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  // Field-level validation. Mirrors what the client checks, with stricter
  // server-side checks for length / shape so the form can't be bypassed.
  if (!isString(body.name) || !isString(body.email) || !isString(body.message)) {
    return NextResponse.json(
      { ok: false, error: "Name, email, and message are required." },
      { status: 400 },
    );
  }
  const name = body.name.trim().slice(0, 200);
  const email = body.email.trim().slice(0, 200);
  const organisation = isString(body.organisation)
    ? body.organisation.trim().slice(0, 200)
    : "";
  const routing: Routing =
    isString(body.routing) && body.routing in routingLabels
      ? (body.routing as Routing)
      : "general";
  const message = body.message.trim().slice(0, 5000);

  // Permissive but realistic email check.
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "That email doesn't look right." },
      { status: 400 },
    );
  }

  const resend = new Resend(apiKey);

  const subject = `Hemco Group — ${routingLabels[routing]} from ${name}`;

  const text = [
    `New enquiry via hemcogroup.com`,
    ``,
    `Routing: ${routingLabels[routing]}`,
    `Name: ${name}`,
    `Email: ${email}`,
    organisation ? `Organisation: ${organisation}` : null,
    `Submitted: ${new Date().toISOString()}`,
    ``,
    `Message:`,
    message,
  ]
    .filter(Boolean)
    .join("\n");

  // Editorial-style HTML body. Plain enough to land in any inbox without
  // tripping spam heuristics, but readable in a mail client.
  const html = `
    <!doctype html>
    <html lang="en">
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background:#f7f1e4; padding:32px 16px; color:#1a1a1a;">
        <div style="max-width:560px; margin:0 auto; background:#ffffff; border:1px solid #e6dfcf; padding:32px;">
          <p style="margin:0 0 6px; font-size:11px; letter-spacing:0.22em; text-transform:uppercase; color:#a37e2c;">
            Hemco Group · Enquiry
          </p>
          <h1 style="margin:0 0 20px; font-family:Georgia,serif; font-size:22px; line-height:1.25; color:#1a1a1a;">
            ${escape(routingLabels[routing])}
          </h1>
          <table style="width:100%; border-collapse:collapse; font-size:13.5px; line-height:1.55;">
            <tr><td style="padding:8px 0; color:#7a6e3e; width:34%;">Name</td><td style="padding:8px 0;">${escape(name)}</td></tr>
            <tr><td style="padding:8px 0; color:#7a6e3e;">Email</td><td style="padding:8px 0;"><a href="mailto:${escape(email)}" style="color:#1a1a1a;">${escape(email)}</a></td></tr>
            ${organisation ? `<tr><td style="padding:8px 0; color:#7a6e3e;">Organisation</td><td style="padding:8px 0;">${escape(organisation)}</td></tr>` : ""}
            <tr><td style="padding:8px 0; color:#7a6e3e;">Routing</td><td style="padding:8px 0;">${escape(routingLabels[routing])}</td></tr>
            <tr><td style="padding:8px 0; color:#7a6e3e;">Submitted</td><td style="padding:8px 0;">${new Date().toLocaleString("en-GB", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" })} IST</td></tr>
          </table>
          <hr style="border:none; border-top:1px solid #e6dfcf; margin:20px 0;" />
          <p style="margin:0 0 8px; font-size:11px; letter-spacing:0.22em; text-transform:uppercase; color:#a37e2c;">Message</p>
          <p style="margin:0; font-size:14px; line-height:1.65; white-space:pre-wrap; color:#1a1a1a;">${escape(message)}</p>
        </div>
        <p style="max-width:560px; margin:14px auto 0; font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:#9a8e6a; text-align:center;">
          Sent from hemcogroup.com — reply directly to ${escape(email)}
        </p>
      </body>
    </html>
  `;

  try {
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: [TO_ADDRESS],
      replyTo: email,
      subject,
      text,
      html,
    });
    if (error) {
      // eslint-disable-next-line no-console
      console.error("[contact] resend error:", error);
      return NextResponse.json(
        { ok: false, error: "Email delivery failed." },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("[contact] unexpected error:", e);
    return NextResponse.json(
      { ok: false, error: "Unexpected server error." },
      { status: 500 },
    );
  }
}
