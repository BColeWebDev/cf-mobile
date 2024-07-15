import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableHighlight,
  RefreshControl,
  FlatList,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, TextInput } from "react-native-paper";
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
  const { currentUser } = useSelector((state: any) => state.auth);
  const style = StyleSheet.create({
    container: {
      flex: 1,
      padding: 1,
      justifyContent: "flex-start",
      backgroundColor:
        currentUser.existingUser?.settings?.theme === "dark"
          ? "#171a1d"
          : "#f9fafa",
      alignItems: "center",
      display: "flex",
    },
  });
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      dispatch(
        getAllWorkouts({
          token: currentUser.userToken,
          page: 1,
          limit: 10,
        })
      ).then((val) => {
        if (val.meta.requestStatus === "fulfilled") {
          setRefreshing(false);
        }
        if (val.meta.requestStatus === "rejected") {
          setRefreshing(false);
        }
      });
      // fetchImage();
    }, 2000);
  }, [refreshing]);

  // Loading Screen
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
        <Loading color={"black"} />
      </View>
    );
  }

  const handleCreateWorkout = (val) => {
    navigation.navigate("WorkoutsDetails", {
      workoutId: "",
      sets: [{ sets: 1, reps: 10, weight: 0 }],
      restTime: "0",
      routineId: route.params.routineId,
      regimentId: route.params.regimentId,
      wId: val.id,
      btnName: "Add To Regiment",
      action: (value) => {
        dispatch(
          createNewWorkout({
            routineId: route.params.routineId,
            regimentId: route.params.regimentId,
            ...val,
            muscle_target: val.target,
            sets: value.sets,
          })
        ).then((val) => {
          if (val.meta.requestStatus === "fulfilled") {
            dispatch(getAllTrainingDays(route.params.regimentId));
            navigation.navigate("Regiment Details", { route });
            setselectedWorkouts(undefined);
          }
          if (val.meta.requestStatus === "rejected") {
            setselectedWorkouts(undefined);
          }
        });
      },
    });
  };

  // Clear all existing filters
  const clearFilters = () => {
    dispatch(
      getAllWorkouts({
        token: currentUser.userToken,
        page: 1,
        limit: 1500,
        filters: "",
      })
    );
  };
  return (
    <SafeAreaView style={style.container}>
      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {/* Search */}
        <TextInput
          style={{
            margin: 15,
            backgroundColor: "white",
            width: "90%",
            marginRight: "auto",
          }}
          textColor="black"
          mode={"flat"}
          activeOutlineColor="black"
          selectionColor={"black"}
          cursorColor={"black"}
          placeholder="Search"
          right={<AntDesign name="search1" size={24} color="black" />}
          onChangeText={(text) => setinput(text)}
        ></TextInput>
      </View>
      {/* Workouts */}
      <View
        style={{
          flexDirection: "row-reverse",
          justifyContent: "space-between",
          padding: 20,
          alignItems: "center",
          width: "100%",
        }}
      >
        <FontAwesome
          name="filter"
          size={24}
          color={
            currentUser.existingUser?.settings?.theme === "dark"
              ? "#f9fafa"
              : "#33373d"
          }
          onPress={() => navigation.navigate("WorkoutsFilters")}
        />
        <Text
          style={{
            color:
              currentUser.existingUser?.settings?.theme === "dark"
                ? "#f9fafa"
                : "#33373d",
            fontWeight: "400",
            textAlign: "right",
          }}
        >
          Workouts:{workouts?.items.length}
        </Text>
      </View>

      {/* Clear Filter */}
      <View
        style={{
          flexDirection: "row-reverse",
          justifyContent: "space-between",
          padding: 20,
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* Show filter if less than all workouts */}
        {workouts?.items.length < 1324 ? (
          <Button
            style={{
              width: "100%",
              backgroundColor: "#211a23",
              borderRadius: 15,
              marginLeft: "auto",
              marginRight: "auto",
              height: 40,
              justifyContent: "center",
            }}
            mode="elevated"
            textColor="white"
            onPress={() => clearFilters()}
          >
            Clear Filters
          </Button>
        ) : null}
      </View>

      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={workouts?.items.filter((val) => {
          if (input === "") {
            return val;
          }
          return val.name.toLowerCase().includes(input.toLowerCase());
        })}
        renderItem={({ item }) => (
          <TouchableHighlight
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              marginBottom: 20,
              backgroundColor:
                currentUser.existingUser?.settings?.theme === "dark"
                  ? "#33373d"
                  : "#f1f1f2",
              borderRadius: 10,
              padding: 10,
              justifyContent: "space-around",
              alignItems: "center",
              marginHorizontal: 20,
            }}
            onPress={() => {
              if (route.params === undefined) {
                return;
              }
              handleCreateWorkout(item);
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row-reverse",
                alignItems: "flex-start",
              }}
            >
              <Image
                source={{ uri: item.gifUrl }}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 150 / 2,
                  overflow: "hidden",
                  borderWidth: 3,
                  borderColor: "black",
                }}
              />
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 20,
                    flex: 1,
                    color:
                      currentUser.existingUser?.settings?.theme === "dark"
                        ? "#f9fafa"
                        : "#33373d",
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                >
                  {item.name}
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    flex: 1,
                    color:
                      currentUser.existingUser?.settings?.theme === "dark"
                        ? "#f9fafa"
                        : "#33373d",
                    marginTop: 3,
                    marginBottom: 3,
                  }}
                >
                  {item.target}
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    flex: 1,
                    color:
                      currentUser.existingUser?.settings?.theme === "dark"
                        ? "#f9fafa"
                        : "#33373d",
                    marginTop: 3,
                    marginBottom: 3,
                  }}
                >
                  {item.bodyPart}
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    flex: 1,
                    color:
                      currentUser.existingUser?.settings?.theme === "dark"
                        ? "#f9fafa"
                        : "#33373d",
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                >
                  {item.equipment}
                </Text>
              </View>
            </View>
          </TouchableHighlight>
        )}
      />
    </SafeAreaView>
  );
};

export default WorkoutsScreen;
