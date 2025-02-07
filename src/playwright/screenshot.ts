import { existsSync, unlinkSync } from "fs";
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
    if (existsSync(filePath)) {
      deleteFile(filePath);
    }

    await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
    await page.waitForTimeout(20000);
    await page.screenshot({ path: filePath });

    await page.close();
    await context.close();
    await browser.close();
  } catch (err) {
    logger.error(err, "Ошибка скриншота");
  }
}

function deleteFile(filePath: string) {
  try {
    unlinkSync(filePath);
    logger.info(filePath, "Файл успешно удалён");
    console.log();
  } catch (err) {
    logger.error(err, filePath, "Ошибка при удалении файла");
  }
}
