import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { ActivityIndicator } from '@react-native-material/core'
import CfIcon from '../../assets/images/CF-Icon.svg';
export default function Loading() {
  
  const style = StyleSheet.create(
    {

      container: {
        flex: 1,
        height:"80%",
        backgroundColor: '#292929',
        alignItems: 'center',
        justifyContent: 'center',
        color:"white"
        
      },

    });



  return (
    <View style={style.container}>
        {/* <CfIcon width={150} height={100}/> */}
      <ActivityIndicator size="large" color="#F9C000" />
    </View>
  )
}