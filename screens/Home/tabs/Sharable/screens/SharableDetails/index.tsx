import React from "react";
import { View, Text } from "react-native";

export default function SharableDetails({ route }) {
  console.log(route.params.item);
  return (
    <View>
      <Text>SharableDetails</Text>
      <Text>{route.params.sharableId}</Text>
      <Text></Text>
    </View>
  );
}
