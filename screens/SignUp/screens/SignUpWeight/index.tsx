import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Button, SegmentedButtons, TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";
import { setRegister } from "../../../../redux/features/auth/authSlice";
import { useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../../redux/app/store";

const SignUpWeight = ({ navigation }) => {
  const { register } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const [value, setValue] = useState("imperial");

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
      justifyContent: "flex-start",
      color: "white",
    },
  });
  return (
    <SafeAreaView style={style.container}>
      <Text style={{ marginVertical: 10, fontSize: 25, color: "#f9fafa" }}>
        What is your weight?
      </Text>
      <FontAwesome5 name="weight" size={30} color="white" />

      {/* Nutrition Filters */}
      <SegmentedButtons
        style={{ width: "60%", marginVertical: 10, marginTop: 30 }}
        value={value}
        onValueChange={setValue}
        buttons={[
          {
            value: "imperial",
            label: "Imperial",
            labelStyle: {
              color: "white",
            },
            style: {
              backgroundColor: value === "imperial" ? "black" : "#33373d",
              borderColor: "#171a1d",
            },
          },
          {
            value: "metric",
            label: "Metric",
            labelStyle: {
              color: "white",
            },
            style: {
              borderColor: "#171a1d",
              backgroundColor: value === "metric" ? "black" : "#33373d",
            },
          },
        ]}
      />

      <View style={{ flex: 1, width: "95%", marginTop: 25 }}>
        <TextInput
          placeholder="Age"
          placeholderTextColor={"white"}
          textColor="white"
          mode={"flat"}
          style={{
            marginBottom: 10,
            width: "95%",
            marginHorizontal: 20,
            backgroundColor: "#1d2025",
            color: "white",
          }}
          selectionColor={"white"}
          cursorColor={"white"}
          activeUnderlineColor="white"
          defaultValue={register.age}
          onChangeText={(text) => {
            dispatch(setRegister({ value: text, name: "age" }));
          }}
        />
      </View>
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
        onPress={() => navigation.navigate("SignUpTargetWeight")}
      >
        Next
      </Button>
    </SafeAreaView>
  );
};

export default SignUpWeight;
