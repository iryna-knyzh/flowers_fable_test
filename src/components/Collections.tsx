"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal, SectionHeading } from "./Reveal";

const COLLECTIONS = [
  {
    id: "wedding",
    num: "01",
    title: "Весільні букети",
    description:
      "Букет нареченої, бутоньєрки та флористичне оформлення церемонії — створюємо весілля, про яке говоритимуть роками.",
    price: "від 3 500 ₴",
    image: "/images/wedding-aisle.jpg",
    place: "lg:col-start-1 lg:row-start-1 lg:row-span-2",
  },
  {
    id: "premium",
    num: "02",
    title: "Преміальні букети",
    description:
      "Авторські композиції з півоній, троянд Девіда Остіна та екзотичних квітів — для тих, хто звик до досконалості.",
    price: "від 2 400 ₴",
    image: "/images/roses-vase.jpg",
    place: "lg:col-start-2 lg:row-start-1",
  },
  {
    id: "boxes",
    num: "03",
    title: "Ексклюзивні бокси",
    description:
      "Квіткові бокси з оксамитовим оздобленням і золотим тисненням. Розкіш, яку можна тримати в руках.",
    price: "від 2 900 ₴",
    image: "/images/roses-red-dark.jpg",
    place: "lg:col-start-1 lg:row-start-3",
  },
  {
    id: "seasonal",
    num: "04",
    title: "Сезонні колекції",
    description:
      "Перші тюльпани весни, літні півонії, осінні жоржини — краса кожної пори року в обмежених серіях.",
    price: "від 1 800 ₴",
    image: "/images/tulips-vase.jpg",
    place: "lg:col-start-2 lg:row-start-2 lg:row-span-2",
  },
];

function CollectionCard({
  item,
  index,
}: {
  item: (typeof COLLECTIONS)[number];
  index: number;
}) {
  const [active, setActive] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 1,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className={`group relative aspect-[3/4] overflow-hidden rounded-[1.75rem] lg:aspect-auto ${item.place}`}
      data-cursor="hover"
    >
      <Image
        src={item.image}
        alt={`${item.title} — Flowers`}
        fill
        sizes="(max-width: 1024px) 92vw, 45vw"
        className="object-cover transition-transform duration-[1.8s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-108"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/15 to-transparent transition-opacity duration-700" />

      {/* Золотий відблиск при наведенні */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(115deg, transparent 30%, rgba(244,227,187,0.22) 48%, transparent 62%)",
        }}
      />

      <span className="font-serif-display absolute right-6 top-5 text-5xl text-ivory/35 transition-colors duration-500 group-hover:text-gold-light/70">
        {item.num}
      </span>

      <div className="absolute inset-x-0 bottom-0 p-7 lg:p-8">
        <motion.div
          animate={{ y: active ? 0 : 14 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-2 text-[10.5px] font-medium uppercase tracking-[0.32em] text-gold-light">
            {item.price}
          </p>
          <h3 className="font-serif-display text-3xl text-ivory lg:text-4xl">
            {item.title}
          </h3>
          <motion.p
            animate={{ opacity: active ? 1 : 0, y: active ? 0 : 8 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="mt-3 hidden max-w-md text-[13.5px] font-light leading-relaxed text-ivory/85 lg:block"
          >
            {item.description}
          </motion.p>
          <p className="mt-3 text-[13px] font-light leading-relaxed text-ivory/85 lg:hidden">
            {item.description}
          </p>
        </motion.div>

        <a
          href="#contact"
          className="mt-5 inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] text-ivory transition-colors hover:text-gold-light"
        >
          Замовити
          <span className="inline-block h-px w-8 bg-gold-light transition-all duration-500 group-hover:w-14" />
        </a>
      </div>
    </motion.article>
  );
}

export default function Collections() {
  return (
    <section id="collections" className="relative bg-ivory py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          overline="Авторські колекції"
          title={
            <>
              Колекції, створені
              <br />
              <em className="text-rose-deep">з любов&apos;ю до деталей</em>
            </>
          }
          description="Чотири напрями нашого ательє — від весільної флористики до лімітованих сезонних серій. Кожна композиція збирається вручну в день доставки."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-2 lg:auto-rows-[28rem] lg:gap-7">
          {COLLECTIONS.map((item, i) => (
            <CollectionCard key={item.id} item={item} index={i} />
          ))}
        </div>

        <Reveal delay={0.2} className="mt-14 text-center">
          <p className="text-[13px] font-light text-ink-muted">
            Не знайшли те, що шукали?{" "}
            <a
              href="#contact"
              className="border-b border-gold/60 pb-0.5 font-medium text-gold-deep transition-colors hover:border-gold-deep"
            >
              Створимо букет за вашою мрією
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
