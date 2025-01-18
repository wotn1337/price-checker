import { chromium } from "playwright";

export default async function getPrice() {
  console.log("Начинаю поиск цены на Wildberries");
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(
    "https://www.wildberries.ru/catalog/3518597/detail.aspx?targetUrl=MS&size=13525664"
  );
  await page.waitForSelector(".price-block__final-price.wallet");
  const textContent = await page.$eval(
    ".price-block__final-price.wallet",
    (el) => el.textContent.replace(/[^0-9]/g, "")
  );
  await browser.close();

  console.log("Цена на Wildberries найдена");

  return textContent;
}
