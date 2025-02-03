import path from "path";
import { chromium } from "playwright";
import { fileURLToPath } from "url";
import { logger } from "../logger";
import config from "./playwright.config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function makePageScreenshot(url: string, fileName: string) {
  try {
    const browser = await chromium.launch();
    const context = await browser.newContext(config.use);
    const page = await context.newPage();
    const filePath = path.resolve(
      __dirname,
      "../../screenshots",
      `${fileName}.jpg`
    );

    await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
    await page.waitForTimeout(20000);
    await page.screenshot({ path: filePath });
  } catch (err) {
    logger.error(err, "Ошибка скриншота");
  }
}
