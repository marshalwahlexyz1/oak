import { Reveal } from "@/components/Reveal";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionHeading({ title, subtitle, centered = false }: SectionHeadingProps) {
  return (
    <Reveal className={`mb-12 ${centered ? "text-center" : ""}`}>
      <h2 className="relative inline-block pb-4 text-3xl font-bold font-display text-primary md:text-4xl">
        {title}
        <span
          aria-hidden="true"
          className={`underline-draw absolute bottom-0 h-1 rounded-full bg-accent ${
            centered ? "left-1/2 w-24 -translate-x-1/2" : "left-0 w-20"
          }`}
        ></span>
      </h2>
      {subtitle && (
        <p className={`mt-4 max-w-2xl text-lg text-muted-foreground ${centered ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
