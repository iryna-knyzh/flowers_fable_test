"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "./Reveal";

const STATS = [
  { value: "12 000+", label: "створених букетів" },
  { value: "9 років", label: "майстерності" },
  { value: "98%", label: "клієнтів повертаються" },
];

export default function About() {
  const section = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start end", "end start"],
  });
  const imgMainY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const imgAccentY = useTransform(scrollYProgress, [0, 1], ["14%", "-14%"]);

  return (
    <section
      ref={section}
      id="about"
      className="relative overflow-hidden bg-warm-white py-28 lg:py-40"
    >
      <div className="pointer-events-none absolute -right-44 top-16 size-[28rem] rounded-full bg-blush/50 blur-[100px]" />
      <div className="pointer-events-none absolute -left-44 bottom-10 size-[26rem] rounded-full bg-lavender/55 blur-[100px]" />

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 md:px-10 lg:grid-cols-2 lg:gap-24">
        {/* Парні зображення з паралаксом */}
        <div className="relative mx-auto aspect-[4/5] w-full max-w-md lg:max-w-none">
          <motion.div
            style={{ y: imgMainY }}
            className="absolute inset-x-6 top-0 bottom-12 overflow-hidden rounded-t-full rounded-b-[2rem] shadow-[0_40px_80px_-30px_rgba(185,100,127,0.35)]"
          >
            <Image
              src="/images/bouquet-lush.jpg"
              alt="Авторський букет із піоноподібних троянд Flowers AKKERMAN"
              fill
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover transition-transform duration-[2.5s] ease-out hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-rose-deep/15 to-transparent" />
          </motion.div>

          <motion.div
            style={{ y: imgAccentY }}
            className="gold-ring glass absolute -bottom-2 -left-2 w-2/5 overflow-hidden rounded-[1.5rem] p-2 shadow-xl sm:-left-6"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-[1.1rem]">
              <Image
                src="/images/iris-minimal.jpg"
                alt="Мінімалістична квіткова композиція — пелюстковий ірис"
                fill
                sizes="20vw"
                className="object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
            className="absolute -right-4 top-8 hidden size-28 sm:block"
            aria-hidden
          >
            <svg viewBox="0 0 100 100" className="size-full">
              <defs>
                <path id="circ" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
              </defs>
              <text className="fill-gold-deep text-[9.5px] uppercase tracking-[0.32em]">
                <textPath href="#circ">
                  flowers akkerman · est. 2017 ·
                </textPath>
              </text>
            </svg>
          </motion.div>
        </div>

        {/* Філософія */}
        <div className="flex flex-col items-start gap-7">
          <Reveal as="span" className="flex items-center gap-4">
            <span className="gold-divider w-10" />
            <span className="text-[11px] font-medium uppercase tracking-[0.45em] text-gold-deep">
              Філософія бренду
            </span>
          </Reveal>

          <Reveal as="h2" delay={0.1} className="font-serif-display text-balance text-4xl leading-[1.1] sm:text-5xl">
            Мистецтво, народжене
            <br />
            <em className="text-rose-deep">у кожній пелюстці</em>
          </Reveal>

          <Reveal as="p" delay={0.18} className="text-pretty text-[15px] font-light leading-relaxed text-ink-soft">
            Flowers AKKERMAN — це не просто квітковий бутік. Це ательє, де
            флористика стає високим мистецтвом. Ми відбираємо найкращі квіти з
            плантацій Еквадору, Голландії та Кенії, щоб кожна композиція була
            бездоганною — від першого погляду до останнього подиху аромату.
          </Reveal>

          <Reveal as="p" delay={0.26} className="text-pretty text-[15px] font-light leading-relaxed text-ink-soft">
            Наші флористи навчалися в найкращих школах Європи та створюють
            букети, як кутюр&apos;є створює сукні: з увагою до силуету, фактури й
            настрою. Кожна робота — єдина у своєму екземплярі.
          </Reveal>

          <Reveal delay={0.32} className="border-l border-gold/60 pl-6">
            <p className="font-serif-display text-xl italic leading-snug text-ink">
              «Квіти — це найніжніший спосіб сказати те,
              <br className="hidden sm:block" />
              для чого не існує слів»
            </p>
            <p className="mt-3 text-[11px] uppercase tracking-[0.35em] text-ink-muted">
              Засновниця ательє
            </p>
          </Reveal>

          <Reveal delay={0.38} className="mt-4 grid w-full grid-cols-3 gap-6">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col gap-1.5">
                <span className="font-serif-display text-3xl text-gold-deep sm:text-4xl">
                  {s.value}
                </span>
                <span className="text-[10.5px] uppercase tracking-[0.18em] text-ink-muted">
                  {s.label}
                </span>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
