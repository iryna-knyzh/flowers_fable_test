"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const LINKS = [
  { href: "#about", label: "Про нас" },
  { href: "#collections", label: "Колекції" },
  { href: "#gallery", label: "Галерея" },
  { href: "#delivery", label: "Доставка" },
  { href: "#contact", label: "Контакти" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2.45, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-100 border border-transparent transition-all duration-700 ${
        scrolled ? "glass shadow-[0_10px_40px_-18px_rgba(120,86,60,0.25)]" : ""
      }`}
    >
      <nav
        aria-label="Головна навігація"
        className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-10"
      >
        <a href="#hero" className="group flex items-center gap-3">
          <span className="flex flex-col leading-none">
            <span className="font-serif-display text-xl tracking-wide">
              Flowers
            </span>
            <span className="text-[10px] uppercase tracking-[0.42em] text-ink-muted">
              Akkerman
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative text-[12px] font-medium uppercase tracking-[0.18em] text-ink-soft transition-colors hover:text-ink"
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="gold-ring hidden rounded-full px-6 py-2.5 text-[12px] font-medium uppercase tracking-[0.18em] text-gold-deep transition-all duration-500 hover:bg-gold hover:text-ivory hover:shadow-[0_10px_30px_-10px_rgba(194,154,78,0.7)] sm:inline-block"
          >
            Замовити букет
          </a>
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? "Закрити меню" : "Відкрити меню"}
            aria-expanded={open}
            className="flex size-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          >
            <span
              className={`h-px w-6 bg-ink transition-all duration-500 ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
            />
            <span
              className={`h-px w-6 bg-ink transition-all duration-500 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="glass overflow-hidden lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-6">
              {LINKS.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ x: -24, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.08 * i, duration: 0.5 }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-2.5 font-serif-display text-2xl text-ink-soft transition-colors hover:text-rose-deep"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
