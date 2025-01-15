import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfileScreen from '../screen/ProfileScreen';
import ReelsScreen from '../screen/ReelsScreen';
import UploadScreen from '../screen/UploadScreen';
import UploadReels from '../screen/Upload/UploadReels';
import ChatScreen from '../screen/ChatScreen';
import Login from '../screen/Auth/Login';
import Signup from '../screen/Auth/Signup';
import Welcome from '../screen/Auth/Welcome';
import HomeScreen from '../screen/HomeScreen';
import DashBoard from '../screen/DashBoard';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Upload') {
            const iconName = focused ? 'plus-box' : 'plus-box-outline';
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          } else {
         let iconName;        
          if (route.name === 'DashBoard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Reels') {
            iconName = focused ? 'film' : 'film-outline';
          } else if (route.name === 'Upload') {
            iconName2 = focused ? 'plus-box' : 'plus-box-outline';
          } else if (route.name === 'Chat') {
            iconName = focused ? 'chatbox' : 'chatbox-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
         }
        },
        tabBarActiveTintColor: '#3797FE',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="DashBoard" component={DashBoard} />
      <Tab.Screen name="Reels" component={ReelsScreen} />
      <Tab.Screen name="Upload" component={UploadScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

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
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={TabNavigation} 
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UploadReels"
          component={UploadReels}
          options={{ headerShown: false }}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
