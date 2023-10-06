import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import regimentsService from "./regimentsService";
import { IRegiments } from "../auth/interfaces/IRegiments";

const initialState ={
    data:{},
    isError: false,
    isSuccess: false,
    isLoading: false,
}

export const getRegiments = createAsyncThunk(`regiments`,async(id,thunkAPI)=>{
    try {
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const createRegiment = createAsyncThunk(`create-regiment`,async(obj:IRegiments,thunkAPI)=>{
    try {
        const response = await regimentsService.CreateRegiment(obj)
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const regimentsSlice = createSlice({
    name:"regiments",
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder
        .addCase(getRegiments.pending, (state) => {
            state.isLoading = true
        })
        // when data hase been received 
        .addCase(getRegiments.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.data = action.payload
          
        })
        .addCase(getRegiments.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
        })

    }
})

export default regimentsSlice.reducer