import dotenv from "dotenv";
import { Telegraf, session } from "telegraf";
import { getMediaGroup } from "./bot/media";
import { startBotCallback } from "./bot/start";
import { startSearchCallback } from "./bot/startSearch";
import { stopSearchCallback } from "./bot/stopSearch";
import { Option } from "./const";
import { startJob } from "./cron/start";
import { cronJobs } from "./cron/state";
import { getStartedTasks } from "./db/getData";
import { startParserJob } from "./parsers/parserJob";
import { IContext } from "./types";
dotenv.config();

const bot = new Telegraf<IContext>(process.env.BOT_TOKEN);
bot.use(session());

bot.start(startBotCallback);

bot.hears(Option.START_SEARCH, startSearchCallback);

bot.hears(Option.STOP_SEARCH, stopSearchCallback);

startParserJob();

bot.launch(async () => {
  console.log("Бот запущен");

  const tasks = await getStartedTasks();

  for (const task of tasks) {
    const searchTask = async () => {
      try {
        await bot.telegram.sendMediaGroup(task.user_id, getMediaGroup());
        console.log("Сообщение отправлено пользователю", task.user_id);
      } catch (e) {
        console.error(
          "Ошибка отправки сообщения пользователю",
          task.user_id,
          e
        );
      }
    };

    const job = startJob(searchTask, process.env.TIMING);
    cronJobs[task.user_id] = job;
  }

  console.log("Задачи запущены для пользователей:", Object.keys(cronJobs));
});
