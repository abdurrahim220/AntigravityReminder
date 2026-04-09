

import { store } from './src/app/store';
import { Provider } from 'react-redux';
import RootLayout from './src/components/RootLayout';

function App() {
  
  return (
    <Provider store={store}>
      
     <RootLayout/>
    </Provider>
  );
}



export default App;
