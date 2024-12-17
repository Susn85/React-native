import { StyleSheet, Text, View , } from 'react-native'
import React from 'react'
 
function Flatcard(){
  return (
    <View>
      <Text style={styles.headingText}>Flat Cards</Text>
      <View style={styles.container}> 
      <View style={[styles.card, styles. cardOne]}>
                   <Text>red</Text>
                 </View>
                 <View style={[styles.card, styles. cardTwo]}>
                   <Text>blue</Text>
                 </View>
                 <View style={[styles.card, styles. cardthree]}>
                   <Text>Green</Text>
                 </View>
         </View>
    </View>
  )
  }

const styles = StyleSheet.create({
    headingText:{ 
      fontSize:24,
      fontWeight:'bold',
      paddingHorizontal:8

    },
    container:{
      flex: 1,
      flexDirection:'row',
      padding: 8,
    },
    card: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width:100,
      height:100,
      borderRadius:4,
      margin:8
    },
    cardOne:{
      backgroundColor:'red',

    },
    cardTwo:{
      backgroundColor:'blue',

    },
    cardthree:{
      backgroundColor:'green',

    },
})
export default Flatcard;
