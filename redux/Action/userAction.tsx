import axios from "axios";
import { appAxios } from "../apiConfig";
import { setUser } from "../reducers/userSlice"
import { CHECK_USENAMES } from "../API";
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const response = await fetch('https://api.Susan.com/user');
  const data = await response.json();
  return data;
});

 
 export const refetchUser =() => async (dispatch: any) =>{
try{
const res =await appAxios.get('/user/profile')
await dispatch(setUser(res.data.user));
}catch(error) {
    console.log('REFETCH USER-->',error);
 }
}
export const checkUsernameAvailability =(username:string) =>async(dispatch:any)=>{
    try{
        const res =await axios.post(CHECK_USENAMES,{
            username,
        })
    }catch (error:any) {
        console.log(error)
        return null
    }
}