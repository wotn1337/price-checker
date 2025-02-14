import { TABLE_NAME } from "../const";
import { logger } from "../logger";
import { db } from "./db";

const createTable = async () => {
  try {
    const exists = await db.schema.hasTable(TABLE_NAME);

    if (!exists) {
      await db.schema.createTable(TABLE_NAME, (table) => {
        table.increments("id").primary(); // Автоинкрементный ID
        table.bigInteger("user_id").notNullable(); // ID пользователя
        table.jsonb("selected_time").nullable(); // JSONB объект времени
        table.boolean("is_active").defaultTo(false); // Флаг активности задачи
        table.timestamp("created_at").defaultTo(db.fn.now()); // Временная метка создания
      });
      logger.info("Таблица создана");
    } else {
      logger.info("Таблица уже существует");
    }
  } catch (err) {
    logger.error(err, "Ошибка создания таблицы");
  } finally {
    await db.destroy();
  }
};

createTable();
