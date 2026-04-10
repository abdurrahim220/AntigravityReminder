import React from 'react'

import AppNavigator from '../navigation/AppNavigator'
import { useAppDispatch } from '../app/hooks'
import { useEffect } from 'react'
import { loadReminders } from '../storage/reminderStorage'
import { setReminders } from '../features/reminder/reminderSlice'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const RootLayout = () => {
  const dispatch = useAppDispatch()

  useEffect(()=>{
    const loadData = async()=>{
      const reminders = await loadReminders()
      dispatch(setReminders(reminders))
    }
    loadData()
  },[dispatch])
  return (
    <SafeAreaProvider>
      <AppNavigator/>
    </SafeAreaProvider>
  )
}

export default RootLayout