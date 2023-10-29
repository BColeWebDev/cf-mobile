import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform,
} from "react-native";
import {
  Box,
  Button,
  Stack,
  Surface,
  TextInput,
  Text,
} from "@react-native-material/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/app/store";
const SignUpEmail = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, register } = useSelector((state: RootState) => state.auth);
  console.log("register", register);
  const style = StyleSheet.create({
    textInput: {
      width: "100%",
      marginLeft: "auto",
      marginRight: "auto",
      marginBottom: 20,
      backgroundColor: "",
      paddingLeft: 10,
      marginVertical: 20,
    },
    inputStyles: {
      color: "#F9C000",
      borderBottomColor: "white",
    },
    container: {
      flex: 1,
      height: "100%",
      backgroundColor: "#292929",
      alignItems: "flex-end",
      justifyContent: "center",
      color: "white",
    },
  });
  return (
    <View>
      <Text>SignUp Email</Text>
    </View>
  );
};

export default SignUpEmail;
