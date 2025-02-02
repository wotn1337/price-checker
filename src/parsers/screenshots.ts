import { existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { makePageScreenshot } from "../playwright/screenshot";
import { shops } from "./state";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function makeScreenshots() {
  for (const shop of shops) {
    try {
      console.log(`${shop.name} - делаю скриншот`);
      makePageScreenshot(shop.url, shop.key).then(() => {
        console.log(`${shop.name} - скриншот готов`);
      });
    } catch (e) {
      console.error(`${shop.name} - ошибка скриншота:`, e);
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
