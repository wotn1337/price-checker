import { getGoldApplePrice } from "../parsers/goldApple";
import { getLamodaPrice } from "../parsers/lamoda";
import { getWbPrice } from "../parsers/wildberries";
import { getYandexPrice } from "../parsers/yandex";

type ShopItem = {
  shop: string;
  price?: string;
};

export async function getMessage() {
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
  if (price === undefined) {
    return "";
  }

  return `${shop}: ${price}`;
}
