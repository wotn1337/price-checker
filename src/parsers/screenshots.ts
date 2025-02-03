import { existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { logger } from "../logger";
import { makePageScreenshot } from "../playwright/screenshot";
import { shops } from "./state";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function makeScreenshots() {
  for (const shop of shops) {
    try {
      logger.info(`${shop.name} - делаю скриншот`);
      await makePageScreenshot(shop.url, shop.key).then(() => {
        logger.info(`${shop.name} - скриншот готов`);
      });
    } catch (err) {
      logger.error(err, `${shop.name} - ошибка скриншота`);
    }
  }
}

export function getScreenshots() {
  return shops
    .map(({ key }) => {
      const filePath = path.resolve(
        __dirname,
        "../../screenshots",
        `${key}.jpg`
      );

      if (existsSync(filePath)) {
        return filePath;
      }

      return null;
    })
    .filter((path) => path !== null);
}
