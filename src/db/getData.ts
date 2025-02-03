import { TABLE_NAME } from "../const";
import { logger } from "../logger";
import { UserTask } from "../types";
import { db } from "./db";

export const getUserTask = async (user_id: UserTask["user_id"]) => {
  try {
    const task = await db<UserTask>(TABLE_NAME)
      .where({ user_id })
      .returning("*")
      .first();
    logger.info(task, "Задачи пользователя");
    return task;
  } catch (err) {
    logger.error(err, "Ошибка получения данных:");
  }
};

export const getStartedTasks = async () => {
  try {
    const task = await db<UserTask>(TABLE_NAME)
      .where({ is_active: true })
      .returning("*");

    logger.info(task, "Все начатые задачи");
    return task;
  } catch (err) {
    logger.error(err, "Ошибка получения начатых задач");
    return [];
  }
};
