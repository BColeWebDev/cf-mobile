import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableHighlight,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/app/store";
import { Button, Checkbox, SegmentedButtons } from "react-native-paper";
import imperialMeasurement from "../../../../redux/features/helpers/imperial-measurement.json";
import metricMeasurement from "../../../../redux/features/helpers/metric-measurement.json";

export default function SignUpHeight({ navigation }) {
  const dispatch = useDispatch<AppDispatch>();
  const { register } = useSelector((state: RootState) => state.auth);
  const [value, setValue] = useState("imperial");
  const [height, setheight] = useState("");
  const style = StyleSheet.create({
    textInput: {
      width: "100%",
      marginBottom: 30,
    },
    inputStyles: {
      color: "white",
      backgroundColor: "white",
      borderBottomColor: "white",
    },
    container: {
      flex: 1,
      height: "100%",
      backgroundColor: "#171a1d",
      alignItems: "center",
      justifyContent: "flex-start",
      color: "white",
    },
  });

  useEffect(() => {
    setheight("");
  }, [value]);

  return (
    <SafeAreaView style={style.container}>
      <Text style={{ marginVertical: 10, fontSize: 25, color: "#f9fafa" }}>
        What is your height?
      </Text>
      <MaterialCommunityIcons
        name="human-male-height"
        size={30}
        color="white"
      />
      {/* Nutrition Filters */}
      <SegmentedButtons
        style={{ width: "60%", marginVertical: 10, marginTop: 30 }}
        value={value}
        onValueChange={setValue}
        buttons={[
          {
            value: "imperial",
            label: "Imperial",
            labelStyle: {
              color: "white",
            },
            style: {
              backgroundColor: value === "imperial" ? "black" : "#33373d",
              borderColor: "#171a1d",
            },
          },
          {
            value: "metric",
            label: "Metric",
            labelStyle: {
              color: "white",
            },
            style: {
              borderColor: "#171a1d",
              backgroundColor: value === "metric" ? "black" : "#33373d",
            },
          },
        ]}
      />
      {value === "imperial" ? (
        <FlatList
          style={{ width: "95%", padding: 10 }}
          data={imperialMeasurement.heights}
          renderItem={({ item, index }) => (
            <TouchableHighlight
              style={{
                marginBottom: 20,
                backgroundColor:
                  item === height
                    ? "rgba(52, 52, 52, 0.8)"
                    : "rgba(52, 52, 52, 0.4)",
                borderColor: "rgba(52, 52, 52, 0.6)",
                borderWidth: 3,
                padding: 10,
                borderRadius: 15,
              }}
              onPress={() => setheight(item)}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Checkbox status={item === height ? "checked" : "unchecked"} />
                <Text style={{ color: "white", fontSize: 16 }} key={index}>
                  {item}
                </Text>
              </View>
            </TouchableHighlight>
          )}
        />
      ) : (
        <FlatList
          style={{ width: "95%", padding: 10 }}
          data={metricMeasurement.heights}
          renderItem={({ item, index }) => (
            <TouchableHighlight
              style={{
                marginBottom: 20,
                backgroundColor:
                  item === height
                    ? "rgba(52, 52, 52, 0.8)"
                    : "rgba(52, 52, 52, 0.4)",
                borderColor: "rgba(52, 52, 52, 0.6)",
                borderWidth: 3,
                padding: 10,
                borderRadius: 15,
              }}
              onPress={() => setheight(item)}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Checkbox status={item === height ? "checked" : "unchecked"} />
                <Text style={{ color: "white", fontSize: 16 }} key={index}>
                  {item + "cm"}
                </Text>
              </View>
            </TouchableHighlight>
          )}
        />
      )}

      <Button
        buttonColor="black"
        textColor="white"
        style={{
          width: 220,
          marginBottom: 20,
          marginTop: 20,
          borderRadius: 15,
          marginLeft: "auto",
          marginRight: "auto",
          height: 40,
          justifyContent: "center",
        }}
        mode="elevated"
        onPress={() => navigation.navigate("SignUpWeight")}
        disabled={height === "" ? true : false}
      >
        Next
      </Button>
    </SafeAreaView>
  );
}
