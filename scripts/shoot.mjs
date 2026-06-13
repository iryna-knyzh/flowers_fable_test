import puppeteer from "puppeteer-core";

const OUT = process.env.HOME + "/flowers-shots";
const URL = "http://localhost:3199";

const browser = await puppeteer.launch({
  executablePath: "/snap/bin/chromium",
  headless: "shell",
  args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars"],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto(URL, { waitUntil: "networkidle0", timeout: 60000 });

// дочекатися завершення прелоадера й появи героя
await new Promise((r) => setTimeout(r, 5000));
await page.screenshot({ path: `${OUT}/01-hero.png` });

const sections = ["#about", "#collections", "#gallery", "#delivery", "#contact"];
for (const sel of sections) {
  await page.evaluate((s) => {
    document.querySelector(s)?.scrollIntoView({ behavior: "instant", block: "start" });
    window.scrollBy(0, -60);
  }, sel);
  await new Promise((r) => setTimeout(r, 2200));
  await page.screenshot({ path: `${OUT}/${sel.replace("#", "02-")}.png` });
}

// мобільний вигляд
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await page.goto(URL, { waitUntil: "networkidle0" });
await new Promise((r) => setTimeout(r, 5000));
await page.screenshot({ path: `${OUT}/03-mobile-hero.png` });

const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
console.log("done", errors);
await browser.close();
