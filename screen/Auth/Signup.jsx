import { Image, StyleSheet,TouchableOpacity, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Formik } from 'formik'
import { SignupInitialValue, SignupValidationSchema } from './utils'


const Signup = () => {
  const handleSignup = () => {
    console.log(values);
  }
  return (
    <View style={{flex:1,alignItems:'center'}}>
      <Text style={styles.headingTitle}>Sign up to your mobile number</Text>
        <Formik 
        initialValues={SignupInitialValue}
        validationSchema={SignupValidationSchema}
        onSubmit={handleSignup}>
          {({
            onSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            errors,
            isValid,
          }) => {
            return(
              <View>
                <Text style={styles.Title}>Enter email</Text>
                <TextInput
                  style={styles.textinput}
                  placeholder={'Username'}
                  onchangeText={handleChange('Username')}
                  onBlur={handleBlur('Username')}
                  value={values.Username}
                  // onSubmit={onSubmit.Username}
                  touched={touched.Username}
                  errors={errors.Username}
               />
              {errors.Username && touched.Username && <Text style={{color:'red',paddingLeft:15}}>{errors.Username}</Text>}
              <Text style={styles.Title}>Create password</Text>
              <TextInput
                  style={styles.textinput}
                  placeholder={'password'}
                  onchangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  values={values.password}
                  touched={touched.password}
                  // onSubmit={onSubmit.password}
                  errors={errors.password}
                  secureTextEntry={true}
               />
              {errors.password && touched.password && <Text style={{color:'red',paddingLeft:15}}>{errors.password}</Text>}
              <Text style={styles.Title}>confirm password</Text>
                 <TextInput
                  style={styles.textinput}
                  placeholder={'password'}
                   onchangeText={handleChange('password')}
                   onBlur={handleBlur('password')}
                   values={values.password}
                  //  onSubmit={onSubmit.password}
                   touched={touched.password}
                   errors={errors.password}
                   secureTextEntry={true}
                   keyboardType={'numeric'}
               />
             {errors.password && touched.password && <Text style={{color:'red',paddingLeft:15}}>{errors.password}</Text>}
             <Text style={styles.Title}>Mobile Number</Text>
             <TextInput
                  style={styles.textinput}
                  placeholder={'number'}
                  onchangeText={handleChange('number')}
                  onBlur={handleBlur('number')}
                  values={values.number}
                  touched={touched.number}
                  // onSubmit={onSubmit.number}
                  errors={errors.number}
                  keyboardType={'number-pad'}
                  maxLength={10}
               />
              {errors.number && touched.number && <Text style={{color:'red',paddingLeft:15}}>{errors.number}</Text>} 
               <TouchableOpacity >
                  <View>
                    <Text style={styles.signupText}type="Sign up">Sign up</Text>     
                 </View>
               </TouchableOpacity> 
                {/* <Sign up onPress={onSubmit}/>  */}
              </View>
            )
          }}
        </Formik>
           <View>
             <Text>Have an account ?
              <TouchableOpacity>
                <Text style={{color:'#3797FE'}}>Sign in</Text>
              </TouchableOpacity>
             </Text>
        </View>
     </View>
  )
}
const styles = StyleSheet.create({
    headingTitle:{
        fontSize:22,
        fontWeight:'700',
        margin:20,
    },
  textinput:{
      justifyContent:'center',
      borderColor:'grey',
      width:350,
      alignSelf:'center',
      margin:5,
      padding:10,
      borderWidth: 1,
      borderRadius: 5,
  },
  signupText:{
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
  Title:{
    fontSize:15,
    margin:4,
    paddingLeft:5
  }
})
export default Signup;