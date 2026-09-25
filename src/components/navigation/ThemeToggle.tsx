"use client";

import { MoonIcon, SunIcon } from "@/components/ui/icons";

/**
 * Light/dark theme toggle.
 *
 * The theme lives on `<html>` (applied before paint by `ThemeScript`), so this
 * component reads it at click time instead of mirroring it in React state. Both
 * icons and both labels are always rendered and selected with CSS, which keeps
 * the server and client markup identical and avoids a hydration mismatch.
 */
export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.classList.contains("dark") ? "light" : "dark";

    root.classList.toggle("dark", next === "dark");
    root.style.colorScheme = next;

    try {
      localStorage.setItem("theme", next);
    } catch {
      /* Storage may be unavailable (private mode) — the theme still applies. */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="border-border text-fg-muted hover:border-border-strong hover:text-fg inline-flex size-9 items-center justify-center rounded-full border transition-colors"
    >
      <span className="sr-only dark:hidden">Switch to dark theme</span>
      <span className="sr-only hidden dark:block">Switch to light theme</span>
      <SunIcon className="block dark:hidden" width={17} height={17} />
      <MoonIcon className="hidden dark:block" width={17} height={17} />
    </button>
  );
}
