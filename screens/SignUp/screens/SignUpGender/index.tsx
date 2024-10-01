import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../../redux/app/store";
import { useDispatch } from "react-redux";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const SignUpGender = () => {
  const { register } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const [value, setValue] = useState("");

  const style = StyleSheet.create({
    textInput: {
      width: "100%",
      marginBottom: 30,
    },
    inputStyles: {
      color: "white",
      backgroundColor: "white",
      borderBottomColor: "white",
    },
    container: {
      flex: 1,
      height: "100%",
      backgroundColor: "#171a1d",
      alignItems: "center",
      justifyContent: "flex-start",
      color: "white",
    },
  });
  return (
    <SafeAreaView style={style.container}>
      <Text style={{ marginVertical: 10, fontSize: 25, color: "#f9fafa" }}>
        What is your gender?
      </Text>
      <MaterialCommunityIcons name="gender-male" size={24} color="black" />
    </SafeAreaView>
  );
};

export default SignUpGender;
