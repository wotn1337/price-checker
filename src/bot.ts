import dotenv from "dotenv";
import { Telegraf } from "telegraf";
import { Option } from "./const";
import { userStates } from "./state";
import { startSearch, stopSearch } from "./utils/cron";
import { getMenu } from "./utils/getMenu";
dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start(async (ctx) => {
  const userId = ctx.from.id;
  userStates[userId] = { isSearching: false };

  return ctx.reply(
    "Добро пожаловать!",
    getMenu(userStates[userId].isSearching)
  );
});

bot.hears([Option.START, Option.STOP], async (ctx) => {
  const userId = ctx.from.id;

  if (!userStates[userId]) {
    userStates[userId] = { isSearching: false };
  }

  if (ctx.message.text === Option.STOP) {
    // Остановка поиска
    stopSearch(userId);
    userStates[userId].isSearching = false;
    await ctx.reply(
      "Поиск остановлен!",
      getMenu(userStates[userId].isSearching)
    );
  } else if (ctx.message.text === Option.START) {
    // Запуск поиска
    startSearch(userId, ctx);
    userStates[userId].isSearching = true;
    await ctx.reply("Поиск запущен!", getMenu(userStates[userId].isSearching));
  }
});

bot.launch();
