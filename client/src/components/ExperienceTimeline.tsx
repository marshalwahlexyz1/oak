import { useRef } from "react";
import { motion, useMotionTemplate, useReducedMotion, useScroll, useSpring } from "framer-motion";
import type { Experience } from "@shared/schema";
import { ExperienceCard } from "@/components/ExperienceCard";

// A single rail whose gold line is drawn by scroll progress through the list.
export function ExperienceTimeline({ items }: { items: Experience[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 32, mass: 0.4 });
  const transform = useMotionTemplate`scaleY(${progress})`;

  return (
    <ol ref={ref} className="relative">
      <span aria-hidden="true" className="absolute bottom-1 left-[15px] top-2 w-px bg-border md:left-[11.25rem]" />
      <motion.span
        aria-hidden="true"
        className="absolute bottom-1 left-[15px] top-2 w-px origin-top bg-accent md:left-[11.25rem]"
        style={{ transform: reduceMotion ? "none" : transform }}
      />
      {items.map((role, idx) => (
        <ExperienceCard key={role.id} experience={role} index={idx} />
      ))}
    </ol>
  );
}
