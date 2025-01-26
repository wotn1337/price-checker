import { chromium } from "playwright";

export async function getLamodaPrice() {
  console.log("Начинаю поиск цены на Lamoda");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
  });
  const page = await context.newPage();

  await page.goto(
    "https://www.lamoda.ru/p/vi055lwtxp96/beauty_accs-vichy-syvorotka-dlya-volos/"
  );
  await page.mouse.move(100, 100);
  await page.waitForTimeout(1000);
  await page.mouse.move(500, 400);
  await page.waitForSelector('span[aria-label="Итоговая цена"]');
  const textContent = await page.$eval(
    'span[aria-label="Итоговая цена"]',
    (el) => el.textContent.replace(/[^0-9]/g, "")
  );
  await browser.close();

  console.log(`Цена на Lamoda найдена - ${textContent}`);

  return textContent;
}
