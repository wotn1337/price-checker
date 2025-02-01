import dotenv from "dotenv";
import knex, { Knex } from "knex";
dotenv.config();

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
