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
'1024477844174-dfed5plu8jbns3b4v854p7gpafu3qtdt.apps.googleusercontent.com',
  forceCodeForRefreshToken:true,
  offlineAccess:true,
  // iosClientId:"1024477844174-0k6a1r6v6b5j5q1bq7v7j9b5k9j2b7v7.apps.googleusercontent.com",
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



// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import SocialLogin from './SocialLogin';
// import { AuthProvider } from './screen/AuthContext';
// import HomeScreen from './screen/HomeScreen'; 
// import { GoogleSignin } from '@react-native-google-signin/google-signin';

// GoogleSignin.configure({
//   webClientId:"1024477844174-dfed5plu8jbns3b4v854p7gpafu3qtdt.apps.googleusercontent.com",
//   offlineAccess: true,
// });
// const Stack = createStackNavigator();

// const AppPro = () => {
//   return (
//     <AuthProvider>
//       <NavigationContainer>
//         <Stack.Navigator>
//           <Stack.Screen name="Login" component={SocialLogin} />
//           <Stack.Screen name="Home" component={HomeScreen} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </AuthProvider>
//   );
// };

// export default AppPro;
