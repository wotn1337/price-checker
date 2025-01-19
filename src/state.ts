import { CronJob } from "cron";

export const userStates: Record<
  number,
  { isSearching: boolean; cronJob?: CronJob }
> = {};
