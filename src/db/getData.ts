import { TABLE_NAME } from "../const";
import { UserTask } from "../types";
import { db } from "./db";

export const getUserTask = async (user_id: UserTask["user_id"]) => {
  try {
    const task = await db<UserTask>(TABLE_NAME)
      .where({ user_id })
      .returning("*")
      .first();
    console.log("Задачи пользователя:", task);
    return task;
  } catch (err) {
    console.error("Ошибка получения данных:", err);
  }
};

export const getStartedTasks = async () => {
  try {
    const task = await db<UserTask>(TABLE_NAME)
      .where({ is_active: true })
      .returning("*");

    console.log("Все начатые задачи:", task);
    return task;
  } catch (err) {
    console.error("Ошибка получения начатых задач:", err);
    return [];
  }
};
