import { motion } from "framer-motion";
import { Calendar, Building2 } from "lucide-react";
import type { Experience } from "@shared/schema";

interface ExperienceCardProps {
  experience: Experience;
  index: number;
}

export function ExperienceCard({ experience, index }: ExperienceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="relative pl-8 md:pl-0 group"
    >
      <div className="md:grid md:grid-cols-5 md:gap-8 items-start">
        {/* Timeline Line (Desktop) */}
        <div className="hidden md:block absolute left-[20%] top-0 bottom-0 w-px bg-border group-last:bottom-auto group-last:h-full"></div>
        
        {/* Date Section */}
        <div className="md:col-span-1 md:text-right relative">
          <div className="hidden md:block absolute right-[-17px] top-2 w-3 h-3 rounded-full bg-accent border-4 border-white z-10"></div>
          <span className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full">
            <Calendar className="w-3 h-3" />
            {experience.duration}
          </span>
        </div>

        {/* Content Section */}
        <div className="md:col-span-4 bg-card rounded-xl p-6 shadow-sm border border-border/50 hover:shadow-md transition-shadow relative">
           {/* Timeline Line (Mobile) */}
           <div className="md:hidden absolute left-[-20px] top-8 w-3 h-3 rounded-full bg-accent border-2 border-white z-10"></div>
           <div className="md:hidden absolute left-[-15px] top-0 bottom-[-24px] w-px bg-border"></div>

           <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
            <div>
              <h3 className="text-xl font-bold text-foreground font-display">{experience.role}</h3>
              <div className="flex items-center gap-2 text-primary font-medium mt-1">
                <Building2 className="w-4 h-4" />
                {experience.company}
              </div>
            </div>
          </div>
          
          <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
            {experience.description}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
