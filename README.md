# Flowers AKKERMAN — преміальний квітковий бутік

Люксовий односторінковий сайт квіткового ательє «Flowers AKKERMAN» українською мовою.
Дизайн натхненний естетикою модних домів (Dior, Chanel, Aesop) та палітрою фірмового
логотипа: айворі, шампань, пудровий рожевий, лаванда й золото.

## Технології

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS 4** — дизайн-токени бренду у `globals.css`
- **Framer Motion** — scroll-reveal анімації, лайтбокс, мікровзаємодії
- **GSAP + @gsap/react** — кінематографічний ревіл заголовка героя
- **Three.js + React Three Fiber** — 3D-пелюстки та золотий пил у герої з паралаксом за мишею
- **Lenis** — плавний інерційний скрол, інтегрований із GSAP ScrollTrigger

## Запуск

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # продакшн-збірка
npm run start    # продакшн-сервер
```

## Структура

- `src/app/` — layout (шрифти, SEO, JSON-LD), сторінка, sitemap, robots
- `src/components/` — секції: Hero, About, Collections, Gallery (masonry + лайтбокс),
  WhyUs, Testimonials, Delivery, Contact (форма + Google Maps), Footer
- `src/components/three/PetalCanvas.tsx` — 3D-сцена пелюсток
- `public/images/` — фотографії (Unsplash), `public/logo.png` — логотип бренду
- `scripts/shoot*.mjs` — допоміжні скрипти для візуальної перевірки (puppeteer-core)

## Особливості

- Прелоадер із логотипом і золотим розділювачем
- Кастомний курсор із золотим сяйвом (лише для точних вказівників)
- Скляні (glassmorphism) картки із золотим обідком, кінематографічне зерно
- Повна адаптивність, доступність (aria, клавіатура в лайтбоксі, reduced-motion)
- SEO: метадані uk_UA, OpenGraph, JSON-LD (Florist), sitemap.xml, robots.txt
