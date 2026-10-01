import type { PointerEvent as ReactPointerEvent } from "react";
import { motion, useMotionTemplate, useReducedMotion, useSpring, useTransform } from "framer-motion";

const MAX_TILT = 14;
// Critically damped: follows the cursor like a solid object, no wobble.
const TILT_SPRING = { stiffness: 170, damping: 26, mass: 1 };

// Decorative mouse-tracking tilt. Bind the handlers to a larger area (the whole card)
// so the medal turns toward the cursor wherever it is on the card.
export function useTilt() {
  const reduceMotion = useReducedMotion();
  const rotateX = useSpring(0, TILT_SPRING);
  const rotateY = useSpring(0, TILT_SPRING);
  const transform = useMotionTemplate`perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  const glareX = useTransform(rotateY, [-MAX_TILT, MAX_TILT], [15, 85]);
  const glareY = useTransform(rotateX, [-MAX_TILT, MAX_TILT], [85, 15]);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.42), transparent 58%)`;

  const onPointerMove = (e: ReactPointerEvent<HTMLElement>) => {
    if (reduceMotion || e.pointerType !== "mouse") return;
    const box = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - box.left) / box.width - 0.5;
    const ny = (e.clientY - box.top) / box.height - 0.5;
    rotateY.set(nx * 2 * MAX_TILT);
    rotateX.set(-ny * 2 * MAX_TILT);
  };
  const onPointerLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return { bind: { onPointerMove, onPointerLeave }, transform, glare };
}

const leaves = (side: -1 | 1) =>
  Array.from({ length: 8 }, (_, i) => {
    const t = i / 7;
    const deg = side === -1 ? 102 + t * 108 : 78 - t * 108;
    const rad = (deg * Math.PI) / 180;
    const outward = i % 2 === 0;
    const r = outward ? 66 : 58;
    const along = side === -1 ? deg + 90 : deg - 90;
    return {
      cx: 100 + r * Math.cos(rad),
      cy: 100 + r * Math.sin(rad),
      rotate: along + (outward ? -28 : 28) * side * -1,
    };
  });

export function AwardMedal({ transform, glare }: Pick<ReturnType<typeof useTilt>, "transform" | "glare">) {
  return (
    <motion.div
      style={{ transform }}
      className="relative mx-auto h-40 w-40 drop-shadow-[0_18px_24px_rgba(21,45,84,0.28)] md:h-48 md:w-48"
    >
      <div className="sheen h-full w-full rounded-full">
        <svg viewBox="0 0 200 200" className="h-full w-full" role="img" aria-label="CISE Best Paper 2026 medal">
          <defs>
            <linearGradient id="medal-gold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f8dd9c" />
              <stop offset="45%" stopColor="#dca23a" />
              <stop offset="70%" stopColor="#b07a1c" />
              <stop offset="100%" stopColor="#f2d184" />
            </linearGradient>
            <radialGradient id="medal-navy" cx="50%" cy="35%" r="70%">
              <stop offset="0%" stopColor="#24447a" />
              <stop offset="100%" stopColor="#11203d" />
            </radialGradient>
          </defs>
          <circle cx="100" cy="100" r="97" fill="url(#medal-gold)" />
          <circle cx="100" cy="100" r="89" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
          <circle cx="100" cy="100" r="82" fill="url(#medal-navy)" />
          <circle cx="100" cy="100" r="76" fill="none" stroke="#dca23a" strokeOpacity="0.45" strokeWidth="0.8" />
          {[...leaves(-1), ...leaves(1)].map((leaf, idx) => (
            <ellipse
              key={idx}
              cx={leaf.cx}
              cy={leaf.cy}
              rx="7"
              ry="2.9"
              fill="url(#medal-gold)"
              transform={`rotate(${leaf.rotate} ${leaf.cx} ${leaf.cy})`}
            />
          ))}
          <text x="100" y="80" textAnchor="middle" fill="#f2d184" fontSize="10" letterSpacing="4" fontFamily="'JetBrains Mono Variable', monospace">
            CISE
          </text>
          <text x="100" y="107" textAnchor="middle" fill="#ffffff" fontSize="20" fontWeight="600" fontFamily="'Fraunces Variable', serif">
            Best Paper
          </text>
          <text x="100" y="128" textAnchor="middle" fill="#f2d184" fontSize="11" letterSpacing="2" fontFamily="'JetBrains Mono Variable', monospace">
            2026
          </text>
        </svg>
      </div>
      <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-full mix-blend-soft-light" style={{ background: glare }} />
    </motion.div>
  );
}
