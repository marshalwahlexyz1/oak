import { motion } from "framer-motion";
import { ExternalLink, Github, Code2 } from "lucide-react";
import type { Project } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-white/10 bg-white/10 shadow-xl shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-white/15"
    >
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div className="rounded-2xl bg-white/10 p-3 text-accent">
            <Code2 className="w-6 h-6" />
          </div>
          {project.link && (
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
        </div>

        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-xl font-bold font-display text-white transition-colors group-hover:text-accent">
            {project.title}
          </h3>
          {project.publishedAt && (
            <span className="whitespace-nowrap rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
              {project.publishedAt}
            </span>
          )}
        </div>
        
        <p className="mb-6 flex-grow line-clamp-4 text-primary-foreground/72">
          {project.description}
        </p>

        {project.conference && (
          <p className="mb-4 text-sm text-primary-foreground/72">
            <span className="font-semibold text-white">Venue:</span> {project.conference}
          </p>
        )}

        <div className="flex flex-wrap gap-2 mt-auto">
          {project.technologies.map((tech) => (
            <span 
              key={tech} 
              className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-primary-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
