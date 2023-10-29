import { View, StyleSheet, Platform } from "react-native";
import { Text, Surface } from "react-native-paper";
import React, { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useSelector } from "react-redux";

export default function ProfileScreen({ navigation }) {
  const { currentUser } = useSelector((state: any) => state.auth);
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
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
          marginTop: 50,
        }}
      >
        <View
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
            color="white"
            style={{ alignItems: "flex-end", marginRight: 10 }}
            onPress={() => navigation.navigate("Settings")}
          />
          {!currentUser?.crown_member ? (
            <FontAwesome5
              name="crown"
              size={24}
              color="#FAC000"
              onPress={() => alert("Crown Member")}
            />
          ) : null}
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            margin: 20,
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <View
            style={{
              display: "flex",
              direction: "ltr",
              alignItems: "center",
              flexDirection: "row-reverse",
            }}
          >
            <Ionicons name="person-circle-sharp" size={30} color="black" />
            <Text
              style={{ marginHorizontal: 15, fontSize: 30, color: "white" }}
            >
              Profile
            </Text>
          </View>
          <View
            style={{
              padding: 4,
              borderWidth: 1,
              borderColor: "#03dac5b3",
              borderRadius: 8,
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              minWidth: 100,
            }}
          >
            <Text
              style={{
                color: "#03dac5b3",
                textAlign: "center",
                textTransform: "capitalize",
              }}
            >
              {currentUser.existingUser?.experience}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
            marginTop: 50,
          }}
        >
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text
              style={{
                color: "white",
                marginBottom: 20,
                marginRight: 10,
                fontSize: 22,
              }}
            >
              {currentUser.existingUser?.first_name}
            </Text>
            <Text style={{ color: "white", marginBottom: 20, fontSize: 22 }}>
              {currentUser.existingUser?.last_name}
            </Text>
          </View>

          <Text
            style={{
              color: "white",
              marginBottom: 20,
              textAlign: "center",
              fontSize: 22,
            }}
          >
            {currentUser.existingUser?.email}
          </Text>
          <Text
            style={{
              color: "white",
              marginBottom: 20,
              textAlign: "center",
              fontSize: 22,
            }}
          >
            Age:{currentUser.existingUser?.age}
          </Text>
        </View>
      </View>
    </View>
  );
}
