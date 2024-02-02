import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../../../../redux/app/store";
import { getAllWorkouts } from "../../../../../../../../redux/features/workouts/workoutSlice";
import Loading from "../../../../../../../Loading";

const WorkoutDetails = ({ route, navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { workouts, isLoading, equipments, bodyTargets, muscles } = useSelector(
    (state: any) => state.workouts
  );
  const { currentUser } = useSelector((state: any) => state.auth);

  useEffect(() => {
    dispatch(
      getAllWorkouts({ token: currentUser.userToken, page: 1, limit: 10 })
    );
  }, []);
  let workoutsDetails = workouts?.items?.filter(
    (value) => value.id === route.params.workoutId
  )[0];
  console.log("workoutDetails", workoutsDetails);

  if (isLoading) {
    return (
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          flex: 1,
          width: "100%",
        }}
      >
        <Loading />
      </View>
    );
  }

  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={{
          uri: workoutsDetails?.gifUrl,
        }}
        style={{
          width: 80,
          height: 80,
          backgroundColor: "red",
          borderRadius: 50,
        }}
      />
      <Text>{workoutsDetails?.name}</Text>
      <Text>{workoutsDetails?.bodyPart}</Text>
      <View style={{ marginVertical: 20, marginHorizontal: 10 }}>
        <Text style={{ fontSize: 18, marginBottom: 10, fontWeight: "600" }}>
          Instructions
        </Text>
        {workoutsDetails?.instructions.map((val, idx) => (
          <Text style={{ marginVertical: 5 }} key={idx}>
            {`${idx + 1}.)`}
            {val}
          </Text>
        ))}
      </View>
      <View style={{ marginVertical: 30, width: "100%" }}>
        <Text
          style={{
            fontSize: 18,
            marginBottom: 10,
            marginHorizontal: 10,
            fontWeight: "600",
          }}
        >
          Secondary Muscles
        </Text>
        {workoutsDetails?.secondaryMuscles.map((val, idx) => (
          <Text style={{ marginVertical: 5, marginHorizontal: 10 }} key={idx}>
            {`${idx + 1}.)`}
            {val}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default WorkoutDetails;
