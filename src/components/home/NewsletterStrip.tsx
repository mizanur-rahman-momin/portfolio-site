"use client";

import { useState, type FormEvent } from "react";
import { Container } from "@/components/ui/Container";

export function NewsletterStrip() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubmitted(true);
  };

  return (
    <section className="relative overflow-hidden border-t border-zinc-200/80 bg-zinc-50/80 py-20 sm:py-28 dark:border-zinc-800/80 dark:bg-zinc-950">
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(37,99,235,0.08),transparent_70%)] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(37,99,235,0.18),transparent_70%)]"
      />

      <Container size="wide">
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-blue-200/80 bg-gradient-to-br from-white via-blue-50/40 to-indigo-50/30 p-8 shadow-xl sm:p-14 dark:border-blue-500/20 dark:from-zinc-900 dark:via-zinc-900/90 dark:to-blue-950/40">
          {/* Subtle glowing ambient element */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-20 -right-20 size-72 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-500/20"
          />

          <div className="relative z-10 mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-50/80 px-3 py-1 text-xs font-semibold text-blue-600 dark:border-blue-500/30 dark:bg-blue-950/60 dark:text-blue-300">
              <span className="size-1.5 animate-pulse rounded-full bg-blue-600 dark:bg-blue-400" />
              Weekly Outbound Intel
            </span>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl dark:text-white">
              Get the Weekly Playbook
            </h2>

            <p className="mt-4 text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-300">
              A 4-minute weekly breakdown of tested B2B lead generation tactics, high-reply cold
              email frameworks, and automation workflows. Zero fluff, 100% actionable.
            </p>

            {/* Email Signup Form */}
            <div className="mx-auto mt-8 max-w-md">
              {submitted ? (
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-50/80 p-5 font-medium text-emerald-900 shadow-sm dark:bg-emerald-950/50 dark:text-emerald-200">
                  🎉 <strong className="font-semibold">You&apos;re in!</strong> Check your inbox to
                  confirm and get your welcome playbook.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-2.5 sm:flex-row">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your work email"
                    aria-label="Work email address"
                    className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 shadow-xs transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500"
                  />
                  <button
                    type="submit"
                    className="inline-flex shrink-0 cursor-pointer items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg active:bg-blue-800"
                  >
                    Subscribe Free
                  </button>
                </form>
              )}

              {/* Guarantees */}
              <div className="mt-5 flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-500 dark:text-zinc-400">
                <span className="inline-flex items-center gap-1">
                  <span className="font-bold text-emerald-500">✓</span> 10,000+ Readers
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="font-bold text-emerald-500">✓</span> 1-Click Unsubscribe
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="font-bold text-emerald-500">✓</span> No Spam Ever
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
