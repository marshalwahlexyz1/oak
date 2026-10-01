import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useInViewOnce } from "@/lib/motion";

interface RevealProps {
  as?: "div" | "li" | "article" | "section";
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

// Fades and lifts its content into place the first time it scrolls into view.
// Transitions (not keyframes) and transform/opacity only; styles live in index.css.
export function Reveal({ as: Tag = "div", delay = 0, className, style, children }: RevealProps) {
  const [ref, shown] = useInViewOnce<HTMLElement>();

  return (
    <Tag
      ref={ref as never}
      data-shown={shown}
      className={cn("reveal", className)}
      style={{ "--delay": `${delay}ms`, ...style } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
