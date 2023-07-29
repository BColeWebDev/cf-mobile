import axios from "axios"
import { APP_URL } from "@env"; 
import tokenBearer from "../helpers/tokenHeader";

const getAlWorkouts = async (token) =>{
    const response = await axios.get(`${APP_URL}api/workouts/exercises?page=1&limit=100`,tokenBearer(token))
    return response.data
}
const getAllBodyTargets = async (token) =>{
    const response = await axios.get(`${APP_URL}api/workouts/exercises/targets`,tokenBearer(token))
    return response.data;
}
const getAllMuscleTargets = async (token) =>{
    const response = await axios.get(`${APP_URL}api/workouts/exercises/muscles`,tokenBearer(token))
    return response.data;
}

const getAllEquipments = async (token) =>{
    const response = await axios.get(`${APP_URL}api/workouts/exercises/equipments`,tokenBearer(token))
    return response.data;
}
const workoutServices ={
    getAlWorkouts,
    getAllBodyTargets,
    getAllEquipments,
    getAllMuscleTargets

}

export default workoutServices;