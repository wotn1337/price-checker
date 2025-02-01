import { Markup } from "telegraf";
import { Option } from "../const";

export function getMenu(isSearching?: boolean) {
  return Markup.keyboard([
    [isSearching ? Option.STOP_SEARCH : Option.START_SEARCH],
    // [Option.CHANGE_TIME],
  ])
    .resize()
    .oneTime(false);
}
