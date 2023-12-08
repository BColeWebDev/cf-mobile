import { View, StyleSheet, Platform } from "react-native";
import { Text, Surface } from "react-native-paper";
import React, { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

export default function ProfileScreen({ navigation }) {
  const { currentUser } = useSelector((state: any) => state.auth);
  const style = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: "flex-start",
      backgroundColor: "white",
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
            color="#3b1676"
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
            alignItems: "center",
            width: "100%",
          }}
        >
          <View
            style={{
              display: "flex",
              direction: "rtl",
              alignItems: "center",
              flexDirection: "row-reverse",
            }}
          >
            <Ionicons name="person-circle-sharp" size={50} color="#4f1d9e" />
            <Text
              style={{
                color: "#3b1676",

                marginRight: 10,
                fontSize: 16,
              }}
            >
              {currentUser.existingUser?.first_name}
            </Text>
          </View>
          <View
            style={{
              padding: 4,
              borderWidth: 1,
              borderColor: "#3b1676",
              backgroundColor: "#3b1676",

              borderRadius: 8,
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              minWidth: 100,
              height: 30,
            }}
          >
            <Text
              style={{
                color: "#f9f6fd",
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
          <Text
            style={{
              color: "#3b1676",
              marginBottom: 20,
              marginRight: 20,
              textAlign: "left",
              fontSize: 25,
            }}
          >
            Dashboard:
          </Text>
          {/* Completed Workouts */}
          <View
            style={{
              backgroundColor: "white",
              borderColor: "#7434db",
              borderWidth: 2,
              display: "flex",
              paddingRight: 15,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              borderRadius: 10,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  padding: 20,
                  fontWeight: "800",
                }}
              >
                Completed Workouts ✅
              </Text>
              <Octicons
                name="kebab-horizontal"
                size={24}
                color="black"
                onPress={() => alert("")}
              />
            </View>

            <View style={{ width: "100%", padding: 20 }}>
              <Text style={{ textAlign: "left" }}>Testing</Text>
            </View>
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
          <Text
            style={{
              color: "#3b1676",
              marginBottom: 20,
              marginRight: 20,
              textAlign: "left",
              fontSize: 25,
            }}
          >
            Dashboard:
          </Text>
          {/* Completed Workouts */}
          <View
            style={{
              backgroundColor: "white",
              borderColor: "#7434db",
              borderWidth: 2,
              display: "flex",
              paddingRight: 15,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              borderRadius: 10,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  padding: 20,
                  fontWeight: "800",
                }}
              >
                Completed Workouts ✅
              </Text>
              <Octicons
                name="kebab-horizontal"
                size={24}
                color="black"
                onPress={() => alert("")}
              />
            </View>

            <View style={{ width: "100%", padding: 20 }}>
              <Text style={{ textAlign: "left" }}>Testing</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
