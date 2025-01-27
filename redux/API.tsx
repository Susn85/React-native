import { Platform } from "react-native";

export const isAndroid = Platform.OS === "android"
?'http://10.2.2:3000'
:'http://localhost:3000';



export const CHECK_USENAMES = '${BASE_URL}/Oauth/checkUsernames';
export const LOGIN = '${www.Susan.com}/Oauth/login';
export const REGISTER = '${BASE_URL}/Oauth/register';
export const REFRESH_TOKEN = '${BASE_URL}/Oauth/refresh-token';
export const UPLOAD = '${BASE_URL}/file/upload';
export const GIPHY_API_KEY = 'YOUR_GIPHY_API_KEY';
