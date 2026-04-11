import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, Alert, StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addReminder } from '../../features/reminder/reminderSlice';
import { saveReminders } from '../../storage/reminderStorage';
import { GrabHandle } from '../icons/ActionIcons';

interface AddReminderModalProps {
  visible: boolean;
  onClose: () => void;
}

const DURATION_OPTIONS = [
  { label: 'One-time', value: 0 },
  { label: '1 Day', value: 24 * 60 * 60 * 1000 },
  { label: '7 Days', value: 7 * 24 * 60 * 60 * 1000 },
  { label: '1 Month', value: 30 * 24 * 60 * 60 * 1000 },
];

const AddReminderModal = ({ visible, onClose }: AddReminderModalProps) => {
  const [email, setEmail] = useState('');
  const [resetDuration, setResetDuration] = useState<number>(0);
  const dispatch = useAppDispatch();
  const reminders = useAppSelector(state => state.reminder.reminders);

  const handleSave = async () => {
    if (!email.trim()) return;
    if (!email.includes('@')) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    const newReminder = {
      id: Date.now().toString(),
      email: email.trim(),
      createdAt: Date.now(),
      isAvailable: true,
      isUsed: false,
      resetDuration,
      availableAt: null,
    };

    dispatch(addReminder(newReminder));

    const updated = [...reminders, newReminder];
    await saveReminders(updated);

    setEmail('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <GrabHandle />
          
          <View style={styles.content}>
            <Text style={styles.title}>New Reminder</Text>
            <Text style={styles.subtitle}>Enter the email address to receive reminders.</Text>

            <TextInput
              placeholder="name@example.com"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus
            />

            <Text style={styles.label}>Reset Duration</Text>
            <View style={styles.durationContainer}>
              {DURATION_OPTIONS.map(option => (
                <TouchableOpacity
                  key={option.value}
                  style={[styles.durationChip, resetDuration === option.value && styles.durationChipSelected]}
                  onPress={() => setResetDuration(option.value)}
                >
                  <Text style={[styles.durationChipText, resetDuration === option.value && styles.durationChipTextSelected]}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.saveButton, !email.trim() && styles.disabledButton]}
                onPress={handleSave}
                disabled={!email.trim()}
              >
                <Text style={styles.saveButtonText}>Create Reminder</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingBottom: 32,
  },
  content: {
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#111827',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  durationContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  durationChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  durationChipSelected: {
    backgroundColor: '#EEF2FF',
    borderColor: '#6366F1',
  },
  durationChipText: {
    fontSize: 14,
    color: '#4B5563',
    fontWeight: '500',
  },
  durationChipTextSelected: {
    color: '#4F46E5',
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  cancelButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  saveButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  disabledButton: {
    backgroundColor: '#93C5FD',
    elevation: 0,
    shadowOpacity: 0,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default AddReminderModal;
