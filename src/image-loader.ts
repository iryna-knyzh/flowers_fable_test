// Кастомний лоадер next/image для статичного експорту на GitHub Pages.
// next/image з unoptimized не додає basePath до <img src>, тож робимо це самі:
// до локальних шляхів (/images/..., /logo.png) додаємо префікс підпапки.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function imageLoader({ src }: { src: string }): string {
  if (/^https?:\/\//.test(src)) return src; // зовнішні URL — без змін
  return `${basePath}${src}`;
}
