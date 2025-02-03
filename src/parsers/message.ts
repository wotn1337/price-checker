import fs from "fs";
import { writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { logger } from "../logger";
import { getGoldApplePrice } from "./goldApple";
import { getLamodaPrice } from "./lamoda";
import { getWbPrice } from "./wildberries";
import { getYandexPrice } from "./yandex";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.resolve(__dirname, "../../", "message.txt");

type ShopItem = {
  shop: string;
  price?: string;
};

export async function createMessage() {
  try {
    const ga = await getGoldApplePrice();
    const wb = await getWbPrice();
    const lamoda = await getLamodaPrice();
    const yandex = await getYandexPrice();
    const ozon = "https://ozon.ru/t/M2yPv5x";

    const items: ShopItem[] = [
      { shop: "Золотое яблоко", price: ga },
      { shop: "Wildberries", price: wb },
      { shop: "Lamoda", price: lamoda },
      { shop: "Яндекс", price: yandex },
      { shop: "Ozon", price: ozon },
    ];

    return items.map(getPriceString).join("\n");
  } catch {
    return "Ошибка поиска цен";
  }
}

function getPriceString({ shop, price }: ShopItem) {
  return `${shop}: ${price ?? "-"}`;
}

export async function writeMessageInFile() {
  try {
    const message = await createMessage();
    await writeFile(filePath, message, "utf8");
    logger.info(`Сообщение успешно записано в файл: ${filePath}`);
  } catch (error) {
    logger.error(error, "Ошибка при записи в файл");
  }
}

export function getMessageFromFile() {
  try {
    const message = fs.readFileSync(filePath, "utf8");
    logger.info(message, "Сообщение");
    return message;
  } catch (err) {
    logger.error(err, "Ошибка при чтении файла");
    return "Ошибка чтения сообщения";
  }
}
