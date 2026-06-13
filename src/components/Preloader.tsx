"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    const t = setTimeout(() => {
      setDone(true);
      document.documentElement.style.overflow = "";
    }, 2300);
    return () => {
      clearTimeout(t);
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-200 flex flex-col items-center justify-center bg-ivory"
          exit={{ opacity: 0, scale: 1.04, filter: "blur(8px)" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.82, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute -inset-10 rounded-full bg-blush/60 blur-3xl animate-pulse-soft" />
            <span className="relative flex flex-col items-center text-center leading-none">
              <span className="font-serif-display text-5xl tracking-wide text-ink">
                Flowers
              </span>
              <span className="mt-2 text-[12px] uppercase tracking-[0.42em] text-ink-muted">
                Akkerman
              </span>
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            animate={{ opacity: 1, letterSpacing: "0.5em" }}
            transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
            className="mt-8 text-[11px] uppercase text-ink-muted"
          >
            Квіткове ательє
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="gold-divider mt-6 w-44 origin-center"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
