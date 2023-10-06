import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Box, Button } from "@react-native-material/core";
import { SafeAreaView } from "react-native-safe-area-context";

const RegimentScreen = ({ navigation }) => {
  const style = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: "flex-start",
      backgroundColor: "#292929",
      alignItems: "center",
      display: "flex",
    },
  });
  return (
    <SafeAreaView style={style.container}>
      <Box style={{ width: "100%" }}>
        <Text style={{ fontSize: 28, color: "white", marginTop: 30 }}>
          Regiments
        </Text>
        <Box mb={30} style={{ height: 500 }}>
          <Text style={{ fontSize: 20, color: "white", marginTop: 30 }}>
            No Regiments
          </Text>
          <Text style={{ fontSize: 20, color: "white", marginTop: 30 }}>
            Create New Regiment
          </Text>
        </Box>
        <Button
          onPress={() => navigation.navigate("Create Regiment")}
          style={{
            width: 200,
            marginLeft: "auto",
            marginRight: "auto",
          }}
          title=" New Regiment"
        ></Button>
      </Box>
    </SafeAreaView>
  );
};

export default RegimentScreen;
