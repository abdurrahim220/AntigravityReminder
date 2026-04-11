import notifee, { TriggerType } from '@notifee/react-native';
import { Reminder } from '../features/reminder/reminderTypes';

export const scheduleReminderNotification = async (reminder: Reminder) => {
  if (!reminder.availableAt) return;

  await notifee.createTriggerNotification(
    {
      id: reminder.id,
      title: 'Reminder Available',
      body: `${reminder.email} is now available`,
      android: {
        channelId: 'default',
        pressAction: {
          id: 'default',
        },
      },
    },
    {
      type: TriggerType.TIMESTAMP,
      timestamp: reminder.availableAt,
    },
  );
};
