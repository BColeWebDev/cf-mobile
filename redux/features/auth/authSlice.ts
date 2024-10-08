import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authServices";
import { IAuth, IRegister } from "../interfaces/IAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { getData, setData } from "../helpers/loginHandler";

let currentUser;
let isLoggedIn;

if (Platform.OS === "ios" || Platform.OS === "android") {
  getData().then((value) => {
    currentUser = value.currentUser;
    isLoggedIn = value.isLoggedIn;
  });
}

if (Platform.OS === "web") {
  currentUser = JSON.parse(localStorage.getItem("currentUser"));
  isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
}

const initialState = {
  register: {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    bio: "",
    experience: "",
    crown_member: false,
    age: "",
    sex: "M",
    device: Platform.OS,
  },
  isError: false,
  isLoading: false,
  isSuccess: false,
  messages: [],
  message: "",
  isLoggedIn: isLoggedIn ? true : false,
  currentUser: currentUser && isLoggedIn ? currentUser : {},
};

export const LoginUser = createAsyncThunk(
  `auth/LoginUser`,
  async (obj: IAuth, thunkAPI) => {
    try {
      const response = await authService.Login(obj);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const RegisterUser = createAsyncThunk(
  `auth/RegisterUser`,
  async (obj: IRegister, thunkAPI) => {
    try {
      const response = await authService.Register(obj);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const UserSettings = createAsyncThunk(
  `auth/UserSettings`,
  async (obj: Object, thunkAPI) => {
    try {
      const { auth }: any = thunkAPI.getState();
      const response = await authService.Settings(
        obj,
        auth.currentUser.userToken
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const UploadAvatar = createAsyncThunk(
  `auth/Upload Avatar`,
  async (obj: Object, thunkAPI) => {
    try {
      const { auth }: any = thunkAPI.getState();
      const response = await authService.UploadAvatar(
        obj,
        auth.currentUser.userToken
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Set Current User thats logged in
    setCurrentUser: (state, action) => {
      if (!state.isLoggedIn) {
        state.currentUser = action.payload;
        state.isLoggedIn = true;
        if (Platform.OS === "ios" || Platform.OS === "android") {
          setData("isLoggedIn", state.isLoggedIn);
          setData("currentUser", state.currentUser);
        }
        if (Platform.OS === "web") {
          localStorage.setItem(
            "currentUser",
            JSON.stringify(state.currentUser)
          );
          localStorage.setItem("isLoggedIn", JSON.stringify(state.isLoggedIn));
        }
      } else {
        state.currentUser = {};
        state.isLoggedIn = false;
        setData("isLoggedIn", state.isLoggedIn);
        setData("currentUser", state.currentUser);
      }
    },
    setRegister: (state, action) => {
      state.register = {
        ...state.register,
        [action.payload.name]: action.payload.value,
      };
    },
    resetRegister: (state) => {
      state.register = initialState.register;
    },
    updateCurrentUser: (state, action) => {
      if (state.isLoggedIn) {
        state.currentUser = {
          existingUser: action.payload.existingUser,
          userToken: action.payload.userToken,
        };
        if (Platform.OS === "ios" || Platform.OS === "android") {
          setData("isLoggedIn", state.isLoggedIn);

          setData("currentUser", {
            existingUser: action.payload.existingUser,
            userToken: action.payload.userToken,
          });
        }
        if (Platform.OS === "web") {
          localStorage.setItem(
            "currentUser",
            JSON.stringify(state.currentUser)
          );
          localStorage.setItem("isLoggedIn", JSON.stringify(state.isLoggedIn));
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // LoginUser Case
      .addCase(LoginUser.pending, (state) => {
        state.isLoading = true;
      })
      // when data hase been received
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currentUser = action.payload;
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
    builder
      // LoginUser Case
      .addCase(RegisterUser.pending, (state) => {
        state.isLoading = true;
      })
      // when data hase been received
      .addCase(RegisterUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(RegisterUser.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.messages = action.payload!.response.data.errors;
      });
  },
});

export const { setCurrentUser, updateCurrentUser, resetRegister, setRegister } =
  authSlice.actions;

export default authSlice.reducer;
