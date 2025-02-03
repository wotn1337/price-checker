import { startJob } from "../cron/start";
import { cronJobs } from "../cron/state";
import { getUserTask } from "../db/getData";
import { updateTask } from "../db/updateData";
import { logger } from "../logger";
import { OnHearCallback } from "../types";
import { getMenu } from "./getMenu";
import { getMediaGroup } from "./media";

export const startSearchCallback: OnHearCallback = async (ctx) => {
  const userId = ctx.from.id;

  let task = await getUserTask(userId);

  if (!task) {
    logger.info(userId);
    ctx.reply("Ошибка запуска - запись в БД не найдена", getMenu(false));
    return;
  }

  if (task.is_active) {
    ctx.reply("Поиск цен уже запущен", getMenu(true));
    return;
  }

  const searchTask = async () => {
    try {
      await ctx.replyWithMediaGroup(getMediaGroup());
      logger.info(userId, "Сообщение отправлено пользователю");
    } catch (err) {
      logger.error({ userId, err }, "Ошибка отправки сообщения пользователю");
    }
  };

  const job = startJob(searchTask, process.env.TIMING);
  cronJobs[userId] = job;

  await updateTask(task.id, { is_active: true });
  ctx.reply("Поиск цен запущен", getMenu(true));
};
