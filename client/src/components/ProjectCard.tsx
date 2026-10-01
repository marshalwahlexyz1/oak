import { ExternalLink, Code2 } from "lucide-react";
import type { Project } from "@shared/schema";
import { Reveal } from "@/components/Reveal";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <Reveal delay={index * 70} className="h-full">
      <div className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-white/10 bg-white/10 shadow-xl shadow-black/10 transition-[transform,border-color,background-color] duration-300 ease-out-strong hover:-translate-y-1 hover:border-accent/40 hover:bg-white/15">
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
                className="text-primary-foreground/60 transition-colors hover:text-accent"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
          </div>

          <div className="flex items-start justify-between gap-3 mb-3">
            <h3 className="text-xl font-bold font-display text-white transition-colors duration-200 group-hover:text-accent">
              {project.title}
            </h3>
            {project.publishedAt && (
              <span className="max-w-[11rem] rounded-2xl bg-accent px-3 py-2 text-center text-[11px] font-semibold leading-tight text-accent-foreground">
                {project.publishedAt}
              </span>
            )}
          </div>

          {/* Clamp lives on the paragraph; the wrapper takes the spare height so the ellipsis is the last thing shown */}
          <div className="mb-6 flex-grow">
            <p className="line-clamp-4 text-primary-foreground/72">{project.description}</p>
          </div>

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
      </div>
    </Reveal>
  );
}
