import axios from "axios";
import { EXPO_PUBLIC_APP_URL } from "@env";
import tokenBearer from "../helpers/tokenHeader";

const getAlWorkouts = async (token, page: string, limit: string) => {
  const response = await axios.get(
    `${EXPO_PUBLIC_APP_URL}api/workouts/exercises?page=${page}&limit=${limit}`,
    tokenBearer(token)
  );
  console.log("response", response);

  return response.data;
};
const getAllBodyTargets = async (token) => {
  const response = await axios.get(
    `${EXPO_PUBLIC_APP_URL}api/workouts/exercises/targets`,
    tokenBearer(token)
  );
  return response.data;
};
const getAllMuscleTargets = async (token) => {
  const response = await axios.get(
    `${EXPO_PUBLIC_APP_URL}api/workouts/exercises/muscles`,
    tokenBearer(token)
  );
  return response.data;
};

const getAllEquipments = async (token) => {
  const response = await axios.get(
    `${EXPO_PUBLIC_APP_URL}api/workouts/exercises/equipments`,
    tokenBearer(token)
  );
  return response.data;
};
const createWorkout = async (obj, token) => {
  const response = await axios.post(
    `${EXPO_PUBLIC_APP_URL}api/workouts/routines/${obj.regimentId}`,
    obj,
    tokenBearer(token)
  );
  return response.data;
};

const updateWorkout = async (obj, token) => {
  const response = await axios.put(
    `${EXPO_PUBLIC_APP_URL}api/workouts/routines/${obj.regimentId}`,
    obj,
    tokenBearer(token)
  );
  return response.data;
};

const deleteWorkout = async (obj, token) => {
  const response = await axios.put(
    `${EXPO_PUBLIC_APP_URL}api/workouts/routines/${obj.regimentId}/delete`,
    obj,
    tokenBearer(token)
  );
  return response.data;
};

const workoutServices = {
  getAlWorkouts,
  getAllBodyTargets,
  getAllEquipments,
  getAllMuscleTargets,
  createWorkout,
  updateWorkout,
  deleteWorkout,
};

export default workoutServices;
