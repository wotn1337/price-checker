import dotenv from "dotenv";
import { startJob } from "../cron/start";
import { writeMessageInFile } from "./message";
import { makeScreenshots } from "./screenshots";
dotenv.config();

export async function startParserJob() {
  const task = async () => {
    await writeMessageInFile();
    await makeScreenshots();
  };

  const job = startJob(task, process.env.PARSER_TIMING);
  console.log("Задача парсинга запущена");
  return job;
}
