"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CloseIcon, MenuIcon, SearchIcon } from "@/components/ui/icons";
import { buttonClasses } from "@/components/ui/Button";
import { primaryNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils/cn";

/**
 * Mobile navigation built on the native `<dialog>` element so that focus
 * management, the Escape key and background inertness come from the platform
 * instead of custom JavaScript.
 */
export function MobileNav() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Every link in the panel closes the dialog on activation, so no
  // route-change effect is needed here.

  // Prevent the page behind the dialog from scrolling.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  function openMenu() {
    const dialog = dialogRef.current;
    if (!dialog) return;
    setOpen(true);
    dialog.showModal();
  }

  function closeMenu() {
    dialogRef.current?.close();
    setOpen(false);
    triggerRef.current?.focus();
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={openMenu}
        aria-expanded={open}
        aria-haspopup="dialog"
        className="border-border text-fg-muted hover:border-border-strong hover:text-fg inline-flex size-9 items-center justify-center rounded-full border transition-colors lg:hidden"
      >
        <MenuIcon width={18} height={18} />
        <span className="sr-only">Open menu</span>
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Site menu"
        onClose={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        className="bg-canvas text-fg fixed inset-0 m-0 h-full max-h-none w-full max-w-none p-0 backdrop:bg-black/50 lg:hidden"
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-zinc-200 px-5 dark:border-zinc-800">
            <Link
              href="/"
              onClick={closeMenu}
              className="inline-flex items-center transition-opacity hover:opacity-90"
              aria-label={siteConfig.siteName}
            >
              <Image
                src="/images/mizanursguidelogo.png"
                alt={siteConfig.siteName}
                width={150}
                height={65}
                className="h-8 w-auto object-contain dark:hidden"
              />
              <Image
                src="/images/mizanursguidelogo-dark.png"
                alt={siteConfig.siteName}
                width={150}
                height={65}
                className="hidden h-8 w-auto object-contain dark:block"
              />
            </Link>
            <button
              type="button"
              onClick={closeMenu}
              className="border-border text-fg-muted hover:text-fg inline-flex size-9 items-center justify-center rounded-full border transition-colors"
            >
              <CloseIcon width={18} height={18} />
              <span className="sr-only">Close menu</span>
            </button>
          </div>

          <nav aria-label="Primary" className="flex-1 overflow-y-auto px-5 py-6">
            <ul className="flex flex-col gap-1">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className={cn(
                      "hover:bg-surface-muted flex flex-col rounded-xl px-3 py-3 transition-colors",
                      pathname === item.href ? "bg-surface-muted" : "",
                    )}
                  >
                    <span className="text-fg text-lg font-medium tracking-tight">{item.label}</span>
                    {item.description ? (
                      <span className="text-fg-subtle mt-0.5 text-sm">{item.description}</span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="border-border shrink-0 border-t px-5 py-5">
            <Link
              href="/search"
              onClick={closeMenu}
              className={buttonClasses({ variant: "outline", className: "w-full" })}
            >
              <SearchIcon width={16} height={16} />
              Search the site
            </Link>
          </div>
        </div>
      </dialog>
    </>
  );
}
