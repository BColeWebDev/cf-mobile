import { View } from "react-native";
import React from "react";
import {
  Box,
  Button,
  Stack,
  Surface,
  TextInput,
  Text,
  Dialog,
  DialogHeader,
  DialogContent,
  DialogActions,
  ActivityIndicator,
} from "@react-native-material/core";
export default function CreateRegiment({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        justifyContent: "flex-start",
        backgroundColor: "#292929",
        alignItems: "center",
        display: "flex",
      }}
    >
      <Text
        style={{
          textAlign: "center",
          marginVertical: 20,
          color: "white",
          fontSize: 24,
          marginBottom: 150,
        }}
      >
        Create Regiment
      </Text>
      <TextInput
        style={{ width: "100%", marginBottom: 50 }}
        placeholder="Name"
        placeholderTextColor={"#F9C000"}
        variant={"standard"}
        selectionColor={"white"}
      />
      <TextInput
        style={{ width: "100%", marginBottom: 200 }}
        placeholder="Description"
        placeholderTextColor={"#F9C000"}
        variant={"standard"}
        selectionColor={"white"}
      />

      <Button
        title="CREATE REGIMENT"
        style={{ width: "100%", height: 40, justifyContent: "center" }}
        onPress={() => navigation.navigate("Home")}
        variant={"contained"}
      />
    </View>
  );
}
