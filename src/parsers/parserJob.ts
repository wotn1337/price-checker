import dotenv from "dotenv";
import { startJob } from "../cron/start";
import { writeMessageInFile } from "./message";
dotenv.config();

export async function startParserJob() {
  const job = startJob(writeMessageInFile, process.env.PARSER_TIMING);
  console.log("Задача парсинга запущена");
  return job;
}
