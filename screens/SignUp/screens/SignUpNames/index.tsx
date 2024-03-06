import { View, StyleSheet, ScrollView } from "react-native";
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
          style={{ display: "flex", alignItems: "flex-start", marginTop: 50}}
        >
          {/* <CfIcon/> */}
          <Text
            style={{
              fontSize: 25,
              marginLeft: 20,
              color: "black",
              marginBottom:20
            }}
          >
            Sign Up - Name
          </Text>
        </View>
        <View
          style={{
            width: "90%",
            flex: 1,
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
            style={{
              marginBottom: 25,
              marginHorizontal: 20,
              backgroundColor: "white",
              width:"100%"
            }}
            activeOutlineColor="black"
            selectionColor={"black"}
            cursorColor={"black"}
            defaultValue={register.first_name}
            onChangeText={(text) => {
              console.log("text", text);
              dispatch(setRegister({ value: text, name: "first_name" }));
            }}
          />
          <TextInput
               placeholder="Last Name"
             textColor="black"
             mode={"outlined"}
             style={{
              marginBottom: 25,
              marginHorizontal: 20,
              backgroundColor: "white",
              width:"100%"
            }}
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
              marginHorizontal: 20,
              backgroundColor: "white",
              width:"100%"
            }}
            activeOutlineColor="black"
            selectionColor={"black"}
            cursorColor={"black"}
            keyboardType={"number-pad"}
            onChangeText={(text) => {
              dispatch(setRegister({ value: text, name: "age" }));
            }}
          />

          <TextInput
            placeholder="Bio"
            textColor="black"
              mode={"outlined"}
              style={{
                marginBottom: 25,
                marginHorizontal: 20,
                backgroundColor: "white",
                width:"100%"
              }}
              activeOutlineColor="black"
              selectionColor={"black"}
              cursorColor={"black"}
            onChangeText={(text) => {
              // setregister(prevState => ({...prevState,first_name:text}))
              dispatch(setRegister({ value: text, name: "bio" }));
            }}
          />

          <Text
            style={{
              fontSize: 20,
              textAlign: "left",
              width: "100%",
              marginBottom: 16,
            }}
          >
            Experience
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 16 }}>Beginner</Text>
            <RadioButton
              value="beginner"
              status={
                register.experience === "beginner" ? "checked" : "unchecked"
              }
              onPress={() => {
                dispatch(
                  setRegister({ value: "beginner", name: "experience" })
                );
              }}
            />
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 16 }}>Intermediate</Text>
            <RadioButton
              value="intermediate"
              status={
                register.experience === "intermediate" ? "checked" : "unchecked"
              }
              onPress={() => {
                dispatch(
                  setRegister({ value: "intermediate", name: "experience" })
                );
              }}
            />
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 16 }}>Advance</Text>
            <RadioButton
              value="advance"
              status={
                register.experience === "advance" ? "checked" : "unchecked"
              }
              onPress={() => {
                dispatch(setRegister({ value: "advance", name: "experience" }));
              }}
            />
          </View>
        </View>
        {register.first_name !== "" &&
        register.last_name !== "" &&
        register.age !== "" &&
        register.experience !== "" &&
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
          onPress={() => {
            navigation.navigate("Login");
            dispatch(resetRegister());
          }}
        >
          Back to Login
        </Button>
      </ScrollView>
    </View>
  );
};

export default SignUpNamesScreens;
