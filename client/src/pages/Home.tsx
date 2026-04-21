import { BlogCard } from "@/components/BlogCard";
import { ExperienceCard } from "@/components/ExperienceCard";
import { Navigation } from "@/components/Navigation";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import {
  useAwards,
  useBlog,
  useCertifications,
  useEducation,
  useExperience,
  useProfile,
  useProjects,
  useSkills,
} from "@/hooks/use-portfolio";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BadgeCheck,
  FileText,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Shield,
  Sparkles,
  Trophy,
} from "lucide-react";
import { Link as ScrollLink } from "react-scroll";

export default function Home() {
  const { data: profile } = useProfile();
  const { data: experience } = useExperience();
  const { data: projects } = useProjects();
  const { data: skills } = useSkills();
  const { data: education } = useEducation();
  const { data: blog } = useBlog();
  const { data: awards } = useAwards();
  const { data: certifications } = useCertifications();

  const safeProfile = profile;
  const updates = blog ?? [];
  const latestHighlights = updates.slice(0, 3);
  const featuredAward = awards?.[0];
  const additionalAwards = awards?.slice(1) ?? [];

  const impactStats = [
    {
      label: "Latest recognition",
      value: "CISE Best Paper Award 2026",
      icon: Trophy,
    },
    {
      label: "Newest paper milestone",
      value: "DIMVA 2026 acceptance",
      icon: FileText,
    },
    {
      label: "Research impact",
      value: "100M+ installs addressed",
      icon: Shield,
    },
  ];

  const researchSignals = [
    "AI-driven fraud detection in messaging conversations",
    "Mobile security and Android permission analysis",
    "Consumer protection against predatory lending apps",
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(209,151,42,0.12),transparent_32%),radial-gradient(circle_at_top_right,rgba(21,45,84,0.12),transparent_34%)]" />
      <Navigation />

      <section id="hero" className="relative overflow-hidden pb-20 pt-32">
        <motion.div
          className="absolute left-[-8rem] top-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.45, 0.65, 0.45] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[-10rem] top-12 h-80 w-80 rounded-full bg-primary/15 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.55, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-sm font-semibold text-primary">
              <Sparkles className="h-4 w-4 text-accent" />
              2026 research momentum
            </div>

            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.32em] text-primary/55">
              {safeProfile.name}
            </p>
            <h1 className="mt-4 max-w-4xl text-5xl font-bold leading-[0.98] text-primary md:text-7xl">
              Security research with
              <span className="block text-accent">real-world platform impact.</span>
            </h1>

            <p className="mt-6 max-w-3xl text-xl font-semibold text-foreground/85 md:text-2xl">
              {safeProfile.title}
            </p>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
              {safeProfile.bio}
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {impactStats.map((item) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.label}
                    whileHover={{ y: -4 }}
                    className="rounded-[26px] border border-white/70 bg-white/75 p-5 shadow-lg shadow-slate-900/5 backdrop-blur"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-primary/8 p-3 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{item.value}</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                          {item.label}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <ScrollLink to="projects" smooth={true} offset={-90}>
                <Button size="lg" className="h-12 rounded-full px-8 text-base font-semibold">
                  View Research
                </Button>
              </ScrollLink>
              <ScrollLink to="updates" smooth={true} offset={-90}>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 rounded-full border-primary/15 bg-white/70 px-8 text-base font-semibold backdrop-blur hover:bg-white"
                >
                  Latest Updates
                </Button>
              </ScrollLink>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 shadow-sm">
                <Mail className="h-4 w-4 text-primary" />
                {safeProfile.email}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 shadow-sm">
                <MapPin className="h-4 w-4 text-primary" />
                {safeProfile.location}
              </span>
            </div>

            <div className="mt-8 flex items-center gap-4">
              {safeProfile.github && (
                <motion.a
                  href={safeProfile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-border/60 bg-white/80 p-3 text-muted-foreground shadow-sm transition-colors hover:text-primary"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <Github className="h-5 w-5" />
                </motion.a>
              )}
              {safeProfile.linkedin && (
                <motion.a
                  href={safeProfile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-border/60 bg-white/80 p-3 text-muted-foreground shadow-sm transition-colors hover:text-primary"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <Linkedin className="h-5 w-5" />
                </motion.a>
              )}
              <motion.a
                href={`mailto:${safeProfile.email}`}
                className="rounded-full border border-border/60 bg-white/80 p-3 text-muted-foreground shadow-sm transition-colors hover:text-primary"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
              >
                <Mail className="h-5 w-5" />
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
            className="relative"
          >
            <div className="rounded-[34px] border border-white/60 bg-white/75 p-5 shadow-2xl shadow-slate-900/10 backdrop-blur">
              <div className="relative overflow-hidden rounded-[30px]">
                <img
                  src={`${import.meta.env.BASE_URL}Me.jpeg`}
                  alt="Olawale Amos Akanji"
                  className="aspect-[4/5] w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/25 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/65">
                    Research Focus
                  </p>
                  <div className="mt-3 space-y-2">
                    {researchSignals.map((signal) => (
                      <div key={signal} className="rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur">
                        {signal}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-[30px] bg-slate-950 p-6 text-white shadow-xl shadow-slate-950/30">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/55">
                      Recent Highlights
                    </p>
                    <h2 className="mt-2 text-2xl font-bold text-white">What changed this year</h2>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-3">
                    <Sparkles className="h-5 w-5 text-accent" />
                  </div>
                </div>

                <div className="mt-5 space-y-4">
                  {latestHighlights.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/10"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-white">{item.title}</p>
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-accent" />
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-white/60">
                        <span>{item.date}</span>
                        <span className="rounded-full bg-white/10 px-3 py-1 text-white/70">
                          {item.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  {certifications?.map((cert) => (
                    <div
                      key={cert.id}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/80"
                    >
                      <BadgeCheck className="h-4 w-4 text-accent" />
                      {cert.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="updates" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            title="Latest News, Papers & Talks"
            subtitle="Recent awards, paper acceptances, and conference presentations."
          />
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {updates.map((post, idx) => (
              <BlogCard key={post.id} post={post} index={idx} />
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="relative overflow-hidden bg-primary py-24 text-primary-foreground">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.06),transparent_30%)]" />
        <div className="absolute inset-0 opacity-10 [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:42px_42px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="mb-14 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">Research Portfolio</p>
              <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
                Papers and systems grounded in deployable security work.
              </h2>
              <p className="mt-5 max-w-2xl text-lg text-primary-foreground/72">
                From mobile ecosystem audits to conversation-aware fraud detection, the work is shaped by both practical attack surfaces and the human costs behind them.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[28px] border border-white/10 bg-white/10 p-5">
                <p className="text-4xl font-bold text-white">{projects?.length ?? 0}</p>
                <p className="mt-2 text-sm text-primary-foreground/70">Featured research threads on the site</p>
              </div>
              <div className="rounded-[28px] border border-white/10 bg-white/10 p-5">
                <p className="text-4xl font-bold text-white">{updates.length}</p>
                <p className="mt-2 text-sm text-primary-foreground/70">Public milestones highlighted across 2026</p>
              </div>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {projects?.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} />
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="bg-secondary/45 py-24">
        <div className="mx-auto max-w-5xl px-6">
          <SectionHeading
            title="Professional Experience"
            subtitle="A mix of academic research, teaching, and mission-critical security operations."
          />
          <div className="space-y-12">
            {experience?.map((role, idx) => (
              <ExperienceCard key={role.id} experience={role} index={idx} />
            ))}
          </div>
        </div>
      </section>

      <section id="awards" className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            title="Awards & Credentials"
            subtitle="Recognition for research excellence alongside the certifications that support hands-on practice."
            centered
          />

          {featuredAward && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8 overflow-hidden rounded-[32px] border border-border/60 bg-white shadow-xl shadow-slate-900/5"
            >
              <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="bg-gradient-to-br from-primary via-primary to-accent p-8 text-white">
                  <p className="text-sm font-semibold uppercase tracking-[0.26em] text-white/70">
                    Featured honor
                  </p>
                  <h3 className="mt-4 text-3xl font-bold text-white">{featuredAward.title}</h3>
                  <p className="mt-3 text-base text-white/80">{featuredAward.organization}</p>
                  <p className="mt-6 max-w-xl text-lg leading-8 text-white/82">{featuredAward.description}</p>
                </div>
                <div className="flex flex-col justify-between gap-5 p-8">
                  <div className="inline-flex w-fit items-center gap-3 rounded-full bg-accent/10 px-4 py-2 text-sm font-semibold text-primary">
                    <Trophy className="h-4 w-4 text-accent" />
                    {featuredAward.title}
                  </div>
                  <div className="rounded-[28px] bg-secondary/70 p-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/60">
                      Awarded paper
                    </p>
                    <p className="mt-3 text-muted-foreground">
                      The Cost of Convenience: Identifying, Analyzing, and Mitigating Predatory Loan Applications
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="grid gap-6 md:grid-cols-2">
              {additionalAwards.map((award, idx) => (
                <motion.div
                  key={award.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className="rounded-[28px] border border-border/60 bg-white p-6 shadow-lg shadow-slate-900/5"
                >
                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl bg-accent/12 p-3 text-accent">
                      <Trophy className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h4 className="text-lg font-bold text-foreground">{award.title}</h4>
                        <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-muted-foreground">
                          {award.year}
                        </span>
                      </div>
                      <p className="mt-2 text-sm font-semibold text-primary">{award.organization}</p>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">{award.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="rounded-[32px] border border-border/60 bg-secondary/50 p-8">
              <h3 className="flex items-center gap-3 text-2xl font-bold text-primary">
                <BadgeCheck className="h-6 w-6 text-accent" />
                Certifications
              </h3>
              <div className="mt-6 space-y-4">
                {certifications?.map((cert, idx) => (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08 }}
                    className="rounded-[24px] border border-white/70 bg-white p-5 shadow-sm"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-border/50 bg-white">
                        <img
                          src={cert.logo.startsWith("http") ? cert.logo : `${import.meta.env.BASE_URL}${cert.logo}`}
                          alt={cert.issuer}
                          className="h-10 w-10 object-contain"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground">{cert.name}</h4>
                        <p className="text-sm text-primary">{cert.issuer}</p>
                        <p className="text-xs text-muted-foreground">{cert.year}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="bg-secondary/35 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading title="Technical Proficiency" subtitle="Core strengths across machine learning, security engineering, and applied analytics." centered />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {skills?.map((skillGroup, idx) => (
              <motion.div
                key={skillGroup.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="rounded-[28px] border border-border/60 bg-white p-6 shadow-lg shadow-slate-900/5"
              >
                <h3 className="border-b border-border pb-3 text-lg font-bold text-primary">
                  {skillGroup.category}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="education" className="py-24">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHeading title="Education" subtitle="Academic training that supports the research trajectory." />
          <div className="space-y-8">
            {education?.map((edu, idx) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="group flex items-start gap-4 rounded-[28px] border border-border/60 bg-white p-6 shadow-lg shadow-slate-900/5 md:gap-8"
              >
                <div className="mt-1 flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border border-border/50 bg-white shadow-sm">
                  <img
                    src={`${import.meta.env.BASE_URL}${edu.logo}`}
                    alt={`${edu.school} logo`}
                    className="h-full w-full object-contain p-2"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
                    <h3 className="text-xl font-bold text-foreground">{edu.school}</h3>
                    <span className="w-fit rounded-full bg-secondary px-3 py-1 text-sm font-medium text-muted-foreground">
                      {edu.year}
                    </span>
                  </div>
                  <p className="mt-2 text-lg font-semibold text-primary">{edu.degree}</p>
                  {edu.details && <p className="mt-3 leading-7 text-muted-foreground">{edu.details}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="relative overflow-hidden bg-primary py-24 text-primary-foreground">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_32%)]" />

        <div className="relative z-10 mx-auto max-w-5xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold text-white md:text-4xl">Get In Touch</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-primary-foreground/72">
              I am always open to research collaboration, invited talks, and conversations about security, privacy, and consumer protection.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSfh32ie73JYj8RgEbE4V9uBjfq7eo1IWSXKgfsl3977pEx1Lw/viewform?embedded=true"
              width="700"
              height="520"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              title="Contact form"
              className="w-full max-w-2xl rounded-[30px] border border-white/10 bg-white shadow-2xl shadow-black/20"
            >
              Loading...
            </iframe>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-[28px] border border-white/10 bg-white/8 p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                <Mail className="h-6 w-6" />
              </div>
              <p className="mt-4 text-sm text-primary-foreground/60">Email</p>
              <a href={`mailto:${safeProfile.email}`} className="mt-2 block text-lg font-semibold text-white transition-colors hover:text-accent">
                {safeProfile.email}
              </a>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/8 p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                <MapPin className="h-6 w-6" />
              </div>
              <p className="mt-4 text-sm text-primary-foreground/60">Location</p>
              <p className="mt-2 text-lg font-semibold text-white">{safeProfile.location}</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-primary/5 py-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} {safeProfile.name}. All rights reserved.</p>
      </footer>
    </div>
  );
}
