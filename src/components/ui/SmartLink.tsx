import Link from "next/link";
import { ExternalLinkIcon } from "./icons";
import { cn } from "@/lib/utils/cn";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type SmartLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  /** Show the external-link glyph after the label. */
  showExternalIcon?: boolean;
};

function isProtocolRelativeOrAbsolute(href: string): boolean {
  return /^(https?:)?\/\//.test(href);
}

function isNonHttpProtocol(href: string): boolean {
  return /^(mailto:|tel:)/.test(href);
}

/**
 * One link component for the whole site.
 *
 * - Internal routes use `next/link` for client-side navigation.
 * - External links open in a new tab with `rel="noopener noreferrer"` and an
 *   accessible "opens in a new tab" hint for screen-reader users.
 * - In-page anchors render as plain anchors so the browser handles them.
 */
export function SmartLink({
  href,
  children,
  className,
  showExternalIcon = false,
  ...props
}: SmartLinkProps) {
  if (isProtocolRelativeOrAbsolute(href)) {
    return (
      <a
        href={href}
        className={cn("inline-flex items-baseline gap-1", className)}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
        {showExternalIcon ? (
          <ExternalLinkIcon className="size-[0.85em] shrink-0 translate-y-[0.1em]" />
        ) : null}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  if (isNonHttpProtocol(href)) {
    return (
      <a href={href} className={className} {...props}>
        {children}
      </a>
    );
  }

  if (href.startsWith("#")) {
    return (
      <a href={href} className={className} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} {...props}>
      {children}
    </Link>
  );
}
