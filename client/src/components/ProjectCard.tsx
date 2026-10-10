import { ExternalLink } from "lucide-react";
import type { Project } from "@shared/schema";
import { Reveal } from "@/components/Reveal";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <Reveal delay={index * 60} className="h-full">
      <article className="flex h-full flex-col rounded-[20px] bg-card p-5 ring-1 ring-black/5 md:p-6">
        <div className="label flex items-center justify-between gap-3 text-foreground/55">
          <span>[0{index + 1}]</span>
          <span
            className={
              project.publishedAt
                ? "rounded-full bg-accent px-2.5 py-1 text-white"
                : "rounded-full px-2.5 py-1 ring-1 ring-foreground/20"
            }
          >
            {project.publishedAt ?? "In progress"}
          </span>
        </div>

        <h3 className="mt-5 text-lg font-bold leading-snug">{project.title}</h3>

        {/* Clamp lives on the paragraph; the wrapper takes the spare height */}
        <div className="mt-3 flex-grow">
          <p className="line-clamp-4 text-sm leading-relaxed text-foreground/65">{project.description}</p>
        </div>

        {project.conference && <p className="mt-4 text-xs leading-relaxed text-foreground/55">{project.conference}</p>}

        <div className="mt-4 flex items-end justify-between gap-3 border-t border-foreground/10 pt-4">
          <p className="text-xs leading-relaxed text-foreground/55">{project.technologies.join(" · ")}</p>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title}`}
              className="shrink-0 text-foreground/60 transition-colors hover:text-accent"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </article>
    </Reveal>
  );
}
