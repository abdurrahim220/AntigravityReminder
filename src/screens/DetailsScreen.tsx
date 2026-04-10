import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigation/AppNavigator'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { deleteReminder } from '../features/reminder/reminderSlice'
import { saveReminders } from '../storage/reminderStorage'

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>

const DetailsScreen = ({ route, navigation }: Props) => {
  const { id } = route.params

  const dispatch = useAppDispatch()
  const reminders = useAppSelector(state => state.reminder.reminders)

  const reminder = reminders.find(r => r.id === id)

  if (!reminder) {
    return <Text>Reminder not found</Text>
  }

  const handleDelete = async () => {
    const updated = reminders.filter(r => r.id !== id)

    dispatch(deleteReminder(id))
    await saveReminders(updated)

    navigation.goBack()
  }

  return (
    <View className="flex-1 p-4 bg-white">

      <Text className="text-xl font-bold mb-4">Details</Text>

      <Text className="text-lg">{reminder.email}</Text>
      <Text className="text-gray-400 mt-2">
        {new Date(reminder.createdAt).toLocaleString()}
      </Text>

      <TouchableOpacity
        className="mt-6 bg-red-500 p-3 rounded-xl"
        onPress={handleDelete}
      >
        <Text className="text-white text-center font-semibold">
          Delete
        </Text>
      </TouchableOpacity>

    </View>
  )
}

export default DetailsScreen