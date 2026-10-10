import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  type AnimationPlaybackControls,
  type MotionValue,
} from "framer-motion";
import { scroller } from "react-scroll";
import { EyeMark, Triangle } from "@/components/Marks";
import { EASE_OUT, useMediaQuery } from "@/lib/motion";
import { cn } from "@/lib/utils";

const base = import.meta.env.BASE_URL;

type Tone = "ink" | "red" | "paper" | "photo";

interface FanCard {
  id: string;
  label: string;
  to: string;
  tone: Tone;
  description: string;
  content: ReactNode;
}

const TONES: Record<Tone, string> = {
  ink: "bg-[#111] text-white",
  red: "bg-accent text-[#111]",
  paper: "bg-[#f6f6f3] text-[#111]",
  photo: "bg-[#111] text-white",
};

// Card art scales with the card through container-query units (cqw).
const CARDS: FanCard[] = [
  {
    id: "ambassador",
    label: "Ambassador",
    to: "index",
    tone: "paper",
    description: "Claude Vertical Ambassador, Boston, Security",
    content: (
      <>
        <CardCorner left="Claude" right="2026" />
        <p className="wide mt-auto text-[14cqw] font-extrabold uppercase leading-[0.9]">Boston</p>
        <p className="label mt-[4cqw]">Vertical Ambassador</p>
        <p className="label mt-[2cqw] flex items-center gap-2 text-foreground/60">
          <span className="h-2 w-2 rounded-full bg-accent" /> Security
        </p>
      </>
    ),
  },
  {
    id: "lens",
    label: "X-ray",
    to: "lens",
    tone: "ink",
    description: "Research lens: see what apps hide",
    content: (
      <>
        <CardCorner left="Research" right="Lens" />
        <div className="relative m-auto aspect-square w-[62cqw]">
          <div className="xray-grid absolute inset-[8%] rounded-full opacity-80" />
          <div className="absolute inset-0 rounded-full border-2 border-accent" />
          <span className="absolute left-1/2 top-[-6%] h-[12%] w-0.5 -translate-x-1/2 bg-accent" />
          <span className="absolute bottom-[-6%] left-1/2 h-[12%] w-0.5 -translate-x-1/2 bg-accent" />
          <span className="absolute left-[-6%] top-1/2 h-0.5 w-[12%] -translate-y-1/2 bg-accent" />
          <span className="absolute right-[-6%] top-1/2 h-0.5 w-[12%] -translate-y-1/2 bg-accent" />
          <span className="absolute inset-0 grid place-items-center font-mono text-[6cqw] text-white/70">READ_SMS</span>
        </div>
        <p className="label flex items-center justify-between">
          X-ray <Triangle direction="left" />
        </p>
      </>
    ),
  },
  {
    id: "mark",
    label: "Security",
    to: "index",
    tone: "red",
    description: "Security and privacy research",
    content: (
      <>
        <div className="flex justify-center">
          <Triangle direction="up" className="h-2 w-2" />
        </div>
        <EyeMark className="m-auto w-[62cqw] text-[#111]" />
        <p className="label text-right">Security &amp; privacy</p>
      </>
    ),
  },
  {
    id: "me",
    label: "Me",
    to: "index",
    tone: "photo",
    description: "Olawale Amos Akanji",
    content: (
      <>
        <img
          src={`${base}Me-card.webp`}
          alt=""
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover grayscale contrast-[1.08]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <p className="wide relative self-end text-right text-[7cqw] font-extrabold uppercase leading-[0.95]">
          OAK
          <br />
          BU &rsquo;27
        </p>
        <p className="label relative mt-auto">Olawale A. Akanji</p>
      </>
    ),
  },
  {
    id: "best-paper",
    label: "Best paper",
    to: "index",
    tone: "paper",
    description: "CISE Best Paper Award 2026",
    content: (
      <>
        <CardCorner left="CISE" right="2026" />
        <p className="wide mt-auto text-[17cqw] font-extrabold uppercase leading-[0.86]">
          Best
          <br />
          Paper
        </p>
        <p className="wide text-outline text-[30cqw] font-extrabold leading-none">26</p>
        <p className="label mt-[3cqw]">The Cost of Convenience</p>
      </>
    ),
  },
  {
    id: "dimva",
    label: "DIMVA '26",
    to: "research",
    tone: "ink",
    description: "DIMVA 2026 paper: Silent Consent, Persistent Risk",
    content: (
      <>
        <CardCorner left="Paper" right="GR" />
        <p className="wide mt-auto text-[16cqw] font-extrabold uppercase leading-[0.9]">
          DIMVA
          <br />
          <span className="text-accent">&rsquo;26</span>
        </p>
        <p className="label mt-[5cqw] text-white/70">Silent Consent, Persistent Risk</p>
      </>
    ),
  },
  {
    id: "build-day",
    label: "Build day",
    to: "news",
    tone: "red",
    description: "Hosted Boston Build Day, September 23, 2026",
    content: (
      <>
        <CardCorner left="Hosted" right="BOS" />
        <p className="wide mt-auto text-[16cqw] font-extrabold uppercase leading-[0.88]">
          Build
          <br />
          Day
        </p>
        <p className="wide mt-[4cqw] text-[9cqw] font-extrabold">09.23.26</p>
      </>
    ),
  },
];

const START = CARDS.findIndex((card) => card.id === "me");

const GEOMETRY = {
  desktop: { w: 220, h: 308, r: 760, step: 15, top: 24, height: 470, ring: 220 },
  mobile: { w: 150, h: 210, r: 500, step: 17, top: 16, height: 340, ring: 160 },
};

// Overdamped settle: lands on the card without overshoot.
const SETTLE = { type: "spring" as const, stiffness: 220, damping: 30 };

function CardCorner({ left, right }: { left: string; right: string }) {
  return (
    <div className="label flex items-start justify-between">
      <span>{left}</span>
      <span>{right}</span>
    </div>
  );
}

export function CardFan() {
  const reduceMotion = useReducedMotion();
  const desktop = useMediaQuery("(min-width: 768px)");
  const g = desktop ? GEOMETRY.desktop : GEOMETRY.mobile;
  const maxIndex = CARDS.length - 1;

  // rotation: wheel offset in degrees; card i sits at i * step + rotation.
  const rotation = useMotionValue(-START * g.step);
  // spread: 0 = stacked deck, 1 = fanned. Only animates once, on load.
  const spread = useMotionValue(reduceMotion ? 1 : 0);
  const [selected, setSelected] = useState(START);
  const settleAnim = useRef<AnimationPlaybackControls | null>(null);
  // The card the wheel is heading to. Key presses step from here, so rapid presses all count.
  const targetIndex = useRef(START);
  const drag = useRef<{ startX: number; startRot: number; lastX: number; lastT: number; vx: number; moved: boolean } | null>(null);

  const ringDeg = useTransform(rotation, (r) => r * 2.2);
  const ringTransform = useMotionTemplate`rotate(${ringDeg}deg)`;

  useMotionValueEvent(rotation, "change", (r) => {
    const idx = Math.min(Math.max(Math.round(-r / g.step), 0), maxIndex);
    setSelected((current) => (current === idx ? current : idx));
  });

  useEffect(() => {
    if (reduceMotion) {
      spread.set(1);
      return;
    }
    const controls = animate(spread, 1, { type: "spring", duration: 1.1, bounce: 0.15, delay: 0.75 });
    return () => controls.stop();
  }, [reduceMotion, spread]);

  // Keep the selected card centered when the geometry changes (desktop <-> mobile).
  useEffect(() => {
    rotation.jump(-selected * g.step);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [g.step]);

  const settleTo = (index: number, velocity = 0) => {
    const target = Math.min(Math.max(index, 0), maxIndex);
    targetIndex.current = target;
    settleAnim.current?.stop();
    if (reduceMotion) {
      rotation.set(-target * g.step);
      return;
    }
    settleAnim.current = animate(rotation, -target * g.step, { ...SETTLE, velocity });
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    settleAnim.current?.stop();
    drag.current = { startX: e.clientX, startRot: rotation.get(), lastX: e.clientX, lastT: e.timeStamp, vx: 0, moved: false };
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.startX;
    if (!d.moved) {
      if (Math.abs(dx) < 6) return;
      d.moved = true;
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    let next = d.startRot + (dx / g.r) * (180 / Math.PI);
    // Rubber-band past the first and last card instead of a hard stop.
    const min = -maxIndex * g.step;
    if (next > 0) next *= 0.35;
    if (next < min) next = min + (next - min) * 0.35;
    rotation.set(next);
    const dt = e.timeStamp - d.lastT;
    if (dt > 0) d.vx = 0.8 * ((e.clientX - d.lastX) / dt) + 0.2 * d.vx;
    d.lastX = e.clientX;
    d.lastT = e.timeStamp;
  };

  const endDrag = () => {
    const d = drag.current;
    drag.current = null;
    if (!d?.moved) return;
    // A flick carries: project the release velocity forward before picking a card.
    const velocityDeg = ((d.vx * 1000) / g.r) * (180 / Math.PI);
    const projected = rotation.get() + velocityDeg * 0.18;
    settleTo(Math.round(-projected / g.step), velocityDeg);
  };

  const activate = (index: number) => {
    if (index !== selected) {
      settleTo(index);
      return;
    }
    scroller.scrollTo(CARDS[index].to, { smooth: true, duration: 700, offset: -100 });
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      settleTo(targetIndex.current + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      settleTo(targetIndex.current - 1);
    }
  };

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Highlights. Drag, or use the arrow keys, to turn the cards."
      className="relative cursor-grab touch-pan-y select-none overflow-hidden active:cursor-grabbing"
      style={{ height: g.height }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onKeyDown={onKeyDown}
    >
      {CARDS.map((card, i) => (
        <FanCardView
          key={card.id}
          card={card}
          index={i}
          geometry={g}
          rotation={rotation}
          spread={spread}
          zIndex={50 - Math.abs(i - selected)}
          isSelected={i === selected}
          onActivate={() => activate(i)}
        />
      ))}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2"
        style={{ top: g.top + g.h + 22, width: g.ring, height: g.ring, marginLeft: -g.ring / 2 }}
      >
        <motion.svg viewBox="0 0 200 200" className="h-full w-full" style={{ transform: ringTransform }}>
          <circle cx="100" cy="100" r="97" fill="none" stroke="currentColor" strokeOpacity="0.35" strokeDasharray="3 6" />
          <path id="fan-ring" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" fill="none" />
          <text className="wide fill-foreground/35 text-[11px] font-semibold uppercase tracking-[0.2em]">
            <textPath href="#fan-ring" textLength={490}>
              Olawale Akanji • Security • Privacy • Research •
            </textPath>
          </text>
        </motion.svg>
        <div className="absolute left-1/2 top-[14%] flex -translate-x-1/2 flex-col items-center gap-1">
          <Triangle direction="up" className="h-2 w-2.5" />
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={CARDS[selected].id}
              className="wide whitespace-nowrap text-sm font-extrabold uppercase md:text-base"
              initial={{ opacity: 0, filter: "blur(4px)", transform: "translateY(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)", transform: "translateY(0px)", transition: { duration: 0.18, ease: EASE_OUT } }}
              exit={{ opacity: 0, filter: "blur(4px)", transition: { duration: 0.1, ease: EASE_OUT } }}
            >
              {CARDS[selected].label}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {CARDS[selected].description}
      </p>
    </div>
  );
}

function FanCardView({
  card,
  index,
  geometry: g,
  rotation,
  spread,
  zIndex,
  isSelected,
  onActivate,
}: {
  card: FanCard;
  index: number;
  geometry: (typeof GEOMETRY)["desktop"];
  rotation: MotionValue<number>;
  spread: MotionValue<number>;
  zIndex: number;
  isSelected: boolean;
  onActivate: () => void;
}) {
  // Every card turns around the same pivot, r px below the top of the front card.
  const angle = useTransform([rotation, spread], ([r, s]: number[]) => (index * g.step + r) * s);
  const lift = useTransform(spread, (s) => (1 - s) * 90);
  const opacity = useTransform(spread, [0, 0.2], [0, 1]);
  const transform = useMotionTemplate`rotate(${angle}deg) translateY(${lift}px)`;

  return (
    <motion.button
      type="button"
      aria-label={isSelected ? `${card.description}. Open section.` : `Show ${card.description}`}
      onClick={onActivate}
      className="group absolute left-1/2 rounded-[22px] [container-type:inline-size] focus-visible:outline-none"
      style={{
        top: g.top,
        width: g.w,
        height: g.h,
        marginLeft: -g.w / 2,
        transform,
        transformOrigin: `50% ${g.r}px`,
        opacity,
        zIndex,
      }}
    >
      <div
        className={cn(
          "relative flex h-full w-full flex-col overflow-hidden rounded-[22px] p-[7cqw] text-left shadow-[0_24px_40px_-18px_rgba(0,0,0,0.45)] ring-1 ring-black/5 transition-transform duration-200 ease-out-strong group-hover:-translate-y-3 group-focus-visible:-translate-y-3 group-focus-visible:ring-2 group-focus-visible:ring-accent group-active:scale-[0.98]",
          TONES[card.tone],
        )}
      >
        {card.content}
      </div>
    </motion.button>
  );
}
