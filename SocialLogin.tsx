import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Alert } from "react-native";

export const SignInWithGoogle = async () => {
    try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        console.log(userInfo);
        Alert.alert("Token", "Check console for user info");
    } catch (error) {
        if ((error as any).code === 'PLAY_SERVICES_NOT_AVAILABLE') {
            Alert.alert('Error', 'Google Play Services are not available.');
        } else {
            const errorMessage = (error instanceof Error) ? error.message : JSON.stringify(error);
            console.error("Error during Google Sign-In:", errorMessage);
        }
    }
    
};
export default SignInWithGoogle
