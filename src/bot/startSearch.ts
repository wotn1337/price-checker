import { Update } from "@telegraf/types";
import { Composer, Context } from "telegraf";
import { getUserTask } from "../db/getData";
import { updateTask } from "../db/updateData";
import { startJob } from "../utils/cron";
import { getMenu } from "../utils/getMenu";
import { getMessage } from "../utils/search";

type FuncType = Parameters<Composer<Context<Update>>["hears"]>[1];

export const startSearchCallback: FuncType = async (ctx) => {
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
    const message = await getMessage();
    ctx.reply(message);
  };

  startJob(searchTask, userId);

  const updatedTask = await updateTask(task.id, { is_active: true });
  ctx.reply("Поиск цен запущен", getMenu(true));
};
