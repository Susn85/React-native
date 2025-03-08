import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import EditProfile from './Profile/EditProfile';
import Profile from './Profile/Profile';

const ProfileScreen = () => {
  return (
    <View >
      <Profile/>
      <EditProfile/>
    </View>
  );
};

const styles = StyleSheet.create({
 
});

export default ProfileScreen;
