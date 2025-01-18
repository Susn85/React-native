import React from 'react'
import StackNavigation from './navigator/StackNavigation'
import {GoogleSignin} from '@react-native-google-signin/google-signin'

GoogleSignin.configure({
  webClientId:
  "1024477844174-dfed5plu8jbns3b4v854p7gpafu3qtdt.apps.googleusercontent.com",
  forceCodeForRefreshToken:true,
//  androidClientId:
//  "1024477844174-bskb1vm43f2jioqugvireagtcm30bmas.apps.googleusercontent.com"
})
const AppPro = () => {
  return (
    <StackNavigation/>
  );
};

export default AppPro;

