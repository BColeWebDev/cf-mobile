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
          ? "#171a1d"
          : "#f9fafa",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
    },
  });

  return (
    <View style={style.container}>
      <ActivityIndicator size="large" color={color} />
    </View>
  );
}
