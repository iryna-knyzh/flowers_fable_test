"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion, useScroll, useTransform } from "framer-motion";

const PetalCanvas = dynamic(() => import("./three/PetalCanvas"), {
  ssr: false,
});

const TITLE_LINES = ["Квіти, що говорять", "мовою почуттів"];

export default function Hero() {
  const section = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "38%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const canvasY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 2.45 });
      tl.fromTo(
        "[data-hero-line]",
        { yPercent: 115, rotate: 2.5 },
        {
          yPercent: 0,
          rotate: 0,
          duration: 1.5,
          stagger: 0.16,
          ease: "power4.out",
        }
      )
        .fromTo(
          "[data-hero-fade]",
          { opacity: 0, y: 26, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.2,
            stagger: 0.14,
            ease: "power3.out",
          },
          "-=0.9"
        )
        .fromTo(
          "[data-hero-scroll]",
          { opacity: 0 },
          { opacity: 1, duration: 1.2, ease: "power2.out" },
          "-=0.4"
        );
    },
    { scope: section }
  );

  return (
    <section
      ref={section}
      id="hero"
      className="relative flex min-h-svh items-center justify-center overflow-hidden"
    >
      {/* Анімований квітковий градієнт у дусі логотипа */}
      <div className="absolute inset-0 -z-20">
        <div
          className="absolute inset-0 animate-pulse-soft"
          style={{
            background:
              "radial-gradient(65% 80% at 22% 28%, rgba(247,221,226,0.95), transparent 65%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 75% at 80% 22%, rgba(231,220,240,0.8), transparent 60%), radial-gradient(70% 80% at 75% 85%, rgba(243,230,215,0.95), transparent 65%), linear-gradient(160deg, #fffaf4 0%, #fdeee8 45%, #fbe3e0 100%)",
          }}
        />
        <motion.div
          className="absolute -left-40 top-1/4 size-[34rem] rounded-full bg-blush-deep/35 blur-[110px]"
          animate={{ x: [0, 50, 0], y: [0, -40, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-32 bottom-10 size-[30rem] rounded-full bg-gold-light/25 blur-[110px]"
          animate={{ x: [0, -45, 0], y: [0, 35, 0] }}
          transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* 3D-пелюстки */}
      <motion.div style={{ y: canvasY }} className="absolute inset-0 -z-10">
        <PetalCanvas className="size-full" />
      </motion.div>

      <div className="hero-vignette pointer-events-none absolute inset-0 -z-10" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative mx-auto flex max-w-5xl flex-col items-center px-6 pt-20 text-center"
      >
        <div data-hero-fade className="mb-8 flex items-center gap-4 opacity-0">
          <span className="gold-divider w-12" />
          <span className="text-[11px] font-medium uppercase tracking-[0.5em] text-gold-deep">
            Квіткове ательє · Аккерман
          </span>
          <span className="gold-divider w-12" />
        </div>

        <h1 className="font-serif-display text-balance text-[13.5vw] leading-[1.02] text-ink sm:text-7xl lg:text-[5.6rem]">
          {TITLE_LINES.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-1">
              <span data-hero-line className="block will-change-transform">
                {i === 1 ? (
                  <em className="text-gold-gradient text-shimmer not-italic">
                    {line}
                  </em>
                ) : (
                  line
                )}
              </span>
            </span>
          ))}
        </h1>

        <p
          data-hero-fade
          className="mt-8 max-w-xl text-pretty text-[15px] font-light leading-relaxed text-ink-soft opacity-0 sm:text-base"
        >
          Кожен букет — це історія, розказана пелюстками. Ми створюємо квіткові
          композиції, які зупиняють час і залишаються в серці назавжди.
        </p>

        <div
          data-hero-fade
          className="mt-11 flex flex-col items-center gap-4 opacity-0 sm:flex-row"
        >
          <a
            href="#collections"
            className="group relative overflow-hidden rounded-full bg-ink px-10 py-4 text-[12px] font-medium uppercase tracking-[0.22em] text-ivory transition-shadow duration-500 hover:shadow-[0_18px_45px_-12px_rgba(34,28,24,0.5)]"
          >
            <span className="relative z-10 transition-colors duration-500 group-hover:text-ink">
              Обрати букет
            </span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-gold-light via-champagne to-gold-light transition-transform duration-700 ease-out group-hover:translate-x-0" />
          </a>
          <a
            href="#about"
            className="glass gold-ring rounded-full px-10 py-4 text-[12px] font-medium uppercase tracking-[0.22em] text-ink-soft transition-all duration-500 hover:-translate-y-0.5 hover:text-gold-deep"
          >
            Наша історія
          </a>
        </div>
      </motion.div>

      <div
        data-hero-scroll
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 opacity-0"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] text-ink-muted">
          Гортайте
        </span>
        <motion.span
          animate={{ y: [0, 10, 0], opacity: [0.9, 0.3, 0.9] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="h-12 w-px bg-gradient-to-b from-gold to-transparent"
        />
      </div>
    </section>
  );
}
