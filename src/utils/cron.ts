import { CronJob } from "cron";
import { Context } from "telegraf";
import { userStates } from "../state";
import { getMenu } from "./getMenu";
import { getMessage } from "./search";

export function startSearch(userId: number, ctx: Context) {
  const cronJob = new CronJob(
    process.env.TIMING, // Выполнение каждую минуту (можно изменить)
    () => cronTask(userId, ctx),
    null, // onComplete
    false, // start
    "Asia/Yekaterinburg" // timeZone
  );

  cronJob.start(); // Запускаем задачу
  userStates[userId].cronJob = cronJob;
}

async function cronTask(userId: number, ctx: Context) {
  try {
    const message = await getMessage();
    ctx.reply(message);
  } catch {
    onSearchFail(userId, ctx);
  }
}

function onSearchFail(userId: number, ctx: Context) {
  stopSearch(userId);
  ctx.reply("Ошибка во время поиска!", getMenu(false));
}

export function stopSearch(userId: number) {
  userStates[userId].cronJob?.stop(); // Останавливаем задачу
  userStates[userId].cronJob = undefined; // Удаляем задачу из памяти
}
