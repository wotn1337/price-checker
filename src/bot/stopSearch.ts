import { Update } from "@telegraf/types";
import { Composer, Context } from "telegraf";
import { getUserTask } from "../db/getData";
import { updateTask } from "../db/updateData";
import { stopJob } from "../utils/cron";
import { getMenu } from "../utils/getMenu";

type FuncType = Parameters<Composer<Context<Update>>["hears"]>[1];

export const stopSearchCallback: FuncType = async (ctx) => {
  const userId = ctx.from.id;

  let task = await getUserTask(userId);

  if (!task) {
    ctx.reply("Ошибка остановки - запись в БД не найдена", getMenu(true));
    return;
  }

  if (!task.is_active) {
    ctx.reply("Поиск цен уже остановлен", getMenu(task.is_active));
    return;
  }

  stopJob(userId);

  const updatedTask = await updateTask(task.id, { is_active: false });
  ctx.reply("Поиск цен остановлен", getMenu(updatedTask?.is_active));
};
