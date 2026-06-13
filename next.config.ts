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
    // GitHub Pages не має сервера оптимізації; кастомний лоадер додає basePath
    // до шляхів зображень (інакше на project-сайті вони б давали 404).
    loader: "custom",
    loaderFile: "./src/image-loader.ts",
  },
};

export default nextConfig;
