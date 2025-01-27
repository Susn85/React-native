import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../Store";
import { fetchUser } from '../../redux/Action/userAction';

interface UserState {
    user: null | Record<string,any>;
}

const initialState: UserState = {
    user:{},
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser:(state,action: PayloadAction<object>) => {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            if (state.user) {
                state.user.name = action.payload.name;
                state.user.email = action.payload.email;
            }
        });
    },
});

export const { setUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.user;
export default userSlice.reducer;