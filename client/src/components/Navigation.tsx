import { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_OUT, press } from "@/lib/motion";

const navItems = [
  { name: "Index", to: "index" },
  { name: "Lens", to: "lens" },
  { name: "Research", to: "research" },
  { name: "News", to: "news" },
  { name: "Experience", to: "experience" },
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
      className={`fixed left-0 right-0 top-0 z-50 h-16 border-b transition-[background-color,border-color] duration-200 ease-out-strong ${
        scrolled || isOpen ? "border-foreground/10 bg-background/85 backdrop-blur-xl" : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-5">
        <ScrollLink
          to="hero"
          smooth={true}
          className="flex cursor-pointer items-center gap-3"
        >
          <span className="wide inline-flex h-9 w-9 items-center justify-center rounded-xl bg-foreground text-[11px] font-extrabold text-background">
            OAK
          </span>
          <span className="label hidden text-foreground/70 md:block">Olawale Akanji</span>
        </ScrollLink>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 rounded-full bg-card/80 p-1.5 ring-1 ring-black/5 backdrop-blur md:flex">
          {navItems.map((item) => (
            <ScrollLink
              key={item.name}
              to={item.to}
              smooth={true}
              offset={-100}
              spy={true}
              onSetActive={(to: string) => setActive(to)}
              onSetInactive={(to: string) => setActive((current) => (current === to ? null : current))}
              className={`label relative isolate cursor-pointer rounded-full px-3.5 py-2 transition-colors duration-200 ${
                active === item.to ? "text-background" : "text-foreground/70 hover:text-foreground"
              }`}
            >
              {/* One pill that travels between items, so the highlight keeps its identity */}
              {active === item.to && (
                <motion.span
                  layoutId="nav-active-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-foreground"
                  transition={{ type: "spring", duration: 0.4, bounce: 0 }}
                />
              )}
              {item.name}
            </ScrollLink>
          ))}
          <ScrollLink
            to="contact"
            smooth={true}
            className={`label ml-1 cursor-pointer rounded-full bg-accent px-4 py-2 text-white hover:bg-accent/90 ${press}`}
          >
            Contact
          </ScrollLink>
        </nav>

        {/* Mobile Toggle */}
        <button
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          className={`relative h-10 w-10 rounded-full bg-card text-foreground ring-1 ring-black/5 md:hidden ${press}`}
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
            className="border-b border-foreground/10 bg-background shadow-lg md:hidden"
          >
            <nav className="flex flex-col space-y-2 p-5">
              {navItems.map((item) => (
                <ScrollLink
                  key={item.name}
                  to={item.to}
                  smooth={true}
                  offset={-100}
                  className={`wide rounded-[14px] bg-card px-4 py-3 text-sm font-extrabold uppercase text-foreground ring-1 ring-black/5 ${press}`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </ScrollLink>
              ))}
              <ScrollLink
                to="contact"
                smooth={true}
                className={`wide rounded-[14px] bg-accent px-4 py-3 text-sm font-extrabold uppercase text-white ${press}`}
                onClick={() => setIsOpen(false)}
              >
                Contact
              </ScrollLink>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
