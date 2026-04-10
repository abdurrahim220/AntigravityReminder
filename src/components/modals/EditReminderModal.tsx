import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { useAppDispatch } from '../../app/hooks';
import { updateReminder } from '../../features/reminder/reminderSlice';
import { saveReminders } from '../../storage/reminderStorage';
import { useAppSelector } from '../../app/hooks';
import { Reminder } from '../../features/reminder/reminderTypes';

interface EditReminderModalProps {
  visible: boolean;
  onClose: () => void;
  reminder: Reminder | null;
}

const EditReminderModal = ({ visible, onClose, reminder }: EditReminderModalProps) => {
  const [email, setEmail] = useState('');
  const dispatch = useAppDispatch();
  const reminders = useAppSelector(state => state.reminder.reminders);

  useEffect(() => {
    if (reminder) {
      setEmail(reminder.email);
    }
  }, [reminder, visible]);

  const handleUpdate = async () => {
    if (!reminder) return;
    if (!email.trim()) return;
    if (!email.includes('@')) {
      Alert.alert('Enter valid email');
      return;
    }

    const updatedReminder = {
      ...reminder,
      email: email.trim(),
    };

    dispatch(updateReminder(updatedReminder));

    const updatedReminders = reminders.map(r => 
      r.id === reminder.id ? updatedReminder : r
    );
    await saveReminders(updatedReminders);

    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 justify-end bg-black/40">
        <View className="bg-white p-5 rounded-t-2xl">
          <Text className="text-lg font-bold mb-4 text-gray-900">Edit Reminder</Text>

          <TextInput
            placeholder="Enter email"
            value={email}
            onChangeText={setEmail}
            className="border border-gray-300 rounded-lg px-3 py-2 mb-4 text-gray-900"
            autoFocus
          />

          <View className="flex-row justify-between">
            <TouchableOpacity onPress={onClose} className="px-4 py-2">
              <Text className="text-gray-500 font-medium">Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              className="bg-blue-500 px-6 py-2 rounded-lg"
              onPress={handleUpdate}
              disabled={!email.trim() || email === reminder?.email}
            >
              <Text className="text-white font-bold">Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditReminderModal;
