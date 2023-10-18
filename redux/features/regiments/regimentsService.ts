import axios from "axios"
import { APP_URL } from "@env"; 
import tokenBearer from "../helpers/tokenHeader";
import { IRegiments } from "../auth/interfaces/IRegiments";

const GetAllRegiments = async (id:string,token:string) =>{
    const response = await axios.get(`${APP_URL}api/workouts/regimentsAll/${id}`,tokenBearer(token));
    return response.data
}

const GetSinglelRegiment = async (id:string) =>{
    const response = await axios.get(`${APP_URL}/api/workouts/singleRegiment/${id}`);
    return response.data
}
const CreateRegiment = async (obj:IRegiments,token:string) =>{
    const response = await axios.post(`${APP_URL}api/workouts/createRegiment`,obj,tokenBearer(token));
    return response.data
}
const DeleteRegiment = async (id:string,token:string) =>{
    const response = await axios.delete(`${APP_URL}api/workouts/singleRegiment/${id}`,tokenBearer(token))
    return response.data
}
export default{
    GetAllRegiments,
    GetSinglelRegiment,
    CreateRegiment,
    DeleteRegiment
}