import { RootState } from "./../../app/store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import nutritionService from "./nutritionService";

const initialState = {
  data: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const SearchNutrition = createAsyncThunk(
  `nutritions`,
  async (query: string, thunkAPI) => {
    try {
      const { auth }: any = thunkAPI.getState();
      const response = await nutritionService.SearchNutrition(
        query,
        auth.currentUser.userToken
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const nutritionSlice = createSlice({
  name: "nutritions",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(SearchNutrition.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    });

    builder.addCase(SearchNutrition.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });

    builder.addCase(SearchNutrition.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.data = action.payload;
    });
  },
});

export default nutritionSlice.reducer;
