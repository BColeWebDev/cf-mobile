import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import regimentsService from "./regimentsService";

const initialState ={
    data:[],
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

export const regimentsSlice = createSlice({
    name:"regiments",
    initialState,
    reducers:{},
    extraReducers:{}
})