import { View, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import React, { useState } from "react";
import { Button, Surface, Text } from "react-native-paper";
import CfIcon from "../../assets/images/CF-Icon.svg";
import { useSelector, useDispatch } from "react-redux";
import { LoginUser, setCurrentUser } from "../../redux/features/auth/authSlice";
import { TextInput } from "react-native-paper";
import { AppDispatch } from "../../redux/app/store";
export default function Login({ navigation }) {
  const dispatch = useDispatch<AppDispatch>();
  const [login, setlogin] = useState({ email: "", password: "" });
  const [showPassword, setshowPassword] = useState(false);

  const style = StyleSheet.create({
    inputStyles: {
      color: "black",
      borderBottomColor: "white",
    },
    container: {
      height: "100%",
      display: "flex",
      backgroundColor: "white",
    },
  });

  const handleLoginUser = () => {
    dispatch(LoginUser({ email: login.email, password: login.password })).then(
      (val) => {
        console.log(val);
        if (val.meta.requestStatus === "fulfilled") {
          navigation.navigate("Home");
          setlogin({ email: "", password: "" });
          console.log(val.payload);
          dispatch(setCurrentUser(val.payload));
          navigation.reset({ index: 0, routes: [{ name: "Home" }] });
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
      <SafeAreaView>
        <View style={style.container}>
          <View
            style={{
              width: "auto",
              justifyContent: "center",
              marginTop: 30,
              marginBottom: 20,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <CfIcon width={110} />
          </View>

          <View>
            <Text
              style={{
                fontSize: 35,
                fontWeight: "800",
                color: "black",
                marginTop: 20,
                marginRight: "65%",
                margin: 20,
              }}
            >
              Login
            </Text>

            <TextInput
              placeholder="Email"
              textColor="black"
              mode={"outlined"}
              style={{
                marginBottom: 25,
                marginHorizontal: 20,
                backgroundColor: "white",
              }}
              activeOutlineColor="black"
              selectionColor={"black"}
              cursorColor={"black"}
              onChangeText={(text) =>
                setlogin((prevState) => ({ ...prevState, email: text }))
              }
              keyboardType={"email-address"}
              defaultValue={login.email}
            />

            <TextInput
              placeholder="Password"
              textColor="black"
              mode={"outlined"}
              style={{
                marginBottom: 25,
                marginHorizontal: 20,
                backgroundColor: "white",
              }}
              activeOutlineColor="black"
              selectionColor={"black"}
              cursorColor={"black"}
              defaultValue={login.password}
              onChangeText={(text) =>
                setlogin((prevState) => ({ ...prevState, password: text }))
              }
              right={
                <TextInput.Icon
                  icon={"eye"}
                  color={"black"}
                  onPress={() => setshowPassword(!showPassword)}
                />
              }
              secureTextEntry={!showPassword ? true : false}
              keyboardType={"email-address"}
            />
          </View>

          <View
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              width: "100%",
              marginTop: 60,
              direction: "ltr",
            }}
          >
            <Button
              mode="elevated"
              buttonColor="black"
              textColor="white"
              onPress={() => {
                handleLoginUser();
                navigation.navigate("Loading");
              }}
              style={{
                width: 220,
                marginBottom: 20,
                borderRadius: 15,
                height: 40,
                justifyContent: "center",
              }}
            >
              Login
            </Button>
            <Text
              style={{ color: "black", textAlign: "center", marginBottom: 20 }}
            >
              Don't have an account?
            </Text>
            <Button
              buttonColor="white"
              textColor="black"
              style={{
                width: 220,
                marginBottom: 20,
                borderRadius: 15,
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
      </SafeAreaView>
    </>
  );
}
