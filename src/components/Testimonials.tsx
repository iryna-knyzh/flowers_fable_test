"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./Reveal";

const TESTIMONIALS = [
  {
    name: "Олена Вербицька",
    role: "Наречена, весілля у Затоці",
    text: "Букет нареченої перевершив усі мої мрії. Гості досі згадують оформлення церемонії — це було схоже на сцену з кіно. Дякую за бездоганність у кожній пелюстці!",
  },
  {
    name: "Андрій Мельник",
    role: "Постійний клієнт",
    text: "Замовляю букети дружині вже три роки. Жодного разу не повторилися — щоразу новий витвір мистецтва. Це єдиний бутік, якому я довіряю найважливіші моменти.",
  },
  {
    name: "Марія Коваленко",
    role: "Власниця ресторану",
    text: "Flowers AKKERMAN оформлює наш ресторан щотижня. Рівень смаку та стабільність якості — бездоганні. Гості постійно запитують, хто наш флорист.",
  },
];

function Stars() {
  return (
    <div className="flex gap-1 text-gold" aria-label="Оцінка 5 із 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="size-4">
          <path d="M10 1.5l2.47 5.2 5.53.8-4 4.06.94 5.7L10 14.6l-4.94 2.66.94-5.7-4-4.06 5.53-.8L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative overflow-hidden bg-warm-white py-28 lg:py-40">
      <div className="pointer-events-none absolute -right-40 bottom-0 size-[30rem] rounded-full bg-lavender/45 blur-[110px]" />
      <span
        aria-hidden
        className="font-serif-display pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 select-none text-[26rem] leading-none text-blush/40"
      >
        “
      </span>

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          overline="Слова наших клієнтів"
          title={
            <>
              Емоції, які
              <br />
              <em className="text-rose-deep">неможливо забути</em>
            </>
          }
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-3 lg:gap-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 64, rotate: i === 1 ? 0 : i === 0 ? -1.5 : 1.5 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.05, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              className={`glass gold-ring flex flex-col gap-6 rounded-[1.75rem] p-9 transition-shadow duration-700 hover:shadow-[0_34px_70px_-25px_rgba(185,100,127,0.4)] ${
                i === 1 ? "lg:-mt-6" : ""
              }`}
            >
              <Stars />
              <blockquote className="font-serif-display text-pretty text-[1.2rem] italic leading-relaxed text-ink-soft">
                «{t.text}»
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-4">
                <span className="flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-rose to-gold-light font-serif-display text-lg text-ivory">
                  {t.name[0]}
                </span>
                <span>
                  <span className="block text-[14px] font-medium text-ink">{t.name}</span>
                  <span className="block text-[11px] uppercase tracking-[0.22em] text-ink-muted">
                    {t.role}
                  </span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
