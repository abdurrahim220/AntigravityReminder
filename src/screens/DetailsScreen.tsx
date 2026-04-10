import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Alert, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { deleteReminder } from '../features/reminder/reminderSlice';
import { saveReminders } from '../storage/reminderStorage';
import {  TrashIcon, EditIcon } from '../components/icons/ActionIcons';
import EditReminderModal from '../components/modals/EditReminderModal';
import { SafeAreaProvider } from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

const DetailsScreen = ({ route, navigation }: Props) => {
  const { id } = route.params;
  const [editModalVisible, setEditModalVisible] = useState(false);

  const dispatch = useAppDispatch();
  const reminders = useAppSelector(state => state.reminder.reminders);
  const reminder = reminders.find(r => r.id === id);

  if (!reminder) {
    return (
      <SafeAreaProvider style={styles.safeArea}>
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>Reminder not found</Text>
          {/* <TouchableOpacity 
            style={styles.backButtonCenter}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity> */}
        </View>
      </SafeAreaProvider>
    );
  }

  const handleDelete = () => {
    Alert.alert(
      'Delete Reminder',
      'Are you sure you want to delete this reminder permanentely?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            const updated = reminders.filter(r => r.id !== id);
            dispatch(deleteReminder(id));
            await saveReminders(updated);
            navigation.goBack();
          }
        },
      ]
    );
  };

  return (
    <SafeAreaProvider style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Info Card */}
        <View style={styles.card}>
          <View style={styles.infoSection}>
            <Text style={styles.label}>REMINDER FOR</Text>
            <Text style={styles.emailText}>{reminder.email}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoSection}>
            <Text style={styles.label}>SCHEDULED AT</Text>
            <Text style={styles.dateText}>
              {new Date(reminder.createdAt).toLocaleDateString(undefined, {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </Text>
            <Text style={styles.timeText}>
              {new Date(reminder.createdAt).toLocaleTimeString(undefined, {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </Text>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionContainer}>
          <TouchableOpacity 
            onPress={() => setEditModalVisible(true)}
            style={styles.editButton}
          >
            <EditIcon size={20} color="#FFFFFF" />
            <Text style={styles.editButtonText}>Edit Details</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={handleDelete}
            style={styles.deleteButton}
          >
            <TrashIcon size={20} color="#EF4444" />
            <Text style={styles.deleteButtonText}>Delete Reminder</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <EditReminderModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        reminder={reminder}
      />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  iconButton: {
    padding: 8,
    borderRadius: 12,
  },
  placeholder: {
    width: 40,
  },
  scrollContent: {
    padding: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    marginBottom: 32,
  },
  infoSection: {
    marginVertical: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: '800',
    color: '#9CA3AF',
    letterSpacing: 1,
    marginBottom: 8,
  },
  emailText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 16,
  },
  dateText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '600',
  },
  timeText: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  actionContainer: {
    gap: 16,
  },
  editButton: {
    flexDirection: 'row',
    backgroundColor: '#2563EB',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    elevation: 2,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  deleteButton: {
    flexDirection: 'row',
    backgroundColor: '#FEF2F2',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  deleteButtonText: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: '700',
  },
  notFoundContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notFoundText: {
    fontSize: 18,
    color: '#6B7280',
    marginBottom: 20,
  },
  backButtonCenter: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});

export default DetailsScreen;