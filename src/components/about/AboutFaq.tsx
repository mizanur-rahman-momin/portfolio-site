"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";

const faqs = [
  {
    question: "How do you verify your B2B prospect lists?",
    answer:
      "We use a multi-layer verification process. First, our researchers hand-verify that each contact actively holds the target decision-maker role at the company. Then we run automated SMTP handshake pinging and DNS MX checks to confirm inbox validity. Any email that bounces or is flagged as risky is removed, providing zero-bounce guarantees.",
  },
  {
    question: "What industries and company sizes do you specialize in?",
    answer:
      "We primarily partner with B2B SaaS companies, tech startups, marketing agencies, and professional services firms targeting companies from 10 to 5,000 employees across North America, Europe, the UK, and Australia.",
  },
  {
    question: "How do you protect email deliverability and avoid spam filters?",
    answer:
      "We set up dedicated secondary outbound domains with proper DNS authentication (SPF, DKIM, DMARC), warm inboxes up gradually over 2 to 3 weeks, write short conversational copy without spam-trigger words, and keep daily sending volumes strictly capped per inbox.",
  },
  {
    question: "What tools and tech stack do you use for outbound automations?",
    answer:
      "We build robust, self-hosted and cloud workflows using n8n, Airtable, Google Sheets, custom REST APIs, and modern AI models (OpenAI & Claude via API) for lead enrichment, deduplication, and CRM routing.",
  },
  {
    question: "How soon can we expect to see results from an outreach campaign?",
    answer:
      "List building and ICP discovery typically take 1 to 2 weeks. Once domain warmup and sequence drafting are complete, campaigns begin sending. Positive replies and booked discovery calls typically start coming in within the first 10 to 14 days of live sending.",
  },
  {
    question: "How do we get started working with you?",
    answer:
      "The easiest first step is to visit the Contact page and submit a brief description of your ideal customer profile and current sales goals. I will review it personally and respond within 24 hours with an actionable recommendation.",
  },
];

export function AboutFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-20 sm:py-24 dark:bg-zinc-950">
      <Container size="wide">
        <div className="mx-auto max-w-3xl">
          {/* Section Heading */}
          <div className="mb-14 text-center">
            <span className="font-mono text-xs font-semibold tracking-widest text-blue-600 uppercase dark:text-blue-400">
              Got Questions?
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400">
              Clear answers about our prospecting methodology, deliverability safeguards, and
              working process.
            </p>
          </div>

          {/* Accordion Items */}
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.question}
                  className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xs transition-colors dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    className="flex w-full cursor-pointer items-center justify-between p-6 text-left text-base font-bold text-zinc-900 transition-colors hover:text-blue-600 sm:text-lg dark:text-white dark:hover:text-blue-400"
                  >
                    <span>{faq.question}</span>
                    <span className="ml-4 shrink-0 text-xl font-bold text-blue-600 dark:text-blue-400">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="border-t border-zinc-100 px-6 pt-0 pt-4 pb-6 text-sm leading-relaxed text-zinc-600 sm:text-base dark:border-zinc-800/60 dark:text-zinc-400">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
