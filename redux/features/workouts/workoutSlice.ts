import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import workoutServices from "./workoutService";

const initialState = {
    workouts: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const getAllWorkouts = createAsyncThunk(`workouts/AllWorkouts`,async(obj:any,thunkAPI) =>{
    try {
        const {token} = obj

        const response = await workoutServices.getAlWorkouts(token);
        return response;
    
    } catch (error) {
        console.log(error)
        return thunkAPI.rejectWithValue(error)
    }
    }
)

export const workoutSlice = createSlice({
    name:'workouts',
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder
          // getAllWorkouts Case
          .addCase(getAllWorkouts.pending, (state) => {
            state.isLoading = true
        })
        // when data hase been received 
        .addCase(getAllWorkouts.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.workouts = action.payload
          
        })
        .addCase(getAllWorkouts.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
        })
    }
})

export default workoutSlice.reducer