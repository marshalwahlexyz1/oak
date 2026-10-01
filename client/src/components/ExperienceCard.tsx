import { Calendar, Building2 } from "lucide-react";
import type { Experience } from "@shared/schema";
import { Reveal } from "@/components/Reveal";
import { useInViewOnce } from "@/lib/motion";

interface ExperienceCardProps {
  experience: Experience;
  index: number;
}

export function ExperienceCard({ experience, index }: ExperienceCardProps) {
  // The dot lights up once the item reaches the middle of the viewport, roughly where the drawn line is.
  const [dotRef, reached] = useInViewOnce<HTMLSpanElement>("0px 0px -45% 0px");

  return (
    <li className="relative pb-12 pl-10 last:pb-0 md:grid md:grid-cols-[10rem_1fr] md:gap-x-10 md:pl-0">
      <span
        ref={dotRef}
        aria-hidden="true"
        className={`absolute left-[9px] top-[9px] h-3 w-3 rounded-full border-2 transition-[background-color,border-color,box-shadow] duration-300 ease-out-strong md:left-[calc(11.25rem-6px)] ${
          reached
            ? "border-accent bg-accent shadow-[0_0_0_5px_hsl(var(--accent)/0.18)]"
            : "border-border bg-white"
        }`}
      />

      <Reveal delay={index * 60} className="md:pt-1 md:text-right">
        <span className="inline-flex items-center gap-2 rounded-full bg-secondary/80 px-3 py-1 text-sm font-medium text-muted-foreground">
          <Calendar className="h-3 w-3" />
          {experience.duration}
        </span>
      </Reveal>

      <Reveal delay={index * 60 + 60} className="mt-3 md:mt-0">
        <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md">
          <h3 className="font-display text-xl font-bold text-foreground">{experience.role}</h3>
          <div className="mt-1 flex items-center gap-2 font-medium text-primary">
            <Building2 className="h-4 w-4" />
            {experience.company}
          </div>
          <div className="mt-4 whitespace-pre-wrap leading-relaxed text-muted-foreground">{experience.description}</div>
        </div>
      </Reveal>
    </li>
  );
}
