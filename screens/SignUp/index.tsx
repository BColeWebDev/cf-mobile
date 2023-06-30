import { View,StyleSheet, ScrollView, SafeAreaView} from 'react-native'
import React,{useState} from 'react'
import { Box, Button, Stack,Surface, TextInput,Text,} from '@react-native-material/core';
import { RegisterUser } from '../../redux/features/auth/authSlice';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import {IRegister } from "../../redux/features/auth/interfaces/IAuth"
import { AppDispatch } from '../../redux/app/store';
const SignUp = ({navigation}) => {
  const dispatch = useDispatch<AppDispatch>();
    const createUser = () =>{
      delete register.reEnterPassword
      dispatch(RegisterUser(register))
    }
    const style = StyleSheet.create(
      {
        textInput:{
          width:"100%",
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
          height:"80%",
          backgroundColor: '#292929',
          alignItems: 'center',
          justifyContent: 'center',
          color:"white"
          
        },
  
      });

        const [register, setregister] = useState(
          {first_name:"",
          last_name:"",
          email:"",
          password:"",
          reEnterPassword:"",
          bio:"",
          experience:"",
          crown_member:false,
          age:"",
          sex:""
        }
          );
       const [showPassword, setshowPassword] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1,
        width:"100%",
        paddingTop: 10,
        backgroundColor:"#292929"
        }}>
        
 <ScrollView style={{ width:"100%", marginLeft:"auto", marginRight:"auto"}}>
  <Box style={{width:"80%", marginLeft:"auto",marginRight:"auto"}}>
  <Box  style={{display:"flex",alignItems:"center", marginTop:40}}>
        {/* <CfIcon/> */}
        <Text style={{fontSize:35, fontWeight:"600", color:"white"}}>
        Sign Up
       </Text>
        </Box> 
  <TextInput 
      label='First Name' 
      style={style.textInput}
      onChangeText={text =>setregister(prevState => ({...prevState,first_name:text}))}
      />
      <TextInput label='Last Name' 
      style={style.textInput}
      onChangeText={text =>setregister(prevState => ({...prevState,last_name:text}))}
      />
      <TextInput label='Email' 
      style={style.textInput}
      onChangeText={text =>setregister(prevState => ({...prevState,email:text}))}
      />
      <TextInput label='Password' 
      style={style.textInput}
      onChangeText={text =>setregister(prevState => ({...prevState,password:text}))}
      secureTextEntry={!showPassword ? true : false}
      trailing={prop => !showPassword ?
        <Ionicons 
        name="md-eye"
        size={24} 
        color="black" 
        onPress={()=>setshowPassword(true)}
        /> 
        : 
        <Ionicons 
        name="md-eye-off" 
        size={24} 
        color="black" 
        onPress={()=>setshowPassword(false)}
        />}
      />
      <TextInput label='Re-enter Password' 
      style={style.textInput}
      secureTextEntry={!showPassword ? true : false}
      onChangeText={text =>setregister(prevState => ({...prevState,reEnterPassword:text}))}
      
      trailing={prop => !showPassword ?
      <Ionicons 
      name="md-eye"
      size={24} 
      color="black" 
      onPress={()=>setshowPassword(true)}
      /> 
      : 
      <Ionicons 
      name="md-eye-off" 
      size={24} 
      color="black" 
      onPress={()=>setshowPassword(false)}
      />}
      />
      <TextInput label='Bio'
       style={style.textInput}
       onChangeText={text =>setregister(prevState => ({...prevState,bio:text}))}
       />
      <TextInput
       label='Experience' 
       style={style.textInput}
       onChangeText={text =>setregister(prevState => ({...prevState,experience:text}))}
       />
      <TextInput label='Age' 
      style={style.textInput}
      keyboardType={"numeric"}
      onChangeText={text =>setregister(prevState => ({...prevState,age:text}))}

      />
      <TextInput label='Sex'
       style={style.textInput}
       onChangeText={text =>setregister(prevState => ({...prevState,sex:text}))}

       />

  </Box>
  <Stack mb={80} direction={"row"} justify={"around"} spacing={1} w={"100%"}>
        <Button style={{width:150, }} color='#FAC000' title={"Submit"} onPress={createUser}></Button>
        <Button  style={{width:150}}   color='#FAC000' variant={"outlined"} title={"Login"} onPress={()=>navigation.navigate("Login")}></Button>
    </Stack>

    
    </ScrollView>
    </SafeAreaView>
   
  )
}

export default SignUp