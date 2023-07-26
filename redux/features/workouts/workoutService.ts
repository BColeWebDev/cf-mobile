import axios from "axios"
import { APP_URL } from "@env"; 
import tokenBearer from "../helpers/tokenHeader";

const getAlWorkouts = async (token) =>{
    const response = await axios.get(`${APP_URL}api/workouts/exercises?page=1&limit=100`,tokenBearer(token))
    return response.data
}

const workoutServices ={
    getAlWorkouts
}

export default workoutServices;