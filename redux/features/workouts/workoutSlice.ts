
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import workoutServices from "./workoutService";

const initialState = {
    workouts: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    muscles:null,
    equipments:null,
    bodyTargets:null
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

export const getAllBodyTargets = createAsyncThunk(`workouts/AllBodyTargets`,async(obj:any,thunkAPI)=>{
    try {
        const {token}=obj
        const response = await workoutServices.getAllBodyTargets(token);
        return response
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getAllMuscleTargets = createAsyncThunk(`workouts/AllMuscleGroupsNames`,async(obj:any,thunkAPI)=>{
    try {
        const {token}=obj
        const response = await workoutServices.getAllMuscleTargets(token)
        return response
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getAllEquipment = createAsyncThunk(`workouts/Equipments`,async(obj:any,thunkAPI)=>{
    try {
        const {token}=obj
        const response = await workoutServices.getAllEquipments(token)
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const createNewWorkout = createAsyncThunk(`workouts/createNew`,async(obj:any,thunkAPI)=>{
    try {
        const response = await workoutServices.createWorkout(obj)
        return response;
    } catch (error) {
        
    }
})
export const workoutSlice = createSlice({
    name:'workouts',
    initialState,
    reducers:{

    },
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


        .addCase(getAllBodyTargets.pending, (state) => {
            state.isLoading = true
        })
        // when data hase been received 
        .addCase(getAllBodyTargets.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.bodyTargets = action.payload
          
        })
        .addCase(getAllBodyTargets.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
        })

           .addCase(getAllEquipment.pending, (state) => {
            state.isLoading = true
        })
        // when data hase been received 
        .addCase(getAllEquipment.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.equipments = action.payload
          
        })
        .addCase(getAllEquipment.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
        })

        .addCase(getAllMuscleTargets.pending, (state) => {
            state.isLoading = true
        })
        // when data hase been received 
        .addCase(getAllMuscleTargets.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.muscles = action.payload
          
        })
        .addCase(getAllMuscleTargets.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
        })

        .addCase(createNewWorkout.pending, (state) => {
            state.isLoading = true
        })
        // when data hase been received 
        .addCase(createNewWorkout.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
        })
        .addCase(createNewWorkout.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
        })
    }
})

export default workoutSlice.reducer