import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  return (
    <View className="flex-1 bg-gray-100 px-4 pt-6">
      {/* Header */}
      <Text className="text-2xl font-bold text-gray-900">
        Antigravity Reminder
      </Text>

      {/* Total Count */}
      <View className="mt-4">
        <Text className="text-lg text-gray-600">Total Reminders: 0</Text>
      </View>

      {/* Add Button */}
      <TouchableOpacity
        className="mt-6 bg-blue-500 py-3 rounded-xl items-center"
        onPress={() => navigation.navigate('AddReminder')}
      >
        <Text className="text-white font-semibold text-lg">Add Reminder</Text>
      </TouchableOpacity>

      {/* Empty State */}
      <View className="flex-1 items-center justify-center">
        <Text className="text-gray-400 text-base">No reminders yet</Text>
      </View>
    </View>
  );
};

export default HomeScreen;
