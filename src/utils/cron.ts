import { CronJob } from "cron";
import { cronJobs } from "../db/db";
import { UserTask } from "../types";

export function startJob(
  task: () => void,
  userId: UserTask["user_id"],
  time?: string
) {
  const cronJob = new CronJob(
    time ?? process.env.TIMING,
    task,
    null, // onComplete
    false, // start
    "Asia/Yekaterinburg" // timeZone
  );

  cronJobs[userId] = cronJob;

  cronJob.start();
}

export function stopJob(userId: UserTask["user_id"]) {
  cronJobs[userId]?.stop();
}
