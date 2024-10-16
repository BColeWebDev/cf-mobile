import { View, StyleSheet, SafeAreaView, ImageBackground } from "react-native";
import React, { useState } from "react";
import { Button, Text } from "react-native-paper";
import CfIcon from "../../assets/images/CF-Icon.svg";
import { useDispatch } from "react-redux";
import { LoginUser, setCurrentUser } from "../../redux/features/auth/authSlice";
import { TextInput } from "react-native-paper";
import { AppDispatch } from "../../redux/app/store";
import {
  getAllBodyTargets,
  getAllEquipment,
  getAllMuscleTargets,
  getAllWorkouts,
} from "../../redux/features/workouts/workoutSlice";
import AntDesign from "@expo/vector-icons/AntDesign";
import { getRegiments } from "../../redux/features/regiments/regimentsSlice";
export default function Login({ navigation }) {
  const dispatch = useDispatch<AppDispatch>();
  const [login, setlogin] = useState({ email: "", password: "" });
  const [showPassword, setshowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

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

  // Handle User Login
  const handleLoginUser = () => {
    navigation.navigate("Loading");
    dispatch(
      LoginUser({
        email: login.email.trim().toLowerCase(),
        password: login.password,
      })
    ).then((val) => {
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
        dispatch(getRegiments(val.payload?.existingUser?._id));

        navigation.reset({ index: 0, routes: [{ name: "Home" }] });
      }
      if (val.meta.requestStatus === "rejected") {
        navigation.navigate("Login");

        alert(JSON.stringify(val));
      }
    });
  };

  const validateForm = () => {
    let errors = {
      email: "",
      password: "",
    };

    // Validate email field
    if (!login.email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(login.email)) {
      errors.email = "Email is invalid.";
    }

    // Validate password field
    if (!login.password) {
      errors.password = "Password is required.";
    } else if (login.password.length < 8) {
      errors.password = "Password must be at least 8 characters.";
    }

    // Set the errors and update form validity
    setErrors(errors);

    return errors.email === "" && errors.password === "";
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
                placeholderTextColor={"white"}
                textColor="white"
                mode={"flat"}
                style={{
                  marginBottom: 10,
                  marginHorizontal: 20,
                  backgroundColor: "#1d2025",
                  color: "white",
                }}
                selectionColor={"white"}
                cursorColor={"white"}
                activeUnderlineColor="white"
                onChangeText={(text) =>
                  setlogin((prevState) => ({ ...prevState, email: text }))
                }
                keyboardType={"email-address"}
                defaultValue={login.email}
                error={errors.email !== ""}
              />
              <Text
                style={{
                  color: "red",
                  fontSize: 12,
                  marginHorizontal: 20,
                  marginBottom: 10,
                }}
              >
                {errors.email}
              </Text>
              <TextInput
                placeholder="Password"
                placeholderTextColor={"white"}
                textColor="white"
                mode={"flat"}
                style={{
                  marginBottom: 10,
                  marginHorizontal: 20,
                  backgroundColor: "#1d2025",
                  color: "white",
                }}
                selectionColor={"white"}
                cursorColor={"white"}
                activeUnderlineColor="white"
                defaultValue={login.password}
                onChangeText={(text) =>
                  setlogin((prevState) => ({ ...prevState, password: text }))
                }
                right={
                  <TextInput.Icon
                    icon={"eye"}
                    color={showPassword ? "white" : "#d3d4d5"}
                    onPress={() => setshowPassword(!showPassword)}
                  />
                }
                secureTextEntry={!showPassword ? true : false}
                keyboardType={"default"}
                error={errors.password !== ""}
              />
              <Text
                style={{
                  color: "red",
                  fontSize: 12,
                  marginHorizontal: 20,
                }}
              >
                {errors.password}
              </Text>
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
                  validateForm() ? handleLoginUser() : null;
                }}
                style={{
                  width: "90%",
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
                  width: "90%",
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
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  marginBottom: 20,
                }}
              >
                OR
              </Text>
              <Button
                buttonColor="white"
                textColor="black"
                style={{
                  width: "90%",
                  marginBottom: 20,
                  borderRadius: 15,
                  height: 40,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                mode="elevated"
              >
                <AntDesign name="google" size={20} color="black" />
                <Text style={{ marginLeft: 10, marginBottom: 10 }}>
                  Sign In with Google
                </Text>
              </Button>
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </>
  );
}
