import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert, StyleSheet, StatusBar } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { deleteReminder, checkAutoResets } from '../features/reminder/reminderSlice';
import { saveReminders } from '../storage/reminderStorage';
import AddReminderModal from '../components/modals/AddReminderModal';
import EditReminderModal from '../components/modals/EditReminderModal';
import {  EditIcon, TrashIcon, PlusIcon } from '../components/icons/ActionIcons';
import { Reminder } from '../features/reminder/reminderTypes';
import { SafeAreaProvider } from 'react-native-safe-area-context';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingReminder, setEditingReminder] = useState<Reminder | null>(null);
  
  const dispatch = useAppDispatch();
  const reminders = useAppSelector(state => state.reminder.reminders);

  React.useEffect(() => {
    // Check auto resets when the component mounts or interval passes
    dispatch(checkAutoResets());
    const interval = setInterval(() => {
      dispatch(checkAutoResets());
    }, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [dispatch]);

  const handleDelete = (id: string, email: string) => {
    Alert.alert(
      'Delete Reminder',
      `Are you sure you want to delete the reminder for ${email}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            dispatch(deleteReminder(id));
            const updated = reminders.filter(r => r.id !== id);
            await saveReminders(updated);
          }
        },
      ]
    );
  };

  const handleEdit = (reminder: Reminder) => {
    setEditingReminder(reminder);
    setEditModalVisible(true);
  };

  return (
    <SafeAreaProvider style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Reminders</Text>
          <Text style={styles.headerSubtitle}>
            {reminders.length} {reminders.length === 1 ? 'task' : 'tasks'} scheduled
          </Text>
        </View>

        {/* List */}
        <FlatList
          data={reminders}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity 
              activeOpacity={0.7}
              onPress={() => navigation.navigate('Details', { id: item.id })}
              style={styles.card}
            >
              <View style={styles.cardContent}>
                <View style={styles.cardInfo}>
                  <View style={styles.emailRow}>
                    <View style={[styles.statusDot, item.isUsed ? styles.dotUsed : styles.dotAvailable]} />
                    <Text style={styles.emailText} numberOfLines={1}>
                      {item.email}
                    </Text>
                  </View>
                  <Text style={styles.dateText}>
                    {new Date(item.createdAt).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </Text>
                </View>

                {/* Action Buttons */}
                <View style={styles.actions}>
                  <TouchableOpacity 
                    onPress={() => handleEdit(item)}
                    style={[styles.actionButton, styles.editButtonBackground]}
                  >
                    <EditIcon size={16} color="#4F46E5" />
                  </TouchableOpacity>

                  <TouchableOpacity 
                    onPress={() => handleDelete(item.id, item.email)}
                    style={[styles.actionButton, styles.deleteButtonBackground]}
                  >
                    <TrashIcon size={16} color="#EF4444" />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIconCircle}>
                <TrashIcon size={48} color="#D1D5DB" />
              </View>
              <Text style={styles.emptyTitle}>Nothing here yet</Text>
              <Text style={styles.emptySubtitle}>Tap the + button to create your first reminder.</Text>
            </View>
          }
        />

        {/* FAB */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.fab}
          onPress={() => setAddModalVisible(true)}
        >
          <PlusIcon size={28} color="#FFFFFF" />
        </TouchableOpacity>

        <AddReminderModal
          visible={addModalVisible}
          onClose={() => setAddModalVisible(false)}
        />

        <EditReminderModal
          visible={editModalVisible}
          onClose={() => {
            setEditModalVisible(false);
            setEditingReminder(null);
          }}
          reminder={editingReminder}
        />
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 24,
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#111827',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 4,
  },
  listContent: {
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardInfo: {
    flex: 1,
    paddingRight: 12,
  },
  emailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotAvailable: {
    backgroundColor: '#10B981', // green
  },
  dotUsed: {
    backgroundColor: '#EF4444', // red
  },
  emailText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
  },
  dateText: {
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 4,
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButtonBackground: {
    backgroundColor: '#EEF2FF',
  },
  deleteButtonBackground: {
    backgroundColor: '#FEF2F2',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
    paddingHorizontal: 40,
  },
  emptyIconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 20,
  },
  fab: {
    position: 'absolute',
    bottom: 32,
    right: 20,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
});

export default HomeScreen;
