import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  RefreshControl,
  FlatList,
} from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Searchbar } from "react-native-paper";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  getAllWorkouts,
  createNewWorkout,
} from "../../../../redux/features/workouts/workoutSlice";
import Loading from "../../../Loading";
import { FontAwesome } from "@expo/vector-icons";
import { IWorkouts } from "../../../../redux/features/interfaces/IWorkouts";
import { AppDispatch, RootState } from "../../../../redux/app/store";
import { ISets } from "../../../../redux/features/interfaces/ISets";

// Rename workouts to exercises for less confusion
const WorkoutsScreen = ({ route, navigation }) => {
  const [input, setinput] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { workouts, isLoading } = useSelector((state: any) => state.workouts);
  const { currentUser } = useSelector((state: RootState) => state.auth);

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
      width: "100%",
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
        <Searchbar
          value={input}
          iconColor={
            currentUser.existingUser?.settings?.theme === "dark"
              ? "#f9fafa"
              : "#33373d"
          }
          placeholderTextColor={
            currentUser.existingUser?.settings?.theme === "dark"
              ? "#f9fafa"
              : "#33373d"
          }
          inputStyle={{
            color:
              currentUser.existingUser?.settings?.theme === "dark"
                ? "#f9fafa"
                : "#33373d",
          }}
          style={{
            marginBottom: 10,
            marginHorizontal: 20,
            backgroundColor:
              currentUser.existingUser?.settings?.theme === "dark"
                ? "#1d2025"
                : "#f1f1f2",
            color:
              currentUser.existingUser?.settings?.theme === "dark"
                ? "white"
                : "#33373d",
            width: "90%",
          }}
          selectionColor={
            currentUser.existingUser?.settings?.theme === "dark"
              ? "#f9fafa"
              : "#33373d"
          }
          cursorColor={
            currentUser.existingUser?.settings?.theme === "dark"
              ? "#f9fafa"
              : "#33373d"
          }
          placeholder="Search"
          onChangeText={(text) => setinput(text)}
        />
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
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* Show filter if less than all workouts */}
        {workouts?.items?.length < 1324 ? (
          <Button
            style={{
              backgroundColor: "#211a23",
              borderRadius: 15,
              marginLeft: "auto",
              marginRight: "auto",
              height: 40,
              justifyContent: "center",
              marginBottom: 15,
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
        data={workouts?.items.filter((val: IWorkouts) => {
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
              navigation.navigate("WorkoutsDetails", {
                workoutId: "",
                sets: [{ sets: 1, reps: 10, weight: 0 }],
                restTime: "0",
                routineId: route.params?.routineId
                  ? route.params.routineId
                  : "",
                regimentId: route.params?.regimentId
                  ? route.params.routineId
                  : "",
                wId: item.id,
                name: item.name,
                btnName: "Add Workout",
                action: (value: ISets) => {
                  let obj: IWorkouts = {
                    regimentId: route.params.regimentId,
                    routineId: route.params.routineId,
                    ...item,
                    muscle_target: item.target,
                    bodyPart: item.bodyPart,
                    sets: value.sets,
                    reps: value.reps,
                    weight: value.weight,
                  };
                  dispatch(createNewWorkout(obj)).then((value) => {
                    if (value.meta.requestStatus === "fulfilled") {
                      navigation.navigate("Regiment Details", route);
                    }
                    if (value.meta.requestStatus === "rejected") {
                      console.log("value", value.payload);
                    }
                  });
                },
              });
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
                  width: 80,
                  height: 80,
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
