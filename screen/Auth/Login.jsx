import { Image, StyleSheet,TouchableOpacity, Text,onPress, TextInput, View } from 'react-native'
import React from 'react'
import { Formik } from 'formik'
import { LoginInitialValue, LoginValidationSchema } from './utils'
import { useNavigation } from '@react-navigation/native'


const Login = () => {
  // const navigation = useNavigation();
  const handleLogin = () => {
    console.log(values);
  }
  return (
    <View style={{flex:1,alignItems:'center'}}>
      <Image
      style={styles.image}
      source={require('../../src/assets/Susan.png')}/>
        <Formik 
        initialValues={LoginInitialValue}
        validationSchema={LoginValidationSchema}
        onSubmit={handleLogin}>
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            errors,
            isSubmitting,
          }) => {
            return(
              <View>
                <TextInput
                  style={styles.textinput}
                  placeholder={'Username'}
                  onchangeText={handleChange('Username')}
                  onBlur={handleBlur('Username')}
                  value={values.Usernme}
                  touched={touched.Username}
                  errors={errors.Username}
               />
              {errors.Username && touched.Username && <Text style={{color:'red',paddingLeft:15}}>{errors.Username}</Text>}
                 <TextInput
                  style={styles.textinput}
                  placeholder={'password'}
                   onchangeText={handleChange('password')}
                   onBlur={handleBlur('password')}
                   values={values.password}
                   touched={touched.password}
                   errors={errors.password}
                   secureTextEntry={true}
               />
                {/* <TouchableOpacity
                            style={styles.hidePasswordIcon}
                            // onPress={_onPressToggleHidePassword}
                        >
                            {  (
                                <Icon name="eye-off-outline" size={20}
                                    color="#333" />
                            )  (
                                    <Icon name="eye-outline" color="#318bfb"
                                        size={20} />
                                )
                            }
                        </TouchableOpacity> */}
             {errors.password && touched.password && <Text style={{color:'red',paddingLeft:15}}>{errors.password}</Text>} 
               <TouchableOpacity >
                  <View>
                    <Text style={styles.signInText}>Login</Text>     
                 </View>
               </TouchableOpacity> 
               <TouchableOpacity>
                <View>
                  <Text style={{color:'#3797FE'}}>forgot password</Text>
                </View>
               </TouchableOpacity>
              {/* <Login 
              //  onPress={handleSubmit}
               /> */}
              </View>
            )
          }}
        </Formik>
           <View>
             <Text>don't have an account ?
              <TouchableOpacity>
                <Text style={{color:'#3797FE'}}>sign up</Text>
              </TouchableOpacity>
             </Text>
        </View>
     </View>
  )
}
const styles = StyleSheet.create({
  image:{
    margin:4,
    width:400,
    height: 200,
  },
  hidePasswordIcon: {
    position: 'absolute',
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    right: 5,
    top: (44 - 30) / 2
},
  textinput:{
      justifyContent:'center',
      borderColor:'grey',
      width:350,
      height:50,
      alignSelf:'center',
      margin:5,
      padding:10,
      borderWidth: 1,
      borderRadius: 5,
  },
  signInText:{
    color:'white',
    textAlign:"center",
    alignSelf:'center',
    fontSize:18,
    backgroundColor:"#3797FE",
    width:350,
    height:50,
    margin:10,
    padding:10,
    borderRadius: 8,
  },
})
export default Login;