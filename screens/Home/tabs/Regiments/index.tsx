import { View, Text , StyleSheet} from 'react-native'
import React from 'react'
import { Box } from '@react-native-material/core'
import { SafeAreaView } from 'react-native-safe-area-context'

const RegimentScreen = () => {
  
  const style = StyleSheet.create({
    container: {
        flex:1,
        padding:20,
        justifyContent:"flex-start",
        backgroundColor: '#292929',
        alignItems: 'center',
       display:"flex"
      
      },
})
  return (
    <SafeAreaView style={style.container}>
        <Box style={{width:"100%"}}>
        <Text style={{fontSize:28, color:"white", marginTop:30}}>Regiments</Text>
        </Box>
      
    </SafeAreaView>
  )
}

export default RegimentScreen