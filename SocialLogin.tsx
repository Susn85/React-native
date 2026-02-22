import { GoogleSignin } from '@react-native-google-signin/google-signin';
import axios from 'axios';
import { Alert } from 'react-native';

export const signInWithGoogle = () => async (dispatch: any) => {
  try {
    // Ensure Google Play Services are available
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    // Sign in
    const googleUser = await GoogleSignin.signIn();
    console.log('Google Sign-In Response:', googleUser);

    // Check if user data is valid
    if (!googleUser || !googleUser.idToken || !googleUser.user) {
      Alert.alert("Google sign-in failed. Please try again.");
      return;
    }

    // Extract user data
    const { idToken, user } = googleUser;

    // Prepare data for API
    const userData = {
      email: user?.email ?? "",
      name: user?.name ?? "",
      userImage: user?.photo ?? "",
      provider: 'google',
      id_token: idToken,
    };

    const response = await axios.post("http://10.0.2.2:3000/auth/google", userData);

    console.log("Backend Response:", response.data);

    // Handle successful login (save user, navigate, etc.)
    console.log("Login Success:", response.data);

  } catch (error) {
    console.error("GOOGLE SIGN-IN ERROR:", error);
    if (error instanceof Error) {
      Alert.alert("Google sign-in error", error.message);
    } else {
      Alert.alert("Google sign-in error", "An unknown error occurred");
    }
  }
};
