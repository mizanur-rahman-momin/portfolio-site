const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

const shortDateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

const monthYearFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  timeZone: "UTC",
});

function parseDate(value: string | Date): Date | null {
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

/** "January 31, 2026" */
export function formatDate(value: string | Date): string {
  const date = parseDate(value);
  return date ? dateFormatter.format(date) : "";
}

/** "Jan 31, 2026" */
export function formatShortDate(value: string | Date): string {
  const date = parseDate(value);
  return date ? shortDateFormatter.format(date) : "";
}

/** "January 2026" */
export function formatMonthYear(value: string | Date): string {
  const date = parseDate(value);
  return date ? monthYearFormatter.format(date) : "";
}

/** Machine-readable ISO date for <time dateTime> and structured data. */
export function toIsoDate(value: string | Date): string {
  const date = parseDate(value);
  return date ? date.toISOString() : "";
}

/** Turn a string into a URL-safe slug. */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/** Title-case a slug for display, e.g. "next-js" -> "Next Js". */
export function humanizeSlug(value: string): string {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

/** Clamp a list of items for display. */
export function take<T>(items: T[], count: number): T[] {
  return items.slice(0, count);
}
