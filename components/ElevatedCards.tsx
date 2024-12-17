import { ScrollView,StyleSheet, Text, View } from 'react-native'
import React from 'react'

 function ElevatedCards() {
  return (
    <View>
      <Text style={styles.headingText}>ElevatedCards</Text>
      <ScrollView horizontal={true} style={styles.container}>
           <View style={[styles.card,styles.cardElevated]}>
               <Text>me</Text>
           </View>
           <View style={[styles.card,styles.cardElevated]}>
               <Text>To</Text>
           </View>
           <View style={[styles.card,styles.cardElevated]}>
               <Text>Scroll</Text>
           </View> 
           <View style={[styles.card,styles.cardElevated]}>
               <Text>more....</Text>
               <View style={[styles.card,styles.cardElevated]}>
                 <Text></Text>
               </View>
           </View>    
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    headingText:{ 
        fontSize:24,
        fontWeight:'bold',
        paddingHorizontal:8,
  
      },
      container:{
        padding:8
      },
      card:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        width:100,
        height:100,
        borderRadius:100 / 2,
        margin:8,
      },
      cardElevated:{
        backgroundColor:'#CAD5E2',
        elevation:4,
        shadowOffset:{
          width:100,
          height:100,
        },
        shadowColor:'#333',
        shadowOpacity: 0.4,
        shadowRadius: 2,

      }
      
})
export default ElevatedCards;