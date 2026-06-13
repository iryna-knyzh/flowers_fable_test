"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeading } from "./Reveal";

const PHOTOS = [
  {
    src: "/images/bouquet-blush.jpg",
    alt: "Ніжний букет у пастельних тонах із шовковою стрічкою",
    ratio: "aspect-[3/4]",
    h: 4 / 3,
  },
  {
    src: "/images/peonies-jug.jpg",
    alt: "Півонії та гортензії у вінтажному глечику",
    ratio: "aspect-[4/3]",
    h: 3 / 4,
  },
  {
    src: "/images/roses-vase.jpg",
    alt: "Кремові та рожеві троянди у скляній вазі",
    ratio: "aspect-[2/3]",
    h: 3 / 2,
  },
  {
    src: "/images/bouquet-kraft.jpg",
    alt: "Авторський букет у крафтовому пакуванні",
    ratio: "aspect-[3/4]",
    h: 4 / 3,
  },
  {
    src: "/images/tulip-pink.jpg",
    alt: "Рожевий тюльпан на пудровому тлі",
    ratio: "aspect-[16/10]",
    h: 10 / 16,
  },
  {
    src: "/images/bouquet-moody.jpg",
    alt: "Драматична композиція з анемонами та ранункулюсами",
    ratio: "aspect-[2/3]",
    h: 3 / 2,
  },
  {
    src: "/images/heart-hands.jpg",
    alt: "Квіткове серце — композиція на замовлення",
    ratio: "aspect-square",
    h: 1,
  },
  {
    src: "/images/wedding-aisle.jpg",
    alt: "Весільна церемонія, оформлена ательє Flowers",
    ratio: "aspect-[4/3]",
    h: 3 / 4,
  },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [columnCount, setColumnCount] = useState(3);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => setColumnCount(mq.matches ? 3 : 2);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Розкладаємо фото по колонках, додаючи кожне в найкоротшу — рівні колонки.
  const columns = useMemo(() => {
    const result: number[][] = Array.from({ length: columnCount }, () => []);
    const heights = new Array(columnCount).fill(0);
    PHOTOS.forEach((photo, i) => {
      const target = heights.indexOf(Math.min(...heights));
      result[target].push(i);
      heights[target] += photo.h;
    });
    return result;
  }, [columnCount]);

  const close = useCallback(() => setLightbox(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setLightbox((cur) =>
        cur === null ? null : (cur + dir + PHOTOS.length) % PHOTOS.length,
      ),
    [],
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, close, step]);

  return (
    <section id="gallery" className="relative bg-warm-white py-28 lg:py-40">
      <div className="pointer-events-none absolute -left-40 top-32 size-[26rem] rounded-full bg-blush/45 blur-[110px]" />

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          overline="Галерея робіт"
          title={
            <>
              Миттєвості, варті
              <br />
              <em className="text-rose-deep">вічності</em>
            </>
          }
          description="Кожна робота в нашій галереї — реальне замовлення, створене руками наших флористів. Торкніться, щоб роздивитися ближче."
        />

        <div className="mt-16 flex gap-5 lg:gap-6">
          {columns.map((indices, col) => (
            <div key={col} className="flex flex-1 flex-col gap-5 lg:gap-6">
              {indices.map((i) => {
                const photo = PHOTOS[i];
                return (
                  <motion.button
                    key={photo.src}
                    type="button"
                    onClick={() => setLightbox(i)}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      duration: 0.9,
                      delay: col * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`group relative block w-full overflow-hidden rounded-[1.25rem] ${photo.ratio}`}
                    aria-label={`Відкрити фото: ${photo.alt}`}
                    data-cursor="hover"
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 1024px) 46vw, 30vw"
                      className="object-cover transition-all duration-[1.6s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-107"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/45 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                    <span className="absolute bottom-4 left-4 right-4 translate-y-3 text-left text-[11.5px] font-light leading-snug text-ivory opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
                      {photo.alt}
                    </span>
                    <span className="glass absolute right-4 top-4 flex size-9 items-center justify-center rounded-full opacity-0 transition-all duration-500 group-hover:opacity-100">
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 14 14"
                        fill="none"
                        className="text-ink"
                      >
                        <path
                          d="M6 1v10M1 6h10"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          transform="translate(1 1)"
                        />
                      </svg>
                    </span>
                  </motion.button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Повноекранний лайтбокс */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="glass-dark fixed inset-0 z-160 flex items-center justify-center p-4 md:p-12"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Перегляд фотографії"
            data-lenis-prevent
          >
            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-h-full w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="gold-ring relative aspect-[4/3] w-full overflow-hidden rounded-[1.5rem] sm:aspect-[3/2]">
                <Image
                  src={PHOTOS[lightbox].src}
                  alt={PHOTOS[lightbox].alt}
                  fill
                  sizes="92vw"
                  className="object-contain"
                  style={{ background: "rgba(20,16,14,0.6)" }}
                />
              </div>
              <p className="mt-4 text-center text-[13px] font-light tracking-wide text-ivory/90">
                {PHOTOS[lightbox].alt}
              </p>
            </motion.div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              aria-label="Попереднє фото"
              className="glass absolute left-4 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full text-ink transition-transform hover:scale-110 md:left-8"
            >
              ←
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              aria-label="Наступне фото"
              className="glass absolute right-4 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full text-ink transition-transform hover:scale-110 md:right-8"
            >
              →
            </button>
            <button
              onClick={close}
              aria-label="Закрити перегляд"
              className="glass absolute right-4 top-4 flex size-11 items-center justify-center rounded-full text-ink transition-transform hover:rotate-90 md:right-8 md:top-8"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
