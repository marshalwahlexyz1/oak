import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

// Registration "+" mark, centered on the point it's placed at.
export function Crosshair({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 12 12"
      style={style}
      className={cn("pointer-events-none absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 text-foreground/45", className)}
    >
      <path d="M6 0v12M0 6h12" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function Triangle({ direction = "right", className }: { direction?: "right" | "left" | "up"; className?: string }) {
  const d = direction === "right" ? "M0 0L8 5L0 10Z" : direction === "left" ? "M8 0L0 5L8 10Z" : "M5 0L10 8H0Z";
  const box = direction === "up" ? "0 0 10 8" : "0 0 8 10";
  return (
    <svg aria-hidden="true" viewBox={box} className={cn("h-2.5 w-2.5 fill-current", className)}>
      <path d={d} />
    </svg>
  );
}

// The site's mark: an eye inside a lens.
export function EyeMark({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 100 100" className={cn("fill-none stroke-current", className)}>
      <circle cx="50" cy="50" r="41" strokeWidth="9" />
      <path d="M17 50Q50 17 83 50Q50 83 17 50Z" strokeWidth="8" strokeLinejoin="round" />
      <circle cx="50" cy="50" r="10" className="fill-current" stroke="none" />
    </svg>
  );
}
