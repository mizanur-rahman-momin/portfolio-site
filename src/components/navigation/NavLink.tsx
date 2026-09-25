"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";

type NavLinkProps = {
  href: string;
  label: string;
  className?: string;
  /** Called after navigation (used to close the mobile menu). */
  onNavigate?: () => void;
};

export function NavLink({ href, label, className, onNavigate }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "relative inline-flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
        isActive ? "text-fg" : "text-fg-muted hover:text-fg",
        className,
      )}
    >
      {label}
      <span
        aria-hidden="true"
        className={cn(
          "bg-accent absolute inset-x-3 -bottom-px h-0.5 rounded-full transition-opacity",
          isActive ? "opacity-100" : "opacity-0",
        )}
      />
    </Link>
  );
}
