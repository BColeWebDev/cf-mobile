import { View, StyleSheet, Platform, Image } from "react-native";
import { Text, Surface } from "react-native-paper";
import React, { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootState } from "../../../../redux/app/store";

export default function ProfileScreen({ navigation }) {
  const { currentUser } = useSelector((state: RootState) => state.auth);
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
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <View
          style={{
            display: "flex",
            justifyContent: "flex-end",
            flexDirection: "row",
            width: "100%",
            marginTop: 25,
          }}
        >
          <Feather
            name="settings"
            size={24}
            color="black"
            style={{ alignItems: "flex-end", marginRight: 10 }}
            onPress={() => navigation.navigate("Settings")}
          />
          {!currentUser?.crown_member ? (
            <FontAwesome5
              name="crown"
              size={24}
              color="orange"
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
              flexDirection: "row",
            }}
          >
            {/* Memory Issue */}
            {/* {currentUser?.existingUser?.avatarProfile === "" ? (
              <Ionicons
                name="person-circle-sharp"
                size={50}
                color="#4f1d9e"
                onPress={() => console.log("testing")}
              />
            ) : (
              //  Profile Image

              <Image
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 150 / 2,
                  overflow: "hidden",
                  borderWidth: 3,
                  borderColor: "black",
                }}
                source={{
                  uri: `data:image/png;base64,${currentUser?.existingUser?.avatarProfile}`,
                }}
              />
            )} */}
          </View>
          <View
            style={{
              padding: 4,
              borderWidth: 1,
              borderColor: "black",
              backgroundColor: "black",

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
                color: "white",
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
            marginTop: 25,
          }}
        >
          <Text
            style={{
              color: "black",
              marginRight: 10,
              fontSize: 16,
            }}
          >
            {currentUser.existingUser?.first_name}{" "}
            {currentUser.existingUser?.last_name}
          </Text>
          <Text
            style={{
              color: "black",
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
              borderColor: "black",
              borderWidth: 2,
              display: "flex",
              paddingRight: 15,
              flexDirection: "column",
              alignItems: "flex-start",
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
                height: 100,
                alignItems: "flex-start",
              }}
            >
              <Text
                style={{
                  padding: 20,
                  fontWeight: "800",
                  color: "black",
                }}
              >
                Completed Workouts ✅
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
