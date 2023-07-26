import { View, Text,StyleSheet } from 'react-native'
import React from 'react'

const NutritionScreen = () => {
  const style = StyleSheet.create({
    container: {
        flex:1,
        padding:20,
        justifyContent:"center",
        backgroundColor: '#292929',
        alignItems: 'center',
       display:"flex"
      
      },
})
  return (
    <View style={style.container}>
      <Text>NutritionScreen</Text>
    </View>
  )
}

export default NutritionScreen