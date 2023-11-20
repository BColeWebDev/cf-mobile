import axios from "axios";
import { IAuth, IRegister } from "../interfaces/IAuth";
import { EXPO_PUBLIC_APP_URL } from "@env";

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
  const response = await axios.get(`${EXPO_PUBLIC_APP_URL}/api/auth/logout`);
  return response.data;
};
const Settings = async (obj) => {
  const response = await axios.post(
    `${EXPO_PUBLIC_APP_URL}api/auth/settings`,
    obj
  );
  return response.data;
};
const authService = {
  Login,
  Register,
  Logout,
  Settings,
};

export default authService;
