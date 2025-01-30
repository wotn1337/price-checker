import { TABLE_NAME } from "../const";
import { UserTask, UserTaskDbOperation } from "../types";
import { db } from "./db";

export const updateTask = async (
  id: number,
  newData: Partial<UserTaskDbOperation>
) => {
  try {
    const [instance] = await db<UserTask>(TABLE_NAME)
      .where({ id })
      .update(newData)
      .returning("*");

    console.log("Данные обновлены");
    return instance;
  } catch (err) {
    console.error("Ошибка обновления данных:", err);
  }
};
