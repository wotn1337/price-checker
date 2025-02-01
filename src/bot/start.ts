import { startJob } from "../cron/start";
import { cronJobs } from "../cron/state";
import { getUserTask } from "../db/getData";
import { createTask } from "../db/insertData";
import { getMessageFromFile } from "../parsers/message";
import { OnStartCallback } from "../types";
import { getMenu } from "./getMenu";

export const startBotCallback: OnStartCallback = async (ctx) => {
  const userId = ctx.from?.id;

  let task = await getUserTask(userId);

  if (!task) {
    const instance = await createTask({ user_id: userId, is_active: false });
    return ctx.reply("Добро пожаловать!", getMenu(instance?.is_active));
  }

  if (task.is_active) {
    const searchTask = () => {
      const message = getMessageFromFile();
      ctx.reply(message);
    };

    const job = startJob(searchTask, process.env.TIMING);
    cronJobs[userId] = job;

    ctx.reply("Поиск цен возобновлен", getMenu(true));
    return;
  }

  ctx.reply("С возвращением!", getMenu(false));
};
