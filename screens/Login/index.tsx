import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { Button, Surface, Text } from "react-native-paper";
import CfIcon from "../../assets/images/CF-Icon.svg";
import { useSelector, useDispatch } from "react-redux";
import { LoginUser, setCurrentUser } from "../../redux/features/auth/authSlice";
import { TextInput } from "react-native-paper";
import { AppDispatch } from "../../redux/app/store";
import {
  getAllBodyTargets,
  getAllEquipment,
  getAllMuscleTargets,
  getAllWorkouts,
} from "../../redux/features/workouts/workoutSlice";
import dumbellImg from "../../assets/images/dumbell-rack.jpg";
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
      justifyContent: "flex-start",
      backgroundColor: "#171a1d",
      alignItems: "center",
    },
  });

  const handleLoginUser = () => {
    dispatch(
      LoginUser({
        email: login.email.trim().toLowerCase(),
        password: login.password,
      })
    ).then((val) => {
      console.log(val);
      if (val.meta.requestStatus === "fulfilled") {
        navigation.navigate("Home");
        setlogin({ email: "", password: "" });

        dispatch(setCurrentUser(val.payload));

        dispatch(
          getAllWorkouts({
            token: val.payload.userToken,
            page: 1,
            limit: 1500,
            filters: "",
          })
        );

        dispatch(getAllEquipment({ token: val.payload.userToken }));
        dispatch(getAllBodyTargets({ token: val.payload.userToken }));
        dispatch(getAllMuscleTargets({ token: val.payload.userToken }));
        navigation.reset({ index: 0, routes: [{ name: "Home" }] });
      }
      if (val.meta.requestStatus === "rejected") {
        navigation.navigate("Login");
        alert("Invalid Credentials email or password is incorrect");
      }
    });
  };

  return (
    <>
      <SafeAreaView style={style.container}>
        <ImageBackground
          source={require("../../assets/images/dumbell-rack.jpg")}
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.80)",
              borderRadius: 15,
              width: "90%",
            }}
          >
            <View
              style={{
                width: "auto",
                justifyContent: "center",
                marginVertical: 30,
                marginLeft: "auto",
                marginRight: "auto",
                alignItems: "center",
              }}
            >
              <CfIcon width={110} />
            </View>
            <View style={{ width: "100%", marginBottom: 30 }}>
              <TextInput
                placeholder="Email"
                textColor="black"
                mode={"outlined"}
                style={{
                  marginBottom: 25,
                  marginHorizontal: 20,
                  backgroundColor: "white",
                  color: "black",
                }}
                placeholderTextColor={"black"}
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
                placeholderTextColor={"black"}
                textColor="black"
                mode={"outlined"}
                style={{
                  marginBottom: 25,
                  marginHorizontal: 20,
                  backgroundColor: "white",
                  color: "black",
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
                keyboardType={"default"}
              />
            </View>
            <View
              style={{
                width: "100%",
                alignItems: "center",
              }}
            >
              <Button
                mode="elevated"
                buttonColor="#d2a01e"
                textColor="#1d2025"
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
                style={{
                  color: "#f9fafa",
                  textAlign: "center",
                  marginBottom: 20,
                }}
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
        </ImageBackground>
      </SafeAreaView>
    </>
  );
}
