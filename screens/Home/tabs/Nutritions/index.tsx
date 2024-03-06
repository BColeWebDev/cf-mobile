import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React from "react";

const NutritionScreen = () => {
  const style = StyleSheet.create({
    container: {
      height: "100%",
      justifyContent: "flex-start",
      backgroundColor: "white",
      alignItems: "center",
    },
  });
  return (
    <SafeAreaView style={style.container}>
      <Text
        style={{
          fontSize: 28,
          width: "100%",
          marginLeft: 50,
          color: "black",
          marginTop: 30,
          fontWeight: "500",
          textAlign: "left",
          marginVertical: 20,
        }}
      >
        Nutritions
      </Text>
      <Text>Coming Soon!</Text>
    </SafeAreaView>
  );
};

export default NutritionScreen;
