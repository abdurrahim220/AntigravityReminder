export interface Reminder {
  id: string;
  email: string;
  lastUsedDate: Date;
  nextReminderDate: Date;
}


export interface ReminderState {
  reminders: Reminder[];
  loading: boolean;
  error: string | null;
}