import AsyncStorage from '@react-native-async-storage/async-storage';
import { Reminder } from '../features/reminder/reminderTypes';

const STORAGE_KEY = 'REMINDERS';

export const saveReminders = async (reminders: Reminder[]) => {
  try {
    const json = JSON.stringify(reminders);
    await AsyncStorage.setItem(STORAGE_KEY, json);
  } catch (error) {
    console.log('Error saving reminders', error);
  }
};

export const loadReminders = async (): Promise<Reminder[]> => {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    return json ? JSON.parse(json) : [];
  } catch (error) {
    console.log('Error loading reminders', error);
    return [];
  }
};