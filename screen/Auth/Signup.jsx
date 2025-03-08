import { Image, StyleSheet, TouchableOpacity, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { Formik } from 'formik';
import { SignupInitialValue, SignupValidationSchema } from './utils';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const  Signup = () => {
 const navigation = useNavigation();
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
   const handleSignup = (values) => {
    console.log("Signup Details:");
    console.log("Username:", values.Username);
    console.log("Password:", values.password);
    console.log("Confirm Password:", values.confirmPassword);
    console.log("Mobile Number:", values.number);
  };
  

  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={styles.headingTitle}>Sign up with your mobile number</Text>
      <Formik
        initialValues={SignupInitialValue}
        validationSchema={SignupValidationSchema}
        onSubmit={handleSignup}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
        }) => (
          <View>
            <Text style={styles.Title}>Enter email</Text>
            <TextInput
              style={styles.textinput}
              placeholder="Username"
              onChangeText={handleChange('Username')}
              onBlur={handleBlur('Username')}
              value={values.Username}
            />
            {errors.Username && touched.Username && (
              <Text style={{ color: 'red', paddingLeft: 15 }}>
                {errors.Username}
              </Text>
            )}
            <Text style={styles.Title}>Create password</Text>
          <View style={{ position: 'relative' }}>
            <TextInput
              style={styles.textinput}
              placeholder="Password"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry={true}
            />
              <TouchableOpacity
                style={styles.hidePasswordIcon}
                onPress={() => setHidePassword(!hidePassword)}>
                <Icon
                  name={hidePassword ? 'eye-off-outline' : 'eye-outline'}
                  size={24}
                  color={'#333'}
                />
              </TouchableOpacity>
            </View>
            {errors.password && touched.password && (
              <Text style={{ color: 'red', paddingLeft: 15 }}>
                {errors.password}
              </Text>
            )}
            <Text style={styles.Title}>Confirm password</Text>
          <View style={{ position: 'relative' }}>
            <TextInput
              style={styles.textinput}
              placeholder="Confirm Password"
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
              secureTextEntry={true}
            />
              <TouchableOpacity
                style={styles.hidePasswordIcon}
                onPress={() => setHideConfirmPassword(!hideConfirmPassword)}>
                <Icon
                  name={hideConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={24}
                  color={'#333'}
                />
              </TouchableOpacity> 
            </View>
            {errors.confirmPassword && touched.confirmPassword && (
              <Text style={{ color: 'red', paddingLeft: 15 }}>
                {errors.confirmPassword}
              </Text>
            )}
            <Text style={styles.Title}>Mobile Number</Text>
            <TextInput
              style={styles.textinput}
              placeholder="Mobile Number"
              onChangeText={handleChange('number')}
              onBlur={handleBlur('number')}
              value={values.number}
              keyboardType="number-pad"
              maxLength={10}
            />
            {errors.number && touched.number && (
              <Text style={{ color: 'red', paddingLeft: 15 }}>
                {errors.number}
              </Text>
            )}
            <TouchableOpacity onPress={() =>{[ navigation.navigate('HomeScreen'),{handleSubmit}]}}>
            {/* <TouchableOpacity onPress={handleSubmit}> */}
              <Text style={styles.signupText}>Sign up</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <Text>Have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={{ color: '#3797FE' }}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headingTitle: {
    fontSize: 22,
    fontWeight: '700',
    margin: 20,
    height: 50,
  },
  textinput: {
    justifyContent: 'center',
    borderColor: 'grey',
    width: 350,
    alignSelf: 'center',
    margin: 5,
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  signupText: {
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 18,
    backgroundColor: '#3797FE',
    width: 350,
    height: 50,
    margin: 10,
    padding: 10,
    borderRadius: 8,
  },
  Title: {
    fontSize: 15,
    margin: 4,
    paddingLeft: 5,
  },
  hidePasswordIcon: {
    position: 'absolute',
    right: 20,
    top: 15,
  },
});

export default Signup;
