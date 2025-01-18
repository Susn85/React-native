import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Alert } from "react-native";

export const SignInWithGoogle = async () => {
    try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        console.log(userInfo);
        Alert.alert("Token", "Check console for user info");
    }catch (error) {
        console.log(error);
        }
};
export default {
    SignInWithGoogle,
};