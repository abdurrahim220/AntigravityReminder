import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { deleteReminder } from '../features/reminder/reminderSlice';
import { saveReminders } from '../storage/reminderStorage';
import AddReminderModal from '../components/modals/AddReminderModal';
import EditReminderModal from '../components/modals/EditReminderModal';
import { EyeIcon, EditIcon, TrashIcon } from '../components/icons/ActionIcons';
import { Reminder } from '../features/reminder/reminderTypes';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingReminder, setEditingReminder] = useState<Reminder | null>(null);
  
  const dispatch = useAppDispatch();
  const reminders = useAppSelector(state => state.reminder.reminders);

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
    <View className="flex-1 bg-gray-50 px-4 pt-6">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-6">
        <View>
          <Text className="text-2xl font-bold text-gray-900">
            Antigravity
          </Text>
          <Text className="text-sm text-gray-500">
            Total Reminders: {reminders.length}
          </Text>
        </View>
        <TouchableOpacity
          className="bg-blue-600 px-4 py-2 rounded-xl shadow-sm"
          onPress={() => setAddModalVisible(true)}
        >
          <Text className="text-white font-bold">+ Add</Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      <FlatList
        data={reminders}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View className="bg-white p-4 mb-4 rounded-2xl shadow-sm border border-gray-100">
            <View className="flex-row justify-between items-center">
              <View className="flex-1 pr-4">
                <Text className="text-gray-900 font-bold text-lg" numberOfLines={1}>
                  {item.email}
                </Text>
                <Text className="text-gray-400 text-xs mt-1">
                  {new Date(item.createdAt).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </Text>
              </View>

              {/* Action Buttons */}
              <View className="flex-row items-center space-x-2">
                <TouchableOpacity 
                  onPress={() => navigation.navigate('Details', { id: item.id })}
                  className="p-2 bg-blue-50 rounded-full"
                >
                  <EyeIcon size={18} color="#2563EB" />
                </TouchableOpacity>

                <TouchableOpacity 
                  onPress={() => handleEdit(item)}
                  className="p-2 bg-indigo-50 rounded-full"
                >
                  <EditIcon size={18} color="#4F46E5" />
                </TouchableOpacity>

                <TouchableOpacity 
                  onPress={() => handleDelete(item.id, item.email)}
                  className="p-2 bg-red-50 rounded-full"
                >
                  <TrashIcon size={18} color="#EF4444" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center mt-20 opacity-40">
            <TrashIcon size={64} color="#D1D5DB" />
            <Text className="text-gray-500 mt-4 font-medium">No reminders found</Text>
          </View>
        }
      />

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
  );
};

export default HomeScreen;
