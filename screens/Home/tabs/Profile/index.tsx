import { View, StyleSheet, Platform, Image } from "react-native";
import { Text, Surface, Button } from "react-native-paper";
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

  console.log("current", currentUser.existingUser?.avatarProfile);

  const style = StyleSheet.create({
    container: {
      height: "100%",
      justifyContent: "flex-start",
      backgroundColor:
        currentUser.existingUser?.settings?.theme === "dark"
          ? "#171a1d"
          : "#f9fafa",
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
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            width: "100%",
            marginTop: 25,
          }}
        >
          <Text
            style={{
              fontSize: 36,
              textAlign: "center",
              color:
                currentUser.existingUser?.settings?.theme === "dark"
                  ? "#f9fafa"
                  : "#33373d",
            }}
          >
            Profile
          </Text>
          <Feather
            name="settings"
            size={24}
            color={
              currentUser.existingUser?.settings?.theme === "dark"
                ? "#f9fafa"
                : "#33373d"
            }
            style={{ alignItems: "flex-end", marginRight: 10 }}
            onPress={() => navigation.navigate("Settings")}
          />
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

        {/* Profile */}
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            height: "70%",
            marginTop: 25,
          }}
        >
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
              padding: 15,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
              width: "85%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {currentUser?.crown_member ? (
              <FontAwesome5
                name="crown"
                size={24}
                color="orange"
                onPress={() => alert("Crown Member")}
              />
            ) : null}

            {currentUser?.existingUser?.avatarProfile === "" ? (
              <Ionicons
                name="person-circle-sharp"
                size={95}
                color={
                  currentUser.existingUser?.settings?.theme === "dark"
                    ? "#f9fafa"
                    : "#33373d"
                }
              />
            ) : (
              //  Profile Image

              <Image
                style={{
                  width: 95,
                  height: 95,
                  borderRadius: 150 / 2,
                  overflow: "hidden",
                  borderWidth: 3,
                  backgroundColor: "black",
                  borderColor: "orange",
                  marginBottom: 20,
                }}
                source={{
                  uri: `data:image/png;base64,${currentUser?.existingUser?.avatarProfile}`,
                }}
              />
            )}
            <Text
              style={{
                color:
                  currentUser.existingUser?.settings?.theme === "dark"
                    ? "#f9fafa"
                    : "#33373d",
                fontSize: 20,
                textTransform: "capitalize",
                textAlign: "center",
              }}
            >
              {`${currentUser.existingUser?.first_name} ${currentUser.existingUser?.last_name}`}
            </Text>
            <View>
              <Text
                style={{
                  color:
                    currentUser.existingUser?.settings?.theme === "dark"
                      ? "#f9fafa"
                      : "#33373d",
                }}
              >
                Regiments: {currentUser.regimentsCount}
              </Text>
            </View>
          </View>
          {/* {currentUser?.crown_member ? (
            <Button
              style={{
                marginBottom: 20,
                marginTop: 20,
                backgroundColor: "black",
                borderRadius: 15,
                marginLeft: "auto",
                marginRight: "auto",
                justifyContent: "flex-end",
              }}
              mode="elevated"
              textColor="white"
              onPress={() => alert("Testing")}
            >
              <Text style={{ color: "white", marginTop: 2, marginRight: 2 }}>
                Upgrade to Crown Pro
              </Text>
              <FontAwesome5
                name="crown"
                size={12}
                color="orange"
                onPress={() => alert("Crown Member")}
              />
            </Button>
          ) : null} */}
        </View>
      </View>
    </SafeAreaView>
  );
}
