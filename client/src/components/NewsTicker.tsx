import { Newspaper } from "lucide-react";

interface NewsTickerProps {
  items: string[];
}

// Constant-speed marquee in CSS so it runs off the main thread. It pauses on hover/focus
// and becomes a static, scrollable strip under prefers-reduced-motion.
export function NewsTicker({ items }: NewsTickerProps) {
  return (
    <div
      className="marquee fixed left-0 right-0 top-16 z-40 flex h-[30px] items-center overflow-hidden bg-foreground text-background"
      role="region"
      aria-label="News"
    >
      <div className="marquee-track flex w-max items-center whitespace-nowrap">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex items-center gap-8 pr-8" aria-hidden={copy === 1 ? true : undefined}>
            {items.map((item) => (
              <li key={item} className="label flex items-center gap-3 px-2">
                <Newspaper className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                <span className="text-accent">News Flash</span>
                <span className="text-background/85">{item}</span>
                <span className="text-accent/80" aria-hidden="true">•</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
