import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  RefreshControl,
  TouchableHighlight,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { Button, Surface, Chip } from "react-native-paper";

import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../../../redux/app/store";
import { useSelector } from "react-redux";
import {
  getAllTrainingDays,
  deleteTrainingDays,
} from "../../../../../../redux/features/trainingDays/trainingDaysSlice";

/* TODO:
Delete Regiment
Delete Workouts
Update Regiment (Name & Description)
Update Workout (Replace)
*/
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
  const { data } = useSelector((state: RootState) => state.trainingDays);
  const { currentUser } = useSelector((state: RootState) => state.auth);
  console.log("currentUser", currentUser);
  const dispatch = useDispatch<AppDispatch>();

  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    if (route.params._id !== undefined) console.log(route.params._id);
    dispatch(getAllTrainingDays(route.params._id));
  }, [route]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      dispatch(getAllTrainingDays(route.params._id)).then((val) => {
        if (val.meta.requestStatus === "fulfilled") {
          setRefreshing(false);
        }
        if (val.meta.requestStatus === "rejected") {
          console.log(val);
          setRefreshing(false);
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
      <Button
        mode="outlined"
        textColor="white"
        onPress={() => navigation.navigate("Create Workout", route.params._id)}
        style={{
          marginVertical: 25,
          width: "100%",
          padding: 5,
          marginRight: 30,
          backgroundColor: "#4f1d9e",
          borderColor: "#6023c0",
          marginLeft: "auto",
        }}
        icon={"plus"}
      >
        Create Training Day
      </Button>
      <ScrollView
        style={{ width: "100%" }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {data.routines.map((val, idx) => (
          <TouchableHighlight
            onPress={() => {
              console.log(val);
              navigation.navigate("Create Workout", {
                val,
                index: idx,
                regimentId: route.params._id,
              });
            }}
            onLongPress={() => {
              dispatch(
                deleteTrainingDays({
                  routineId: val._id,
                  regimentId: route.params._id,
                })
              ).then((val) => {
                if (val.meta.requestStatus === "fulfilled") {
                  dispatch(getAllTrainingDays(route.params._id));
                }
                if (val.meta.requestStatus === "rejected") {
                  console.log(val);
                  alert("not working");
                }
              });
            }}
            key={idx}
            underlayColor={"white"}
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
            <View>
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
                    ...route,
                    day: val.day,
                    routineId: val._id,
                    regimentId: route.params._id,
                  });
                }}
              >
                Add Workout
              </Button>
            </View>
          </TouchableHighlight>
        ))}
      </ScrollView>
    </View>
  );
}
