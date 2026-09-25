import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-xl font-medium whitespace-nowrap transition-[color,background-color,border-color,box-shadow,transform] duration-150 active:translate-y-px disabled:pointer-events-none disabled:opacity-50";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-accent-contrast shadow-xs hover:bg-accent-hover hover:shadow-sm active:bg-accent-active",
  secondary: "bg-fg text-canvas shadow-xs hover:opacity-90",
  outline:
    "border border-border-strong bg-surface/50 text-fg hover:bg-surface-muted hover:border-fg/25",
  ghost: "text-fg-muted hover:bg-surface-muted hover:text-fg",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}): string {
  return cn(baseClasses, variantClasses[variant], sizeClasses[size], className);
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return <button type={type} className={buttonClasses({ variant, size, className })} {...props} />;
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  /** Set for links that leave the site. */
  external?: boolean;
  prefetch?: boolean;
  "aria-label"?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  external = false,
  prefetch,
  ...rest
}: ButtonLinkProps) {
  const classes = buttonClasses({ variant, size, className });

  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} prefetch={prefetch} {...rest}>
      {children}
    </Link>
  );
}
