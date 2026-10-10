import type { ReactNode } from "react";
import { Link as ScrollLink } from "react-scroll";
import { ArrowRight } from "lucide-react";
import { AwardMedal, useTilt } from "@/components/AwardMedal";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { useAwards, useCertifications, useEducation, useProfile, useSkills } from "@/hooks/use-portfolio";
import { cn } from "@/lib/utils";

const base = import.meta.env.BASE_URL;

const STATS = [
  { value: "100M+", label: "App installs addressed by disclosure" },
  { value: "11 yrs", label: "Nigerian Air Force cybersecurity" },
  { value: "4.99", label: "BSc CGPA, best graduating student" },
];

function Tile({
  id,
  className,
  tone = "paper",
  delay = 0,
  children,
}: {
  id?: string;
  className?: string;
  tone?: "paper" | "ink" | "red";
  delay?: number;
  children: ReactNode;
}) {
  return (
    <Reveal
      delay={delay}
      className={cn(
        "relative rounded-[20px] p-5 md:p-6",
        tone === "paper" && "bg-card ring-1 ring-black/5",
        tone === "ink" && "bg-[#111] text-white",
        tone === "red" && "bg-accent text-[#111]",
        className,
      )}
    >
      {id && <span id={id} className="absolute top-0" aria-hidden="true" />}
      {children}
    </Reveal>
  );
}

export function IndexBento() {
  const { data: profile } = useProfile();
  const { data: awards } = useAwards();
  const { data: education } = useEducation();
  const { data: certifications } = useCertifications();
  const { data: skills } = useSkills();
  const tilt = useTilt();
  const featured = awards[0];
  const honors = awards.slice(1);

  return (
    <section id="index" className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeader index="01" kicker="Index" title={<>Research, honors <br className="hidden md:block" />&amp; credentials</>} />

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Tile className="col-span-2 flex flex-col">
            <p className="label text-foreground/55">About</p>
            <p className="mt-4 text-lg font-semibold leading-snug md:text-xl">{profile.title}</p>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground/70">{profile.bio}</p>
          </Tile>

          <Tile tone="red" delay={60} className="col-span-2 flex flex-col lg:col-span-1">
            <p className="label">Now</p>
            <p className="wide mt-4 text-[22px] font-extrabold uppercase leading-[0.95]">
              Claude Vertical Ambassador
            </p>
            <p className="label mt-3 text-black/60">Boston · Security</p>
            <ScrollLink
              to="news"
              href="#news"
              smooth={true}
              offset={-100}
              className="group mt-auto inline-flex cursor-pointer items-center gap-2 pt-6 text-sm font-semibold"
            >
              Hosted Boston Build Day, 09.23.26
              <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-out-strong group-hover:translate-x-1" />
            </ScrollLink>
          </Tile>

          {featured && (
            <Tile id="awards" tone="ink" delay={120} className="col-span-2 flex flex-col lg:col-span-1 lg:row-span-2">
              <div {...tilt.bind} className="-m-5 flex flex-1 flex-col p-5 md:-m-6 md:p-6">
                <p className="label text-white/55">Featured honor</p>
                <div className="flex flex-1 items-center justify-center py-6">
                  <AwardMedal transform={tilt.transform} glare={tilt.glare} />
                </div>
                <p className="wide text-lg font-extrabold uppercase leading-[0.95]">{featured.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  The Cost of Convenience: Identifying, Analyzing, and Mitigating Predatory Loan Applications
                </p>
              </div>
            </Tile>
          )}

          <Tile delay={60} className="col-span-2 p-0 md:p-0 lg:col-span-3">
            <dl className="grid h-full grid-cols-1 divide-y divide-foreground/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {STATS.map((stat) => (
                <div
                  key={stat.value}
                  className="flex items-center justify-between gap-4 p-4 sm:flex-col sm:items-start sm:justify-between md:p-6"
                >
                  <dt className="label order-2 max-w-[55%] text-right text-foreground/55 sm:max-w-none sm:text-left">{stat.label}</dt>
                  <dd className="wide order-1 text-[clamp(26px,4vw,48px)] font-extrabold leading-none tabular-nums">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Tile>

          <Tile id="education" className="col-span-2">
            <p className="label text-foreground/55">Education</p>
            <ul className="mt-4 divide-y divide-foreground/10">
              {education.map((edu) => (
                <li key={edu.id} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
                  <img
                    src={`${base}${edu.logo}`}
                    alt=""
                    loading="lazy"
                    className="h-9 w-9 shrink-0 rounded-full bg-white object-contain p-1 ring-1 ring-black/5"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-[15px] font-semibold leading-tight">{edu.degree}</p>
                    <p className="mt-0.5 text-sm text-foreground/60">
                      {edu.school}
                      {edu.details?.includes("Best Graduating") ? " · Best graduating student" : ""}
                    </p>
                  </div>
                  <span className="label shrink-0 text-foreground/55">{edu.year.replace("Expected ", "Exp. ")}</span>
                </li>
              ))}
            </ul>
          </Tile>

          <Tile delay={60} className="col-span-2 sm:col-span-1">
            <p className="label text-foreground/55">Honors</p>
            <ul className="mt-4 space-y-3">
              {honors.map((award) => (
                <li key={award.id}>
                  <p className="text-[15px] font-semibold leading-tight">{award.title}</p>
                  <p className="mt-0.5 text-sm text-foreground/60">
                    {award.organization} · {award.year}
                  </p>
                </li>
              ))}
            </ul>
          </Tile>

          <Tile delay={120} className="col-span-2 sm:col-span-1">
            <p className="label text-foreground/55">Certifications</p>
            <ul className="mt-4 space-y-3">
              {certifications.map((cert) => (
                <li key={cert.id} className="flex items-center gap-3">
                  <img
                    src={cert.logo.startsWith("http") ? cert.logo : `${base}${cert.logo}`}
                    alt=""
                    loading="lazy"
                    className="h-9 w-9 shrink-0 rounded-full bg-white object-contain p-1 ring-1 ring-black/5"
                  />
                  <div className="min-w-0">
                    <p className="text-[15px] font-semibold leading-tight">{cert.name}</p>
                    <p className="mt-0.5 text-sm text-foreground/60">
                      {cert.issuer} · {cert.year}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Tile>

          <Tile className="col-span-2 lg:col-span-4">
            <p className="label text-foreground/55">Toolkit</p>
            <dl className="mt-4 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-5">
              {skills.map((group) => (
                <div key={group.id}>
                  <dt className="text-sm font-bold leading-tight">{group.category}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-foreground/60">{group.items.join(" · ")}</dd>
                </div>
              ))}
            </dl>
          </Tile>
        </div>
      </div>
    </section>
  );
}
