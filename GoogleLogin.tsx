// import React, { useEffect } from "react";
// import { View, Button, Alert } from "react-native";
// import { GoogleSignin } from "@react-native-google-signin/google-signin";

// const GoogleLogin = () => {
//   useEffect(() => {
//     GoogleSignin.configure({
//       webClientId: "1024477844174-dfed5plu8jbns3b4v854p7gpafu3qtdt.apps.googleusercontent.com",
//       offlineAccess: true,
//       forceCodeForRefreshToken: true,
//     });
//   }, []);

//   const signInWithGoogle = async () => {
//     try {
//       await GoogleSignin.hasPlayServices();
//       const userInfo = await GoogleSignin.signIn();
//       console.log("User Info:", userInfo);
//       if (userInfo) {
//         const errorData = {
//           email: userInfo.user.email,
//           name: userInfo.user.name,
//         };
//         Alert.alert("Success", `Welcome ${userInfo.user.name}`);
//       } else {
//         throw new Error("Invalid Google Sign-In response");
//       }
//     } catch (error) {
     
//       console.error("Google Sign-In Error:", error);
//       Alert.alert("Error", "Google Sign-In Failed");
//     }
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Button title="Sign in with Google" onPress={signInWithGoogle} />
//     </View>
//   );
// };

// export default GoogleLogin;
