
import { navigationRef } from './navigationRef';

export const waitForNavigation = async (id: string) => {
  let attempts = 0;

  while (!navigationRef.isReady() && attempts < 10) {
    await new Promise(res => setTimeout(res, 100));
    attempts++;
  }

  if (navigationRef.isReady()) {
    navigationRef.navigate('Details', { id });
  }
};