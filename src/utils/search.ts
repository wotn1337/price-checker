import { getGoldApplePrice } from "../parsers/goldApple";
import { getLamodaPrice } from "../parsers/lamoda";
import { getWbPrice } from "../parsers/wildberries";
import { getYandexPrice } from "../parsers/yandex";

export async function getMessage() {
  try {
    const ga = await getGoldApplePrice();
    const wb = await getWbPrice();
    const lamoda = await getLamodaPrice();
    const yandex = await getYandexPrice();
    const ozon = "https://ozon.ru/t/M2yPv5x";

    return `Золотое яблоко: ${ga}\nWildberries: ${wb}\nLamoda: ${lamoda}\nЯндекс: ${yandex}\nOzon: ${ozon}`;
  } catch {
    return "Ошибка поиска цен";
  }
}
