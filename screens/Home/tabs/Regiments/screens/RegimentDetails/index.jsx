import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { Box,Button,Surface,Chip} from '@react-native-material/core';


export default function RegimentDetails({route, navigation}) {
      /* 2. Get the param */
  const { detailInfo } = route.params;
  const style = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-start",
      backgroundColor: "#292929",
      alignItems: "center",
      display: "flex",
    },
  });
  console.log("detailInfo",detailInfo)
  
  return (
    <View style={style.container}>
       <Text style={{textAlign:"center", fontSize:30, marginVertical:10, color:"white"}}>{detailInfo.name}</Text>

       <Text style={{color:"white", marginVertical:20}}>Routines</Text>
      <ScrollView style={{width:"100%",}}>{detailInfo.routines.map((val,idx)=>
      <Box key={idx} style={{marginBottom:20, borderRadius:8, padding:10, width:"95%",marginLeft:"auto",marginRight:"auto",  backgroundColor:"white"}}>
        <Box style={{width:80,marginLeft:"auto"}}>

        <Chip label={val.day} variant={"filled"} color='purple' />
        </Box>
        {/* <Text style={{textTransform:"capitalize",color:"black", textAlign:"right"}}>{val.day}</Text> */}
        <Text style={{textTransform:"capitalize", color:"black",fontSize:25, fontWeight:"500" ,marginBottom:20}}>{val.name}</Text>
        <Text style={{textTransform:"capitalize", color:"black",fontWeight:"200", textAlign:'center', marginVertical:15}}>{val.description}</Text>
        <Text style={{marginVertical:20,fontSize:20 }}>Workouts</Text>
        <Button title="Create Workout"  onPress={()=>{navigation.navigate("Workouts",{regimentId:detailInfo?._id, day:val.day, routineId:detailInfo._id})}}/>
        {val.workouts.map((value,idx)=><Box key={idx}>

        </Box>)}
      </Box>)
    }</ScrollView>
    </View>
  )
}