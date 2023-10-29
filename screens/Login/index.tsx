import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Button, Surface, Text } from "react-native-paper";
import CfIcon from "../../assets/images/CF-Icon.svg";
import { useSelector, useDispatch } from "react-redux";
import { LoginUser, setCurrentUser } from "../../redux/features/auth/authSlice";
import { TextInput } from "react-native-paper";
export default function Login({ navigation }) {
  const dispatch = useDispatch<any>();
  const [login, setlogin] = useState({ email: "", password: "" });
  const [showPassword, setshowPassword] = useState(false);

  const style = StyleSheet.create({
    textInput: {
      width: "100%",
      backgroundColor: "",
      paddingLeft: 10,
      marginVertical: 20,
      borderRadius: 1000,
    },
    inputStyles: {
      color: "#F9C000",
      borderBottomColor: "white",
    },
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#121212",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
    },
  });

  const handleLoginUser = () => {
    dispatch(LoginUser({ email: login.email, password: login.password })).then(
      (val) => {
        console.log(val);
        if (val.meta.requestStatus === "fulfilled") {
          navigation.navigate("Home");

          // console.log(val.payload.data)
          setlogin({ email: "", password: "" });
          console.log(val.payload);
          dispatch(setCurrentUser(val.payload));
        }
        if (val.meta.requestStatus === "rejected") {
          navigation.navigate("Login");
          alert("Invalid Credentials email or password is incorrect");
        }
      }
    );
  };

  return (
    <>
      <View style={style.container}>
        <CfIcon width={80} />
        <Text
          style={{
            fontSize: 35,
            fontWeight: "300",
            color: "white",
            marginTop: 20,
            marginRight: "65%",
          }}
        >
          Login
        </Text>

        <Surface
          style={{
            width: "95%",
            marginBottom: 10,
            marginTop: 10,
            borderRadius: 10,
            backgroundColor: "#121212",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <TextInput
            style={style.textInput}
            placeholder="Email"
            textColor="white"
            mode={"outlined"}
            selectionColor={"white"}
            onChangeText={(text) =>
              setlogin((prevState) => ({ ...prevState, email: text }))
            }
            keyboardType={"email-address"}
            defaultValue={login.email}
          />

          <TextInput
            style={style.textInput}
            placeholder="Password"
            textColor="white"
            mode={"outlined"}
            selectionColor={"white"}
            cursorColor={"#F9C000"}
            defaultValue={login.password}
            onChangeText={(text) =>
              setlogin((prevState) => ({ ...prevState, password: text }))
            }
            right={
              <TextInput.Icon
                icon={"eye"}
                onPress={() => setshowPassword(!showPassword)}
              />
            }
            secureTextEntry={!showPassword ? true : false}
            keyboardType={"email-address"}
          />
        </Surface>

        <View
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
            direction: "ltr",
          }}
        >
          <Button
            mode="contained"
            onPress={() => {
              handleLoginUser();
              navigation.navigate("Loading");
            }}
            style={{
              width: "100%",
              marginBottom: 20,
              height: 40,
              justifyContent: "center",
            }}
          >
            Login
          </Button>
          <Text
            style={{ color: "white", textAlign: "center", marginBottom: 20 }}
          >
            Don't have an account?
          </Text>
          <Button
            style={{
              width: "100%",
              marginBottom: 20,
              height: 40,
              justifyContent: "center",
            }}
            mode="elevated"
            onPress={() => {
              navigation.navigate("SignUpNamesScreens");
            }}
          >
            Sign Up
          </Button>
        </View>
      </View>
    </>
  );
}
