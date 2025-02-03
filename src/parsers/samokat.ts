import { existsSync } from "fs";
import path from "path";
import { chromium } from "playwright";
import { Telegraf } from "telegraf";
import { fileURLToPath } from "url";
import { startJob } from "../cron/start";
import { logger } from "../logger";
import config from "../playwright/playwright.config";
import { IContext } from "../types";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.resolve(__dirname, "../../screenshots", `samokat.jpg`);
const url = "https://samokat.ru/search?value=река";

export async function startSamokatJob(
  bot: Telegraf<IContext>,
  userIds: number[]
) {
  const task = async () => {
    const hasRiver = await searchSamokat();
    if (hasRiver) {
      const filePath = path.resolve(__dirname, "../../screenshots/samokat.jpg");

      for (const id of userIds) {
        try {
          if (existsSync(filePath)) {
            await bot.telegram.sendMediaGroup(id, [
              {
                media: { source: filePath },
                type: "photo",
                caption: "Река в самокате!!!",
              },
            ]);
          } else {
            await bot.telegram.sendMessage(id, "Река в самокате!!!");
          }
        } catch (err) {
          logger.error(err, "Ошибка уведомления о реке");
        }
      }
    }
  };

  const job = startJob(task, "*/3 * * * *");
  logger.info("Задача парсинга самоката запущена");
  return job;
}

export async function searchSamokat() {
  try {
    logger.info("Начинаю поиск Реки в самокате");
    const browser = await chromium.launch();
    const context = await browser.newContext(config.use);
    const page = await context.newPage();

    await page.goto(url, { waitUntil: "networkidle", timeout: 120000 });
    await page.waitForTimeout(10000);
    await page.keyboard.press("Enter");
    const hasRiver = await page.getByText(/река/i).isVisible();
    if (hasRiver) {
      await page.screenshot({ path: filePath });
    }

    await browser.close();
    logger.info(hasRiver, "Поиск по самокату");

    return hasRiver;
  } catch (e) {
    logger.error(e);
    return false;
  }
}
