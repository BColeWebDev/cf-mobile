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
import { useDispatch, useSelector } from "react-redux";
import { ActivityIndicator } from "@react-native-material/core";
import React from "react";
import { AppDispatch, RootState } from "../../../../redux/app/store";
import { setRegister } from "../../../../redux/features/auth/authSlice";

const SignUpNamesScreens = ({ navigation }) => {
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
        <Box
          style={{ display: "flex", alignItems: "flex-start", marginTop: 110 }}
        >
          {/* <CfIcon/> */}
          <Text
            style={{
              fontSize: 35,
              marginLeft: 20,
              fontWeight: "600",
              color: "white",
            }}
          >
            Sign Up
          </Text>
        </Box>
        <Box
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
            label="First Name"
            style={style.textInput}
            onChangeText={(text) => {
              console.log("text", text);
              // setregister(prevState => ({...prevState,first_name:text}))
              dispatch(setRegister({ value: text, name: "first_name" }));
            }}
          />
          <TextInput
            label="Last Name"
            style={style.textInput}
            onChangeText={(text) => {
              // setregister(prevState => ({...prevState,first_name:text}))
              dispatch(setRegister({ value: text, name: "last_name" }));
            }}
          />
        </Box>
        {register.first_name !== "" && register.last_name !== "" ? (
          <Button
            style={{ marginTop: "40%" }}
            color="#FAC000"
            variant={"outlined"}
            title={"Next"}
            onPress={() => navigation.navigate("Login")}
          />
        ) : null}
      </ScrollView>
    </View>
  );
};

export default SignUpNamesScreens;
