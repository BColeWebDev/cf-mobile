import { Text, StyleSheet, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Entypo from "@expo/vector-icons/Entypo";
import { useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../../redux/app/store";
import { Button, TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";
import { setRegister } from "../../../../redux/features/auth/authSlice";

export default function SignUpAge({ navigation }) {
  const { register } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

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
      <Text
        style={{
          fontSize: 25,
          color: "#f9fafa",
          textAlign: "left",
          width: "95%",
          marginVertical: 30,
        }}
      >
        Sign Up - Age
      </Text>

      <Text style={{ marginVertical: 10, fontSize: 25, color: "#f9fafa" }}>
        How old are you?
      </Text>
      <Entypo
        name="cake"
        size={30}
        color="white"
        style={{ marginBottom: 30 }}
      />
      <View style={{ flex: 1, width: "95%" }}>
        <TextInput
          placeholder="Age"
          placeholderTextColor={"white"}
          textColor="white"
          mode={"flat"}
          style={{
            marginBottom: 10,
            width: "90%",
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
        onPress={() => navigation.navigate("SignUpHeight")}
      >
        Next
      </Button>
    </SafeAreaView>
  );
}
