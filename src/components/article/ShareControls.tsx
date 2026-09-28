"use client";

import { useState, useSyncExternalStore } from "react";
import { CheckIcon, LinkIcon, ShareIcon } from "@/components/ui/icons";

/** The native share capability never changes during a session. */
function subscribe(): () => void {
  return () => {};
}

function getNativeShareSnapshot(): boolean {
  return typeof navigator !== "undefined" && typeof navigator.share === "function";
}

function getServerSnapshot(): boolean {
  return false;
}

type ShareControlsProps = {
  url: string;
  title: string;
};

/**
 * Share actions for an article.
 *
 * Uses the native share sheet where available and falls back to copying the
 * canonical link. No third-party script or tracking parameter is involved.
 */
export function ShareControls({ url, title }: ShareControlsProps) {
  const [copied, setCopied] = useState(false);
  // Read through useSyncExternalStore so the server snapshot (false) and the
  // client snapshot stay consistent without a state update in an effect.
  const canNativeShare = useSyncExternalStore(subscribe, getNativeShareSnapshot, getServerSnapshot);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  async function nativeShare() {
    try {
      await navigator.share({ title, url });
    } catch {
      // The user dismissed the share sheet; nothing to do.
    }
  }

  const buttonClass =
    "inline-flex items-center gap-1.5 rounded-full border border-zinc-200/90 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700 shadow-2xs transition-all hover:border-blue-500 hover:text-blue-600 dark:border-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-300 dark:hover:border-blue-400 dark:hover:text-blue-400";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button type="button" onClick={copyLink} className={buttonClass}>
        {copied ? <CheckIcon className="size-4" /> : <LinkIcon className="size-4" />}
        {copied ? "Link copied" : "Copy link"}
        <span aria-live="polite" className="sr-only">
          {copied ? "Article link copied to clipboard" : ""}
        </span>
      </button>

      {canNativeShare ? (
        <button type="button" onClick={nativeShare} className={buttonClass}>
          <ShareIcon className="size-4" />
          Share
        </button>
      ) : null}
    </div>
  );
}
