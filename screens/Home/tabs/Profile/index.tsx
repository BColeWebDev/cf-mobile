import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/app/store";

export default function ProfileScreen({ navigation }) {
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const [image, setImage] = useState<string | null>(null);
  const style = StyleSheet.create({
    container: {
      height: "100%",
      backgroundColor:
        currentUser.existingUser?.settings?.theme === "dark"
          ? "#171a1d"
          : "#f9fafa",
      alignItems: "center",
      padding: 10,
      justifyContent: "flex-start",
    },
  });

  console.log(currentUser?.existingUser);

  return (
    <View style={style.container}>
      <View
        style={{
          backgroundColor:
            currentUser.existingUser?.settings?.theme === "dark"
              ? "#33373d"
              : "#f1f1f2",
          borderColor:
            currentUser.existingUser?.settings?.theme === "dark"
              ? "black"
              : "#f9fafa",
          borderWidth:
            currentUser.existingUser?.settings?.theme === "dark" ? 0 : 2,
          display: "flex",
          padding: 100,
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          borderRadius: 10,
          width: "95%",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: 15,
        }}
      >
        <Text style={{ color: "white" }}>My Progress</Text>
      </View>

      {/* Profile */}

      <View
        style={{
          backgroundColor:
            currentUser.existingUser?.settings?.theme === "dark"
              ? "#33373d"
              : "#f1f1f2",
          borderColor:
            currentUser.existingUser?.settings?.theme === "dark"
              ? "black"
              : "#f9fafa",
          borderWidth:
            currentUser.existingUser?.settings?.theme === "dark" ? 0 : 2,
          display: "flex",
          padding: 10,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
          width: "95%",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: 15,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 16,
            textAlign: "left",
            textTransform: "capitalize",
          }}
        >
          {currentUser?.existingUser?.gender === "M" ? "Male" : "Female"}
        </Text>
      </View>

      <View
        style={{
          backgroundColor:
            currentUser.existingUser?.settings?.theme === "dark"
              ? "#33373d"
              : "#f1f1f2",
          borderColor:
            currentUser.existingUser?.settings?.theme === "dark"
              ? "black"
              : "#f9fafa",
          borderWidth:
            currentUser.existingUser?.settings?.theme === "dark" ? 0 : 2,
          display: "flex",
          padding: 10,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
          width: "95%",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: 15,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 16,
            textAlign: "left",
            textTransform: "capitalize",
          }}
        >
          {currentUser?.existingUser?.performance_goals}
        </Text>
      </View>

      <View
        style={{
          backgroundColor:
            currentUser.existingUser?.settings?.theme === "dark"
              ? "#33373d"
              : "#f1f1f2",
          borderColor:
            currentUser.existingUser?.settings?.theme === "dark"
              ? "black"
              : "#f9fafa",
          borderWidth:
            currentUser.existingUser?.settings?.theme === "dark" ? 0 : 2,
          display: "flex",
          padding: 10,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
          width: "95%",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: 15,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 16,
            textAlign: "left",
            textTransform: "capitalize",
          }}
        >
          {currentUser?.existingUser?.lifestyle_goals}
        </Text>
      </View>

      <View
        style={{
          backgroundColor:
            currentUser.existingUser?.settings?.theme === "dark"
              ? "#33373d"
              : "#f1f1f2",
          borderColor:
            currentUser.existingUser?.settings?.theme === "dark"
              ? "black"
              : "#f9fafa",
          borderWidth:
            currentUser.existingUser?.settings?.theme === "dark" ? 0 : 2,
          display: "flex",
          padding: 10,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
          width: "95%",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: 15,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 16,
            textAlign: "left",
            textTransform: "capitalize",
          }}
        >
          {currentUser?.existingUser?.primary_goals}
        </Text>
      </View>
      <View
        style={{
          backgroundColor:
            currentUser.existingUser?.settings?.theme === "dark"
              ? "#33373d"
              : "#f1f1f2",
          borderColor:
            currentUser.existingUser?.settings?.theme === "dark"
              ? "black"
              : "#f9fafa",
          borderWidth:
            currentUser.existingUser?.settings?.theme === "dark" ? 0 : 2,
          display: "flex",
          padding: 10,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
          width: "95%",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: 15,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 16,
            textAlign: "left",
            textTransform: "capitalize",
          }}
        >
          {currentUser?.existingUser?.weight}
        </Text>
      </View>
      <View
        style={{
          backgroundColor:
            currentUser.existingUser?.settings?.theme === "dark"
              ? "#33373d"
              : "#f1f1f2",
          borderColor:
            currentUser.existingUser?.settings?.theme === "dark"
              ? "black"
              : "#f9fafa",
          borderWidth:
            currentUser.existingUser?.settings?.theme === "dark" ? 0 : 2,
          display: "flex",
          padding: 10,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
          width: "95%",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: 15,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 16,
            textAlign: "left",
            textTransform: "capitalize",
          }}
        >
          {currentUser?.existingUser?.height}
        </Text>

        <Text
          style={{
            color: "white",
            fontSize: 16,
            textAlign: "left",
            textTransform: "capitalize",
          }}
        >
          {currentUser?.existingUser?.weight}
        </Text>
      </View>
    </View>
  );
}
