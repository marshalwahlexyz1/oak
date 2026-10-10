import type { CSSProperties } from "react";
import { CardFan } from "@/components/CardFan";
import { Crosshair, EyeMark, Triangle } from "@/components/Marks";

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;
const WORD = "AKANJI";

export function Cover() {
  return (
    <section id="hero" className="relative overflow-hidden pt-[94px]">
      <div className="mx-auto max-w-7xl px-5 pt-8 md:pt-12">
        <div className="relative px-1 md:px-6">
          {[0, 33.333, 66.666, 100].map((x) => (
            <Crosshair key={`t${x}`} className="top-0" style={{ left: `${x}%` }} />
          ))}
          {[0, 33.333, 66.666, 100].map((x) => (
            <Crosshair key={`b${x}`} className="top-full" style={{ left: `${x}%` }} />
          ))}

          {/* The vermilion bar runs the full height of the frame, behind the name */}
          <div
            aria-hidden="true"
            className="bar-reveal absolute inset-y-6 left-1/2 w-[clamp(64px,15vw,200px)] -translate-x-1/2 bg-accent"
          />

          <div className="relative grid grid-cols-[1fr_auto] items-start gap-6 pt-8">
            <div className="fade-up" style={delay(150)}>
              <p className="wide text-[clamp(13px,1.7vw,22px)] font-extrabold uppercase leading-[0.98]">
                Security &amp; <br className="md:hidden" />
                privacy
                <br />
                research
              </p>
              <p className="label mt-3 max-w-[16ch] text-foreground/55 md:max-w-none">With real-world impact</p>
            </div>
            <EyeMark className="fade-up h-9 w-9 md:h-11 md:w-11" />
          </div>

          <div className="relative flex items-center justify-center py-10 md:py-12">
            <Triangle className="absolute left-0 top-1/2 -translate-y-1/2" />
            <Triangle direction="left" className="absolute right-0 top-1/2 -translate-y-1/2" />

            <h1 className="relative">
              <span className="sr-only">Olawale Amos Akanji: security and privacy research with real-world impact</span>
              <span aria-hidden="true" className="relative block">
                <span className="wide text-outline echo-up absolute inset-0 text-center text-[clamp(54px,15vw,208px)] font-extrabold leading-[0.8] tracking-[-0.02em]">
                  {WORD}
                </span>
                <span className="wide text-outline echo-down absolute inset-0 text-center text-[clamp(54px,15vw,208px)] font-extrabold leading-[0.8] tracking-[-0.02em]">
                  {WORD}
                </span>
                <span className="mask-line wide relative text-[clamp(54px,15vw,208px)] font-extrabold leading-[0.8] tracking-[-0.02em]">
                  <span style={delay(250)}>{WORD}</span>
                </span>
              </span>
            </h1>
          </div>

          <div className="relative grid grid-cols-2 gap-6 pb-8">
            {/* Short versions on phones so the labels clear the bar */}
            <p className="fade-up label" style={delay(450)}>
              <span className="md:hidden">O. A. Akanji</span>
              <span className="hidden md:inline">Olawale Amos Akanji</span>
              <span className="block text-foreground/55">
                <span className="md:hidden">PhD · BU</span>
                <span className="hidden md:inline">PhD candidate · Boston University</span>
              </span>
            </p>
            <p className="fade-up label text-right" style={delay(520)}>
              Claude Vertical <br className="md:hidden" />
              Ambassador
              <span className="block text-foreground/55">
                <span className="md:hidden">Bos · Security</span>
                <span className="hidden md:inline">Boston · Security</span>
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="fade-up mt-6 md:mt-4" style={delay(600)}>
        <CardFan />
      </div>
    </section>
  );
}
