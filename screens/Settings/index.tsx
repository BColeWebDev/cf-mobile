import { View, Text } from "react-native";
import React, { useState } from "react";
import { Box, Button, Stack, Switch } from "@react-native-material/core";
import { useSelector } from "react-redux";
import { UserSettings } from "../../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
const Settings = ({ navigation }) => {
  const dispatch = useDispatch<any>();
  const [metric, setMetricChecked] = useState(false);
  const [theme, setThemeChecked] = useState(false);
  const [inches, setInchesChecked] = useState(false);
  const [distance, setDistanceChecked] = useState(false);
  const { currentUser } = useSelector((state: any) => state.auth);
  console.log("user", currentUser);
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
      console.log("val", val);
      if (val.meta.requestStatus === "fulfilled") {
        navigation.navigate("Home");
      }
      if (val.meta.requestStatus === "rejected") {
        console.log(val);
      }
    });
  };
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
    </View>
  );
};

export default Settings;
