import { startJob } from "../cron/start";
import { cronJobs } from "../cron/state";
import { getUserTask } from "../db/getData";
import { updateTask } from "../db/updateData";
import { getMessageFromFile } from "../parsers/message";
import { OnHearCallback } from "../types";
import { getMenu } from "./getMenu";

export const startSearchCallback: OnHearCallback = async (ctx) => {
  const userId = ctx.from.id;

  let task = await getUserTask(userId);

  if (!task) {
    console.log(userId);
    ctx.reply("Ошибка запуска - запись в БД не найдена", getMenu(false));
    return;
  }

  if (task.is_active) {
    ctx.reply("Поиск цен уже запущен", getMenu(true));
    return;
  }

  const searchTask = async () => {
    const message = getMessageFromFile();
    try {
      await ctx.reply(message);
      console.log("Сообщение отправлено пользователю", userId);
    } catch (e) {
      console.error("Ошибка отправки сообщения пользователю", userId, e);
    }
  };

  const job = startJob(searchTask, process.env.TIMING);
  cronJobs[userId] = job;

  await updateTask(task.id, { is_active: true });
  ctx.reply("Поиск цен запущен", getMenu(true));
};
