import { chromium } from "playwright";

export async function getGoldApplePrice() {
  try {
    console.log("Начинаю поиск цены в Золотом яблоке");
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(
      "https://goldapple.ru/89310800015-dercos-aminexil-intensive-5",
      {
        waitUntil: "networkidle",
      }
    );
    const textContent = await page.$eval<string>(
      'meta[itemprop="price"]',
      (el) => el.getAttribute("content")
    );
    await browser.close();

    console.log(`Цена в Золотом яблоке найдена - ${textContent}`);

    return textContent;
  } catch (e) {
    console.error(e);
  }
}
