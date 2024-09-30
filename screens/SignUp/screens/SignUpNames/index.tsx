import { View, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { Button, RadioButton, TextInput, Text } from "react-native-paper";
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
          textColor="black"
          mode={"outlined"}
          style={{
            marginBottom: 25,
            width: "100%",
            marginHorizontal: 20,
            backgroundColor: "white",
            color: "black",
          }}
          placeholderTextColor={"black"}
          activeOutlineColor="black"
          selectionColor={"black"}
          cursorColor={"black"}
          defaultValue={register.first_name}
          onChangeText={(text) => {
            dispatch(setRegister({ value: text, name: "first_name" }));
          }}
        />
        <TextInput
          placeholder="Last Name"
          textColor="black"
          mode={"outlined"}
          style={{
            marginBottom: 25,
            width: "100%",
            marginHorizontal: 20,
            backgroundColor: "white",
            color: "black",
          }}
          placeholderTextColor={"black"}
          activeOutlineColor="black"
          selectionColor={"black"}
          cursorColor={"black"}
          onChangeText={(text) => {
            dispatch(setRegister({ value: text, name: "last_name" }));
          }}
        />

        <TextInput
          placeholder="Age"
          textColor="black"
          mode={"outlined"}
          style={{
            marginBottom: 25,
            width: "100%",
            marginHorizontal: 20,
            backgroundColor: "white",
            color: "black",
          }}
          placeholderTextColor={"black"}
          activeOutlineColor="black"
          selectionColor={"black"}
          cursorColor={"black"}
          keyboardType={"number-pad"}
          onChangeText={(text) => {
            dispatch(setRegister({ value: text, name: "age" }));
          }}
          maxLength={2}
        />

        <TextInput
          placeholder="Bio"
          textColor="black"
          mode={"outlined"}
          style={{
            marginBottom: 25,
            width: "100%",
            marginHorizontal: 20,
            backgroundColor: "white",
            color: "black",
          }}
          placeholderTextColor={"black"}
          activeOutlineColor="black"
          selectionColor={"black"}
          cursorColor={"black"}
          onChangeText={(text) => {
            dispatch(setRegister({ value: text, name: "bio" }));
          }}
        />
      </View>
      {register.first_name !== "" &&
      register.last_name !== "" &&
      register.age !== "" &&
      register.bio !== "" ? (
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
          onPress={() => navigation.navigate("SignUpExperience")}
        >
          Next
        </Button>
      ) : null}

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
