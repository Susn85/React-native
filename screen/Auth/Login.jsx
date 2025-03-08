import { Image, StyleSheet, TouchableOpacity, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { Formik } from 'formik';
import { LoginInitialValue, LoginValidationSchema } from './utils';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import  {signInWithGoogle}  from '../../SocialLogin';
import { useDispatch } from 'react-redux';

const SocialButton = ({ text, iconSource, onPress }) => {
  return (
    <TouchableOpacity style={styles.socialButton} onPress={onPress}>
      <Image source={iconSource} style={styles.socialIcon} />
      <Text style={styles.ButtonText}>{text}</Text>
    </TouchableOpacity>
  );
};
const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [hidePassword, setHidePassword] = useState(true);

  const handleLogin = (values) => {
    console.log("Login Details:");
    console.log("Username:", values.Username);
    console.log("Password:", values.password);
  };

  return (
    <View style={{ alignItems: 'center' }}>
      <Image style={styles.image} source={require('../../src/assets/Susan.png')} />
      <Formik
        initialValues={LoginInitialValue}
        validationSchema={LoginValidationSchema}
        onSubmit={handleLogin}
      >
        {({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (
          <View>
            <TextInput
              style={styles.textinput}
              placeholder="Email address or Phone number"
              onChangeText={handleChange('Username')}
              onBlur={handleBlur('Username')}
              value={values.Username}
            />
            {errors.Username && touched.Username && (
              <Text style={{ color: 'red', paddingLeft: 15 }}>{errors.Username}</Text>
            )}
            <View style={{ position: 'relative' }}>
              <TextInput
                style={styles.textinput}
                placeholder="Password"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry={hidePassword}
              />
              <TouchableOpacity
                style={styles.hidePasswordIcon}
                onPress={() => setHidePassword(!hidePassword)}
              >
                <Icon
                  name={hidePassword ? 'eye-off-outline' : 'eye-outline'}
                  size={24}
                  color={'#333'}
                />
              </TouchableOpacity>
            </View>
            {errors.password && touched.password && (
              <Text style={{ color: 'red', paddingLeft: 15 }}>{errors.password}</Text>
            )}
              {/* <TouchableOpacity onPress={() =>{[ navigation.navigate('HomeScreen'),{handleSubmit}]}}> */}
              <TouchableOpacity onPress={handleSubmit}>
              <Text style={styles.signInText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </TouchableOpacity>
            <View style={styles.bottomSection}>
            <SocialButton
                text="Continue with Google"
                iconSource={require('../../src/assets/7123025_logo_google_g_icon.png')}
                // onPress={() => SignInWithGoogle()}
                onPress={async () => await dispatch(signInWithGoogle())}
              />
              <SocialButton
                text="Continue with Facebook"
                iconSource={require('../../src/assets/facebook.png')}
                onPress={() => console.log('Facebook Sign-In pressed')}
              />
               </View>
          </View>
        )}
      </Formik>
      <View style={{ flexDirection: 'row',alignItems:'flex-end',justifyContent: 'flex-end', marginTop: 170 }}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={{ color: '#3797FE' }}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
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
    color:'black'
  },
  ButtonText:{
    color:'black',
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
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    width: 350,
    height: 50,
    margin: 10,
    borderRadius: 8,
    borderWidth: 1, 
    borderColor: '#ddd',
  },
  socialIcon: {
    width: 34,
    height: 34,
    marginRight: 10,
  },
  s3Button: {
    color: 'white',
  },
  bottomSection: {
    marginTop: 20,
  },
});

export default Login;




// import React, { useState } from 'react';
// import { Image, StyleSheet, TouchableOpacity, Text, TextInput, View } from 'react-native';
// import { Formik } from 'formik';
// import { LoginInitialValue, LoginValidationSchema } from './utils';
// import { useNavigation } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { SignInWithGoogle } from '../../SocialLogin';
// import { useDispatch } from 'react-redux';

// const SocialButton = ({ text, iconSource, onPress }) => (
//   <TouchableOpacity style={styles.socialButton} onPress={onPress}>
//     <Image source={iconSource} style={styles.socialIcon} />
//     <Text style={styles.s3Button}>{text}</Text>
//   </TouchableOpacity>
// );

// const Login = () => {
//   const navigation = useNavigation();
//   const dispatch = useDispatch();
//   const [hidePassword, setHidePassword] = useState(true);

//   const handleLogin = (values) => {
//     console.log('Login Details:', values);
//   };

//   return (
//     <View style={{ alignItems: 'center' }}>
//       <Image style={styles.image} source={require('../../src/assets/Susan.png')} />
//       <Formik
//         initialValues={LoginInitialValue}
//         validationSchema={LoginValidationSchema}
//         onSubmit={handleLogin}
//       >
//         {({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (
//           <View>
//             <TextInput
//               style={styles.textinput}
//               placeholder="Email address or Phone number"
//               onChangeText={handleChange('Username')}
//               onBlur={handleBlur('Username')}
//               value={values.Username}
//             />
//             {errors.Username && touched.Username && (
//               <Text style={{ color: 'red', paddingLeft: 15 }}>{errors.Username}</Text>
//             )}
//             <View style={{ position: 'relative' }}>
//               <TextInput
//                 style={styles.textinput}
//                 placeholder="Password"
//                 onChangeText={handleChange('password')}
//                 onBlur={handleBlur('password')}
//                 value={values.password}
//                 secureTextEntry={hidePassword}
//               />
//               <TouchableOpacity
//                 style={styles.hidePasswordIcon}
//                 onPress={() => setHidePassword(!hidePassword)}
//               >
//                 <Icon
//                   name={hidePassword ? 'eye-off-outline' : 'eye-outline'}
//                   size={24}
//                   color={'#333'}
//                 />
//               </TouchableOpacity>
//             </View>
//             {errors.password && touched.password && (
//               <Text style={{ color: 'red', paddingLeft: 15 }}>{errors.password}</Text>
//             )}
//             <TouchableOpacity onPress={handleSubmit}>
//               <Text style={styles.signInText}>Login</Text>
//             </TouchableOpacity>
//             <TouchableOpacity>
//               <Text style={styles.forgotPasswordText}>Forgot password?</Text>
//             </TouchableOpacity>
//             <SocialButton
//               text="Continue with Google"
//               // iconSource={require('../../src/assets/7123025_logo_google_g_icon.png')}
//               onPress={() => SignInWithGoogle()}
//             />
//             <SocialButton
//               text="Continue with Facebook"
//               // iconSource={require('../../src/assets/facebook.png')}
//               onPress={() => console.log('Facebook Sign-In pressed')}
//             />
//           </View>
//         )}
//       </Formik>
//       <View style={{ flexDirection: 'row', marginTop: 240 }}>
//         <Text>Don't have an account? </Text>
//         <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
//           <Text style={{ color: '#3797FE' }}>Sign up</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//       image: {
//         width: 400,
//         height: 200,
//       },
//       textinput: {
//         justifyContent: 'center',
//         borderColor: 'grey',
//         width: 350,
//         height: 50,
//         alignSelf: 'center',
//         margin: 5,
//         padding: 10,
//         borderWidth: 1,
//         borderRadius: 5,
//       },
//       signInText: {
//         color: 'white',
//         textAlign: 'center',
//         alignSelf: 'center',
//         fontSize: 18,
//         backgroundColor: '#3797FE',
//         width: 350,
//         height: 50,
//         margin: 10,
//         padding: 10,
//         borderRadius: 8,
//       },
//       forgotPasswordText: {
//         color: '#3797FE',
//         marginTop: 5,
//       },
//       hidePasswordIcon: {
//         position: 'absolute',
//         right: 20,
//         top: 15,
//       },
//       socialButton: {
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: '#f5f5f5',
//         width: 350,
//         height: 50,
//         margin: 10,
//         borderRadius: 8,
//         borderColor: '#ddd',
//       },
// });

// export default Login;




// import React from 'react';
// import { StyleSheet, View, Text } from 'react-native';
// import SocialLogin from './SocialLogin';

// const Login = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Welcome to the App!</Text>
//       <SocialLogin />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
// });

// export default Login;
