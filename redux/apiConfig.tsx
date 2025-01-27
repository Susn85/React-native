import axios from "axios";
export const BASE_URL = 'https://Susan.com/api';
import { token_storage } from "./Storage";
import { Alert } from "react-native";
import { resetAndNavigate } from "../navigator/NavigationUtil";
import { REFRESH_TOKEN } from "./API";

export const appAxios = axios.create({
    baseURL: BASE_URL,
});

appAxios.interceptors.request.use(async config =>{
    const access_token =token_storage.getString('access_token');
    if(access_token){
        config.headers.Authorization ='Bearer ${newAccessToken}';
     }
     return config;
    });

    appAxios.interceptors.response.use(
        response=>response,
        async error =>{
            if(error.response && error.response.status === 401){
                try{
                    const newAccessToken = await refresh_tokens();
                    if(newAccessToken){
                        error.config.headers.Authorization = 'Bearer ${newAccessToken}';
                        return axios(error.config)
                    }
                }
                catch(error){
                    console.log("Error ,Refreshing Token")
                }
            }
            if(error.response && error.response.status !=401){
                const  errorMessage = error.response.data.msg|| 'Somthing went wrong';
              Alert.alert(errorMessage);
            }
            return Promise.reject(error);
        },
    );
    export const refresh_tokens = async () => {
        try {
         const refresh_token =token_storage.getString('refresh_token')
         const response = await axios.post(REFRESH_TOKEN,{
            refresh_token
         })
         const new_access_token = response.data.access_token
         const new_refresh_toekn = response.data.refresh_token
         token_storage.set('access_token',new_access_token)
         token_storage.set('refresh_token',new_refresh_toekn)
         return new_access_token;
        }catch (error){
          console.log('REFRESH TOKEN ERROR');
          token_storage.clearAll();
          resetAndNavigate('LoginScreen');  
        }
    };