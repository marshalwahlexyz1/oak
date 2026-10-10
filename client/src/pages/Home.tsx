import { ContactFooter } from "@/components/ContactFooter";
import { Cover } from "@/components/Cover";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { IndexBento } from "@/components/IndexBento";
import { Navigation } from "@/components/Navigation";
import { NewsList } from "@/components/NewsList";
import { NewsTicker } from "@/components/NewsTicker";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeader } from "@/components/SectionHeader";
import { XRayLens } from "@/components/XRayLens";
import { useExperience, useProjects } from "@/hooks/use-portfolio";

const newsItems = [
  "Now Claude Vertical Ambassador for Boston (Security)",
  "Hosted Boston Build Day on September 23, 2026",
  "CISE Best Paper Award 2026 for The Cost of Convenience",
  "DIMVA '26 accepted paper in Chania, Greece, July 1-3, 2026",
  "ACM ASIACCS 2026 paper in Bangalore, India, June 1-5, 2026",
  "ABSURD'26 short talk on LLM-assisted fraud detection",
];

export default function Home() {
  const { data: experience } = useExperience();
  const { data: projects } = useProjects();

  return (
    <div className="min-h-screen">
      <Navigation />
      <NewsTicker items={newsItems} />

      <main>
        <Cover />
        <IndexBento />
        <XRayLens />

        <section id="research" className="py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-5">
            <SectionHeader index="03" kicker="Research" title="Papers & systems" />
            <div className="grid gap-3 md:grid-cols-3">
              {projects.map((project, idx) => (
                <ProjectCard key={project.id} project={project} index={idx} />
              ))}
            </div>
          </div>
        </section>

        <NewsList />

        <section id="experience" className="pb-16 pt-4 md:pb-20">
          <div className="mx-auto max-w-7xl px-5">
            <SectionHeader index="05" kicker="Experience" title="Experience" />
            <ExperienceTimeline items={experience} />
          </div>
        </section>
      </main>

      <ContactFooter />
    </div>
  );
}
