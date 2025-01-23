import React from 'react';
import { Alert } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

// Initialize Google Sign-In
GoogleSignin.configure({
  webClientId: '"1024477844174-dfed5plu8jbns3b4v854p7gpafu3qtdt.apps.googleusercontent.com",', // Replace with your Google Cloud Console Web Client ID
  offlineAccess: true, // Enables server-side access
});

// Data type for register
type RegisterData = {
  id_token: string;
  provider: string;
  name: string;
  email: string;
};

// Data type for Google Sign-In response
type SignInResponse = import('@react-native-google-signin/google-signin').SignInResponse;

// Navigate function
function navigate(
  navigation: NavigationProp<ParamListBase>,
  screen: string,
  data?: RegisterData
) {
  navigation.navigate(screen as never, data as never);
}

// Reset and navigate function
function resetAndNavigate(
  navigation: NavigationProp<ParamListBase>,
  screen: string
) {
  navigation.reset({
    index: 0,
    routes: [{ name: screen } as never],
  });
}

// Handle sign-in success
const handleSignInSuccess = async (res: any, dispatch: any) => {
  const { access_token, refresh_token } = res.data.token;

  // Mock Redux dispatch to store user data
  dispatch({
    type: 'USER_LOGIN',
    payload: { token: access_token, refresh_token, user: res.data.user },
  });

  // Navigate to home screen
  Alert.alert('Welcome', 'You have signed in successfully!');
};

// Handle sign-in errors
const handleSignInError = (error: any, navigation: NavigationProp<ParamListBase>, data: RegisterData) => {
  console.error('Google Sign-In Error:', error);

  if (error.response?.status === 401) {
    navigate(navigation, 'RegisterScreen', {
      ...data,
    });
  } else {
    Alert.alert('We are facing issues, try again later');
  }
};

// Sign in with Google
export const SignInWithGoogle = async (
  navigation: NavigationProp<ParamListBase>,
  dispatch: any
) => {
  try {
    // Check if Google Play Services are available
    const hasPlayServices = await GoogleSignin.hasPlayServices();
    console.log('Google Play Services Available:', hasPlayServices);

    // Start the Google Sign-In flow
    const userInfo = await GoogleSignin.signIn() as any;
    console.log('User Info:', userInfo);

    // Mock API response for successful registration
    const mockResponse = {
      data: {
        token: {
          access_token: 'mockAccessToken',
          refresh_token: 'mockRefreshToken',
        },
        user: {
          id: '12345',
          name: userInfo.user.name,
          email: userInfo.user.email,
        },
      },
    };

    // Handle successful sign-in
    await handleSignInSuccess(mockResponse, dispatch);
  } catch (error: any) {
    console.error('Google Sign-In Error:', error);

    // Handle specific error cases
    switch (error.code) {
      case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
        Alert.alert(
          'Error',
          'Google Play Services are not available. Please ensure they are installed and up-to-date.'
        );
        break;
      case statusCodes.SIGN_IN_CANCELLED:
        Alert.alert(
          'Cancelled',
          'Google Sign-In was cancelled. Please try again if this was unintentional.'
        );
        break;
      case statusCodes.IN_PROGRESS:
        Alert.alert(
          'In Progress',
          'A Google Sign-In request is already in progress. Please wait.'
        );
        break;
      default:
        handleSignInError(error, navigation, {
          id_token: '',
          provider: 'google',
          name: '',
          email: '',
        });
    }
  }
};
