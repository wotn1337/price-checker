import { CronJob } from "cron";
import { TIMING } from "./constants.js";
import sendEmail from "./notifyPriceCheck.js";

const job = new CronJob(
  TIMING,
  sendEmail, // onTick
  null, // onComplete
  true, // start
  "Asia/Yekaterinburg" // timeZone
);
