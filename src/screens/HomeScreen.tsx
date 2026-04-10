import { Button, Text, View } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigation/AppNavigator'

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>

const HomeScreen = ({navigation}:HomeScreenProps) => {
  return (
    <View>
      <Text className='text-red-600'>HomeScreen</Text>
      <Button title="Add Reminder" onPress={() => navigation.navigate('AddReminder')} />
    </View>
  )
}

export default HomeScreen