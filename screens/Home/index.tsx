import { View, StyleSheet, Platform} from 'react-native';
import { Text, Surface, Box, Flex} from '@react-native-material/core';
import React,{useEffect} from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Stack, FAB } from "@react-native-material/core";
import CFIcon from "../../assets/images/CF-Icon-Black.svg"
import ChadIcon from "../../assets/images/Chad.svg"
import MuscleIcon from "../../assets/images/Muscle-Icon.svg"
import PlatIcon from "../../assets/images/Plate.svg"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 

export default function Home() {
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

    const ProfileScreen =() =>
    <View style={style.container}>
          <Box style={{display:"flex", flexDirection:"column", alignItems:"center", width:"100%", justifyContent:"space-between", marginTop:50}}>
            <Box style={{display:"flex", justifyContent:"flex-end", flexDirection:"row", width:"100%"}}>

          <Feather name="settings" size={24} color="black" style={{alignItems:"flex-end", marginRight:10}} onPress={()=> alert("testing") } />
          <FontAwesome5 name="crown" size={24} color="#FAC000" onPress={()=> alert("Crown Member") } />
            </Box>
            <Box style={{display:"flex",flexDirection:"row", margin:20,  justifyContent:"space-between",  width:"100%"}}>
              <Flex direction="row" style={{alignItems:"center"}}>
              <Text style={{fontSize:30, color:"white"}}>Profile</Text>
            <Ionicons name="person-circle-sharp" size={30} color="black" />
              </Flex>
              <Box 
        p={4} 
        border={1}
        borderColor={"#03dac5b3"}
        radius={8}  
        style={{alignItems:"center", display:"flex", justifyContent:"center"}}
        >
       <Text color='#03dac5b3' style={{textAlign:"center"}}>Beginner</Text>
              </Box>
            </Box>
            <Box style={{flexDirection:"row"}}>
            <Text style={{marginHorizontal:10}}>First Name</Text>
            <Text> Last Name</Text>
            </Box>
       
        
      
      
          </Box>   

        </View>

    const RegimentsScreen =() =><View style={style.container}><Text>Regiments</Text></View>

    const WorkoutsScreen =() =><View style={style.container}><Text>Workouts</Text></View>

    const NutritionsScreen =() =><View style={style.container}><Text>Nutritions</Text></View>


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
    <Tab.Screen name="My Regiments" component={RegimentsScreen} options={{headerShown: false, 
tabBarIcon:({color,size}) =>(<MuscleIcon width={size} fill={color}/>)
}}
    />
    <Tab.Screen name="Workouts" component={WorkoutsScreen} options={{headerShown: false
    ,tabBarIcon:({color,size}) =>(<ChadIcon width={size} fill={color}/>)
    
}
} />
    <Tab.Screen name="Nutritions" component={NutritionsScreen} options={{headerShown: false
    ,tabBarIcon:({color,size}) =>(<PlatIcon width={size} fill={color}/>)
    }} />
    
  </Tab.Navigator>
    // <View style={style.container}>
    //   <Text>Home</Text>
     
    // </View>
  )
}