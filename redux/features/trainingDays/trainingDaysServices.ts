import axios from "axios";
import { EXPO_PUBLIC_APP_URL } from "@env";
import tokenBearer from "../helpers/tokenHeader";
import { IRegiments } from "../interfaces/IRegiments";

const getAllTrainingDays = async (regimentId: string, token: string) => {
  const response = await axios.get(
    `${EXPO_PUBLIC_APP_URL}api/workouts/trainingdays/${regimentId}`,
    tokenBearer(token)
  );

  return response.data;
};

const createTrainingDays = async (obj, token: string) => {
  const response = await axios.post(
    `${EXPO_PUBLIC_APP_URL}api/workouts/trainingdays/${obj.regimentId}`,
    obj,
    tokenBearer(token)
  );
  return response.data;
};

const updateTrainingDays = async (obj, token: string) => {
  const response = await axios.put(
    `${EXPO_PUBLIC_APP_URL}api/workouts/trainingdays/${obj.regimentId}`,
    obj,
    tokenBearer(token)
  );
  return response.data;
};

const deleteTrainingDays = async (obj: any, token: string) => {
  const response = await axios.put(
    `${EXPO_PUBLIC_APP_URL}api/workouts/trainingdays/${obj.regimentId}/delete`,
    obj,
    tokenBearer(token)
  );
  return response.data;
};

export default {
  getAllTrainingDays,
  createTrainingDays,
  updateTrainingDays,
  deleteTrainingDays,
};
