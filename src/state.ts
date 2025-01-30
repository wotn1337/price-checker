import { CronJob } from "cron";

type UserData = {
  isSearching: boolean;
  cronJob?: CronJob;
  time?: {
    hours: number;
    minutes: number;
  };
};

export const userStates: Record<number, UserData> = {};
