import { cn } from "@/lib/utils/cn";
import type { ElementType, ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** Narrower measure for reading-focused sections. */
  size?: "default" | "narrow" | "wide";
};

const sizes = {
  default: "max-w-6xl",
  narrow: "max-w-3xl",
  wide: "max-w-[80rem]",
} as const;

export function Container({
  children,
  className,
  as: Component = "div",
  size = "default",
}: ContainerProps) {
  return (
    <Component className={cn("mx-auto w-full px-5 sm:px-6 lg:px-8", sizes[size], className)}>
      {children}
    </Component>
  );
}
