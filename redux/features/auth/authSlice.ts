import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authServices";
import { IAuth, IRegister } from "../interfaces/IAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

let currentUser;
let isLoggedIn;

const getData = async () => {
  if (Platform.OS === "ios" || Platform.OS === "android") {
    let res1 = await AsyncStorage.getItem("currentUser");

    currentUser = JSON.parse(res1);

    let res2 = await AsyncStorage.getItem("isLoggedIn");
    isLoggedIn = JSON.parse(res2);
  }
};
const setData = async (str, value) => {
  console.log(str, value);
  const jsonValue = JSON.stringify(value);
  await AsyncStorage.setItem(str, jsonValue);
};

if (Platform.OS === "ios" || Platform.OS === "android") {
  getData();
}

if (Platform.OS === "web") {
  currentUser = JSON.parse(localStorage.getItem("currentUser"));
  isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
}

const initialState = {
  // token: token ? token : null,
  register: {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    reEnterPassword: "",
    bio: "",
    experience: "",
    crown_member: false,
    age: "",
    sex: "",
    device: Platform.OS,
  },
  isError: false,
  isLoading: false,
  isSuccess: false,
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
      const response = await authService.Settings(obj);
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
      console.log("action", action.payload);
      state.register = {
        ...state.register,
        [action.payload.name]: action.payload.value,
      };
    },
    updateCurrentUser: (state, action) => {
      console.log(action.payload);
      if (state.isLoggedIn) {
        state.currentUser = action.payload;
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
      })
      .addCase(RegisterUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { setCurrentUser, updateCurrentUser, setRegister } =
  authSlice.actions;

export default authSlice.reducer;
