import { startJob } from "../cron/start";
import { cronJobs } from "../cron/state";
import { getUserTask } from "../db/getData";
import { createTask } from "../db/insertData";
import { OnStartCallback } from "../types";
import { getMenu } from "./getMenu";
import { getMediaGroup } from "./media";

export const startBotCallback: OnStartCallback = async (ctx) => {
  const userId = ctx.from?.id;

  let task = await getUserTask(userId);

  if (!task) {
    const instance = await createTask({ user_id: userId, is_active: false });
    return ctx.reply("Добро пожаловать!", getMenu(instance?.is_active));
  }

  if (task.is_active) {
    const searchTask = async () => {
      try {
        await ctx.replyWithMediaGroup(getMediaGroup());
        console.log("Сообщение отправлено пользователю", userId);
      } catch (e) {
        console.error("Ошибка отправки сообщения пользователю", userId, e);
      }
    };

    const job = startJob(searchTask, process.env.TIMING);
    cronJobs[userId] = job;

    ctx.reply("Поиск цен возобновлен", getMenu(true));
    return;
  }

  ctx.reply("С возвращением!", getMenu(false));
};
