
export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-ivory">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(220,192,138,0.7) 50%, transparent)",
        }}
      />
      <div className="pointer-events-none absolute -left-32 top-0 size-96 rounded-full bg-rose-deep/12 blur-[100px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 size-96 rounded-full bg-gold/10 blur-[100px]" />

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:px-10 lg:grid-cols-3 lg:py-20">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <span className="flex flex-col leading-none">
              <span className="font-serif-display text-2xl">Flowers</span>
              <span className="text-[10px] uppercase tracking-[0.42em] text-ivory/60">
                Akkerman
              </span>
            </span>
          </div>
          <p className="max-w-xs text-[13px] font-light leading-relaxed text-ivory/65">
            Преміальне квіткове ательє. Створюємо емоції, які залишаються в
            серці назавжди.
          </p>
        </div>

        <nav
          aria-label="Навігація у підвалі"
          className="grid grid-cols-2 gap-10"
        >
          <div className="flex flex-col gap-3">
            <span className="mb-1 text-[10.5px] uppercase tracking-[0.35em] text-gold-light">
              Меню
            </span>
            {[
              ["#about", "Про нас"],
              ["#collections", "Колекції"],
              ["#gallery", "Галерея"],
              ["#delivery", "Доставка"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="w-fit text-[13px] font-light text-ivory/70 transition-colors hover:text-gold-light"
              >
                {label}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <span className="mb-1 text-[10.5px] uppercase tracking-[0.35em] text-gold-light">
              Колекції
            </span>
            {[
              "Весільні букети",
              "Преміальні букети",
              "Ексклюзивні бокси",
              "Сезонні серії",
            ].map((label) => (
              <a
                key={label}
                href="#collections"
                className="w-fit text-[13px] font-light text-ivory/70 transition-colors hover:text-gold-light"
              >
                {label}
              </a>
            ))}
          </div>
        </nav>

        <div className="flex flex-col gap-3 lg:items-end">
          <span className="text-[10.5px] uppercase tracking-[0.35em] text-gold-light">
            Контакти
          </span>
          <a
            href="tel:+380680000000"
            className="font-serif-display text-2xl transition-colors hover:text-gold-light"
          >
            +380 (68) 000 00 00
          </a>
          <p className="text-[13px] font-light text-ivory/65 lg:text-right">
            вул. Михайлівська, 35
            <br />
            Білгород-Дністровський
          </p>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-[11px] font-light tracking-wide text-ivory/45 md:flex-row md:px-10">
          <span>© {new Date().getFullYear()} Flowers. Усі права захищено.</span>
          <span className="flex items-center gap-2">
            Створено з <span className="text-rose">♥</span> до квітів і
            досконалості
          </span>
        </div>
      </div>
    </footer>
  );
}
