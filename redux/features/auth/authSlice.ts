import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authServices";
import { IAuth, IRegister } from "./interfaces/IAuth";
import SyncStorage from "sync-storage";
import {Platform} from 'react-native';

let currentUser;
let isLoggedIn;

// user from local storage
if (Platform.OS === "ios" || Platform.OS === "android" || Platform.OS === 'web') {
    // Perform localStorage action
    currentUser = JSON.parse(SyncStorage.get("currentUser"))
    isLoggedIn = JSON.parse(SyncStorage.get("isLoggedIn"))
}



const initialState = {
    // token: token ? token : null,
    user: null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
    isLoggedIn: isLoggedIn  ? true : false,
    currentUser: currentUser && isLoggedIn ? currentUser : {},
}


export const LoginUser = createAsyncThunk(`auth/LoginUser`,async(obj:IAuth,thunkAPI) =>{
try {
    const response = await authService.Login(obj);
    return response;

} catch (error) {
    return thunkAPI.rejectWithValue(error)
}
})

export const RegisterUser = createAsyncThunk(`auth/RegisterUser`,async(obj:IRegister,thunkAPI) =>{
    try {
        const response = await authService.Register(obj);
        return response
    
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
    }
)

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
  // Set Current User thats logged in
  setCurrentUser:(state, action) => {
    if(!state.isLoggedIn){
        state.currentUser = action.payload;
        state.isLoggedIn = true
        SyncStorage.setItem("currentUser",JSON.stringify(state.currentUser))
        SyncStorage.setItem("isLoggedIn",JSON.stringify(state.isLoggedIn))
    }else{
        state.currentUser = {}
        state.isLoggedIn = false
        SyncStorage.setItem("currentUser",JSON.stringify(state.currentUser))
        SyncStorage.setItem("isLoggedIn",JSON.stringify(state.isLoggedIn))
    }
},


    },
    extraReducers:(builder) =>{
        builder
          // LoginUser Case
          .addCase(LoginUser.pending, (state) => {
            state.isLoading = true
        })
        // when data hase been received 
        .addCase(LoginUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
          
        })
        .addCase(LoginUser.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
        })
    }
})

export const{
    setCurrentUser,
} = authSlice.actions


export default authSlice.reducer