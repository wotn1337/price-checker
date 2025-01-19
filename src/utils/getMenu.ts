import { Markup } from "telegraf";
import { Option } from "../const";

export function getMenu(isSearching: boolean) {
  return Markup.keyboard([[isSearching ? Option.STOP : Option.START]])
    .resize()
    .oneTime(false);
}
