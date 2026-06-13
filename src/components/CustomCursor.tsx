"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/** Люксовий курсор: золота цятка + м'яке сяйво, що слідує за мишею. */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const glowX = useSpring(x, { stiffness: 90, damping: 18, mass: 0.6 });
  const glowY = useSpring(y, { stiffness: 90, damping: 18, mass: 0.6 });
  const dotX = useSpring(x, { stiffness: 700, damping: 38 });
  const dotY = useSpring(y, { stiffness: 700, damping: 38 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    if (!fine.matches) return;
    setEnabled(true);

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const interactive = (e.target as HTMLElement).closest(
        "a, button, [data-cursor='hover']"
      );
      setHovering(!!interactive);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-150 hidden md:block"
        style={{ x: glowX, y: glowY }}
      >
        <motion.div
          animate={{ scale: hovering ? 2.1 : 1, opacity: hovering ? 0.9 : 0.55 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="-ml-7 -mt-7 size-14 rounded-full border border-gold/45"
          style={{
            background:
              "radial-gradient(circle, rgba(220,192,138,0.16) 0%, rgba(217,139,164,0.10) 45%, transparent 70%)",
          }}
        />
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-150 hidden md:block"
        style={{ x: dotX, y: dotY }}
      >
        <div className="-ml-[3px] -mt-[3px] size-1.5 rounded-full bg-gold shadow-[0_0_10px_rgba(194,154,78,0.8)]" />
      </motion.div>
    </>
  );
}
