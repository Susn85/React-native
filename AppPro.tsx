import { View, Text,ScrollView,StyleSheet,Image } from 'react-native'
import React from 'react'
import { SafeAreaProvider,SafeAreaView } from 'react-native-safe-area-context';
import StackNavigation from './navigator/StackNavigation'
import Welcome from './screen/Auth/Welcome';
import Signup from './screen/Auth/Signup';
import Login from './screen/Auth/Login';

const AppPro = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
       <View>
        {/* <Login/> */}
         {/* <Signup/> */}
         <StackNavigation/>
       </View>
     </SafeAreaView>
   </SafeAreaProvider>
  );
};

export default AppPro;

