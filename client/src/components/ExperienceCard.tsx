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
    <li className="relative pb-8 pl-10 last:pb-0 md:grid md:grid-cols-[10rem_1fr] md:gap-x-10 md:pl-0">
      <span
        ref={dotRef}
        aria-hidden="true"
        className={`absolute left-[10px] top-[5px] h-2.5 w-2.5 rounded-full border-2 transition-[background-color,border-color,box-shadow] duration-300 ease-out-strong md:left-[calc(11.25rem-5px)] ${
          reached ? "border-accent bg-accent shadow-[0_0_0_4px_hsl(var(--accent)/0.18)]" : "border-foreground/30 bg-background"
        }`}
      />

      <Reveal delay={index * 50} className="md:text-right">
        <span className="label text-foreground/55">{experience.duration.replace("--", "–")}</span>
      </Reveal>

      <Reveal delay={index * 50 + 50} className="mt-1 md:mt-0">
        <h3 className="text-lg font-bold leading-snug">{experience.role}</h3>
        <p className="text-sm font-medium text-foreground/60">{experience.company}</p>
        <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-foreground/70">{experience.description}</p>
      </Reveal>
    </li>
  );
}
