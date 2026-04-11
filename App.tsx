import { store } from './src/app/store';
import { Provider } from 'react-redux';
import RootLayout from './src/components/RootLayout';
import 'react-native-gesture-handler';
import notifee, { EventType } from '@notifee/react-native';
import { useEffect } from 'react';
import { navigationRef } from './src/navigation/navigationRef';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { toggleReminderAndPersist } from './src/features/reminder/reminderSlice';
import { waitForNavigation } from './src/navigation/navigationService';

function App() {
  useEffect(() => {
    async function setupNotifications() {
      await notifee.requestPermission();

      await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });
    }

    setupNotifications();
  }, []);
  useEffect(() => {
    const unsubscribe = notifee.onForegroundEvent(({ type, detail }) => {
      const reminderId = detail.notification?.id;

      if (!reminderId) return;

      if (type === EventType.PRESS) {
        if (navigationRef.isReady()) {
          navigationRef.navigate('Details', { id: reminderId });
        }
      }

      if (type === EventType.ACTION_PRESS) {
        if (detail.pressAction?.id === 'mark-used') {
          store.dispatch(toggleReminderAndPersist(reminderId));
        }
      }
    });

    return unsubscribe;
  }, []);
  useEffect(() => {
    async function handlePendingNavigation() {
      const reminderId = await AsyncStorage.getItem('pendingNavigation');

      if (reminderId && navigationRef.isReady()) {
        navigationRef.navigate('Details', { id: reminderId });
        await waitForNavigation(reminderId);``
        await AsyncStorage.removeItem('pendingNavigation');
      }
    }

    handlePendingNavigation();
  }, []);

  useEffect(() => {
    async function handlePendingAction() {
      const actionStr = await AsyncStorage.getItem('pendingAction');

      if (!actionStr) return;

      const action = JSON.parse(actionStr);

      if (action.type === 'mark-used') {
        store.dispatch(toggleReminderAndPersist(action.id));
      }

      await AsyncStorage.removeItem('pendingAction');
    }

    handlePendingAction();
  }, []);
  return (
    <Provider store={store}>
      <RootLayout />
    </Provider>
  );
}

export default App;
