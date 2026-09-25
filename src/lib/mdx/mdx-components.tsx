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
  note: "border-blue/35 bg-blue/8 text-fg",
  tip: "border-success/35 bg-success/8 text-fg",
  warning: "border-accent/45 bg-accent-soft text-fg",
} as const;

const calloutIcons = {
  note: InfoIcon,
  tip: SparkIcon,
  warning: AlertIcon,
} as const;

const calloutLabels = {
  note: "Note",
  tip: "Tip",
  warning: "Important",
} as const;

/** Callout block for use inside MDX: `<Callout type="tip" title="...">…</Callout>` */
export function Callout({ type = "note", title, children }: CalloutProps) {
  const Icon = calloutIcons[type];
  return (
    <aside
      role="note"
      className={cn("not-prose rounded-card my-8 border px-5 py-4 text-sm", calloutStyles[type])}
    >
      <p className="flex items-center gap-2 font-semibold">
        <Icon className="size-4 shrink-0" />
        {title ?? calloutLabels[type]}
      </p>
      <div className="text-fg-muted mt-2 leading-relaxed [&>p]:m-0 [&>p+p]:mt-3">{children}</div>
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
