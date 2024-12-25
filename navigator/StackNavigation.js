import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screen/Auth/Login';
import Signup from '../screen/Auth/Signup';
import Welcome from '../screen/Auth/Welcome';
import HomeScreen from '../screen/HomeScreen';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false  }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{headerShown: false }}
        />
        <Stack.Screen
        name='HomeScreen'
        component={HomeScreen}
        options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
