import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import sharableServices from "./sharableServices";
const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  data: [],
};
export const getAllSharable = createAsyncThunk(
  `sharables-all`,
  async (_, thunkAPI) => {
    try {
      const { auth }: any = thunkAPI.getState();
      const response = await sharableServices.getSharables(
        auth.currentUser.userToken
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const sharableSlice = createSlice({
  name: "sharable",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSharable.pending, (state) => {
        state.isLoading = true;
      })
      // when data hase been received
      .addCase(getAllSharable.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(getAllSharable.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});
export default sharableSlice.reducer;
