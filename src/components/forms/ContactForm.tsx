"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { AlertIcon, CheckIcon } from "@/components/ui/icons";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils/cn";
import {
  BUDGET_RANGES,
  PROJECT_TYPES,
  TIMELINES,
  hasErrors,
  validateContact,
  type ContactErrors,
  type ContactInput,
} from "@/lib/validation/contact";

type Status = "idle" | "submitting" | "success" | "error";

const inputClasses =
  "w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-fg placeholder:text-fg-subtle transition-colors focus:border-border-strong focus:outline-none";

function fieldClasses(hasError: boolean): string {
  return cn(inputClasses, hasError && "border-danger focus:border-danger");
}

export function ContactForm() {
  const formId = useId();
  const startedAt = useRef<number>(0);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [fallbackEmail, setFallbackEmail] = useState<string | null>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);

    const input: ContactInput = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      projectType: String(data.get("projectType") ?? ""),
      budget: String(data.get("budget") ?? ""),
      timeline: String(data.get("timeline") ?? ""),
      message: String(data.get("message") ?? ""),
      company: String(data.get("company") ?? ""),
      startedAt: startedAt.current,
    };

    const clientErrors = validateContact(input);
    setErrors(clientErrors);
    setServerError(null);

    if (hasErrors(clientErrors)) {
      setStatus("idle");
      const firstField = Object.keys(clientErrors)[0];
      if (firstField) {
        const element = form.elements.namedItem(firstField);
        if (element instanceof HTMLElement) element.focus();
      }
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      const result = (await response.json()) as {
        ok: boolean;
        error?: string;
        errors?: ContactErrors;
        fallbackEmail?: string | null;
      };

      if (result.ok) {
        setStatus("success");
        form.reset();
        return;
      }

      if (result.errors) setErrors(result.errors);
      setServerError(result.error ?? "Something went wrong. Please try again.");
      setFallbackEmail(result.fallbackEmail ?? null);
      setStatus("error");
    } catch {
      setServerError("Could not reach the server. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-card border-success/35 bg-success/8 flex items-start gap-3 border p-6"
      >
        <CheckIcon className="text-success mt-0.5 size-5 shrink-0" />
        <div>
          <h2 className="text-fg font-semibold">Message sent</h2>
          <p className="text-fg-muted mt-2 text-sm leading-relaxed">
            Thanks for getting in touch. I read every message and will reply as soon as I can.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {status === "error" && serverError ? (
        <div
          role="alert"
          className="rounded-card border-danger/35 bg-danger/8 flex items-start gap-3 border p-4 text-sm"
        >
          <AlertIcon className="text-danger mt-0.5 size-4 shrink-0" />
          <div>
            <p className="text-fg">{serverError}</p>
            {fallbackEmail ? (
              <p className="text-fg-muted mt-1">
                You can email{" "}
                <a className="link-underline" href={`mailto:${fallbackEmail}`}>
                  {fallbackEmail}
                </a>{" "}
                directly.
              </p>
            ) : null}
          </div>
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${formId}-name`} className="text-fg block text-sm font-medium">
            Name
          </label>
          <input
            id={`${formId}-name`}
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? `${formId}-name-error` : undefined}
            className={fieldClasses(Boolean(errors.name))}
          />
          {errors.name ? (
            <p id={`${formId}-name-error`} className="text-danger mt-1.5 text-xs">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor={`${formId}-email`} className="text-fg block text-sm font-medium">
            Email
          </label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? `${formId}-email-error` : undefined}
            className={fieldClasses(Boolean(errors.email))}
          />
          {errors.email ? (
            <p id={`${formId}-email-error`} className="text-danger mt-1.5 text-xs">
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label htmlFor={`${formId}-projectType`} className="text-fg block text-sm font-medium">
            Project type
          </label>
          <select
            id={`${formId}-projectType`}
            name="projectType"
            defaultValue=""
            className={fieldClasses(false)}
          >
            <option value="">Select…</option>
            {PROJECT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={`${formId}-budget`} className="text-fg block text-sm font-medium">
            Budget
          </label>
          <select
            id={`${formId}-budget`}
            name="budget"
            defaultValue=""
            className={fieldClasses(false)}
          >
            <option value="">Select…</option>
            {BUDGET_RANGES.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={`${formId}-timeline`} className="text-fg block text-sm font-medium">
            Timeline
          </label>
          <select
            id={`${formId}-timeline`}
            name="timeline"
            defaultValue=""
            className={fieldClasses(false)}
          >
            <option value="">Select…</option>
            {TIMELINES.map((timeline) => (
              <option key={timeline} value={timeline}>
                {timeline}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor={`${formId}-message`} className="text-fg block text-sm font-medium">
          Message
        </label>
        <textarea
          id={`${formId}-message`}
          name="message"
          rows={6}
          required
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? `${formId}-message-error` : `${formId}-message-hint`}
          className={cn(fieldClasses(Boolean(errors.message)), "resize-y")}
        />
        {errors.message ? (
          <p id={`${formId}-message-error`} className="text-danger mt-1.5 text-xs">
            {errors.message}
          </p>
        ) : (
          <p id={`${formId}-message-hint`} className="text-fg-subtle mt-1.5 text-xs">
            A few sentences about the problem, the context and what success looks like.
          </p>
        )}
      </div>

      {/* Honeypot: hidden from users, ignored by assistive technology. */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor={`${formId}-company`}>Company</label>
        <input
          id={`${formId}-company`}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Send message"}
        </Button>
        <p className="text-fg-subtle text-xs">
          Prefer email? Write to{" "}
          <a className="link-underline" href={`mailto:${siteConfig.contactEmail}`}>
            {siteConfig.contactEmail}
          </a>
          .
        </p>
      </div>
    </form>
  );
}
