"use client";

import { motion } from "framer-motion";
import { Reveal, SectionHeading } from "./Reveal";

const STEPS = [
  {
    num: "I",
    title: "Оберіть композицію",
    description:
      "З каталогу колекцій або довірте вибір флористу — розкажіть про привід, і ми запропонуємо ідеальний варіант.",
  },
  {
    num: "II",
    title: "Підтвердьте замовлення",
    description:
      "Менеджер узгодить деталі, побажання до листівки та зручний час. Оплата — карткою, Apple Pay або при отриманні.",
  },
  {
    num: "III",
    title: "Флорист створює букет",
    description:
      "Композиція збирається вручну з найсвіжіших квітів ранкової поставки. Перед відправленням ви отримаєте фото.",
  },
  {
    num: "IV",
    title: "Доставка момента щастя",
    description:
      "Кур'єр у білих рукавичках доставить букет у фірмовому пакуванні точно в обраний час. По місту — за 60 хвилин.",
  },
];

const PERKS = [
  "Доставка по місту за 60 хвилин",
  "Фото букета перед відправленням",
  "Анонімна доставка-сюрприз",
  "Листівка ручної каліграфії — у подарунок",
];

export default function Delivery() {
  return (
    <section id="delivery" className="relative overflow-hidden bg-ivory py-28 lg:py-40">
      <div className="pointer-events-none absolute -left-44 top-24 size-[26rem] rounded-full bg-champagne/70 blur-[100px]" />

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          overline="Доставка та замовлення"
          title={
            <>
              Чотири кроки
              <br />
              <em className="text-rose-deep">до незабутніх емоцій</em>
            </>
          }
          description="Ми зробили процес замовлення таким же бездоганним, як і наші букети, — швидко, делікатно та з турботою про кожну деталь."
        />

        <div className="relative mt-20">
          {/* Золота лінія процесу */}
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            className="gold-divider absolute left-0 right-0 top-9 hidden origin-left lg:block"
          />

          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 56 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.95, delay: i * 0.16, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex flex-col items-start gap-5"
              >
                <span className="glass gold-ring font-serif-display relative z-10 flex size-[4.5rem] items-center justify-center rounded-full text-2xl text-gold-deep transition-all duration-700 group-hover:bg-gold group-hover:text-ivory group-hover:shadow-[0_16px_40px_-12px_rgba(194,154,78,0.6)]">
                  {step.num}
                </span>
                <h3 className="font-serif-display text-2xl text-ink">{step.title}</h3>
                <p className="text-[13.5px] font-light leading-relaxed text-ink-soft">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <Reveal delay={0.15} className="mt-20">
          <div className="glass gold-ring flex flex-wrap items-center justify-center gap-x-10 gap-y-4 rounded-[1.75rem] px-8 py-7 lg:px-12">
            {PERKS.map((perk) => (
              <span key={perk} className="flex items-center gap-3 text-[12.5px] font-light tracking-wide text-ink-soft">
                <span className="size-1.5 rounded-full bg-gold shadow-[0_0_8px_rgba(194,154,78,0.8)]" />
                {perk}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
