import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addReminder } from '../../features/reminder/reminderSlice';
import { saveReminders } from '../../storage/reminderStorage';

interface AddReminderModalProps {
  visible: boolean;
  onClose: () => void;
}

const AddReminderModal = ({ visible, onClose }: AddReminderModalProps) => {
  const [email, setEmail] = useState('');
  const dispatch = useAppDispatch();
  const reminders = useAppSelector(state => state.reminder.reminders);

  const handleSave = async () => {
    if (!email.trim()) return;
    if (!email.includes('@')) {
      Alert.alert('Enter valid email');
      return;
    }
    const newReminder = {
      id: Date.now().toString(),
      email,
      createdAt: Date.now(),
    };

    dispatch(addReminder(newReminder));

    const updated = [...reminders, newReminder];
    await saveReminders(updated);

    setEmail('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 justify-end bg-black/40">
        <View className="bg-white p-5 rounded-t-2xl">
          {/* Title */}
          <Text className="text-lg font-bold mb-4">Add Reminder</Text>

          {/* Input */}
          <TextInput
            placeholder="Enter email"
            value={email}
            onChangeText={setEmail}
            className="border border-gray-300 rounded-lg px-3 py-2 mb-4"
          />

          {/* Buttons */}
          <View className="flex-row justify-between">
            {/* Cancel */}
            <TouchableOpacity
              onPress={onClose}
              className="px-4 py-2"
            >
              <Text className="text-gray-500">Cancel</Text>
            </TouchableOpacity>

            {/* Save */}
            <TouchableOpacity
              className="bg-blue-500 px-4 py-2 rounded-lg"
              onPress={handleSave}
              disabled={!email.trim()}
            >
              <Text className="text-white font-semibold">Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddReminderModal;
