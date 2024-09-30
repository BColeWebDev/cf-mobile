import {
  View,
  StyleSheet,
  ScrollView,
  PixelRatio,
  SafeAreaView,
} from "react-native";
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
      backgroundColor: "#171a1d",
      alignItems: "center",
      justifyContent: "space-between",
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
        Sign Up - Email
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
          navigation.goBack();
        }}
      >
        Back
      </Button>
    </SafeAreaView>
  );
};

export default SignUpEmail;
