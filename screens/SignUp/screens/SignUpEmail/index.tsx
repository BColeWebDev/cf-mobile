import { View, StyleSheet, ScrollView } from "react-native";
import { Button, TextInput, Text } from "react-native-paper";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/app/store";
import { setRegister } from "../../../../redux/features/auth/authSlice";

const SignUpEmail = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { register } = useSelector((state: RootState) => state.auth);
  console.log("register", register);
  const [showPassword, setshowPassword] = useState(false);

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
          style={{
            display: "flex",
            alignItems: "flex-start",
            marginTop: 110,
          }}
        >
          {/* <CfIcon/> */}
          <Text
            style={{
              fontSize: 35,
              marginLeft: 20,
              fontWeight: "900",
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
            placeholder="Email"
            textColor="black"
            mode={"outlined"}
            style={{ marginHorizontal: 20, width: "100%", marginBottom: 40 }}
            selectionColor={"black"}
            cursorColor={"black"}
            onChangeText={(text) => {
              console.log("text", text);
              // setregister(prevState => ({...prevState,first_name:text}))
              dispatch(setRegister({ value: text, name: "email" }));
            }}
            keyboardType={"email-address"}
          />
          <TextInput
            placeholder="Password"
            textColor="black"
            mode={"outlined"}
            style={{ marginHorizontal: 20, width: "100%", marginBottom: 40 }}
            selectionColor={"black"}
            cursorColor={"black"}
            onChangeText={(text) => {
              // setregister(prevState => ({...prevState,first_name:text}))
              dispatch(setRegister({ value: text, name: "password" }));
            }}
            right={
              <TextInput.Icon
                icon={"eye"}
                onPress={() => setshowPassword(!showPassword)}
              />
            }
            secureTextEntry={!showPassword ? true : false}
            keyboardType={"email-address"}
          />

          <TextInput
            placeholder="Re-Enter Password"
            textColor="black"
            mode={"outlined"}
            style={{ marginHorizontal: 20, width: "100%", marginBottom: 40 }}
            selectionColor={"black"}
            cursorColor={"black"}
            onChangeText={(text) => {
              // setregister(prevState => ({...prevState,first_name:text}))
              dispatch(setRegister({ value: text, name: "reEnterPassword" }));
            }}
            right={
              <TextInput.Icon
                icon={"eye"}
                onPress={() => setshowPassword(!showPassword)}
              />
            }
            secureTextEntry={!showPassword ? true : false}
            keyboardType={"email-address"}
          />
        </View>
        {register.password === register.reEnterPassword &&
        register.password !== "" &&
        register.reEnterPassword !== "" ? (
          <Button
            style={{
              marginTop: "40%",
              width: 220,
              marginLeft: "auto",
              marginRight: "auto",
            }}
            buttonColor="black"
            textColor="white"
            mode={"outlined"}
            onPress={() => navigation.navigate("Login")}
          >
            Next
          </Button>
        ) : null}
      </ScrollView>
    </View>
  );
};

export default SignUpEmail;
