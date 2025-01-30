import { TABLE_NAME } from "../const";
import { UserTask, UserTaskDbOperation } from "../types";
import { db } from "./db";

export const createTask = async (newTask: UserTaskDbOperation) => {
  try {
    const existingTask = await db<UserTask>(TABLE_NAME)
      .where({ user_id: newTask.user_id })
      .first();

    if (existingTask) {
      console.log("Задача для этого пользователя уже существует.");
      return existingTask;
    } else {
      const [instance] = await db<UserTask, UserTaskDbOperation>(TABLE_NAME)
        .insert(newTask)
        .returning("*");

      console.log("Данные добавлены");
      return instance;
    }
  } catch (err) {
    console.error("Ошибка добавления данных:", err);
  }
};
