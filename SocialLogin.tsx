import React from 'react';
import { Alert } from 'react-native';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { GoogleSignin, statusCodes, } from '@react-native-google-signin/google-signin';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { token_storage } from './redux/Storage';
import { setUser } from './redux/reducers/userSlice';
import { LOGIN } from './redux/API';
import { resetAndNavigate } from './navigator/NavigationUtil';

interface RegisterData {
  id_token: string;
  email: string;
  name: string;
  provider: string;
  userImage: string;
}

const handleSignInSuccess = async (res: any, dispatch: any) => {
  token_storage.set('access_token', res.data.token.access_token);
  token_storage.set('refresh_token', res.data.token.refresh_token);
  await dispatch(setUser(res.data.user));
  resetAndNavigate('HomeScreen');
};

const handleSignInError = (error: any, data: RegisterData) => {
  console.log('error', error);
  if (error.response?.status === 401) {
    resetAndNavigate('LoginScreen');
    return;
  }
  Alert.alert('We are facing issues, please try again later');
};

export const signInWithGoogle = () => async (dispatch: any) => {
  try {
    await GoogleSignin.hasPlayServices();
    await GoogleSignin.signOut();
    const { idToken, user } = await GoogleSignin.signIn();

    await axios
      .post(LOGIN, {
        provider: 'google',
        id_token: idToken,
      })
      .then(async (res: any) => {
        await handleSignInSuccess(res, dispatch);
      })
      .catch((error: any) => {
        const errorData = {
          email: user.email,
          name: user.name,
          userImage: user.photo,
          provider: 'google',
          id_token: idToken,
        };
        handleSignInError(error, errorData as RegisterData);
      });
  } catch (error) {
    console.log('GOOGLE ERROR', error);
  }
};