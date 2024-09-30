import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import React, { useState } from "react";
import { Button, RadioButton } from "react-native-paper";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/app/store";
import { useDispatch } from "react-redux";
import { setRegister } from "../../../../redux/features/auth/authSlice";

export default function SignUpExperience({ navigation }) {
  const dispatch = useDispatch<AppDispatch>();
  const { register } = useSelector((state: RootState) => state.auth);
  const [experience, setexperience] = useState("");
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
  return (
    <SafeAreaView style={style.container}>
      {/* Experience  */}
      <Text
        style={{
          fontSize: 25,
          color: "#f9fafa",
          textAlign: "left",
          width: "95%",
          marginVertical: 15,
        }}
      >
        Experience
      </Text>

      <Text
        style={{
          fontSize: 16,
          color: "#f9fafa",
          textAlign: "left",
          width: "95%",
          marginVertical: 15,
        }}
      >
        How often do you workout?
      </Text>

      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        {/* Beginner  */}
        <TouchableHighlight
          style={{
            display: "flex",
            backgroundColor:
              experience === "beginner"
                ? "rgba(52, 52, 52, 0.8)"
                : "rgba(52, 52, 52, 0.4)",
            flexDirection: "column",
            alignItems: "flex-start",
            borderColor: "#d3d4d5",
            borderWidth: 3,
            width: "95%",
            marginLeft: "auto",
            marginRight: "auto",
            padding: 10,
            marginBottom: 30,
            borderRadius: 10,
            justifyContent: "space-between",
          }}
          onPress={() => {
            setexperience("beginner");
            dispatch(setRegister({ value: experience, name: "experience" }));
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 18,
                color: "white",
                marginBottom: 10,
              }}
            >
              Beginner
            </Text>
            <Text style={{ marginBottom: 5, fontSize: 12, color: "white" }}>
              Completely new to working out!
            </Text>
            <Text style={{ marginBottom: 5, fontSize: 12, color: "white" }}>
              weight training for LESS than 6 months.
            </Text>
          </View>
        </TouchableHighlight>
        {/* Intermediate */}
        <TouchableHighlight
          style={{
            display: "flex",
            backgroundColor:
              experience === "intermediate"
                ? "rgba(52, 52, 52, 0.8)"
                : "rgba(52, 52, 52, 0.4)",
            flexDirection: "column",
            alignItems: "flex-start",
            borderColor: "#d3d4d5",
            borderWidth: 3,
            width: "95%",
            marginLeft: "auto",
            marginRight: "auto",
            padding: 10,
            marginBottom: 30,
            borderRadius: 10,
            justifyContent: "space-between",
          }}
          onPress={() => {
            setexperience("intermediate");
            dispatch(setRegister({ value: experience, name: "experience" }));
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 18,
                color: "white",
                marginBottom: 10,
              }}
            >
              Intermediate
            </Text>
            <Text style={{ marginBottom: 5, fontSize: 12, color: "white" }}>
              Have some general knowledge of working out!
            </Text>
            <Text style={{ marginBottom: 5, fontSize: 12, color: "white" }}>
              Have been weight training consistently and intelligently for the
              last 6 months or more.
            </Text>
          </View>
        </TouchableHighlight>
        {/* Advance */}
        <TouchableHighlight
          style={{
            display: "flex",
            backgroundColor:
              experience === "advance"
                ? "rgba(52, 52, 52, 0.8)"
                : "rgba(52, 52, 52, 0.4)",
            flexDirection: "column",
            alignItems: "flex-start",
            borderColor: "#d3d4d5",
            borderWidth: 3,
            width: "95%",
            marginLeft: "auto",
            marginRight: "auto",
            padding: 10,
            marginBottom: 30,
            borderRadius: 10,
            justifyContent: "space-between",
          }}
          onPress={() => {
            setexperience("advance");
            dispatch(setRegister({ value: experience, name: "experience" }));
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 20,
                color: "white",
                marginBottom: 10,
              }}
            >
              Advance
            </Text>
            <Text style={{ marginBottom: 5, fontSize: 12, color: "white" }}>
              Completely Knowlegeable!
            </Text>
            <Text style={{ marginBottom: 5, fontSize: 12, color: "white" }}>
              Have been weight training for a couple of years.
            </Text>
          </View>
        </TouchableHighlight>
      </View>
      {register.experience !== "" ? (
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
    </SafeAreaView>
  );
}
