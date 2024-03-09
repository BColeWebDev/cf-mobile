import { View, StyleSheet, ScrollView, PixelRatio } from "react-native";
import {
  Button,
  TextInput,
  Text,
  ActivityIndicator,
  Snackbar,
} from "react-native-paper";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/app/store";
import {
  RegisterUser,
  resetRegister,
  setRegister,
} from "../../../../redux/features/auth/authSlice";

const SignUpEmail = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { register, isLoading, isError, isSuccess, messages, message } =
    useSelector((state: RootState) => state.auth);
  console.log("register", register);
  const [showPassword, setshowPassword] = useState(false);
  const [visible, setvisible] = useState(false);
  const [successvisible, setSuccessVisible] = useState(false);
  const handleRegister = () => {
    dispatch(RegisterUser(register)).then((val) => {
      // Successfully submitted
      if (val.meta.requestStatus === "fulfilled") {
        setSuccessVisible(true);
        navigation.navigate("Login");
        dispatch(resetRegister());
      }
      // error message
      if (val.meta.requestStatus === "rejected") {
        console.log("VAL", val.payload);
        setvisible(true);
      }
    });
  };

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

  useEffect(() => {
    if (isError) {
      setvisible(!visible);
    }
  }, [isError]);
  useEffect(() => {
    if (isSuccess) {
      setSuccessVisible(!successvisible);
    }
  }, [isSuccess]);
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
              fontSize: 25,
              marginLeft: 20,

              color: "black",
            }}
          >
            Sign Up - Email
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
            style={{
              marginBottom: 25,
              marginHorizontal: 20,
              backgroundColor: "white",
              width: "100%",
            }}
            activeOutlineColor="black"
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
            style={{
              marginBottom: 25,
              marginHorizontal: 20,
              backgroundColor: "white",
              width: "100%",
            }}
            activeOutlineColor="black"
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
            keyboardType={"default"}
          />
        </View>
        {register.email !== "" && register.password !== "" ? (
          <Button
            disabled={isLoading}
            style={{
              marginTop: PixelRatio.get() * 5,
              width: 220,
              marginLeft: "auto",
              marginRight: "auto",
            }}
            buttonColor="black"
            textColor="white"
            mode={"outlined"}
            onPress={() => {
              if (isLoading) {
                return;
              }
              handleRegister();
            }}
          >
            {isLoading ? <ActivityIndicator color="gray" /> : "Submit"}
          </Button>
        ) : null}
        {!isLoading ? (
          <Button
            style={{
              marginTop: PixelRatio.get() * 5,
              width: 220,
              marginLeft: "auto",
              marginRight: "auto",
            }}
            buttonColor="black"
            textColor="white"
            mode="elevated"
            onPress={() => navigation.navigate("SignUpNamesScreens")}
          >
            Back to Login
          </Button>
        ) : null}
      </ScrollView>
      <Snackbar
        visible={visible}
        duration={3000}
        elevation={3}
        style={{ backgroundColor: "red" }}
        onDismiss={() => setvisible(!visible)}
      >
        Testing
      </Snackbar>
      {isSuccess ? (
        <Snackbar
          visible={successvisible}
          duration={3000}
          elevation={3}
          style={{ backgroundColor: "green" }}
          onDismiss={() => setSuccessVisible(!successvisible)}
        >
          {message}
        </Snackbar>
      ) : null}
    </View>
  );
};

export default SignUpEmail;
