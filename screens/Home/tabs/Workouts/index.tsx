import { View, Text,StyleSheet, ScrollView, Image} from 'react-native'
import React,{useEffect,useState}from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Box, TextInput, Badge, Flex, Button } from '@react-native-material/core'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getAllBodyTargets, getAllEquipment, getAllWorkouts } from '../../../../redux/features/workouts/workoutSlice'
import Loading from '../../../Loading'
import { AntDesign, FontAwesome  } from '@expo/vector-icons'; 
const WorkoutsScreen = ({navigation}) => {
  const [input, setinput] = useState("");
  const dispatch = useDispatch<any>()
  const {workouts, isLoading,equipments, bodyTargets,muscles} = useSelector((state:any) =>state.workouts)
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
  dispatch(getAllEquipment({token:currentUser.userToken}))
  dispatch(getAllBodyTargets({token:currentUser.userToken}))
}, []);

if(isLoading){
  return <Loading/>
}

console.log("equipment",equipments,bodyTargets,muscles)
  return (
    <SafeAreaView style={style.container}>
        {/* <Box style={{display:"flex",flexDirection:"column", width:"100%",justifyContent:"flex-end", marginRight:20,marginTop:10}}>
          {equipments?.map((val,idx)=><Text key={idx}>{val}
          </Text>)}
      </Box> */}
      <Box style={{width:"100%"}}>
      <Box style={{display:"flex",width:"100%", flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
      <Text style={{fontSize:28, color:"white",   marginLeft:10, marginTop:30,}}>Workouts</Text>
        <FontAwesome name="filter" size={24} style={{marginRight:20}} color="white"    onPress={() => navigation.navigate('MyModal')}/>
      </Box>
       
        <TextInput  style={{margin:10, borderRadius:40, marginHorizontal:20}} 
        leading={<AntDesign name="search1" size={24} color="black" />}
        onChangeText={text =>setinput(text)}
        ></TextInput>
        <ScrollView>
        {workouts?.items?.filter((val)=>{
          if(input === ""){
            return val
          }
          // FIXME:->Search 
          return val.name.toLowerCase().includes(input.toLowerCase())
          
        }).map((val,idx)=>
        <Box key={idx} style={{display:"flex", flexDirection:"row-reverse",marginBottom:20, backgroundColor:"black", borderRadius:10, padding:10, justifyContent:"space-around",
        alignItems:"center", marginHorizontal:20}}>
        <Image source={{uri:val.gifUrl}} style={{width:60,height:60, borderRadius:50}}/>
        <Box style={{flex:1,}}>
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