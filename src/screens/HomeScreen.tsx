import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useAppSelector } from '../app/hooks';
import AddReminderModal from '../components/modals/AddReminderModal';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const reminders = useAppSelector(state => state.reminder.reminders);

  return (
    <View className="flex-1 bg-gray-100 px-4 pt-6">
      {/* Header */}
      <Text className="text-2xl font-bold text-gray-900">
        Antigravity Reminder
      </Text>

      {/* Total Count */}
      <View className="mt-4">
        <Text className="text-lg text-gray-600">
          Total Reminders: {reminders.length}
        </Text>
      </View>

      {/* Add Button */}
      <TouchableOpacity
        className="mt-6 bg-blue-500 py-3 rounded-xl items-center"
        onPress={() => setModalVisible(true)}
      >
        <Text className="text-white font-semibold text-lg">Add Reminder</Text>
      </TouchableOpacity>

      {/* List */}
      <View className="flex-1">
        <FlatList
          data={reminders}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingTop: 20 }}
          renderItem={({ item }) => (
            <View className="bg-white p-4 mb-3 rounded-xl shadow-sm">
              <Text className="text-gray-900 font-semibold">{item.email}</Text>
              <Text className="text-gray-400 text-sm">
                {new Date(item.createdAt).toLocaleString()}
              </Text>
            </View>
          )}
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center mt-20">
              <Text className="text-gray-400">No reminders yet</Text>
            </View>
          }
        />
      </View>

      <AddReminderModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

export default HomeScreen;
