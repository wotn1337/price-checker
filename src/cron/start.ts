import { CronJob } from "cron";

export function startJob(task: () => void, time: string) {
  const cronJob = new CronJob(
    time,
    task,
    null, // onComplete
    false, // start
    "Asia/Yekaterinburg" // timeZone
  );

  cronJob.start();

  return cronJob;
}
