import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

import notifee, { EventType } from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

notifee.onBackgroundEvent(async ({ type, detail }) => {
  const reminderId = detail.notification?.id;

  if (!reminderId) return;

  // 👇 CASE 1: user taps notification
  if (type === EventType.PRESS) {
    await AsyncStorage.setItem('pendingNavigation', reminderId);
  }

  // 👇 CASE 2: user presses action button
  if (type === EventType.ACTION_PRESS) {
    if (detail.pressAction.id === 'mark-used') {

      // OPTION A (simple): store intent
      await AsyncStorage.setItem(
        'pendingAction',
        JSON.stringify({
          type: 'mark-used',
          id: reminderId,
        })
      );

      // OPTION B (advanced): directly update storage (we’ll discuss later)
    }
  }
});

AppRegistry.registerComponent(appName, () => App);