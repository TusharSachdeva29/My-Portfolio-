"use server";

import { siteConfig } from "@/lib/site";

// Server-only: never shipped to the browser. Override with CONTACT_EMAIL
// (or a FormSubmit alias) in the Vercel project settings if desired.
const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? "sachdevatushar81@gmail.com";

// Humans take longer than this to fill in three fields.
const MIN_FILL_TIME_MS = 3000;

export type ContactInput = {
  name: string;
  email: string;
  message: string;
  // Honeypot: hidden from people, filled by naive bots.
  company?: string;
  startedAt?: number;
};

export type ContactResult = { ok: true } | { ok: false; error: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendContactMessage(input: ContactInput): Promise<ContactResult> {
  const name = String(input.name ?? "").replace(/[\r\n]+/g, " ").trim();
  const email = String(input.email ?? "").trim();
  const message = String(input.message ?? "").trim();

  // Bots: report success so they don't retry, but send nothing.
  const tooFast =
    typeof input.startedAt === "number" && Date.now() - input.startedAt < MIN_FILL_TIME_MS;
  if (input.company || tooFast) return { ok: true };

  if (!name || !email || !message) {
    return { ok: false, error: "Please fill out all fields." };
  }
  if (!EMAIL_RE.test(email) || email.length > 200) {
    return { ok: false, error: "Please enter a valid email address." };
  }
  if (name.length > 100) {
    return { ok: false, error: "Please keep your name under 100 characters." };
  }
  if (message.length < 10 || message.length > 5000) {
    return { ok: false, error: "Your message should be between 10 and 5000 characters." };
  }

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // FormSubmit rejects requests without a page origin.
        Origin: siteConfig.url,
        Referer: `${siteConfig.url}/`,
      },
      body: JSON.stringify({
        _subject: `New Portfolio Message from ${name}`,
        _replyto: email,
        _template: "box",
        _captcha: "false",
        name,
        email,
        message,
      }),
      cache: "no-store",
    });

    const data = (await response.json().catch(() => null)) as { success?: string | boolean } | null;
    if (!response.ok || String(data?.success) !== "true") {
      console.error("Contact form: FormSubmit rejected the message", response.status, data);
      throw new Error("FormSubmit rejected the message");
    }

    return { ok: true };
  } catch (error) {
    console.error("Contact form submission error:", error);
    return {
      ok: false,
      error: "Something went wrong. Please try again or reach out on LinkedIn.",
    };
  }
}
