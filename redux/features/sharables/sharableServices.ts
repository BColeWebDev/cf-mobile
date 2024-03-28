import axios from "axios";
import { EXPO_PUBLIC_APP_URL } from "@env";
import tokenBearer from "../helpers/tokenHeader";

// GET - Get All Sharable Workouts
const getSharables = async (token: string) => {
  const response = await axios.get(
    `${EXPO_PUBLIC_APP_URL}api/sharables/`,
    tokenBearer(token)
  );
  console.log("RES", response);
  return response.data;
};

const sharableServices = { getSharables };
export default sharableServices;
