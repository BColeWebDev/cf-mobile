import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import workoutServices from "./workoutService";
import { RootState } from "../../app/store";

const initialState = {
  workouts: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  muscles: null,
  equipments: null,
  bodyTargets: null,
};

export const getAllWorkouts = createAsyncThunk<any, any, { state: RootState }>(
  `workouts/AllWorkouts`,
  async (obj: any, thunkAPI) => {
    try {
      const { token, page, limit } = obj;
      const { currentUser } = thunkAPI.getState().auth;
      const response = await workoutServices.getAlWorkouts(
        currentUser.userToken,
        page,
        limit
      );
      return response;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllBodyTargets = createAsyncThunk<
  any,
  any,
  { state: RootState }
>(`workouts/AllBodyTargets`, async (obj: any, thunkAPI) => {
  try {
    const { currentUser } = thunkAPI.getState().auth;
    const response = await workoutServices.getAllBodyTargets(
      currentUser.userToken
    );
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getAllMuscleTargets = createAsyncThunk<
  any,
  any,
  { state: RootState }
>(`workouts/AllMuscleGroupsNames`, async (obj: any, thunkAPI) => {
  try {
    const { currentUser } = thunkAPI.getState().auth;
    const response = await workoutServices.getAllMuscleTargets(
      currentUser.userToken
    );
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getAllEquipment = createAsyncThunk<any, any, { state: RootState }>(
  `workouts/Equipments`,
  async (obj: any, thunkAPI) => {
    try {
      const { currentUser } = thunkAPI.getState().auth;
      const response = await workoutServices.getAllEquipments(
        currentUser.userToken
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createNewWorkout = createAsyncThunk<
  any,
  any,
  { state: RootState }
>(`workouts/createNew`, async (obj: any, thunkAPI) => {
  try {
    const { currentUser } = thunkAPI.getState().auth;
    const response = await workoutServices.createWorkout(
      obj,
      currentUser.userToken
    );
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});


export const deleteWorkout = createAsyncThunk<any, any, { state: RootState }>(
  `workouts/deleteWorkout`,
  async (obj: any, thunkAPI) => {
    try {
      const { currentUser } = thunkAPI.getState().auth;
      console.log("OBJ",obj)
      const response = await workoutServices.deleteWorkout(
        obj,
        currentUser.userToken
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const workoutSlice = createSlice({
  name: "workouts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getAllWorkouts Case
      .addCase(getAllWorkouts.pending, (state) => {
        state.isLoading = true;
      })
      // when data hase been received
      .addCase(getAllWorkouts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.workouts = action.payload;
      })
      .addCase(getAllWorkouts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(getAllBodyTargets.pending, (state) => {
        state.isLoading = true;
      })
      // when data hase been received
      .addCase(getAllBodyTargets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bodyTargets = action.payload;
      })
      .addCase(getAllBodyTargets.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(getAllEquipment.pending, (state) => {
        state.isLoading = true;
      })
      // when data hase been received
      .addCase(getAllEquipment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.equipments = action.payload;
      })
      .addCase(getAllEquipment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(getAllMuscleTargets.pending, (state) => {
        state.isLoading = true;
      })
      // when data hase been received
      .addCase(getAllMuscleTargets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.muscles = action.payload;
      })
      .addCase(getAllMuscleTargets.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(createNewWorkout.pending, (state) => {
        state.isLoading = true;
      })
      // when data hase been received
      .addCase(createNewWorkout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createNewWorkout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default workoutSlice.reducer;
