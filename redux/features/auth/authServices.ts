import axios from "axios"
import {IAuth,IRegister} from "./interfaces/IAuth"
import { APP_URL } from "@env"; 

// Login User
const Login  = async(data:IAuth) =>{
const response = await axios.post(`${APP_URL}api/auth/login`, data);
return response;

}


// Register User
const Register = async (userData:IRegister) => {
    const response = await axios.post(`${APP_URL}api/auth/register`, userData)
    return response.data
}

export const Logout = async ()=>{
    const response = await axios.get(`${APP_URL}/api/auth/logout`,{})
    return response.data
}


const authService ={
    Login,
    Register,
    Logout
}

export default authService