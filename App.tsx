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

interface Workout {
message:string
}


const Stack = createNativeStackNavigator();


export default function App() {
const [data, setdata] = useState<Workout>();

  
// return (
//   <Provider store={store}>
// <View style={styles.container}>
//    {/* <Login/> */}
//    <SignUp/>
//   </View>
//   </Provider>
  
// );

return (
<Provider store={store}>
<NavigationContainer  >
<Stack.Navigator initialRouteName='Login' >
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
</Stack.Navigator>
</NavigationContainer>

</Provider>

)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:"80%",
    backgroundColor: '#292929',
    alignItems: 'center',
    justifyContent: 'center',
    color:"white"
    
  },
});
