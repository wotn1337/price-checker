import { chromium } from "playwright";

export async function getWbPrice() {
  console.log("Начинаю поиск цены на Wildberries");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
  });
  const page = await context.newPage();

  await page.goto(
    "https://www.wildberries.ru/catalog/3518597/detail.aspx?targetUrl=MS&size=13525664"
  );
  await page.mouse.move(100, 100);
  await page.waitForTimeout(1000);
  await page.mouse.move(500, 400);
  await page.waitForSelector(".price-block__final-price.wallet");
  const textContent = await page.$eval(
    ".price-block__final-price.wallet",
    (el) => el.textContent.replace(/[^0-9]/g, "")
  );
  await browser.close();

  console.log(`Цена на Wildberries найдена - ${textContent}`);

  return textContent;
}
