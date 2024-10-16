import axios from "axios";
import { IAuth, IRegister } from "../interfaces/IAuth";
import { EXPO_PUBLIC_APP_URL } from "@env";
import tokenBearer from "../helpers/tokenHeader";

// Login User
const Login = async (data: IAuth) => {
  const response = await axios.post(
    `${EXPO_PUBLIC_APP_URL}api/auth/login`,
    data
  );
  return response.data;
};

// Register User
const Register = async (userData: IRegister) => {
  const response = await axios.post(
    `${EXPO_PUBLIC_APP_URL}api/auth/register`,
    userData
  );
  return response.data;
};

export const Logout = async () => {
  const response = await axios.get(`${EXPO_PUBLIC_APP_URL}api/auth/logout`);
  return response.data;
};

export const UploadAvatar = async (obj, token) => {
  const response = await axios.get(
    `${EXPO_PUBLIC_APP_URL}api/auth/${"a"}/upload-avatar`,
    tokenBearer(token)
  );
  return response.data;
};

const Settings = async (obj, token) => {
  const response = await axios.post(
    `${EXPO_PUBLIC_APP_URL}api/auth/${obj.id}/settings`,
    obj,
    tokenBearer(token)
  );
  return response.data;
};

const authService = {
  Login,
  Register,
  Logout,
  Settings,
  UploadAvatar,
};

export default authService;
