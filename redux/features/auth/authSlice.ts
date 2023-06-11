import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authServices";
import { IAuth, IRegister } from "./interfaces/IAuth";
// let token;
// let user;
// // user from local storage
// if (typeof window !== 'undefined') {
//     // Perform localStorage action
//     token = JSON.parse(localStorage.getItem("token"))
//     user = JSON.parse(localStorage.getItem("user"))
// }


const initialState = {
    // token: token ? token : null,
    user: null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ''
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
    reducers:{},
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


export default authSlice.reducer