"use client";

import { useEffect } from "react";

const COPY_LABEL = "Copy";
const COPIED_LABEL = "Copied";

type ArticleEnhancerProps = {
  /** Id of the element wrapping the rendered MDX content. */
  containerId: string;
};

/**
 * Progressive enhancement for rendered articles.
 *
 * The article itself is complete server-rendered HTML; this adds a copy button
 * to each code block and makes horizontally scrollable code focusable for
 * keyboard users. Nothing here is required to read the content.
 */
export function ArticleEnhancer({ containerId }: ArticleEnhancerProps) {
  useEffect(() => {
    const root = document.getElementById(containerId);
    if (!root) return;

    const cleanups: Array<() => void> = [];
    const blocks = Array.from(root.querySelectorAll("pre"));

    for (const node of blocks) {
      if (!(node instanceof HTMLPreElement)) continue;
      if (node.dataset.enhanced === "true") continue;

      const container = node.closest("figure") ?? node.parentElement;
      if (!container) continue;

      container.classList.add("code-block");

      // A scrollable region must be reachable and named for keyboard users.
      node.tabIndex = 0;
      node.setAttribute("role", "region");
      const language = node.dataset.language;
      node.setAttribute("aria-label", language ? `Code sample: ${language}` : "Code sample");

      const button = document.createElement("button");
      button.type = "button";
      button.className = "code-copy";
      button.textContent = COPY_LABEL;
      button.setAttribute("aria-label", "Copy code to clipboard");

      let resetTimer = 0;

      const onClick = () => {
        const text = node.textContent ?? "";
        const reset = () => {
          window.clearTimeout(resetTimer);
          resetTimer = window.setTimeout(() => {
            button.textContent = COPY_LABEL;
          }, 2000);
        };

        if (navigator.clipboard?.writeText) {
          navigator.clipboard
            .writeText(text)
            .then(() => {
              button.textContent = COPIED_LABEL;
              reset();
            })
            .catch(() => {
              button.textContent = "Press Ctrl+C";
              reset();
            });
        } else {
          button.textContent = "Press Ctrl+C";
          reset();
        }
      };

      button.addEventListener("click", onClick);
      container.appendChild(button);
      node.dataset.enhanced = "true";

      cleanups.push(() => {
        window.clearTimeout(resetTimer);
        button.removeEventListener("click", onClick);
        button.remove();
        container.classList.remove("code-block");
        delete node.dataset.enhanced;
      });
    }

    return () => {
      for (const cleanup of cleanups) cleanup();
    };
  }, [containerId]);

  return null;
}
