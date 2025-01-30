export type UserTask = {
  id: number;
  user_id: number;
  selected_time?: { hours: number; minutes: number } | null;
  is_active: boolean;
  created_at: string;
};

export type UserTaskDbOperation = Omit<UserTask, "id" | "created_at">;
