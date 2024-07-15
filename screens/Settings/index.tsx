import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { Box, Button } from "@react-native-material/core";
import { Switch } from "react-native-paper";
import { useSelector } from "react-redux";
import {
  UserSettings,
  setCurrentUser,
  updateCurrentUser,
} from "../../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/app/store";
import { SafeAreaView } from "react-native-safe-area-context";
const Settings = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [metric, setMetricChecked] = useState(false);
  const [theme, setThemeChecked] = useState(false);
  const [inches, setInchesChecked] = useState(false);
  const [distance, setDistanceChecked] = useState(false);
  const { currentUser } = useSelector((state: RootState) => state.auth);

  const handleSubmit = () => {
    dispatch(
      UserSettings({
        id: currentUser?.existingUser?._id,
        settings: {
          theme: theme ? "dark" : "light",
          weight: metric ? "ibs" : "kg",
          distance: distance ? "miles" : "km",
          size: inches ? "cm" : "inches",
        },
      })
    ).then((val) => {
      if (val.meta.requestStatus === "fulfilled") {
        dispatch(
          updateCurrentUser({
            existingUser: {
              ...val.payload.existingUser,
              settings: {
                theme: theme ? "dark" : "light",
                weight: metric ? "ibs" : "kg",
                distance: distance ? "miles" : "km",
                size: inches ? "cm" : "inches",
              },
            },
            regimentsCount: currentUser.regimentCount,
            userToken: currentUser.userToken,
          })
        );
        navigation.navigate("Home");
      }
      if (val.meta.requestStatus === "rejected") {
      }
    });
  };

  useEffect(() => {
    if (currentUser !== undefined || currentUser !== null) {
      setMetricChecked(
        currentUser.existingUser?.settings?.weight === "ibs" ? true : false
      );
      setThemeChecked(
        currentUser.existingUser?.settings?.theme === "dark" ? true : false
      );
      setInchesChecked(
        currentUser.existingUser?.settings?.size === "cm" ? true : false
      );
      setDistanceChecked(
        currentUser.existingUser?.settings?.distance === "miles" ? true : false
      );
    }
  }, [currentUser]);
  StyleSheet;
  const style = StyleSheet.create({
    container: {
      height: "100%",
      backgroundColor:
        currentUser.existingUser?.settings?.theme === "dark"
          ? "#171a1d"
          : "#f9fafa",
    },
  });
  return (
    <SafeAreaView style={style.container}>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flex: 0.9,
        }}
      >
        {/* Settings */}
        <Box
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
            padding: 15,
            borderRadius: 10,
            width: "85%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              color:
                currentUser.existingUser?.settings?.theme === "dark"
                  ? "#f9fafa"
                  : "#33373d",
              fontSize: 18,
            }}
          >
            Weight
          </Text>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                marginRight: 10,
                color:
                  currentUser.existingUser?.settings?.theme === "dark"
                    ? "#f9fafa"
                    : "#33373d",
                fontSize: 16,
              }}
            >
              Kg
            </Text>
            <Switch
              value={metric}
              onValueChange={() => setMetricChecked(!metric)}
            />
            <Text
              style={{
                marginLeft: 10,
                color:
                  currentUser.existingUser?.settings?.theme === "dark"
                    ? "#f9fafa"
                    : "#33373d",
                fontSize: 16,
              }}
            >
              Ibs
            </Text>
          </View>
        </Box>

        {/* Theme */}
        <Box
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
            padding: 15,
            borderRadius: 10,
            width: "85%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              color:
                currentUser.existingUser?.settings?.theme === "dark"
                  ? "#f9fafa"
                  : "#33373d",
              fontSize: 18,
            }}
          >
            Theme
          </Text>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                marginRight: 10,
                color:
                  currentUser.existingUser?.settings?.theme === "dark"
                    ? "#f9fafa"
                    : "#33373d",
                fontSize: 16,
              }}
            >
              Light
            </Text>
            <Switch
              value={theme}
              onValueChange={() => setThemeChecked(!theme)}
            />
            <Text
              style={{
                marginLeft: 10,
                color:
                  currentUser.existingUser?.settings?.theme === "dark"
                    ? "#f9fafa"
                    : "#33373d",
                fontSize: 16,
              }}
            >
              Dark
            </Text>
          </View>
        </Box>

        {/* Inches */}
        <Box
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
            padding: 15,
            borderRadius: 10,
            width: "85%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              color:
                currentUser.existingUser?.settings?.theme === "dark"
                  ? "#f9fafa"
                  : "#33373d",
              fontSize: 18,
            }}
          >
            Measurement
          </Text>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                marginRight: 10,
                color:
                  currentUser.existingUser?.settings?.theme === "dark"
                    ? "#f9fafa"
                    : "#33373d",
              }}
            >
              Inches
            </Text>
            <Switch
              value={inches}
              onValueChange={() => setInchesChecked(!inches)}
            />
            <Text
              style={{
                marginLeft: 10,
                color:
                  currentUser.existingUser?.settings?.theme === "dark"
                    ? "#f9fafa"
                    : "#33373d",
              }}
            >
              cm.
            </Text>
          </View>
        </Box>
        {/* Distance */}
        <Box
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
            padding: 15,
            borderRadius: 10,
            width: "85%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              color:
                currentUser.existingUser?.settings?.theme === "dark"
                  ? "#f9fafa"
                  : "#33373d",
              fontSize: 18,
            }}
          >
            Distance
          </Text>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                marginRight: 10,
                color:
                  currentUser.existingUser?.settings?.theme === "dark"
                    ? "#f9fafa"
                    : "#33373d",
              }}
            >
              Km
            </Text>
            <Switch
              value={distance}
              onValueChange={() => setDistanceChecked(!distance)}
            />
            <Text
              style={{
                marginLeft: 10,
                color:
                  currentUser.existingUser?.settings?.theme === "dark"
                    ? "#f9fafa"
                    : "#33373d",
              }}
            >
              Miles
            </Text>
          </View>
        </Box>
      </Box>

      <Button
        color="black"
        tintColor="white"
        title="Submit"
        style={{
          width: 200,
          marginBottom: 20,
          marginTop: 20,
          backgroundColor: "black",
          borderRadius: 15,
          marginLeft: "auto",
          marginRight: "auto",
          justifyContent: "flex-end",
        }}
        onPress={() => handleSubmit()}
      />
      <Button
        title="Logout"
        color="red"
        tintColor="white"
        style={{
          width: 200,
          marginLeft: "auto",
          marginTop: 20,
          marginRight: "auto",
        }}
        onPress={() => {
          dispatch(setCurrentUser({}));
          navigation.navigate("Login");
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
        }}
      />
    </SafeAreaView>
  );
};

export default Settings;
