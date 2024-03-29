import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { ActivityIndicator } from "@react-native-material/core";
import CfIcon from "../../assets/images/CF-Icon.svg";
export default function Loading({ color }) {
  const style = StyleSheet.create({
    container: {
      flex: 1,
      height: "80%",
      backgroundColor: "white",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      width: "100%",
    },
  });

  return (
    <View style={style.container}>
      {/* <CfIcon width={150} height={100}/> */}
      <ActivityIndicator
        size="large"
        color={color === undefined ? "black" : color}
      />
    </View>
  );
}
