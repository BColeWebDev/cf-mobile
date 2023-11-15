import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { Button, Surface, Chip } from "react-native-paper";
import { getSingleRegiment } from "../../../../../../redux/features/regiments/regimentsSlice";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../../../redux/app/store";
import { useSelector } from "react-redux";

export default function RegimentDetails({ route, navigation }) {
  /* 2. Get the param */

  const style = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-start",
      backgroundColor: "#292929",
      alignItems: "center",
      display: "flex",
    },
  });
  const { detailInfo } = useSelector((state: RootState) => state.regiments);
  console.log("detailInfo", route.params._id);
  console.log("****", detailInfo);
  const dispatch = useDispatch<AppDispatch>();

  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    dispatch(getSingleRegiment(route.params._id));
  }, [route]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      dispatch(getSingleRegiment(route.params._id)).then((val) => {
        console.log("VAL", val);
        if (val.meta.requestStatus === "fulfilled") {
          setRefreshing(false);
        }
        if (val.meta.requestStatus === "rejected") {
          setRefreshing(false);
          alert(val);
        }
      });
    }, 2000);
  }, [refreshing]);

  return (
    <View style={style.container}>
      <Text
        style={{
          textAlign: "center",
          fontSize: 30,
          marginVertical: 10,
          color: "white",
        }}
      >
        {route.params.name}
      </Text>

      <Text style={{ color: "white", marginVertical: 20 }}>Routines</Text>
      <ScrollView
        style={{ width: "100%" }}
        refreshControl={
          <RefreshControl refreshing={true} onRefresh={onRefresh} />
        }
      >
        {route.params.routines.map((val, idx) => (
          <View
            key={idx}
            style={{
              marginBottom: 20,
              borderRadius: 8,
              padding: 10,
              width: "95%",
              marginLeft: "auto",
              marginRight: "auto",
              backgroundColor: "white",
            }}
          >
            <View
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
            >
              <Chip mode={"flat"} selectedColor="purple">
                {val.day}
              </Chip>
            </View>
            <Text
              style={{
                textTransform: "capitalize",
                color: "black",
                fontSize: 25,
                fontWeight: "500",
                marginBottom: 20,
              }}
            >
              {val.name}
            </Text>
            <Text
              style={{
                textTransform: "capitalize",
                color: "black",
                fontWeight: "200",
                textAlign: "center",
                marginVertical: 15,
              }}
            >
              {val.description}
            </Text>
            <Text style={{ marginVertical: 20, fontSize: 20 }}>Workouts</Text>
            {val.workouts.map((value, idx) => (
              <View key={idx}>
                <Text> {value.bodyPart}</Text>
                <Text>{value.name}</Text>
                <Text>{value.equipment}</Text>
                <Text>{value.muscle_target}</Text>
                <Image
                  source={{ uri: value.gifUrl }}
                  style={{ width: 60, height: 60, borderRadius: 50 }}
                />
              </View>
            ))}
            <Button
              onPress={() => {
                navigation.navigate("Workouts", {
                  day: val.day,
                  routineId: route.params._id,
                });
              }}
            >
              Add Workout
            </Button>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
