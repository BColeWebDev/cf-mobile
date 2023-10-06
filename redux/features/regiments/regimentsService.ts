import axios from "axios"
import { APP_URL } from "@env"; 
import tokenBearer from "../helpers/tokenHeader";

const GetAllRegiments = async (id) =>{
    const response = await axios.get(`${APP_URL}/api/workouts/regimentsAll/${id}`);
    return response.data
}

const GetSinglelRegiment = async (id) =>{
    const response = await axios.get(`${APP_URL}/api/workouts/singleRegiment/${id}`);
    return response.data
}
const CreateRegiment = async (obj) =>{
    const response = await axios.post(`${APP_URL}/api/workouts/createRegiment`,obj);
    return response.data
}
export default{
    GetAllRegiments,
    GetSinglelRegiment,
    CreateRegiment
}