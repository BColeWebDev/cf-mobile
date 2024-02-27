import { View, StyleSheet, TouchableHighlight } from "react-native";
import React, { useState, useEffect } from "react";
import { Button, RadioButton, TextInput, Text } from "react-native-paper";
import { useDispatch } from "react-redux";
import { createNewWorkout } from "../../../../../../redux/features/workouts/workoutSlice";
import {
  createTrainingDays,
  getAllTrainingDays,
  updateTrainingDays,
} from "../../../../../../redux/features/trainingDays/trainingDaysSlice";
import { AppDispatch } from "../../../../../../redux/app/store";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../redux/app/store";
import Loading from "../../../../../Loading";
const CreateWorkout = ({ route, navigation }) => {
  console.log("route", route);
  const dispatch = useDispatch<AppDispatch>();

  const { days, isLoading } = useSelector(
    (state: RootState) => state.trainingDays
  );
  const initialState = {
    name: "",
    description: "",
    day: "",
  };
  let data = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  useEffect(() => {
    console.log(route?.params?.val?.name);
    if (route?.params?.val?.name !== undefined) {
      console.log("called");
      setformData({
        name: route?.params?.val?.name,
        description: route?.params?.val?.description,
        day: String(data.indexOf(route?.params?.val?.day)),
      });
    }
  }, [route]);
  const [formData, setformData] = useState(initialState);
  console.log(formData);
  const style = StyleSheet.create({
    textInput: {
      width: "90%",
      backgroundColor: "",
      paddingLeft: 10,
      marginVertical: 10,
      marginLeft: "auto",
      marginRight: "auto",
      borderRadius: 1000,
    },
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#121212",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
    },
  });

  const handleCreateWorkout = () => {
    dispatch(
      createTrainingDays({ ...formData, regimentId: route.params })
    ).then((val) => {
      if (val.meta.requestStatus === "fulfilled") {
        navigation.navigate("Regiment Details", route);
      }
      if (val.meta.requestStatus === "rejected") {
        console.log("not working", val);
      }
    });
  };

  const handleUpdateWorkout = () => {
    dispatch(
      updateTrainingDays({
        ...formData,
        index: route?.params?.index,
        regimentId: route.params.regimentId,
      })
    ).then((val) => {
      if (val.meta.requestStatus === "fulfilled") {
        dispatch(getAllTrainingDays(route.params.regimentId)).then((val) => {
          if (val.meta.requestStatus === "fulfilled") {
            navigation.navigate("Regiment Details", route);
          }
          if (val.meta.requestStatus === "rejected") {
            console.log(val);
          }
        });
      }
      if (val.meta.requestStatus === "rejected") {
        console.log(val);
      }
    });
  };
  if (isLoading) {
    return <Loading color={"black"} />;
  }

  return (
    <View>
      <Text
        style={{ marginVertical: 25, textAlign: "center", fontWeight: "600" }}
        variant="headlineMedium"
      >
        {route?.params?.val?.name !== undefined
          ? "Update Workout"
          : "Create a New Workout"}
      </Text>
      <TextInput
        placeholder="Name"
        textColor="black"
        mode={"outlined"}
        style={{
          marginBottom: 25,
          marginHorizontal: 20,
          backgroundColor: "white",
        }}
        activeOutlineColor="black"
        selectionColor={"black"}
        cursorColor={"black"}
        value={formData.name}
        onChangeText={(text) => {
          setformData((prevState) => ({ ...prevState, name: text }));
        }}
      />
      <TextInput
        placeholder="Description"
        textColor="black"
        mode={"outlined"}
        style={{
          marginBottom: 25,
          marginHorizontal: 20,
          backgroundColor: "white",
        }}
        activeOutlineColor="black"
        selectionColor={"black"}
        cursorColor={"black"}
        value={formData.description}
        onChangeText={(text) => {
          setformData((prevState) => ({ ...prevState, description: text }));
        }}
      />
      <Text
        variant="titleLarge"
        style={{
          marginLeft: 20,
          marginVertical: 30,
        }}
      >
        Choose workout day
      </Text>
      {data.map((val, idx) => {
        if (days.includes(val)) {
          return;
        }
        return (
          <TouchableHighlight
            style={{
              marginLeft: 20,
              marginRight: 20,
            }}
            key={idx}
            onPress={() => {
              setformData((prevState) => ({ ...prevState, day: String(idx) }));
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 20, color: "black", fontWeight: "500" }}>
                {val}
              </Text>
              <RadioButton
                color="red"
                value={String(idx)}
                status={formData.day === String(idx) ? "checked" : "unchecked"}
              />
            </View>
          </TouchableHighlight>
        );
      })}
      {route?.params?.val?.name === undefined ? (
        <Button
          disabled={
            formData.day === "" && formData.description === "" ? true : false
          }
          style={{
            width: 220,
            marginBottom: 20,
            borderRadius: 15,
            height: 40,
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 20,
            justifyContent: "center",
          }}
          mode="elevated"
          buttonColor="black"
          textColor="white"
          onPress={() => handleCreateWorkout()}
        >
          CREATE WORKOUT
        </Button>
      ) : (
        <Button
          disabled={
            formData.day === "" && formData.description === "" ? true : false
          }
          style={{
            width: 220,
            marginBottom: 20,
            borderRadius: 15,
            height: 40,
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 20,
            justifyContent: "center",
          }}
          mode="elevated"
          buttonColor="black"
          textColor="white"
          onPress={() => handleUpdateWorkout()}
        >
          UPDATE WORKOUT
        </Button>
      )}
    </View>
  );
};

export default CreateWorkout;
