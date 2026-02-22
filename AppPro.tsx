import { useEffect } from 'react';
import StackNavigation from './navigator/StackNavigation'
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import store, { persistor } from './redux/Store' 
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Platform, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate} from 'redux-persist/integration/react';


GoogleSignin.configure({
  webClientId:
   'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
  forceCodeForRefreshToken:true,
  offlineAccess:true,
});
const AppPro = () => {
  return (
    <GestureHandlerRootView style={{flex:1}}>
      <StatusBar translucent={Platform.OS === 'ios'} 
       backgroundColor="transparent"
       />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StackNavigation />
        </PersistGate>
       </Provider>
     </GestureHandlerRootView>
  );
};

export default AppPro;
