import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'

function FancyCard() {
  return (
    <View>
      <Image
       style={styles.stretch}
      source={require("../src/assets/Screenshot 2024-12-05 160459.png")}/>
      <Text style={styles.headingText}>Tranding places</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  headingText:{
 
  },
  stretch:{
    width: 100,
    height: 200,
    resizeMode: 'stretch',

  }
})
export default FancyCard