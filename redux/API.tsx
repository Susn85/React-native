import { Platform } from "react-native";

// export const isAndroid = Platform.OS === "android"
// //   ? 'http://10.2.2:3000'
// //   : 'http://localhost:3000';

//   // Platform.OS === 'android'
//     ? 'http://10.0.2.2:3000'
//     : 'http://192.168.29.88:3000';
    
export const BASE_URL =
Platform.OS === 'android'
  ? 'http://10.0.2.2:3000'
  : 'http://localhost:3000';

    // const BASE_URL = "http://10.0.2.2:3000";
// export const BASE_URL = 'https://reelzzz-server.com/api';

export const CHECK_USERNAME = `${BASE_URL}/Oauth/checkUsernames`;
export const LOGIN = `${BASE_URL}/Oauth/login`;
export const REGISTER = `${BASE_URL}/Oauth/register`;
export const REFRESH_TOKEN = `${BASE_URL}/Oauth/refresh-token`;
export const UPLOAD = `${BASE_URL}/file/upload`;
export const GIPHY_API_KEY = 'YOUR_GIPHY_API_KEY';
