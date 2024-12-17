import { StyleSheet, Text,Image, View } from 'react-native'
import React from 'react'
import {NativeStackScreenProps} from "@react-navigation/native-stack"


const Welcome = () => {
  return (
    <View style={{flex:0.2,alignItems:'center',justifyContent:'center'}}>
      <Image
            style={styles.image}
            source={require('../../src/assets/Susan.png')}/>
    </View>
  )
}
const styles = StyleSheet.create({
    image:{
      margin:4,
      width:400,
      height: 200, 
    },
})
export default Welcome