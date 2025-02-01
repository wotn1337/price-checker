import { startJob } from "../cron/start";
import { writeMessageInFile } from "./message";

export async function startParserJob() {
  const job = startJob(writeMessageInFile, "0 0 * * *");
  return job;
}
