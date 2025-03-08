import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import UploadReels from './Upload/UploadReels';
import ReelsVideo from './Upload/ReelsVideo';


const UploadScreen = () => {
  return (
    <View>
      <UploadReels/>
      <ReelsVideo/>
    </View>
  );
};

const styles = StyleSheet.create({

});

export default  UploadScreen 

