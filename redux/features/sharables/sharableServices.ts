import axios from "axios";
import { EXPO_PUBLIC_APP_URL } from "@env";
import tokenBearer from "../helpers/tokenHeader";
import { ISharables } from "../interfaces/ISharable";

// GET - Get All Sharable Workouts
const getSharables = async (token: string) => {
  const response = await axios.get(
    `${EXPO_PUBLIC_APP_URL}api/sharables/`,
    tokenBearer(token)
  );
  console.log("RES", response);
  return response.data;
};
const createSharable = async (obj: ISharables, token: string) => {
  const response = await axios.post(
    `${EXPO_PUBLIC_APP_URL}api/sharables/create`,
    obj,
    tokenBearer(token)
  );
  console.log("response", response);
  return response;
};

const updateSharable = async () => {
  const response = await axios.post(`${EXPO_PUBLIC_APP_URL}`);
  return response.data;
};

const deleteSharable = async () => {
  const response = await axios.post(`${EXPO_PUBLIC_APP_URL}`);
  return response.data;
};

// Like and Download
const likeSharable = async (req: Request, res: Response) => {};
const downloadSharable = async (req: Request, res: Response) => {};
const sharableServices = {
  getSharables,
  createSharable,
  updateSharable,
  deleteSharable,
  likeSharable,
  downloadSharable,
};
export default sharableServices;
