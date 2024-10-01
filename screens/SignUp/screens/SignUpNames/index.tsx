import { View, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { Button, TextInput, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { AppDispatch, RootState } from "../../../../redux/app/store";
import {
  resetRegister,
  setRegister,
} from "../../../../redux/features/auth/authSlice";

const SignUpNamesScreens = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { register } = useSelector((state: RootState) => state.auth);
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
      justifyContent: "space-between",
      color: "white",
    },
  });

  return (
    <SafeAreaView style={style.container}>
      <Text
        style={{
          fontSize: 25,
          color: "#f9fafa",
          textAlign: "left",
          width: "95%",
          marginVertical: 30,
        }}
      >
        Sign Up - Name
      </Text>

      <View
        style={{
          width: "95%",
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "center",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <TextInput
          placeholder="First Name"
          placeholderTextColor={"white"}
          textColor="white"
          mode={"flat"}
          style={{
            marginBottom: 10,
            width: "100%",
            marginHorizontal: 20,
            backgroundColor: "#1d2025",
            color: "white",
          }}
          selectionColor={"white"}
          cursorColor={"white"}
          activeUnderlineColor="white"
          defaultValue={register.first_name}
          onChangeText={(text) => {
            dispatch(setRegister({ value: text, name: "first_name" }));
          }}
        />
        <TextInput
          placeholder="Last Name"
          placeholderTextColor={"white"}
          textColor="white"
          mode={"flat"}
          style={{
            marginBottom: 10,
            width: "100%",
            marginHorizontal: 20,
            backgroundColor: "#1d2025",
            color: "white",
          }}
          selectionColor={"white"}
          cursorColor={"white"}
          activeUnderlineColor="white"
          onChangeText={(text) => {
            dispatch(setRegister({ value: text, name: "last_name" }));
          }}
        />
      </View>

      <Button
        buttonColor="black"
        textColor="white"
        style={{
          width: 220,
          marginBottom: 20,
          borderRadius: 15,
          marginLeft: "auto",
          marginRight: "auto",
          height: 40,
          justifyContent: "center",
        }}
        mode="elevated"
        onPress={() => navigation.navigate("SignUpAge")}
      >
        Next
      </Button>

      <Button
        buttonColor="white"
        textColor="black"
        style={{
          width: 220,
          marginBottom: 20,
          borderRadius: 15,
          marginLeft: "auto",
          marginRight: "auto",
          height: 40,
          justifyContent: "center",
        }}
        mode="elevated"
        onPress={() => {
          dispatch(resetRegister());
          navigation.goBack();
        }}
      >
        Back to Login
      </Button>
    </SafeAreaView>
  );
};

export default SignUpNamesScreens;
