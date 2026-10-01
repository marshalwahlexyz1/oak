import { Fragment, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface KineticHeadlineProps {
  lines: { text: string; className?: string }[];
  className?: string;
  baseDelay?: number;
  stagger?: number;
}

// Each word rises out of its own mask line, staggered. Pure CSS (see .mask-line).
export function KineticHeadline({ lines, className, baseDelay = 120, stagger = 55 }: KineticHeadlineProps) {
  let wordIndex = 0;

  return (
    <h1 className={className}>
      <span className="sr-only">{lines.map((line) => line.text).join(" ")}</span>
      {lines.map((line, lineIdx) => (
        <span key={lineIdx} aria-hidden="true" className={cn("block", line.className)}>
          {line.text.split(" ").map((word, idx) => {
            const delay = baseDelay + wordIndex++ * stagger;
            return (
              <Fragment key={idx}>
                <span className="mask-line">
                  <span style={{ "--delay": `${delay}ms` } as CSSProperties}>{word}</span>
                </span>{" "}
              </Fragment>
            );
          })}
        </span>
      ))}
    </h1>
  );
}
