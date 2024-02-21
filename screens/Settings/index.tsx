import { View, Text } from "react-native";
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
          theme: theme ? "light" : "dark",
          weight: metric ? "kg" : "ibs",
          distance: distance ? "km" : "miles",
          size: inches ? "inches" : "cm",
        },
      })
    ).then((val) => {
      if (val.meta.requestStatus === "fulfilled") {
        dispatch(
          updateCurrentUser({
            existingUser: {
              first_name: val.payload.first_name,
              last_name: val.payload.last_name,
              email: val.payload.email,
              bio: val.payload.bio,
              _id: val.payload._id,
              age: val.payload.age,
              sex: val.payload.sex,
              crown_member: val.payload.crown_member,
              experience: val.payload.experience,
              isVerified: val.payload.isVerified,
              settings: {
                theme: val.payload.settings.theme,
                weight: val.payload.settings.weight,
                distance: val.payload.settings.distance,
                size: val.payload.settings.size,
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
        currentUser.existingUser?.settings?.weight === "kg" ? true : false
      );
      setThemeChecked(
        currentUser.existingUser?.settings?.theme === "light" ? true : false
      );
      setInchesChecked(
        currentUser.existingUser?.settings?.size === "inches" ? true : false
      );
      setDistanceChecked(
        currentUser.existingUser?.settings?.distance === "km" ? true : false
      );
    }
  }, [currentUser]);

  return (
    <View style={{ flex: 1 }}>
      <Box style={{ padding: 20 }}>
        <Text style={{ fontSize: 20 }}>Settings</Text>
      </Box>

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
          <Text style={{ marginRight: 10 }}>Kg</Text>
          <Switch
            value={metric}
            onValueChange={() => setMetricChecked(!metric)}
          />
          <Text style={{ marginLeft: 10 }}>Ibs</Text>
        </Box>

        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Text style={{ marginRight: 10 }}>Light</Text>
          <Switch value={theme} onValueChange={() => setThemeChecked(!theme)} />
          <Text style={{ marginLeft: 10 }}>Dark</Text>
        </Box>
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Text style={{ marginRight: 10 }}>Inches</Text>
          <Switch
            value={inches}
            onValueChange={() => setInchesChecked(!inches)}
          />
          <Text style={{ marginLeft: 10 }}>cm.</Text>
        </Box>

        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Text style={{ marginRight: 10 }}>Km</Text>
          <Switch
            value={distance}
            onValueChange={() => setDistanceChecked(!distance)}
          />
          <Text style={{ marginLeft: 10 }}>Miles</Text>
        </Box>
      </Box>

      <Button
        title="Submit"
        style={{ width: 200, marginLeft: "auto", marginRight: "auto" }}
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
    </View>
  );
};

export default Settings;
