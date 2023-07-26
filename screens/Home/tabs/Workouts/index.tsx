import { View, Text,StyleSheet, ScrollView, Image} from 'react-native'
import React,{useEffect}from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Box, TextInput } from '@react-native-material/core'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getAllWorkouts } from '../../../../redux/features/workouts/workoutSlice'
import Loading from '../../../Loading'
const WorkoutsScreen = () => {
  const dispatch = useDispatch<any>()
  const {workouts, isLoading} = useSelector((state:any) =>state.workouts)
  const {currentUser} = useSelector((state:any) =>state.auth)
  console.log("currentUser-Workouts",currentUser)
  const style = StyleSheet.create({
    container: {
        flex:1,
        padding:1,
        justifyContent:"flex-start",
        backgroundColor: '#292929',
        alignItems: 'center',
       display:"flex"
      
      },
})
useEffect(() => {
  dispatch(getAllWorkouts({token:currentUser.userToken}))
}, []);

if(isLoading){
  return <Loading/>
}


  return (
    <SafeAreaView style={style.container}>
      <Box style={{width:"100%"}}>
        <Text style={{fontSize:28, color:"white",   marginLeft:10, marginTop:30,marginBottom:10}}>Workouts</Text>
        <TextInput style={{margin:10, borderRadius:40}} trailing={<Box><Text>t</Text></Box>}></TextInput>
        <ScrollView>
        {workouts?.items?.map((val,idx)=>
        <Box key={idx} style={{display:"flex", flexDirection:"row-reverse",marginBottom:20, backgroundColor:"black", borderRadius:10, padding:10, justifyContent:"space-around",alignItems:"center"}}>
        <Image source={{uri:val.gifUrl}} style={{width:60,height:60, borderRadius:50}}/>
        <Box style={{flex:1}}>
        <Text  style={{fontSize:20, flex:1, color:"white", marginTop:10, marginBottom:10}}>{val.name}</Text>
        <Text  style={{fontSize:10, flex:1, color:"white", marginTop:10, marginBottom:10}}>{val.name}</Text>
        </Box>
        </Box>
        
        )
        
        }
        </ScrollView>
        </Box>
    </SafeAreaView>
  )
}

export default WorkoutsScreen