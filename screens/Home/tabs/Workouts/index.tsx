import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableHighlight,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Box,
  TextInput,
  Badge,
  Flex,
  Button,
  Portal,
} from "@react-native-material/core";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  createNewWorkout,
  getAllBodyTargets,
  getAllEquipment,
  getAllWorkouts,
} from "../../../../redux/features/workouts/workoutSlice";
import Loading from "../../../Loading";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { IWorkouts } from "../../../../redux/features/interfaces/IWorkouts";
import { getAllTrainingDays } from "../../../../redux/features/trainingDays/trainingDaysSlice";
import { AppDispatch } from "../../../../redux/app/store";
import { Snackbar } from "react-native-paper";

// TODO: Infinite Scrolling
// Rename workouts to exercises for less confusion
const WorkoutsScreen = ({ route, navigation }) => {
  const [input, setinput] = useState("");
  const [selectedWorkouts, setselectedWorkouts] = useState<IWorkouts>();
  const dispatch = useDispatch<AppDispatch>();
  const { workouts, isLoading, equipments, bodyTargets, muscles } = useSelector(
    (state: any) => state.workouts
  );
  const [view, setview] = useState("");

  // console.log("workouts", workouts,equipments,bodyTargets,muscles);
  const { currentUser } = useSelector((state: any) => state.auth);
  const style = StyleSheet.create({
    container: {
      flex: 1,
      padding: 1,
      justifyContent: "flex-start",
      backgroundColor: "#1d2025",
      alignItems: "center",
      display: "flex",
    },
  });
  useEffect(() => {
    dispatch(
      getAllWorkouts({ token: currentUser.userToken, page: 1, limit: 100 })
    ).then((val) => console.log(val));
    dispatch(getAllEquipment({ token: currentUser.userToken })).then((val) =>
      console.log(val)
    );
    dispatch(getAllBodyTargets({ token: currentUser.userToken })).then((val) =>
      console.log(val)
    );
  }, []);
  useEffect(() => {
    if (selectedWorkouts !== undefined) {
      console.log(selectedWorkouts);
      dispatch(
        createNewWorkout({
          routineId: route.params.routineId,
          regimentId: route.params.regimentId,
          ...selectedWorkouts,
          muscle_target: selectedWorkouts.target,
        })
      ).then((val) => {
        if (val.meta.requestStatus === "fulfilled") {
          dispatch(getAllTrainingDays(route.params.regimentId));
          navigation.navigate("Regiment Details", { route });
          setselectedWorkouts(undefined);
        }
        if (val.meta.requestStatus === "rejected") {
          setview(val.payload.response.data.message);
          setselectedWorkouts(undefined);
        }
      });
    }
  }, [selectedWorkouts]);

  if (isLoading) {
    return <Loading />;
  }

  const handleCreateWorkout = (val) => {
    setselectedWorkouts(val);
  };

  return (
    <SafeAreaView style={style.container}>
      <Box style={{ width: "100%" }}>
        {/* <Box
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "row",
            alignItems: "flex-end",
            marginBottom: 20,
            marginTop: 0,
            justifyContent: "space-between",
          }}
        >
          <FontAwesome
            name="filter"
            size={24}
            style={{ marginRight: 20 }}
            color="white"
            onPress={() => navigation.navigate("WorkoutsFilters")}
          />
        </Box> */}

        {/* Search */}
        <TextInput
          style={{ margin: 10, borderRadius: 120, marginHorizontal: 20 }}
          placeholder="Search Workout"
          leading={<AntDesign name="search1" size={24} color="black" />}
          onChangeText={(text) => setinput(text)}
        ></TextInput>

        {/* Workouts */}
        <ScrollView>
          {workouts?.items
            ?.filter((val) => {
              if (input === "") {
                return val;
              }
              return val.name.toLowerCase().includes(input.toLowerCase());
            })
            .map((val, idx) => (
              <TouchableHighlight
                key={idx}
                style={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  marginBottom: 20,
                  backgroundColor: "black",
                  borderRadius: 10,
                  padding: 10,
                  justifyContent: "space-around",
                  alignItems: "center",
                  marginHorizontal: 20,
                }}
                onPress={() => handleCreateWorkout(val)}
              >
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "row-reverse",
                    alignItems: "flex-start",
                  }}
                >
                  <Image
                    source={{ uri: val.gifUrl }}
                    style={{ width: 60, height: 60, borderRadius: 0.5 }}
                  />
                  <Box style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 20,
                        flex: 1,
                        color: "white",
                        marginTop: 10,
                        marginBottom: 10,
                      }}
                    >
                      {val.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        flex: 1,
                        color: "white",
                        marginTop: 10,
                        marginBottom: 10,
                      }}
                    >
                      {val.target}
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        flex: 1,
                        color: "white",
                        marginTop: 10,
                        marginBottom: 10,
                      }}
                    >
                      {val.bodyPart}
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        flex: 1,
                        color: "white",
                        marginTop: 10,
                        marginBottom: 10,
                      }}
                    >
                      {val.equipment}
                    </Text>
                  </Box>
                </Box>
              </TouchableHighlight>
            ))}
        </ScrollView>

        {view === "" ? null : (
          <Snackbar
            visible={true}
            style={{ marginBottom: 100 }}
            onDismiss={() => setview("")}
            action={{
              label: "Close",
              onPress: () => {
                setview("");
              },
            }}
          >
            {view}
          </Snackbar>
        )}
      </Box>
    </SafeAreaView>
  );
};

export default WorkoutsScreen;
