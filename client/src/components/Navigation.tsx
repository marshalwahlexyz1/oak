import { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_OUT, press } from "@/lib/motion";

const navItems = [
  { name: "Updates", to: "updates" },
  { name: "Research", to: "projects" },
  { name: "Experience", to: "experience" },
  { name: "Awards", to: "awards" },
  { name: "Education", to: "education" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 h-[72px] border-b transition-[background-color,border-color,box-shadow] duration-200 ease-out-strong ${
        scrolled || isOpen
          ? "border-border/60 bg-white/85 shadow-sm backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
        <ScrollLink
          to="hero"
          smooth={true}
          className="flex cursor-pointer items-center gap-3"
        >
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-sm font-bold tracking-[0.25em] text-primary-foreground shadow-lg shadow-primary/15">
            OAK
          </span>
          <span className="hidden text-sm font-semibold tracking-[0.25em] text-primary/70 md:block">
            OLAWALE AKANJI
          </span>
        </ScrollLink>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 rounded-full border border-border/60 bg-white/75 px-2 py-2 shadow-sm backdrop-blur md:flex">
          {navItems.map((item) => (
            <ScrollLink
              key={item.name}
              to={item.to}
              smooth={true}
              offset={-100}
              spy={true}
              onSetActive={(to: string) => setActive(to)}
              onSetInactive={(to: string) => setActive((current) => (current === to ? null : current))}
              className={`relative isolate cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                active === item.to ? "text-primary-foreground" : "text-foreground/80 hover:text-primary"
              }`}
            >
              {/* One pill that travels between items, so the highlight keeps its identity */}
              {active === item.to && (
                <motion.span
                  layoutId="nav-active-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-primary"
                  transition={{ type: "spring", duration: 0.4, bounce: 0 }}
                />
              )}
              {item.name}
            </ScrollLink>
          ))}
          <ScrollLink
            to="contact"
            smooth={true}
            className={`ml-1 cursor-pointer rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground hover:bg-accent/90 ${press}`}
          >
            Get in Touch
          </ScrollLink>
        </nav>

        {/* Mobile Toggle */}
        <button
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          className={`relative h-10 w-10 rounded-full border border-border/60 bg-white/80 text-foreground shadow-sm backdrop-blur md:hidden ${press}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu
            aria-hidden="true"
            className={`absolute inset-0 m-auto h-5 w-5 transition-[opacity,transform] duration-200 ease-out-strong ${
              isOpen ? "rotate-90 scale-75 opacity-0" : "opacity-100"
            }`}
          />
          <X
            aria-hidden="true"
            className={`absolute inset-0 m-auto h-5 w-5 transition-[opacity,transform] duration-200 ease-out-strong ${
              isOpen ? "opacity-100" : "-rotate-90 scale-75 opacity-0"
            }`}
          />
        </button>
      </div>

      {/* Mobile Nav: grows out of the header, exits faster than it enters */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, transform: "translateY(-8px) scale(0.98)" }}
            animate={{ opacity: 1, transform: "translateY(0px) scale(1)", transition: { duration: 0.24, ease: EASE_OUT } }}
            exit={{ opacity: 0, transform: "translateY(-6px) scale(0.98)", transition: { duration: 0.15, ease: EASE_OUT } }}
            style={{ transformOrigin: "top center" }}
            className="border-b border-border/60 bg-white shadow-lg md:hidden"
          >
            <nav className="flex flex-col space-y-3 p-6">
              {navItems.map((item) => (
                <ScrollLink
                  key={item.name}
                  to={item.to}
                  smooth={true}
                  offset={-100}
                  className={`rounded-2xl bg-secondary/70 px-4 py-3 text-base font-medium text-foreground hover:text-primary ${press}`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </ScrollLink>
              ))}
              <ScrollLink
                to="contact"
                smooth={true}
                className={`rounded-2xl bg-primary px-4 py-3 text-base font-medium text-primary-foreground ${press}`}
                onClick={() => setIsOpen(false)}
              >
                Get in Touch
              </ScrollLink>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
