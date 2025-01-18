import { chromium } from "playwright";

export default async function getPrice() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(
    "https://goldapple.ru/89310800015-dercos-aminexil-intensive-5",
    {
      waitUntil: "networkidle",
    }
  );
  const textContent = await page.$eval('meta[itemprop="price"]', (el) =>
    el.getAttribute("content")
  );
  await browser.close();

  return textContent;
}
