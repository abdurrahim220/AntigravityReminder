

import { store } from './src/app/store';
import { Provider } from 'react-redux';
import RootLayout from './src/components/RootLayout';
import 'react-native-gesture-handler';
function App() {
  
  return (
    <Provider store={store}>
      
     <RootLayout/>
    </Provider>
  );
}



export default App;
