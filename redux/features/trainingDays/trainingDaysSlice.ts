import { RootState } from "./../../app/store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import trainingDaysServices from "./trainingDaysServices";
import { ITrainingDays, ITrainingDaysForm } from "../interfaces/ITrainingDays";

const initialState = {
  data: {
    routines: [],
  },
  days: [],
  primaryMuscleGroup: [],
  secondaryMuscleGroup: [],
  detailInfo: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
};

export const createTrainingDays = createAsyncThunk<
  any,
  any,
  { state: RootState }
>(`training_days/create`, async (obj: ITrainingDaysForm, thunkAPI) => {
  try {
    const { currentUser } = thunkAPI.getState().auth;
    const response = await trainingDaysServices.createTrainingDays(
      obj,
      currentUser.userToken
    );
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getAllTrainingDays = createAsyncThunk<
  any,
  any,
  { state: RootState }
>(`training_days/all`, async (regimentId: string, thunkAPI) => {
  const { currentUser } = thunkAPI.getState().auth;
  try {
    const response = await trainingDaysServices.getAllTrainingDays(
      regimentId,
      currentUser.userToken
    );
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const updateTrainingDays = createAsyncThunk<
  any,
  any,
  { state: RootState }
>(`training_days/update`, async (obj: ITrainingDays, thunkAPI) => {
  try {
    const { currentUser } = thunkAPI.getState().auth;
    const response = await trainingDaysServices.updateTrainingDays(
      obj,
      currentUser.userToken
    );
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteTrainingDays = createAsyncThunk<
  any,
  any,
  { state: RootState }
>(`training_days/delete`, async (obj: any, thunkAPI) => {
  try {
    const { currentUser } = thunkAPI.getState().auth;

    const response = await trainingDaysServices.deleteTrainingDays(
      obj,
      currentUser.userToken
    );
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const trainingDaysSlice = createSlice({
  name: "Training Days",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTrainingDays.pending, (state) => {
        state.isLoading = true;
      })
      // when data hase been received
      .addCase(createTrainingDays.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createTrainingDays.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      // when data hase been received
      .addCase(getAllTrainingDays.fulfilled, (state, action) => {
        state.data = action.payload;
        state.days = action.payload.days;
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })

      // when data hase been received
      .addCase(getAllTrainingDays.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      // when data hase been received
      .addCase(getAllTrainingDays.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })

      .addCase(deleteTrainingDays.pending, (state) => {
        state.isLoading = true;
      })
      // when data hase been received
      .addCase(deleteTrainingDays.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
        state.days = action.payload.days;
      })
      .addCase(deleteTrainingDays.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default trainingDaysSlice.reducer;
