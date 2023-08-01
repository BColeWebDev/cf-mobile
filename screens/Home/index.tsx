import { View, StyleSheet, Platform} from 'react-native';
import { Text,Button} from '@react-native-material/core';
import React,{useEffect} from 'react'
import CFIcon from "../../assets/images/CF-Icon-Black.svg"
import ChadIcon from "../../assets/images/Chad.svg"
import MuscleIcon from "../../assets/images/Muscle-Icon.svg"
import PlatIcon from "../../assets/images/Plate.svg"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import ProfileScreen from './tabs/Profile';
import RegimentScreen from './tabs/Regiments';
import WorkoutsScreen from './tabs/Workouts';
import NutritionScreen from './tabs/Nutritions';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function Home({navigation}) {
  const {isError,isLoading,isLoggedIn, currentUser} = useSelector((state:any) => state.auth)
  
    const style = StyleSheet.create({
        container: {
            flex: 1,
            padding:20,
            justifyContent:"flex-start",
            backgroundColor: '#292929',
            alignItems: 'center',
          
          },
    })
    const Tab = createBottomTabNavigator();
    const Stack = createNativeStackNavigator();
    
  
    const ModalScreen = ({ navigation }) => {
      return (
        
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 30 }}>This is a modal!</Text>
          <Button onPress={() => navigation.goBack()} title="Dismiss" />
        </View>
      );
    }
    
    
 


  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height:  Platform.OS === "ios" ? 90 : 50,
          paddingHorizontal: 5,
          paddingTop: 0,
          backgroundColor: 'rgba(34,36,40,1)',
          position: 'absolute',
          borderTopWidth: 0,
      },
      
    })}
   
    >
    <Tab.Screen name="Profile" component={ProfileScreen}  options={{headerShown: false, tabBarIcon:({color,size}) =>(
    <CFIcon width={size} fill={color} />
    )}}/>
    <Tab.Screen name="My Regiments" component={RegimentScreen}  options={{headerShown: false, 
tabBarIcon:({color,size}) =>(<MuscleIcon width={size} fill={color}/>)
}}
    />
    <Tab.Group>
    <Tab.Screen name="Workouts" component={WorkoutsScreen} options={{headerShown: false,tabBarIcon:({color,size}) =>(<ChadIcon width={size} fill={color}/>)}} />
    </Tab.Group>

    <Tab.Screen name="Nutritions" component={NutritionScreen} options={{headerShown: false
    ,tabBarIcon:({color,size}) =>(<PlatIcon width={size} fill={color}/>)
    }} />
  </Tab.Navigator>
  )
}