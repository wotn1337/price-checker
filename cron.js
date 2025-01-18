import { CronJob } from "cron";
import sendEmail from "./notifyPriceCheck.js";

const job = new CronJob(
  "*/2 * * * *",
  sendEmail, // onTick
  null, // onComplete
  true, // start
  "Asia/Yekaterinburg" // timeZone
);
