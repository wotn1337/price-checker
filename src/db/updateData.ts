import { TABLE_NAME } from "../const";
import { logger } from "../logger";
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

    logger.info("Данные обновлены");
    return instance;
  } catch (err) {
    logger.error(err, "Ошибка обновления данных");
  }
};
