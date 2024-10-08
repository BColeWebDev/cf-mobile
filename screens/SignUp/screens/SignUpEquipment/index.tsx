import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-paper";

const SignUpEquipment = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Text>SignUpEquipment</Text>
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
        onPress={() => navigation.navigate("SignUpPrimaryGoal")}
      >
        Next
      </Button>
    </SafeAreaView>
  );
};

export default SignUpEquipment;
