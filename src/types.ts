import { Message, Update } from "@telegraf/types";
import { Composer, Context, NarrowedContext } from "telegraf";

export type UserTask = {
  id: number;
  user_id: number;
  selected_time?: { hours: number; minutes: number } | null;
  is_active: boolean;
  created_at: string;
};

export type UserTaskDbOperation = Omit<UserTask, "id" | "created_at">;

export interface IContext extends Context<Update> {
  session: {
    current_command?: "set_time";
  };
}

export type OnHearCallback = Parameters<Composer<IContext>["hears"]>[1];
export type OnStartCallback = Parameters<Composer<IContext>["start"]>[0];
export type OnMessageCallback = (
  ctx: NarrowedContext<Context, Update.MessageUpdate<Message>>
) => void;
