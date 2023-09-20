import { View, StyleSheet, Platform } from "react-native";
import { Text, Surface, Box, Flex } from "@react-native-material/core";
import React, { useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Stack, FAB } from "@react-native-material/core";
import CFIcon from "../../assets/images/CF-Icon-Black.svg";
import ChadIcon from "../../assets/images/Chad.svg";
import MuscleIcon from "../../assets/images/Muscle-Icon.svg";
import PlatIcon from "../../assets/images/Plate.svg";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useSelector } from "react-redux";

export default function ProfileScreen({ navigation }) {
  const { isError, isLoading, isLoggedIn, currentUser } = useSelector(
    (state: any) => state.auth
  );
  const style = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: "flex-start",
      backgroundColor: "#292929",
      alignItems: "center",
    },
  });
  console.log("users", currentUser);
  return (
    <View style={style.container}>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
          marginTop: 50,
        }}
      >
        <Box
          style={{
            display: "flex",
            justifyContent: "flex-end",
            flexDirection: "row",
            width: "100%",
          }}
        >
          <Feather
            name="settings"
            size={24}
            color="black"
            style={{ alignItems: "flex-end", marginRight: 10 }}
            onPress={() => navigation.navigate("Settings")}
          />
          {!currentUser.crown_member ? (
            <FontAwesome5
              name="crown"
              size={24}
              color="#FAC000"
              onPress={() => alert("Crown Member")}
            />
          ) : null}
        </Box>
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            margin: 20,
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Flex direction="row" style={{ alignItems: "center" }}>
            <Ionicons name="person-circle-sharp" size={30} color="black" />
            <Text style={{ marginLeft: 15, fontSize: 30, color: "white" }}>
              Profile
            </Text>
          </Flex>
          <Box
            p={4}
            border={1}
            borderColor={"#03dac5b3"}
            radius={8}
            style={{
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Text
              color="#03dac5b3"
              style={{ textAlign: "center", textTransform: "capitalize" }}
            >
              {currentUser.existingUser?.experience}
            </Text>
          </Box>
        </Box>
        <Box
          style={{
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
            marginTop: 50,
          }}
        >
          <Box style={{ flexDirection: "row" }}>
            <Text
              color="white"
              style={{ marginBottom: 20, marginRight: 10, fontSize: 22 }}
            >
              {currentUser.existingUser?.first_name}
            </Text>
            <Text color="white" style={{ marginBottom: 20, fontSize: 22 }}>
              {currentUser.existingUser?.last_name}
            </Text>
          </Box>

          <Text color="white" style={{ marginBottom: 20, fontSize: 22 }}>
            {currentUser.existingUser?.email}
          </Text>
          <Text color="white" style={{ marginBottom: 20, fontSize: 22 }}>
            Age:{currentUser.existingUser?.age}
          </Text>
        </Box>
      </Box>
    </View>
  );
}
