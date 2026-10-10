import { useCallback, useEffect, useLayoutEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
  useTransform,
  type AnimationPlaybackControls,
} from "framer-motion";
import { ArrowRight, Bell, Check, ScanEye, ShieldCheck, Zap } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { EASE_IN_OUT, EASE_OUT, press, useInViewOnce, useMediaQuery } from "@/lib/motion";
import { cn } from "@/lib/utils";

type HotspotId = "loan" | "permissions" | "fraud";

const FINDINGS: { id: HotspotId; tag: string; title: string; venue: string; body: string }[] = [
  {
    id: "loan",
    tag: "Data & terms",
    title: "The Cost of Convenience",
    venue: "ASIACCS '26 · CISE Best Paper",
    body: "An end-to-end audit of predatory lending apps across five countries. Responsible disclosure to Google contributed to removals at platform scale.",
  },
  {
    id: "permissions",
    tag: "Permissions",
    title: "Silent Consent, Persistent Risk",
    venue: "DIMVA '26",
    body: "How Android permission groups and custom permissions create security blind spots and persistent risk.",
  },
  {
    id: "fraud",
    tag: "Scam chat",
    title: "Cross-Platform Fraud Detection",
    venue: "In progress",
    body: "Hidden Markov Models plus fine-tuned LLMs that track a pig-butchering scam's lifecycle across messaging apps.",
  },
];

const LENS_R = 80;
// Fast and smooth, never bouncy: overdamped, so the lens settles without overshoot.
const LENS_SPRING = { stiffness: 420, damping: 42, mass: 0.7 };

type Rect = { id: HotspotId; left: number; top: number; right: number; bottom: number };

export function XRayLens() {
  const reduceMotion = useReducedMotion();
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const screenRef = useRef<HTMLDivElement>(null);
  const [phoneRef, phoneInView] = useInViewOnce<HTMLDivElement>("0px 0px -30% 0px");
  const hotspots = useRef<Rect[]>([]);
  const intro = useRef<AnimationPlaybackControls[]>([]);
  const dragging = useRef(false);
  const [active, setActive] = useState<HotspotId | null>(null);
  const [revealAll, setRevealAll] = useState(false);

  // Raw target (pointer / legend) and the spring-smoothed position the lens actually draws at.
  const targetX = useMotionValue(200);
  const targetY = useMotionValue(70);
  const x = useSpring(targetX, LENS_SPRING);
  const y = useSpring(targetY, LENS_SPRING);
  const radius = useMotionValue(LENS_R);
  const ringOpacity = useMotionValue(1);

  const clipPath = useMotionTemplate`circle(${radius}px at ${x}px ${y}px)`;
  const ringX = useTransform(x, (v) => v - LENS_R);
  const ringY = useTransform(y, (v) => v - LENS_R);
  const ringTransform = useMotionTemplate`translate3d(${ringX}px, ${ringY}px, 0)`;

  const measure = useCallback(() => {
    const screen = screenRef.current;
    if (!screen) return;
    const base = screen.getBoundingClientRect();
    hotspots.current = Array.from(screen.querySelectorAll<HTMLElement>("[data-xray-layer] [data-hotspot]")).map((el) => {
      const box = el.getBoundingClientRect();
      return {
        id: el.dataset.hotspot as HotspotId,
        left: box.left - base.left,
        top: box.top - base.top,
        right: box.right - base.left,
        bottom: box.bottom - base.top,
      };
    });
  }, []);

  const centerOf = (id: HotspotId) => {
    const rect = hotspots.current.find((h) => h.id === id);
    return rect ? { x: (rect.left + rect.right) / 2, y: (rect.top + rect.bottom) / 2 } : null;
  };

  const moveTo = (px: number, py: number, instant = false) => {
    targetX.set(px);
    targetY.set(py);
    if (instant || reduceMotion) {
      x.jump(px);
      y.jump(py);
    }
  };

  const stopIntro = () => {
    intro.current.forEach((controls) => controls.stop());
    intro.current = [];
  };

  // The legend follows whichever finding the lens is over. It stays on the last one
  // while the lens crosses the gaps between blocks, so it doesn't flicker.
  const detect = (px: number, py: number) => {
    const hit = hotspots.current.find(
      (h) => px >= h.left - 6 && px <= h.right + 6 && py >= h.top - 6 && py <= h.bottom + 6,
    );
    if (hit) setActive(hit.id);
  };
  useMotionValueEvent(x, "change", (v) => detect(v, y.get()));
  useMotionValueEvent(y, "change", (v) => detect(x.get(), v));

  useLayoutEffect(() => {
    const screen = screenRef.current;
    if (!screen) return;
    measure();
    moveTo(screen.clientWidth * 0.74, 64, true);
    const observer = new ResizeObserver(measure);
    observer.observe(screen);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [measure]);

  // First time the phone scrolls into view, the lens glides down onto the loan offer
  // once, to show what it does. Any pointer input takes over immediately.
  useEffect(() => {
    if (!phoneInView) return;
    measure();
    const target = centerOf("loan");
    if (!target) return;
    if (reduceMotion) {
      moveTo(target.x, target.y, true);
      return;
    }
    intro.current = [
      animate(targetX, target.x, { duration: 1.2, delay: 0.3, ease: EASE_IN_OUT }),
      animate(targetY, target.y, { duration: 1.2, delay: 0.3, ease: EASE_IN_OUT }),
    ];
    return stopIntro;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phoneInView]);

  const localPoint = (e: ReactPointerEvent) => {
    const box = screenRef.current!.getBoundingClientRect();
    return {
      px: Math.min(Math.max(e.clientX - box.left, 0), box.width),
      py: Math.min(Math.max(e.clientY - box.top, 0), box.height),
    };
  };

  const onPointerMove = (e: ReactPointerEvent) => {
    if (e.pointerType !== "mouse" && !dragging.current) return;
    stopIntro();
    const { px, py } = localPoint(e);
    moveTo(px, py);
  };

  const onPointerDown = (e: ReactPointerEvent) => {
    if (e.pointerType === "mouse") return;
    stopIntro();
    dragging.current = true;
    const { px, py } = localPoint(e);
    moveTo(px, py);
  };

  const endDrag = () => {
    dragging.current = false;
  };

  const setRevealAllAnimated = (next: boolean) => {
    setRevealAll(next);
    const screen = screenRef.current;
    if (!screen) return;
    const full = Math.hypot(screen.clientWidth, screen.clientHeight);
    if (reduceMotion) {
      radius.set(next ? full : LENS_R);
      ringOpacity.set(next ? 0 : 1);
      return;
    }
    animate(radius, next ? full : LENS_R, { duration: next ? 0.6 : 0.45, ease: EASE_IN_OUT });
    animate(ringOpacity, next ? 0 : 1, { duration: 0.2, delay: next ? 0 : 0.3, ease: EASE_OUT });
  };

  const focusFinding = (id: HotspotId) => {
    stopIntro();
    if (revealAll) setRevealAllAnimated(false);
    measure();
    const center = centerOf(id);
    if (center) moveTo(center.x, center.y);
    setActive(id);
  };

  return (
    <section id="lens" className="relative overflow-hidden bg-ink py-16 text-white md:py-20">
      <div aria-hidden="true" className="xray-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_70%_45%,black,transparent_70%)]" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[1fr_auto] lg:grid-rows-[auto_1fr] lg:gap-x-20 lg:gap-y-8">
        <Reveal className="max-w-xl lg:col-start-1 lg:row-start-1">
          <div className="label mb-4 grid grid-cols-[auto_1fr_auto] items-center gap-4 text-white/55">
            <span>[02]</span>
            <span aria-hidden="true" className="h-px bg-white/20" />
            <span>Research lens</span>
          </div>
          <h2 className="wide text-[clamp(24px,3.2vw,40px)] font-extrabold uppercase leading-[0.95] text-white">
            Every app has a surface.
            <span className="block text-accent">My research studies what&rsquo;s underneath.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/65">
            Run the lens over this fictional lending app. On top is what a borrower sees. Underneath are the
            patterns my papers audit: permissions nobody meaningfully agreed to, contact lists shipped to remote
            servers, and scam conversations that follow a script.
          </p>
        </Reveal>

        <div ref={phoneRef} className="relative lg:sticky lg:top-[124px] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,hsl(var(--accent)/0.14),transparent)]"
          />
          <figure className="relative mx-auto w-[300px] max-w-full">
            <div className="rounded-[46px] bg-gradient-to-b from-[#1f2c47] to-[#0a111f] p-[10px] shadow-[0_40px_80px_-24px_rgba(0,0,0,0.7),inset_0_0_0_1px_rgba(255,255,255,0.08)]">
              <div
                ref={screenRef}
                role="img"
                aria-label="Illustration of a fictional loan app. The surface promises fast approval and a 91-day term. Under the x-ray: a 7-day actual term with a 30% upfront fee, dangerous permissions such as reading contacts and SMS, contacts uploaded to a remote server, and a chat that a scam-stage model scores as likely fraud."
                className="relative h-[548px] cursor-crosshair touch-pan-y select-none overflow-hidden rounded-[36px] bg-white"
                onPointerMove={onPointerMove}
                onPointerDown={onPointerDown}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
              >
                <div className="absolute inset-0">
                  <SurfaceScreen />
                </div>
                <motion.div data-xray-layer className="absolute inset-0" style={{ clipPath }}>
                  <XRayScreen active={active} />
                </motion.div>

                <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-2.5 z-10 h-[22px] w-[84px] -translate-x-1/2 rounded-full bg-black" />

                <motion.div
                  aria-hidden="true"
                  className="absolute left-0 top-0 z-20 touch-none"
                  style={{ width: LENS_R * 2, height: LENS_R * 2, transform: ringTransform, opacity: ringOpacity }}
                >
                  <div className="h-full w-full rounded-full border-2 border-accent shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2),0_12px_32px_rgba(0,0,0,0.35)]" />
                  <span className="absolute left-1/2 top-[-7px] h-3 w-0.5 -translate-x-1/2 rounded-full bg-accent" />
                  <span className="absolute bottom-[-7px] left-1/2 h-3 w-0.5 -translate-x-1/2 rounded-full bg-accent" />
                  <span className="absolute left-[-7px] top-1/2 h-0.5 w-3 -translate-y-1/2 rounded-full bg-accent" />
                  <span className="absolute right-[-7px] top-1/2 h-0.5 w-3 -translate-y-1/2 rounded-full bg-accent" />
                  <span className="absolute -right-2 top-3 rounded-full bg-accent px-2 py-0.5 font-mono text-[9px] font-bold tracking-[0.2em] text-white">
                    X-RAY
                  </span>
                </motion.div>
              </div>
            </div>
            <figcaption className="mt-4 text-center text-xs text-white/45">
              Fictional app and data, for illustration only.
            </figcaption>
          </figure>
        </div>

        <Reveal delay={80} className="max-w-xl lg:col-start-1 lg:row-start-2">
          <ul className="space-y-2">
            {FINDINGS.map((finding) => {
              const isActive = active === finding.id;
              return (
                <li key={finding.id}>
                  <button
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => focusFinding(finding.id)}
                    className={cn(
                      "w-full rounded-[16px] border p-3.5 text-left transition-[background-color,border-color,transform] duration-200 ease-out-strong active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                      isActive
                        ? "border-accent/60 bg-white/[0.07]"
                        : "border-white/10 hover:border-white/25 hover:bg-white/[0.03]",
                    )}
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span className="label text-accent">{finding.tag}</span>
                      <span className="text-right text-xs text-white/50">{finding.venue}</span>
                    </span>
                    <span className="mt-1.5 block text-[15px] font-bold text-white">{finding.title}</span>
                    <span className="mt-1 block text-[13px] leading-5 text-white/60">{finding.body}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
            <button
              type="button"
              aria-pressed={revealAll}
              onClick={() => setRevealAllAnimated(!revealAll)}
              className={`inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${press}`}
            >
              <ScanEye className="h-4 w-4" aria-hidden="true" />
              {revealAll ? "Back to the surface" : "X-ray the whole screen"}
            </button>
            <p className="text-sm text-white/50">
              {finePointer ? "Or move your cursor over the phone." : "Or tap and drag on the phone."}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* The two screens share block heights, so every x-ray annotation sits  */
/* exactly under the surface element it explains.                      */
/* ------------------------------------------------------------------ */

function SurfaceScreen() {
  return (
    <div className="flex h-full flex-col gap-2.5 bg-[#f5f7f6] px-3.5 pb-4 pt-2 text-[#0f1f1a]">
      <div className="flex h-7 items-center justify-between px-2 text-[11px] font-semibold">
        <span>9:41</span>
        <span className="flex items-end gap-[2px]" aria-hidden="true">
          <span className="h-1.5 w-[3px] rounded-sm bg-current" />
          <span className="h-2 w-[3px] rounded-sm bg-current" />
          <span className="h-2.5 w-[3px] rounded-sm bg-current" />
          <span className="ml-1 h-2.5 w-5 rounded-[3px] border border-current p-[1px]">
            <span className="block h-full w-3/4 rounded-[1px] bg-current" />
          </span>
        </span>
      </div>

      <div className="flex h-12 items-center gap-2.5 px-0.5">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-white">
          <Zap className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold leading-tight">Instant Loan</p>
          <p className="text-[11px] text-slate-500">★ 4.8 · 1M+ installs</p>
        </div>
        <Bell className="h-4 w-4 text-slate-400" />
      </div>

      <div className="h-[132px] rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 p-4 text-white shadow-lg shadow-emerald-900/20">
        <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-semibold">
          <Check className="h-3 w-3" /> Approved in 5 minutes
        </span>
        <p className="mt-2 text-[11px] text-white/80">Borrow up to</p>
        <p className="font-display text-[34px] font-bold leading-none">$500</p>
        <p className="mt-1.5 text-[11px] text-white/80">91-day term · No credit check</p>
      </div>

      <div className="h-[116px] rounded-2xl border border-slate-200 bg-white p-3.5">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <p className="text-[13px] font-bold">Verify in one tap</p>
        </div>
        <p className="mt-1.5 text-[11px] leading-snug text-slate-500">
          We need a few permissions to confirm it's really you.
        </p>
        <div className="mt-2.5 rounded-full bg-emerald-50 py-1.5 text-center text-[11px] font-semibold text-emerald-700">
          Allow access
        </div>
      </div>

      <div className="flex h-[76px] items-start gap-2">
        <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-amber-200 text-[11px] font-bold text-amber-800">
          A
        </div>
        <div className="rounded-2xl rounded-tl-sm bg-white px-3 py-2 text-[11px] leading-snug shadow-sm ring-1 ring-slate-200">
          Hi! I'm Ada, your loan advisor. Pay a small fee today and I'll double your limit.
        </div>
      </div>

      <div className="flex h-12 items-center justify-center gap-2 rounded-full bg-emerald-600 text-sm font-bold text-white shadow-lg shadow-emerald-900/25">
        Get my loan <ArrowRight className="h-4 w-4" />
      </div>

      <p className="h-4 text-center text-[9px] text-slate-400">Secure · Trusted by millions</p>
    </div>
  );
}

function XRayScreen({ active }: { active: HotspotId | null }) {
  return (
    <div className="xray-grid flex h-full flex-col gap-2.5 bg-ink px-3.5 pb-4 pt-2 font-mono text-[10px] leading-[1.55] text-white/85">
      <div className="flex h-7 items-center justify-between px-2">
        <span className="text-white/45">09:41</span>
        <span className="flex items-center gap-1.5 text-accent">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" /> capturing · 3 hosts
        </span>
      </div>

      <div className="flex h-12 flex-col justify-center rounded-xl border border-dashed border-signal/25 px-2.5">
        <p className="text-white/90">com.instantloan.app</p>
        <p className="text-signal/65">targetSdk 28 · 6 third-party SDKs</p>
      </div>

      <XBlock id="loan" label="TERMS, AS AUDITED" active={active} className="h-[132px]">
        <Row k="advertised" v="91 days" />
        <Row k="actual" v="7 days" flag />
        <Row k="upfront fee" v="30% withheld" flag />
        <Row k="APR" v="not disclosed" flag />
      </XBlock>

      <XBlock id="permissions" label='GRANTED ON "ALLOW"' active={active} className="h-[116px]">
        <Row k="READ_CONTACTS" v="dangerous" danger />
        <Row k="READ_SMS" v="dangerous" danger />
        <Row k="ACCESS_FINE_LOCATION" v="dangerous" danger />
        <Row k="…permission.SYNC" v="custom" flag />
      </XBlock>

      <XBlock id="fraud" label="SCAM-STAGE MODEL" active={active} className="h-[76px]">
        <p className="text-white/60">
          rapport → trust → <span className="rounded bg-accent px-1 text-white">ask</span> → extract
        </p>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-white/60">P(fraud)</span>
          <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
            <span className="block h-full w-[91%] rounded-full bg-accent" />
          </span>
          <span className="text-accent">0.91</span>
        </div>
      </XBlock>

      <XBlock id="loan" active={active} className="flex h-12 flex-col justify-center py-1">
        <p>
          <span className="text-signal">POST</span> /v1/contacts → 203.0.113.24
        </p>
        <p className="text-accent">on default: SMS every contact</p>
      </XBlock>

      <p className="h-4 text-center text-[9px] text-white/40">no lender licence on record</p>
    </div>
  );
}

function XBlock({
  id,
  label,
  active,
  className,
  children,
}: {
  id: HotspotId;
  label?: string;
  active: HotspotId | null;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      data-hotspot={id}
      className={cn(
        "overflow-hidden rounded-xl border border-dashed px-2.5 py-2 transition-[border-color,background-color] duration-200 ease-out-strong",
        active === id ? "border-signal/80 bg-signal/[0.07]" : "border-signal/25",
        className,
      )}
    >
      {label && <p className="mb-1 text-[9px] tracking-[0.18em] text-signal/70">{label}</p>}
      {children}
    </div>
  );
}

function Row({ k, v, flag, danger }: { k: string; v: string; flag?: boolean; danger?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-2">
      <span className="truncate text-white/60">{k}</span>
      <span className={cn("shrink-0", danger ? "font-semibold text-[#ff6b52]" : flag ? "text-[#f59a85]" : "text-white/90")}>{v}</span>
    </div>
  );
}
