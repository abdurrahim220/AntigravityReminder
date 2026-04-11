import { store } from './src/app/store';
import { Provider } from 'react-redux';
import RootLayout from './src/components/RootLayout';
import 'react-native-gesture-handler';
import notifee, { EventType } from '@notifee/react-native';
import { useEffect } from 'react';
import { navigationRef } from './src/navigation/navigationRef';

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
    if (type === EventType.PRESS) {
      const reminderId = detail.notification?.id;

      if (reminderId && navigationRef.isReady()) {
        navigationRef.navigate('Details', { id: reminderId });
      }
    }
  });

  return unsubscribe;

}, []);
  return (
    <Provider store={store}>
      <RootLayout />
    </Provider>
  );
}

export default App;
