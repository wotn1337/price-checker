import { chromium } from "playwright";
import { logger } from "../logger";

const url = "https://goldapple.ru/89310800015-dercos-aminexil-intensive-5";

export async function getGoldApplePrice() {
  try {
    logger.info("Начинаю поиск цены в Золотом яблоке");
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(url, { waitUntil: "networkidle" });
    const textContent = await page.$eval<string>(
      'meta[itemprop="price"]',
      (el) => el.getAttribute("content")
    );
    await page.close();
    await context.close();
    await browser.close();

    logger.info(`Цена в Золотом яблоке найдена - ${textContent}`);

    return textContent;
  } catch (e) {
    logger.error(e);
    return url;
  }
}
