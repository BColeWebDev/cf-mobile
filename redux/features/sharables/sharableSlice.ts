import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import sharableServices from "./sharableServices";
import { ISharables } from "../interfaces/ISharable";
const initialState = {
  sharableIsError: false,
  sharableIsSuccess: false,
  sharableIsLoading: false,
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

export const createSharable = createAsyncThunk(
  `create-sharables`,
  async (obj: ISharables, thunkAPI) => {
    try {
      const response = sharableServices.createSharable(obj);
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
        state.sharableIsLoading = true;
      })
      // when data hase been received
      .addCase(getAllSharable.fulfilled, (state, action) => {
        state.sharableIsLoading = false;
        state.sharableIsSuccess = true;
        state.data = action.payload;
      })
      .addCase(getAllSharable.rejected, (state, action) => {
        state.sharableIsLoading = false;
        state.sharableIsError = true;
      })
      .addCase(createSharable.pending, (state) => {
        state.sharableIsLoading = true;
      })
      // when data hase been received
      .addCase(createSharable.fulfilled, (state, action) => {
        state.sharableIsLoading = false;
        state.sharableIsSuccess = true;
        state.data = action.payload;
      })
      .addCase(createSharable.rejected, (state, action) => {
        state.sharableIsLoading = false;
        state.sharableIsError = true;
      });
  },
});
export default sharableSlice.reducer;
