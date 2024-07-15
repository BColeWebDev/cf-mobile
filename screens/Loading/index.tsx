import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { ActivityIndicator } from "@react-native-material/core";
import CfIcon from "../../assets/images/CF-Icon.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/app/store";
export default function Loading({ color }) {
  const { currentUser } = useSelector((state: RootState) => state.auth);

  const style = StyleSheet.create({
    container: {
      flex: 1,
      height: "80%",
      backgroundColor:
        currentUser.existingUser?.settings?.theme === "dark"
          ? "#f9fafa"
          : "#1d2025",
      alignItems: "center",
      justifyContent: "center",
      color:
        currentUser.existingUser?.settings?.theme === "dark"
          ? "#f9fafa"
          : "#33373d",
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
