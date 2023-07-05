import { StyleSheet, View } from 'react-native';
import { Button, Text } from "@react-native-material/core";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Main from './Main';
import Loading from './Loading';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './Login';
import SignUp from "./SignUp";
import { Provider } from 'react-redux';
import { store } from '../redux/app/store';
import Confirmation from './Confirmation';
import Error from './Error';
import Home from './Home';
import { useSelector } from 'react-redux';
import Settings from './Settings';

const Stack = createNativeStackNavigator();
export default function AllScreens() {

    const{currentUser, isLoggedIn}= useSelector((state:any)=>state.auth)
  return (
    <NavigationContainer  >
<Stack.Navigator initialRouteName={isLoggedIn ?'Home':'Login'} >
<Stack.Screen
    name="Loading"
    component={Loading}
    options={{headerShown: false}}
  />
  <Stack.Screen
    name="Sign Up"
    component={SignUp}
    options={{headerShown: false}}
  />
  <Stack.Screen 
  name="Login" 
  component={Login}   
   options={{headerShown: false}}
   />
   <Stack.Screen name='Confirmation' 
   component={Confirmation}
   options={{headerShown: false}}
   />
      <Stack.Screen name='Error' 
   component={Error}
   options={{headerShown: false}}
   />
   <Stack.Screen name='Home' 
   component={Home}
   options={{headerShown: false}}
   />
      <Stack.Screen name='Settings' 
   component={Settings}
   />
</Stack.Navigator>
</NavigationContainer>

  )
}