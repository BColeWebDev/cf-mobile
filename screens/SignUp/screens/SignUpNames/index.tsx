import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform,
} from "react-native";
import { Button, Surface, TextInput, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { ActivityIndicator } from "@react-native-material/core";
import React from "react";
import { AppDispatch, RootState } from "../../../../redux/app/store";
import { setRegister } from "../../../../redux/features/auth/authSlice";

const SignUpNamesScreens = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { register } = useSelector((state: RootState) => state.auth);
  console.log("register", register);
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
      backgroundColor: "white",
      alignItems: "flex-end",
      justifyContent: "center",
      color: "white",
    },
  });

  return (
    <View style={style.container}>
      <ScrollView
        style={{
          width: "100%",
          height: "100%",
          flex: 1,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <View
          style={{ display: "flex", alignItems: "flex-start", marginTop: 110 }}
        >
          {/* <CfIcon/> */}
          <Text
            style={{
              fontSize: 35,
              marginLeft: 20,
              fontWeight: "600",
              color: "black",
            }}
          >
            Sign Up
          </Text>
        </View>
        <View
          style={{
            width: "90%",
            flex: 1,
            marginTop: "10%",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <TextInput
            placeholder="First Name"
            textColor="black"
            mode={"outlined"}
            style={{ marginHorizontal: 20, width: "100%", marginBottom: 40 }}
            selectionColor={"black"}
            cursorColor={"#F9C000"}
            defaultValue={register.first_name}
            onChangeText={(text) => {
              console.log("text", text);
              // setregister(prevState => ({...prevState,first_name:text}))
              dispatch(setRegister({ value: text, name: "first_name" }));
            }}
          />
          <TextInput
            placeholder="First Name"
            textColor="black"
            mode={"outlined"}
            style={{ marginHorizontal: 20, width: "100%", marginBottom: 40 }}
            selectionColor={"black"}
            cursorColor={"#F9C000"}
            onChangeText={(text) => {
              // setregister(prevState => ({...prevState,first_name:text}))
              dispatch(setRegister({ value: text, name: "last_name" }));
            }}
          />
        </View>
        {register.first_name !== "" && register.last_name !== "" ? (
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
            onPress={() => navigation.navigate("SignUpEmailScreens")}
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
          onPress={() => navigation.navigate("Login")}
        >
          Back to Login
        </Button>
      </ScrollView>
    </View>
  );
};

export default SignUpNamesScreens;
