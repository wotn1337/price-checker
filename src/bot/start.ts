import { Update } from "@telegraf/types";
import { Composer, Context } from "telegraf";
import { getUserTask } from "../db/getData";
import { createTask } from "../db/insertData";
import { startJob } from "../utils/cron";
import { getMenu } from "../utils/getMenu";
import { getMessage } from "../utils/search";

export const startBotCallback: Parameters<
  Composer<Context<Update>>["start"]
>[0] = async (ctx) => {
  const userId = ctx.from?.id;

  let task = await getUserTask(userId);

  if (!task) {
    const instance = await createTask({ user_id: userId, is_active: false });
    return ctx.reply("Добро пожаловать!", getMenu(instance?.is_active));
  }

  if (task.is_active) {
    const searchTask = async () => {
      const message = await getMessage();
      ctx.reply(message);
    };

    startJob(searchTask, userId);

    ctx.reply("Поиск цен возобновлен", getMenu(true));
    return;
  }

  ctx.reply("С возвращением!", getMenu(false));
};
