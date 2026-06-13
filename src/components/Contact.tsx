"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal, SectionHeading } from "./Reveal";

const SOCIALS = [
  {
    name: "Instagram",
    href: "https://instagram.com/flowers",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="size-5">
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="5.5"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://facebook.com/flowers",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="size-5">
        <path
          d="M14 8.5V7a1.5 1.5 0 011.5-1.5H17V2.8h-2.3A4.2 4.2 0 0010.5 7v1.5H8v3h2.5V21h3.5v-9.5H16.6l.6-3H14z"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: "Telegram",
    href: "https://t.me/flowers",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="size-5">
        <path
          d="M21 4L3 11.2l5.3 2L19 6.5 10 14.7l.6 4.8 2.9-3.3 4.4 3.2L21 4z"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

const inputCls =
  "w-full rounded-xl border border-champagne-deep/70 bg-ivory/80 px-5 py-3.5 text-[14px] font-light text-ink placeholder:text-ink-muted/70 outline-none transition-all duration-500 focus:border-gold focus:bg-ivory focus:shadow-[0_0_0_4px_rgba(194,154,78,0.12)]";

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-warm-white py-28 lg:py-40"
    >
      <div className="pointer-events-none absolute -right-40 top-20 size-[28rem] rounded-full bg-blush/55 blur-[110px]" />

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          overline="Зв'яжіться з нами"
          title={
            <>
              Розкажіть про свято —
              <br />
              <em className="text-rose-deep">решту зробимо ми</em>
            </>
          }
          description="Залиште заявку, і наш флорист зв'яжеться з вами протягом 15 хвилин у робочий час."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-5 lg:gap-14">
          {/* Форма */}
          <Reveal className="lg:col-span-3">
            <form
              className="glass gold-ring flex flex-col gap-5 rounded-[2rem] p-8 lg:p-11"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center gap-5 py-16 text-center"
                >
                  <span className="flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-champagne to-blush text-4xl">
                    🌸
                  </span>
                  <h3 className="font-serif-display text-3xl">
                    Дякуємо за довіру!
                  </h3>
                  <p className="max-w-sm text-[14px] font-light leading-relaxed text-ink-soft">
                    Ваша заявка прийнята. Наш флорист зв&apos;яжеться з вами
                    найближчим часом, щоб обговорити деталі.
                  </p>
                </motion.div>
              ) : (
                <>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="flex flex-col gap-2">
                      <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-ink-muted">
                        Ваше ім&apos;я
                      </span>
                      <input
                        required
                        name="name"
                        placeholder="Анна"
                        className={inputCls}
                      />
                    </label>
                    <label className="flex flex-col gap-2">
                      <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-ink-muted">
                        Телефон
                      </span>
                      <input
                        required
                        name="phone"
                        type="tel"
                        placeholder="+380 __ ___ __ __"
                        className={inputCls}
                      />
                    </label>
                  </div>
                  <label className="flex flex-col gap-2">
                    <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-ink-muted">
                      Привід
                    </span>
                    <select
                      name="occasion"
                      className={inputCls}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Оберіть привід
                      </option>
                      <option>Весілля</option>
                      <option>День народження</option>
                      <option>Освідчення</option>
                      <option>Корпоративна подія</option>
                      <option>Без приводу — просто кохаю</option>
                    </select>
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-ink-muted">
                      Побажання
                    </span>
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="Розкажіть про ваші мрії — улюблені квіти, кольори, бюджет…"
                      className={`${inputCls} resize-none`}
                    />
                  </label>
                  <button
                    type="submit"
                    className="group relative mt-2 overflow-hidden rounded-full bg-ink px-10 py-4 text-[12px] font-medium uppercase tracking-[0.22em] text-ivory transition-shadow duration-500 hover:shadow-[0_18px_45px_-12px_rgba(34,28,24,0.5)]"
                  >
                    <span className="relative z-10 transition-colors duration-500 group-hover:text-ink">
                      Надіслати заявку
                    </span>
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-gold-light via-champagne to-gold-light transition-transform duration-700 ease-out group-hover:translate-x-0" />
                  </button>
                  <p className="text-center text-[11px] font-light text-ink-muted">
                    Натискаючи кнопку, ви погоджуєтеся з політикою
                    конфіденційності
                  </p>
                </>
              )}
            </form>
          </Reveal>

          {/* Контакти + мапа */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            <Reveal delay={0.1} className="glass gold-ring rounded-[2rem] p-8">
              <h3 className="font-serif-display mb-6 text-2xl">
                Квітковий бутік
              </h3>
              <ul className="flex flex-col gap-4 text-[14px] font-light text-ink-soft">
                <li className="flex gap-4">
                  <span className="text-gold-deep">📍</span>
                  вул. Михайлівська, 35,
                  <br />
                  Білгород-Дністровський (Аккерман)
                </li>
                <li className="flex gap-4">
                  <span className="text-gold-deep">🕐</span>
                  Щодня з 9:00 до 20:00
                </li>
                <li className="flex gap-4">
                  <span className="text-gold-deep">✆</span>
                  <a
                    href="tel:+380680000000"
                    className="transition-colors hover:text-gold-deep"
                  >
                    +380 (68) 000 00 00
                  </a>
                </li>
                <li className="flex gap-4">
                  <span className="text-gold-deep">✉</span>
                  <a
                    href="mailto:hello@flowers.ua"
                    className="transition-colors hover:text-gold-deep"
                  >
                    hello@flowers.ua
                  </a>
                </li>
              </ul>

              <div className="gold-divider my-6" />

              <div className="flex items-center gap-4">
                {SOCIALS.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="glass flex size-11 items-center justify-center rounded-full text-ink-soft transition-all duration-500 hover:-translate-y-1 hover:text-gold-deep hover:shadow-[0_12px_28px_-10px_rgba(194,154,78,0.55)]"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </Reveal>

            <Reveal
              delay={0.2}
              className="gold-ring relative min-h-72 flex-1 overflow-hidden rounded-[2rem]"
            >
              <iframe
                title="Мапа: квітковий бутік Flowers, Білгород-Дністровський"
                src="https://www.google.com/maps?q=%D0%91%D1%96%D0%BB%D0%B3%D0%BE%D1%80%D0%BE%D0%B4-%D0%94%D0%BD%D1%96%D1%81%D1%82%D1%80%D0%BE%D0%B2%D1%81%D1%8C%D0%BA%D0%B8%D0%B9,%20%D0%B2%D1%83%D0%BB%D0%B8%D1%86%D1%8F%20%D0%9C%D0%B8%D1%85%D0%B0%D0%B9%D0%BB%D1%96%D0%B2%D1%81%D1%8C%D0%BA%D0%B0&z=15&output=embed"
                className="absolute inset-0 size-full border-0 grayscale-[0.35] transition-all duration-700 hover:grayscale-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
