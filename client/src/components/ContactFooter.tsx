import { Link as ScrollLink } from "react-scroll";
import { ArrowUpRight, Github, Linkedin } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Triangle } from "@/components/Marks";
import { Reveal } from "@/components/Reveal";
import { useProfile } from "@/hooks/use-portfolio";
import { press } from "@/lib/motion";

const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfh32ie73JYj8RgEbE4V9uBjfq7eo1IWSXKgfsl3977pEx1Lw/viewform?embedded=true";

export function ContactFooter() {
  const { data: profile } = useProfile();

  return (
    <footer id="contact" className="bg-[#111] text-white">
      <div className="mx-auto max-w-7xl px-5 pb-8 pt-16 md:pt-20">
        <div className="label mb-8 grid grid-cols-[auto_1fr_auto] items-center gap-4 text-white/55">
          <span>[06]</span>
          <span aria-hidden="true" className="h-px bg-white/20" />
          <span>Contact</span>
        </div>

        <Reveal className="grid items-end gap-10 md:grid-cols-[1fr_auto]">
          <h2 className="wide text-[clamp(48px,9vw,128px)] font-extrabold uppercase leading-[0.82] text-white">
            Let&rsquo;s
            <br />
            talk<span className="text-accent">.</span>
          </h2>

          <div className="flex flex-col gap-4 md:items-end">
            <p className="max-w-sm text-[15px] leading-relaxed text-white/60 md:text-right">
              Open to research collaboration, invited talks, and conversations about security, privacy, and consumer
              protection.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="wide text-xl font-extrabold transition-colors duration-200 hover:text-accent md:text-2xl"
            >
              {profile.email}
            </a>
            <div className="flex flex-wrap gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className={`label inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-white hover:bg-accent/90 ${press}`}
                  >
                    Contact form <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl gap-0 overflow-hidden rounded-[20px] border-0 bg-card p-0 sm:rounded-[20px]">
                  <DialogHeader className="px-6 pb-3 pt-6 text-left">
                    <DialogTitle className="wide text-xl font-extrabold uppercase">Get in touch</DialogTitle>
                    <DialogDescription>Send a message and I&rsquo;ll reply by email.</DialogDescription>
                  </DialogHeader>
                  <iframe src={FORM_URL} title="Contact form" className="h-[min(70vh,560px)] w-full border-0 bg-white">
                    Loading…
                  </iframe>
                </DialogContent>
              </Dialog>
              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`label inline-flex items-center gap-2 rounded-full px-4 py-2.5 ring-1 ring-white/20 hover:bg-white/10 ${press}`}
                >
                  <Linkedin className="h-3.5 w-3.5" /> LinkedIn
                </a>
              )}
              {profile.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`label inline-flex items-center gap-2 rounded-full px-4 py-2.5 ring-1 ring-white/20 hover:bg-white/10 ${press}`}
                >
                  <Github className="h-3.5 w-3.5" /> GitHub
                </a>
              )}
            </div>
          </div>
        </Reveal>

        <div className="label mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-6 text-white/45">
          <span>
            &copy; {new Date().getFullYear()} {profile.name}
          </span>
          <span>{profile.location}</span>
          <ScrollLink to="hero" href="#hero" smooth={true} className="inline-flex cursor-pointer items-center gap-2 hover:text-white">
            Back to top <Triangle direction="up" className="h-2 w-2.5" />
          </ScrollLink>
        </div>
      </div>
    </footer>
  );
}
