import { Image, StyleSheet, TouchableOpacity, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { Formik } from 'formik';
import { LoginInitialValue, LoginValidationSchema } from './utils';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const Login = () => {
 const navigation = useNavigation();
  const [hidePassword, setHidePassword] = useState(true);

  const handleLogin = (values) => {
    console.log("Login Details:");
    console.log("Username:", values.Username);
    console.log("Password:", values.password);
  };
  
  return (
    <View style={{ alignItems: 'center' }}>
      <Image
        style={styles.image}
        source={require('../../src/assets/Susan.png')}
      />
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
        }) => (
          <View>
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
            <TextInput
              style={styles.textinput}
              placeholder="Password"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry={hidePassword}
            />
            {errors.password && touched.password && (
              <Text style={{ color: 'red', paddingLeft: 15 }}>
                {errors.password}
              </Text>
            )}
            <TouchableOpacity
              style={styles.hidePasswordIcon}
              onPress={() => setHidePassword(!hidePassword)}
            >
              <Icon
                name={hidePassword ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color={hidePassword ? '#333' : '#318bfb'}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSubmit}>
              <Text style={styles.signInText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity  onPress={() => navigation.navigate('Signup')}>
          <Text style={{ color: '#3797FE' }}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    margin: 4,
    width: 400,
    height: 200,
  },
  textinput: {
    justifyContent: 'center',
    borderColor: 'grey',
    width: 350,
    height: 50,
    alignSelf: 'center',
    margin: 5,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  signInText: {
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
  forgotPasswordText: {
    color: '#3797FE',
    marginTop: 5,
  },
  hidePasswordIcon: {
    position: 'absolute',
    right: 20,
    top: 15,
  },
});

export default Login;
