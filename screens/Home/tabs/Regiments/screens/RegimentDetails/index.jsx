import { View, Text } from 'react-native'
import React from 'react'
import { Box } from '@react-native-material/core';

export default function RegimentDetails({route, navigation}) {
      /* 2. Get the param */
  const { detailInfo } = route.params;

  return (
    <View>
       <Text>{detailInfo.name}</Text>
      <Text>{detailInfo._id}</Text>
      <Box>{detailInfo.routines.map((val)=><Text>{val.day}</Text>)}</Box>
    </View>
  )
}