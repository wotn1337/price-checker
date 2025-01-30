import dotenv from "dotenv";
import { Telegraf } from "telegraf";
import { startBotCallback } from "./bot/start";
import { startSearchCallback } from "./bot/startSearch";
import { stopSearchCallback } from "./bot/stopSearch";
import { Option } from "./const";
dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start(startBotCallback);

bot.hears(Option.START_SEARCH, startSearchCallback);

bot.hears(Option.STOP_SEARCH, stopSearchCallback);

bot.launch();
