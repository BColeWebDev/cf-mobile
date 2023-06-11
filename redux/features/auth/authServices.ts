import axios from "axios"
import {IAuth,IRegister} from "./interfaces/IAuth"
import { APP_URL } from "@env"; 

// Login User
const Login  = async(data:IAuth) =>{
const response = await axios.post(`${APP_URL}api/auth/login`, data);
return response.data;

}


// Register User
const Register = async (userData:IRegister) => {
    const response = await axios.post(`${APP_URL}api/auth/register`, userData)
    return response.data
}



const authService ={
    Login,
    Register
}

export default authService