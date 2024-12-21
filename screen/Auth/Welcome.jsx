import { StyleSheet,Image, View } from 'react-native'
import React from 'react'

const Welcome = () => {
  return (
    <View style={{alignItems:'center',justifyContent:'center'}}>
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