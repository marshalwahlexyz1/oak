import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  index: string;
  kicker: string;
  title: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}

// A numbered label row with a hairline, then a wide uppercase title.
export function SectionHeader({ index, kicker, title, tone = "light", className }: SectionHeaderProps) {
  const muted = tone === "dark" ? "text-white/55" : "text-foreground/55";
  return (
    <Reveal className={cn("mb-8 md:mb-10", className)}>
      <div className={cn("label mb-4 grid grid-cols-[auto_1fr_auto] items-center gap-4", muted)}>
        <span>[{index}]</span>
        <span aria-hidden="true" className={cn("h-px", tone === "dark" ? "bg-white/20" : "bg-foreground/15")} />
        <span>{kicker}</span>
      </div>
      <h2
        className={cn(
          "wide text-[clamp(28px,4.6vw,52px)] font-extrabold uppercase leading-[0.92] tracking-[-0.01em]",
          tone === "dark" ? "text-white" : "text-foreground",
        )}
      >
        {title}
      </h2>
    </Reveal>
  );
}
