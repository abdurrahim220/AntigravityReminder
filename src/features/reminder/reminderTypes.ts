export interface Reminder {
  id: string;
  email: string;
  createdAt: number;
}


export interface ReminderState {
  reminders: Reminder[];
  loading: boolean;
  error: string | null;
}