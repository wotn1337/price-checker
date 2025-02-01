import { UserTask } from "../types";
import { cronJobs } from "./state";

export function stopJob(userId: UserTask["user_id"]) {
  cronJobs[userId]?.stop();
}
