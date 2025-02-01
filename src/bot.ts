import dotenv from "dotenv";
import { Telegraf, session } from "telegraf";
import { startBotCallback } from "./bot/start";
import { startSearchCallback } from "./bot/startSearch";
import { stopSearchCallback } from "./bot/stopSearch";
import { Option } from "./const";
import { IContext } from "./types";
dotenv.config();

const bot = new Telegraf<IContext>(process.env.BOT_TOKEN);
bot.use(session());

bot.start(startBotCallback);

bot.hears(Option.START_SEARCH, startSearchCallback);

bot.hears(Option.STOP_SEARCH, stopSearchCallback);

bot.launch();
