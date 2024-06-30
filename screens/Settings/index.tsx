import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { Box, Button, Stack, Switch } from "@react-native-material/core";
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
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
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
            }}
          >
            Ibs
          </Text>
        </Box>

        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
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
            Light
          </Text>
          <Switch value={theme} onValueChange={() => setThemeChecked(!theme)} />
          <Text
            style={{
              marginLeft: 10,
              color:
                currentUser.existingUser?.settings?.theme === "dark"
                  ? "#f9fafa"
                  : "#33373d",
            }}
          >
            Dark
          </Text>
        </Box>
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
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
        </Box>

        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
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
