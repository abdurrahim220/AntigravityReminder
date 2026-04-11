export interface Reminder {
  id: string;
  email: string;
  createdAt: number;
  isAvailable: boolean;
  isUsed: boolean;
  resetDuration: number;
  availableAt?: number | null;
}


export interface ReminderState {
  reminders: Reminder[];
  loading: boolean;
  error: string | null;
}