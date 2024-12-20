// import { TextInput, SafeAreaView,TouchableOpacity, Button ,StyleSheet, Text, View } from 'react-native'
// import React from 'react'


//  function login() {
//     const [text, OnChangeText]=React.useState('');
//     const [number, OnChangeNumber]=React.useState('');


//   return (
//     <SafeAreaView>
//        <View style ={styles.helloContainer}>
//        <Text style={styles.helloText}>welcome</Text>
//         </View>
//         <View>
//             <Text style={styles.signInText}>sign in your account</Text>
//           </View>
//           <Text style={styles.Email}>Email</Text>
//             <TextInput
//             style={styles.input}
//             onChangeText={OnChangeText}
//             value={text}
//              placeholder="email or mobile"
//             />
//              <Text style={styles.Email}>Password</Text>
//              <TextInput
//             style={styles.input}
//             onChangeText={OnChangeNumber}
//             value={number}
//             placeholder="password"
//             keyboardType="numeric"
//             />
//             <View style={styles.NextButton}>
//                 <Button
//                 title="Sign-in"
//                 />
//            <TouchableOpacity style={styles.Button}>
//            <Text style={styles.forgotbutton}>forgot password ?</Text>
//            </TouchableOpacity> 
//            <Text>Don't have an account ?</Text> 
//            <TouchableOpacity style={styles.Button}>
//            <Text style={styles.forgotbutton}>sign-up</Text>
//            </TouchableOpacity>    
//            </View> 
//     </SafeAreaView>
//   )
// }
// export default login
// const styles = StyleSheet.create({
//     helloContainer:{

//     },
//     helloText:{
//         fontSize:70,
//         textAlign:'center',
//         fontWeight:'500',
//         color:"#262626"
//     },
//     signInText:{
//      textAlign:"center",
//      fontSize:18,
//      color:"#262626"
//     },
//     Email:{
//      fontWeight:'bold',
//     padding:10,
//     },
//     NextButton:{
//     margin:1,
//     fontWeight:'bold',
//     marginHorizontal:6,
//     },
//     Button:{
//       margin:4,
//       padding:4,
//     },
//     forgotbutton:{
//       color:"#3782fa",
//       justifyContent:'space-between',
//     },
//     input:{
//     height:40,
//     margin:12,
//     borderWidth:2,
//     padding:10,
//     flex:1,
//     justifyContent:'center',
//     textAlign:'center',
//     }
// })