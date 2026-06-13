import type { NextConfig } from "next";

// Для GitHub Pages (project-сайт) у CI задаємо BASE_PATH = /<repo>.
// Локально BASE_PATH порожній — сайт працює з кореня.
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export", // статичний експорт у /out
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: {
    unoptimized: true, // GitHub Pages не має сервера оптимізації зображень
  },
};

export default nextConfig;
