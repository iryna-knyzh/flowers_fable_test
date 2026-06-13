import puppeteer from "puppeteer-core";

const OUT = process.env.HOME + "/flowers-shots";
const browser = await puppeteer.launch({
  executablePath: "/snap/bin/chromium",
  headless: "shell",
  args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars"],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.6 });
await page.goto("http://localhost:3199", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise((r) => setTimeout(r, 6000));
await page.screenshot({ path: `${OUT}/04-hero-hd.png`, clip: { x: 0, y: 0, width: 1440, height: 900 } });

for (const [sel, name] of [["#testimonials", "04-testimonials"], ["footer", "04-footer"]]) {
  await page.evaluate((s) => document.querySelector(s)?.scrollIntoView({ behavior: "instant" }), sel);
  await new Promise((r) => setTimeout(r, 2200));
  await page.screenshot({ path: `${OUT}/${name}.png` });
}

// WhyUs — секція між галереєю та відгуками
await page.evaluate(() => {
  const t = document.querySelector("#testimonials");
  window.scrollTo(0, t.getBoundingClientRect().top + window.scrollY - 950);
});
await new Promise((r) => setTimeout(r, 2200));
await page.screenshot({ path: `${OUT}/04-whyus.png` });

console.log("done");
await browser.close();
