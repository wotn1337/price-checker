import { CronJob } from "cron";
import dotenv from "dotenv";
import knex, { Knex } from "knex";
import { TABLE_NAME } from "../const";
dotenv.config();

export const cronJobs: Record<number, CronJob> = {};

export const db: Knex = knex({
  client: "pg",
  connection: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: Number(process.env.DATABASE_PORT),
  },
});

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
      console.log("Таблица создана");
    } else {
      console.log("Таблица уже существует");
    }
  } catch (err) {
    console.error("Ошибка создания таблицы:", err);
  } finally {
    await db.destroy();
  }
};
