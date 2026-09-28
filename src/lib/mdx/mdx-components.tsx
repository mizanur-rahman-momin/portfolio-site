import Image from "next/image";
import type {
  AnchorHTMLAttributes,
  ImgHTMLAttributes,
  ReactNode,
  TableHTMLAttributes,
} from "react";
import { SmartLink } from "@/components/ui/SmartLink";
import { AlertIcon, InfoIcon, SparkIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils/cn";
import { getLocalImageDimensions } from "./image-dimensions";

/** MDX passes a `node` prop to mapped components; it must not reach the DOM. */
type MdxNode = { node?: unknown };

type MdxAnchorProps = MdxNode & AnchorHTMLAttributes<HTMLAnchorElement>;

function MdxAnchor({ node: _node, href, children, ...props }: MdxAnchorProps) {
  if (!href) return <span>{children}</span>;
  return (
    <SmartLink href={href} {...props}>
      {children}
    </SmartLink>
  );
}

type MdxImageProps = MdxNode &
  Omit<ImgHTMLAttributes<HTMLImageElement>, "width" | "height"> & {
    width?: number | string;
    height?: number | string;
  };

function MdxImage({ node: _node, src, alt, width, height, title, ...props }: MdxImageProps) {
  if (typeof src !== "string" || src.length === 0) return null;

  const intrinsic = getLocalImageDimensions(src);
  const numericWidth = typeof width === "number" ? width : Number(width) || undefined;
  const numericHeight = typeof height === "number" ? height : Number(height) || undefined;

  const resolvedWidth = numericWidth ?? intrinsic?.width ?? 1200;
  const resolvedHeight = numericHeight ?? intrinsic?.height ?? 630;

  return (
    <figure className="my-8">
      <Image
        src={src}
        alt={alt ?? ""}
        width={resolvedWidth}
        height={resolvedHeight}
        sizes="(min-width: 1024px) 44rem, 100vw"
        className="rounded-card border-border bg-surface-muted h-auto w-full border"
        {...props}
      />
      {title ? (
        <figcaption className="text-fg-subtle mt-2.5 text-center text-sm">{title}</figcaption>
      ) : null}
    </figure>
  );
}

type MdxTableProps = MdxNode & TableHTMLAttributes<HTMLTableElement>;

function MdxTable({ node: _node, children, ...props }: MdxTableProps) {
  return (
    <div className="my-8 w-full overflow-x-auto">
      <table {...props}>{children}</table>
    </div>
  );
}

type CalloutProps = {
  type?: "note" | "tip" | "warning";
  title?: string;
  children: ReactNode;
};

const calloutStyles = {
  note: "border-blue-500/30 bg-blue-50/60 dark:border-blue-500/30 dark:bg-blue-950/40 text-zinc-900 dark:text-zinc-100 shadow-2xs",
  tip: "border-emerald-500/30 bg-emerald-50/60 dark:border-emerald-500/30 dark:bg-emerald-950/40 text-zinc-900 dark:text-zinc-100 shadow-2xs",
  warning:
    "border-amber-500/30 bg-amber-50/60 dark:border-amber-500/30 dark:bg-amber-950/40 text-zinc-900 dark:text-zinc-100 shadow-2xs",
} as const;

const calloutBadgeStyles = {
  note: "text-blue-600 dark:text-blue-400 bg-blue-100/80 dark:bg-blue-900/50",
  tip: "text-emerald-600 dark:text-emerald-400 bg-emerald-100/80 dark:bg-emerald-900/50",
  warning: "text-amber-600 dark:text-amber-400 bg-amber-100/80 dark:bg-amber-900/50",
} as const;

const calloutIcons = {
  note: InfoIcon,
  tip: SparkIcon,
  warning: AlertIcon,
} as const;

const calloutLabels = {
  note: "Note",
  tip: "Pro Tip",
  warning: "Key Takeaway",
} as const;

/** Callout block for use inside MDX: `<Callout type="tip" title="...">…</Callout>` */
export function Callout({ type = "note", title, children }: CalloutProps) {
  const Icon = calloutIcons[type];
  return (
    <aside
      role="note"
      className={cn(
        "not-prose my-8 rounded-2xl border p-5 text-sm backdrop-blur-xs transition-all",
        calloutStyles[type],
      )}
    >
      <div className="flex items-center gap-2 font-semibold">
        <span
          className={cn(
            "flex size-6 items-center justify-center rounded-lg",
            calloutBadgeStyles[type],
          )}
        >
          <Icon className="size-3.5 shrink-0" />
        </span>
        <span className="text-sm font-bold tracking-tight text-zinc-900 dark:text-white">
          {title ?? calloutLabels[type]}
        </span>
      </div>
      <div className="mt-2.5 leading-relaxed text-zinc-700 dark:text-zinc-300 [&>p]:m-0 [&>p+p]:mt-2.5">
        {children}
      </div>
    </aside>
  );
}

type FigureProps = {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
};

/** Figure with a caption for use inside MDX: `<Figure src="..." alt="..." caption="..." />` */
export function Figure({ src, alt, caption, width, height }: FigureProps) {
  const intrinsic = getLocalImageDimensions(src);
  return (
    <figure className="my-8">
      <Image
        src={src}
        alt={alt}
        width={width ?? intrinsic?.width ?? 1200}
        height={height ?? intrinsic?.height ?? 630}
        sizes="(min-width: 1024px) 44rem, 100vw"
        className="rounded-card border-border bg-surface-muted h-auto w-full border"
      />
      {caption ? (
        <figcaption className="text-fg-subtle mt-2.5 text-center text-sm">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

/**
 * Components available to every MDX document. Keeping the list short means the
 * authored content stays portable markdown wherever possible.
 */
export const mdxComponents = {
  a: MdxAnchor,
  img: MdxImage,
  table: MdxTable,
  Callout,
  Figure,
};
