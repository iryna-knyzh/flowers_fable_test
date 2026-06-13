"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHeading } from "./Reveal";

const FEATURES = [
  {
    title: "Преміальна якість",
    description:
      "Працюємо лише з квітами найвищого ґатунку від перевірених плантацій Еквадору, Голландії та Кенії.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="size-8">
        <path d="M16 3l3.6 7.6L28 11.8l-6 6 1.4 8.4L16 22.4l-7.4 3.8L10 17.8l-6-6 8.4-1.2L16 3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Свіжі квіти щодня",
    description:
      "Нові поставки шість разів на тиждень. Гарантуємо свіжість кожної квітки до 7 днів — або замінимо букет.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="size-8">
        <path d="M16 28V14m0 0c-5 0-9-4-9-9 5 0 9 4 9 9zm0 0c5 0 9-4 9-9-5 0-9 4-9 9z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 21c2 2.5 4.5 4 7 4s5-1.5 7-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Ексклюзивний дизайн",
    description:
      "Жодних шаблонів: кожен букет флорист створює як унікальний витвір — під ваш привід, стиль і настрій.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="size-8">
        <circle cx="16" cy="16" r="4.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M16 4a6 6 0 016 6 6 6 0 016 6 6 6 0 01-6 6 6 6 0 01-6 6 6 6 0 01-6-6 6 6 0 01-6-6 6 6 0 016-6 6 6 0 016-6z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Швидка доставка",
    description:
      "Доставимо по місту за 60 хвилин у фірмовому пакуванні. Перед відправленням надішлемо фото готового букета.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="size-8">
        <path d="M3 16h14M9 8h14M5 24h14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M23 10l6 6-6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function WhyUs() {
  const section = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section ref={section} className="relative overflow-hidden py-28 lg:py-40">
      {/* Паралаксове квіткове тло */}
      <motion.div style={{ y: bgY }} className="absolute -inset-y-16 inset-x-0 -z-10">
        <Image
          src="/images/tulip-pink.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          aria-hidden
        />
        <div className="absolute inset-0 bg-ivory/88 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-warm-white via-transparent to-ivory" />
      </motion.div>

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          overline="Чому Flowers Akkerman"
          title={
            <>
              Досконалість
              <br />
              <em className="text-rose-deep">у кожній дрібниці</em>
            </>
          }
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <motion.article
              key={f.title}
              initial={{ opacity: 0, y: 56 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.95, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -10 }}
              className="glass gold-ring group flex flex-col gap-5 rounded-[1.5rem] p-8 transition-shadow duration-700 hover:shadow-[0_30px_60px_-22px_rgba(185,100,127,0.35)]"
            >
              <span className="flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-champagne to-blush text-gold-deep shadow-inner transition-transform duration-700 group-hover:rotate-6 group-hover:scale-110">
                {f.icon}
              </span>
              <h3 className="font-serif-display text-2xl text-ink">{f.title}</h3>
              <p className="text-[13.5px] font-light leading-relaxed text-ink-soft">
                {f.description}
              </p>
              <span className="gold-divider mt-auto w-full opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
