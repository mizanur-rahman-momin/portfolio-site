/**
 * Contact form contract shared by the client form and the server route.
 *
 * One module means the browser and the server always agree on the allowed
 * values and the validation rules — the server still re-validates everything.
 */

export const PROJECT_TYPES = [
  "SaaS product",
  "AI feature or tool",
  "Web application",
  "Frontend implementation",
  "Consulting or audit",
  "Something else",
] as const;

export const BUDGET_RANGES = [
  "Not sure yet",
  "Under $5k",
  "$5k – $15k",
  "$15k – $40k",
  "$40k+",
] as const;

export const TIMELINES = [
  "As soon as possible",
  "Within 1–2 months",
  "This quarter",
  "Just exploring",
] as const;

export type ContactInput = {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
  /** Honeypot — must stay empty. Bots fill it in. */
  company?: string;
  /** Client timestamp (ms) used to reject instant submissions. */
  startedAt?: number;
};

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MIN_MESSAGE_LENGTH = 20;
const MAX_MESSAGE_LENGTH = 5000;
const MIN_FILL_TIME_MS = 2500;

function isOption<T extends readonly string[]>(options: T, value: string): value is T[number] {
  return (options as readonly string[]).includes(value);
}

/** Validate a contact submission. Returns a map of field errors (empty = valid). */
export function validateContact(input: Partial<ContactInput>): ContactErrors {
  const errors: ContactErrors = {};

  const name = (input.name ?? "").trim();
  const email = (input.email ?? "").trim();
  const message = (input.message ?? "").trim();

  if (name.length < 2) {
    errors.name = "Please enter your name (at least 2 characters).";
  } else if (name.length > 100) {
    errors.name = "Please keep your name under 100 characters.";
  }

  if (email.length === 0) {
    errors.email = "Please enter an email address so I can reply.";
  } else if (email.length > 200 || !EMAIL_PATTERN.test(email)) {
    errors.email = "That email address does not look valid.";
  }

  if (message.length < MIN_MESSAGE_LENGTH) {
    errors.message = `Please add a little more detail (at least ${MIN_MESSAGE_LENGTH} characters).`;
  } else if (message.length > MAX_MESSAGE_LENGTH) {
    errors.message = `Please keep your message under ${MAX_MESSAGE_LENGTH} characters.`;
  }

  if (input.projectType && !isOption(PROJECT_TYPES, input.projectType)) {
    errors.projectType = "Please choose one of the listed project types.";
  }

  if (input.budget && !isOption(BUDGET_RANGES, input.budget)) {
    errors.budget = "Please choose one of the listed budget ranges.";
  }

  if (input.timeline && !isOption(TIMELINES, input.timeline)) {
    errors.timeline = "Please choose one of the listed timelines.";
  }

  return errors;
}

/** Spam heuristics that do not depend on any third-party service. */
export function looksLikeSpam(input: Partial<ContactInput>): boolean {
  if (input.company && input.company.trim().length > 0) return true;

  if (typeof input.startedAt === "number" && input.startedAt > 0) {
    const elapsed = Date.now() - input.startedAt;
    if (elapsed >= 0 && elapsed < MIN_FILL_TIME_MS) return true;
  }

  return false;
}

export function hasErrors(errors: ContactErrors): boolean {
  return Object.keys(errors).length > 0;
}
