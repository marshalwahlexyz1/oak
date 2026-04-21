import { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-border/60 bg-white/80 py-3 shadow-sm backdrop-blur-xl" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <ScrollLink 
          to="hero" 
          smooth={true} 
          className="flex cursor-pointer items-center gap-3"
        >
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-sm font-bold tracking-[0.25em] text-primary-foreground shadow-lg shadow-primary/15">
            OAK
          </span>
          <span className="hidden text-sm font-semibold tracking-[0.25em] text-primary/70 md:block">
            OL AWALE AKANJI
          </span>
        </ScrollLink>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-2 rounded-full border border-border/60 bg-white/75 px-2 py-2 shadow-sm backdrop-blur md:flex">
          {navItems.map((item) => (
            <ScrollLink
              key={item.name}
              to={item.to}
              smooth={true}
              offset={-100}
              spy={true}
              activeClass="bg-primary text-primary-foreground"
              className="cursor-pointer rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-primary"
            >
              {item.name}
            </ScrollLink>
          ))}
          <ScrollLink
            to="contact"
            smooth={true}
            className="cursor-pointer rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
          >
            Get in Touch
          </ScrollLink>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="rounded-full border border-border/60 bg-white/80 p-2 text-foreground shadow-sm backdrop-blur md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-border/60 bg-white/95 shadow-lg backdrop-blur md:hidden"
          >
            <nav className="flex flex-col space-y-3 p-6">
              {navItems.map((item) => (
                <ScrollLink
                  key={item.name}
                  to={item.to}
                  smooth={true}
                  offset={-100}
                  className="rounded-2xl bg-secondary/70 px-4 py-3 text-base font-medium text-foreground hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </ScrollLink>
              ))}
              <ScrollLink
                to="contact"
                smooth={true}
                className="rounded-2xl bg-primary px-4 py-3 text-base font-medium text-primary-foreground"
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
