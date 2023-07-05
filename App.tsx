import { StyleSheet, View } from 'react-native';
import { Button, Text } from "@react-native-material/core";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Main from './screens/Main';
import Loading from './screens/Loading';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './screens/Login';
import SignUp from "./screens/SignUp";
import { Provider } from 'react-redux';
import { store } from './redux/app/store';
import Confirmation from './screens/Confirmation';
import Error from './screens/Error';
import Home from './screens/Home';
import { useSelector } from 'react-redux';
import AllScreens from './screens';



const Stack = createNativeStackNavigator();


export default function App() {

  


return (
<Provider store={store}>
<AllScreens/>

</Provider>

)
}

