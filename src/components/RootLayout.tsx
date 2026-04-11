import React from 'react'

import AppNavigator from '../navigation/AppNavigator'
import { useAppDispatch } from '../app/hooks'
import { useEffect } from 'react'
import { loadReminders } from '../storage/reminderStorage'
import { setReminders, checkAutoResetsAndPersist } from '../features/reminder/reminderSlice'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const RootLayout = () => {
  const dispatch = useAppDispatch()

  useEffect(()=>{
    const loadData = async()=>{
      const reminders = await loadReminders()
      dispatch(setReminders(reminders))
    }
    loadData()

    // Global background poller for auto-resets
    const interval = setInterval(() => {
      dispatch(checkAutoResetsAndPersist());
    }, 60000); // Check every minute
    
    return () => clearInterval(interval);
  },[dispatch])
  return (
    <SafeAreaProvider>
      <AppNavigator/>
    </SafeAreaProvider>
  )
}

export default RootLayout