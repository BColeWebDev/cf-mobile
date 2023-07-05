import { View,  StyleSheet} from 'react-native'
import React,{useState} from 'react'
import { Box, Button, Stack,Surface, TextInput,Text, ActivityIndicator,} from '@react-native-material/core';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import CfIcon from"../../assets/images/CF-Icon.svg"
import { useSelector,useDispatch } from 'react-redux';
import { LoginUser, setCurrentUser } from '../../redux/features/auth/authSlice';

export default function Login({navigation}) {
  const dispatch = useDispatch<any>()
   const [login, setlogin] = useState({email:"",password:""});
const [showPassword, setshowPassword] = useState(false);
const {isError,isLoading,isLoggedIn, currentUser} = useSelector((state:any) => state.auth);
  console.log(currentUser.existingUser, isLoggedIn);
  const style = StyleSheet.create(
    {
      textInput:{
        width:"85%",
         marginLeft:"auto", 
         marginRight:"auto",
         marginBottom:20,
         backgroundColor:"",
         paddingLeft:10,
         marginVertical:20,
      },
      inputStyles:{
        color:'#F9C000',
        borderBottomColor:"white"
      },
      container: {
        flex: 1,
        padding:20,
        backgroundColor: '#292929',
        alignItems: 'center',
        justifyContent: 'center',
        color:"white"
        
      },

    });

const handleLoginUser =() =>{
  dispatch(LoginUser({email: login.email, password:login.password})).then((val)=> {
    console.log(val)
    if(val.meta.requestStatus === "fulfilled"){
      navigation.navigate("Home")
      // console.log(val.payload.data)
      dispatch(setCurrentUser(val.payload.data))
    }
    if(val.meta.requestStatus === "rejected"){
      navigation.navigate("Login");
      alert(val.payload.response.data.message)
    }
  });
  
}


  return (
       <>
  <View style={style.container}>
  <Box  style={{display:"flex",alignItems:"center", marginTop:40}}>
        {/* <CfIcon/> */}
        <Text style={{fontSize:35, fontWeight:"600", color:"white"}}>
        Login
       </Text>
        </Box>  
    

        <Surface  style={{width:"95%", marginBottom:100, 
        marginTop:40,
        borderRadius:10,height: 200, backgroundColor:"#121212", alignItems:"center", justifyContent:"space-around"}}>
          <TextInput style={style.textInput}
          placeholder='Email'
          placeholderTextColor={"#F9C000"}
          variant={"standard"}
          selectionColor={"white"}
          onChangeText={text =>setlogin(prevState => ({...prevState,email:text}))}
          keyboardType={"email-address"}
          inputStyle={style.inputStyles}
                  />

          <TextInput style={style.textInput}
          placeholder='Password'
          placeholderTextColor={"#F9C000"}
          variant={"standard"}
          selectionColor={"white"}
          cursorColor={"#F9C000"}
          onChangeText={text =>setlogin(prevState => ({...prevState,password:text}))}
          trailing={prop => !showPassword ? 
          <Ionicons name="md-eye"
           size={24} color="white" onPress={()=>setshowPassword(true)} /> 
          : 
          <Ionicons name="md-eye-off" size={24} color="white" 
          onPress={()=>setshowPassword(false)}
          />}
          secureTextEntry={!showPassword ? true : false}
          keyboardType={"email-address"}
          inputStyle={style.inputStyles}
          />


   
        </Surface>
        

    
        <Stack direction={"row"} justify={"around"} spacing={10} w={"100%"}>
        <Button 
          title="Login"
          
          tintColor='black' 
          color='#F9C000'
          disabled={login.email === "" || login.password === "" ? true : false}
          style={{width:140, height:40, justifyContent:"center"}}
          onPress={()=>{
            handleLoginUser();
            navigation.navigate("Loading")
          }}
        />

        <Button 
        title="Sign Up" 
          style={{width:140, height:40, justifyContent:"center"}}
        onPress={() => navigation.navigate("Sign Up")}
         variant={'outlined'} 
        color='#FAC000'/>
        </Stack>

        <Stack direction={"column"} justify={"center"} items={"center"} mt={30} spacing={10} w={"100%"}>
        <Button 
          title="Login with Google"
          tintColor='black' 
          color='white'
          leading={props => <AntDesign name='google'size={30}/>}
          style={{width:"80%", height:50, justifyContent:"center", borderRadius:600}}
        />



        <Button 
          title="Login with Apple"
          tintColor='black' 
          color='white'
          onPress={()=>  alert("testing")}
          leading={props => <AntDesign name='apple1'size={30}/>}
          style={{width:"80%", height:50, justifyContent:"center", borderRadius:600}}
        />


       
        </Stack>

  </View>
    
       </>
  )
} 