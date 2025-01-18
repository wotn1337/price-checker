import { chromium } from "playwright";

export default async function getPrice() {
  console.log("Начинаю поиск цены на Яндекс");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
  });
  const page = await context.newPage();

  await page.goto("https://market.yandex.ru/cc/JkROkmt");
  await page.mouse.move(100, 100);
  await page.waitForTimeout(1000);
  await page.mouse.move(500, 400);
  await page.waitForSelector('h3[data-auto="snippet-price-current"]');
  const textContent = await page.$eval(
    'h3[data-auto="snippet-price-current"]',
    (el) => el.textContent.replace(/[^0-9]/g, "")
  );
  await browser.close();

  console.log("Цена на Яндекс найдена");

  return textContent;
}

// console.log(await getPrice());
