import { Navigation } from "@/components/Navigation";
import { SectionHeading } from "@/components/SectionHeading";
import { ExperienceCard } from "@/components/ExperienceCard";
import { ProjectCard } from "@/components/ProjectCard";
import { BlogCard } from "@/components/BlogCard";
import { useProfile, useExperience, useProjects, useSkills, useEducation, useBlog, useAwards, useCertifications } from "@/hooks/use-portfolio";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, GraduationCap, Trophy, Shield, Award, BadgeCheck } from "lucide-react";
import { Link as ScrollLink } from "react-scroll";
import { Button } from "@/components/ui/button";

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

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
        {/* Animated background decorative elements */}
        <motion.div 
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              className="inline-block px-4 py-2 rounded-full bg-secondary text-primary font-medium text-sm mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              Security & Privacy Researcher
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold font-display text-primary leading-[1.1] mb-6">
              {safeProfile.name.split(" ").map((word, i) => (
                <motion.span 
                  key={i} 
                  className="block"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.3 + i * 0.15,
                    type: "spring",
                    stiffness: 100
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-lg font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              {safeProfile.title}
            </motion.p>
            <motion.p 
              className="text-lg text-foreground/80 mb-10 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              {safeProfile.bio}
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              <ScrollLink to="projects" smooth={true} offset={-50}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="rounded-full px-8 h-12 text-base font-medium">
                    View Research
                  </Button>
                </motion.div>
              </ScrollLink>
              <ScrollLink to="contact" smooth={true} offset={-50}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="lg" className="rounded-full px-8 h-12 text-base font-medium border-primary/20 hover:bg-primary/5">
                    Contact Me
                  </Button>
                </motion.div>
              </ScrollLink>
            </motion.div>

            <motion.div 
              className="flex items-center gap-6 mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.3 }}
            >
              {safeProfile.github && (
                <motion.a 
                  href={safeProfile.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Github className="w-6 h-6" />
                </motion.a>
              )}
              {safeProfile.linkedin && (
                <motion.a 
                  href={safeProfile.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  whileHover={{ scale: 1.2, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Linkedin className="w-6 h-6" />
                </motion.a>
              )}
              <motion.a 
                href={`mailto:${safeProfile.email}`} 
                className="text-muted-foreground hover:text-primary transition-colors"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Mail className="w-6 h-6" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, rotateY: -30 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ 
              duration: 1,
              delay: 0.3,
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
            whileHover={{ 
              scale: 1.02,
              rotateY: 5,
              transition: { duration: 0.3 }
            }}
            className="relative hidden md:block perspective-1000"
          >
            {/* Animated glow effect */}
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 rounded-3xl blur-xl"
              animate={{
                opacity: [0.5, 0.8, 0.5],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Floating particles */}
            <motion.div
              className="absolute -top-2 -right-2 w-4 h-4 bg-accent rounded-full"
              animate={{
                y: [0, -10, 0],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute top-1/4 -left-3 w-3 h-3 bg-primary rounded-full"
              animate={{
                y: [0, -15, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            />
            <motion.div
              className="absolute bottom-1/4 -right-4 w-2 h-2 bg-accent rounded-full"
              animate={{
                y: [0, -8, 0],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />

            <motion.div 
              className="relative z-10 aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl"
              initial={{ clipPath: "circle(0% at 50% 50%)" }}
              animate={{ clipPath: "circle(100% at 50% 50%)" }}
              transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
            >
              <motion.img 
                src={`${import.meta.env.BASE_URL}Me.jpeg`}
                alt="Olawale Amos Akanji"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5 }}
              />
              {/* Shine effect on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent"
                initial={{ x: "-100%", opacity: 0 }}
                whileHover={{ x: "100%", opacity: 1 }}
                transition={{ duration: 0.6 }}
              />
            </motion.div>
            
            {/* Decorative frame with animation */}
            <motion.div 
              className="absolute -z-10 top-8 -right-8 w-full h-full border-2 border-accent rounded-2xl"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            />
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 bg-secondary/30">
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

      {/* Awards & Certifications Section */}
      <section id="awards" className="py-24 bg-secondary/30">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading title="Awards & Certifications" subtitle="Recognition and professional credentials." centered />
          
          {/* Awards */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-8 flex items-center gap-3">
              <Trophy className="w-6 h-6" />
              Awards & Honors
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {awards?.map((award, idx) => (
                <motion.div
                  key={award.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-card p-6 rounded-xl border border-border/50 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-yellow-100 text-yellow-600 rounded-lg">
                      {award.icon === "trophy" ? <Trophy className="w-6 h-6" /> : <Shield className="w-6 h-6" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-foreground">{award.title}</h4>
                        <span className="text-sm text-muted-foreground bg-secondary px-2 py-1 rounded">{award.year}</span>
                      </div>
                      <p className="text-sm text-primary font-medium mb-2">{award.organization}</p>
                      <p className="text-sm text-muted-foreground">{award.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-2xl font-bold text-primary mb-8 flex items-center gap-3">
              <BadgeCheck className="w-6 h-6" />
              Professional Certifications
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {certifications?.map((cert, idx) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-card p-6 rounded-xl border border-border/50 shadow-sm hover:shadow-md transition-shadow text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white shadow-sm flex items-center justify-center overflow-hidden border border-border/50">
                    <img 
                      src={cert.logo.startsWith('http') ? cert.logo : `${import.meta.env.BASE_URL}${cert.logo}`} 
                      alt={cert.issuer} 
                      className="w-12 h-12 object-contain" 
                    />
                  </div>
                  <h4 className="font-bold text-foreground mb-1">{cert.name}</h4>
                  <p className="text-sm text-primary font-medium mb-1">{cert.issuer}</p>
                  <p className="text-xs text-muted-foreground">{cert.year}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24">
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
                <div className="mt-1 w-16 h-16 rounded-full overflow-hidden bg-white shadow-md flex-shrink-0 border border-border/50">
                  <img 
                    src={`${import.meta.env.BASE_URL}${edu.logo}`} 
                    alt={`${edu.school} logo`}
                    className="w-full h-full object-contain p-2"
                  />
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
