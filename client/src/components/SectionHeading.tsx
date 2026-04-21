import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionHeading({ title, subtitle, centered = false }: SectionHeadingProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`mb-12 ${centered ? "text-center" : ""}`}
    >
      <h2 className="relative inline-block pb-4 text-3xl font-bold font-display text-primary md:text-4xl">
        {title}
        <span
          className={`absolute bottom-0 h-1 rounded-full bg-accent ${
            centered ? "left-1/2 w-24 -translate-x-1/2" : "left-0 w-20"
          }`}
        ></span>
      </h2>
      {subtitle && (
        <p className={`mt-4 max-w-2xl text-lg text-muted-foreground ${centered ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
