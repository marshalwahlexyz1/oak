import { Navigation } from "@/components/Navigation";
import { SectionHeading } from "@/components/SectionHeading";
import { ExperienceCard } from "@/components/ExperienceCard";
import { ProjectCard } from "@/components/ProjectCard";
import { BlogCard } from "@/components/BlogCard";
import { useProfile, useExperience, useProjects, useSkills, useEducation, useBlog } from "@/hooks/use-portfolio";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, GraduationCap } from "lucide-react";
import { Link as ScrollLink } from "react-scroll";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { data: profile } = useProfile();
  const { data: experience } = useExperience();
  const { data: projects } = useProjects();
  const { data: skills } = useSkills();
  const { data: education } = useEducation();
  const { data: blog } = useBlog();

  const safeProfile = profile;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2"></div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-block px-4 py-2 rounded-full bg-secondary text-primary font-medium text-sm mb-6">
              Security & Privacy Researcher
            </div>
            <h1 className="text-5xl md:text-7xl font-bold font-display text-primary leading-[1.1] mb-6">
              {safeProfile.name.split(" ").map((word, i) => (
                <span key={i} className="block">{word}</span>
              ))}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-lg font-light">
              {safeProfile.title}
            </p>
            <p className="text-lg text-foreground/80 mb-10 max-w-lg">
              {safeProfile.bio}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <ScrollLink to="projects" smooth={true} offset={-50}>
                <Button size="lg" className="rounded-full px-8 h-12 text-base font-medium">
                  View Research
                </Button>
              </ScrollLink>
              <ScrollLink to="contact" smooth={true} offset={-50}>
                <Button variant="outline" size="lg" className="rounded-full px-8 h-12 text-base font-medium border-primary/20 hover:bg-primary/5">
                  Contact Me
                </Button>
              </ScrollLink>
            </div>

            <div className="flex items-center gap-6 mt-12">
              {safeProfile.github && (
                <a href={safeProfile.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <Github className="w-6 h-6" />
                </a>
              )}
              {safeProfile.linkedin && (
                <a href={safeProfile.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
              )}
              <a href={`mailto:${safeProfile.email}`} className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </motion.div>

          {/* Abstract visual or profile image placeholder */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden md:block"
          >
            <div className="relative z-10 aspect-[4/5] bg-gradient-to-br from-primary to-primary/80 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center p-12">
              <div className="text-primary-foreground/20 text-9xl font-display font-bold">OA.</div>
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
            </div>
            {/* Decorative frame */}
            <div className="absolute -z-10 top-8 -right-8 w-full h-full border-2 border-accent rounded-2xl"></div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-secondary/30">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeading title="About Me" centered />
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl p-8 md:p-12 shadow-sm border border-border/50 text-lg leading-relaxed text-muted-foreground"
          >
            <p className="mb-6">
              As a PhD Candidate at Boston University, my research focuses on the intersection of security, privacy, and artificial intelligence. I specialize in developing robust systems for risk modeling and fraud detection.
            </p>
            <p>
              My work aims to bridge the gap between theoretical security concepts and practical, real-world applications. I am particularly interested in how probabilistic state modeling can be leveraged to detect sophisticated fraud patterns across varying platforms.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <SectionHeading title="Professional Experience" subtitle="My journey across academia and industry." />
          <div className="space-y-12">
            {experience?.map((role, idx) => (
              <ExperienceCard key={role.id} experience={role} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">Research & Projects</h2>
            <p className="text-primary-foreground/70 max-w-2xl mx-auto text-lg">
              Highlighting key contributions to security research and engineering.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {projects?.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading 
            title="Blog & Thoughts" 
            subtitle="Stories, insights, and reflections from my journey in security research."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blog?.map((post, idx) => (
              <BlogCard key={post.id} post={post} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 bg-secondary/30">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading title="Technical Proficiency" centered />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills?.map((skillGroup, idx) => (
              <motion.div
                key={skillGroup.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-card p-6 rounded-xl border border-border/50 shadow-sm"
              >
                <h3 className="text-lg font-bold text-primary mb-4 pb-2 border-b border-border">
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => (
                    <span 
                      key={skill}
                      className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-md text-sm font-medium"
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

      {/* Education Section */}
      <section id="education" className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeading title="Education" />
          <div className="space-y-8">
            {education?.map((edu, idx) => (
              <motion.div 
                key={edu.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex gap-4 md:gap-8 items-start group"
              >
                <div className="mt-1 p-3 bg-primary/5 rounded-full text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div className="flex-1 pb-8 border-b border-border/60 last:border-0">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-foreground font-display">{edu.school}</h3>
                    <span className="text-sm font-medium text-muted-foreground bg-secondary px-3 py-1 rounded-full w-fit mt-2 md:mt-0">
                      {edu.year}
                    </span>
                  </div>
                  <p className="text-lg text-primary font-medium mb-2">{edu.degree}</p>
                  {edu.details && (
                    <p className="text-muted-foreground">{edu.details}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-primary text-primary-foreground">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">Get In Touch</h2>
            <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto">
              I'm always open to discussing new research opportunities, collaborations, or questions about my work.
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
              className="rounded-2xl shadow-2xl w-full max-w-2xl"
            >
              Loading…
            </iframe>
          </motion.div>

          <div className="mt-12 grid md:grid-cols-2 gap-8 text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="p-3 bg-white/10 rounded-lg">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-primary-foreground/60">Email</p>
                <a href={`mailto:${safeProfile.email}`} className="text-lg font-medium hover:text-accent transition-colors">
                  {safeProfile.email}
                </a>
              </div>
            </div>
            
            <div className="flex flex-col items-center gap-3">
              <div className="p-3 bg-white/10 rounded-lg">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-primary-foreground/60">Location</p>
                <p className="text-lg font-medium">{safeProfile.location}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary/5 py-8 text-center text-sm text-muted-foreground border-t border-border">
        <p>© {new Date().getFullYear()} {safeProfile.name}. All rights reserved.</p>
      </footer>
    </div>
  );
}
