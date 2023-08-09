import { ScrollView, View , } from 'react-native'
import React from 'react'
import { Text,Button} from '@react-native-material/core';
import { useSelector } from 'react-redux';

const WorkoutsModal = ({navigation}) => {
    const {workouts, isLoading,equipments, bodyTargets,muscles} = useSelector((state:any) =>state.workouts)
  return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "space-between", }}>
          <Text style={{ fontSize: 30, display:"flex" ,backgroundColor:"green", color:"white", width:'100%', padding:10,fontWeight:"600"}}>Filters</Text>
          <ScrollView>
            {equipments.map((val,idx) =><Text key={idx}>{val}</Text>)}
          </ScrollView>
          <Button 
          onPress={() => navigation.goBack()}
           title="Dismiss" />
        </View>
  )
}

export default WorkoutsModal