import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  RefreshControl,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import {
  ActivityIndicator,
  Button,
  Chip,
  Modal,
  Portal,
  Snackbar,
} from "react-native-paper";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../../../redux/app/store";
import { useSelector } from "react-redux";
import {
  getAllTrainingDays,
  deleteTrainingDays,
} from "../../../../../../redux/features/trainingDays/trainingDaysSlice";
import { getSingleRegiment } from "../../../../../../redux/features/regiments/regimentsSlice";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  deleteWorkout,
  updateWorkout,
} from "../../../../../../redux/features/workouts/workoutSlice";
import { useIsFocused, useNavigationState } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import Loading from "../../../../../Loading";
import { createSharable } from "../../../../../../redux/features/sharables/sharableSlice";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { IRoutine } from "../../../../../../redux/features/interfaces/IRoutine";

let names = {
  monday: "Mon",
  tuesday: "Tues",
  wednesday: "Wed",
  thursday: "Thurs",
  friday: "Fri",
  saturday: "Sat",
  sunday: "Sun",
};

const Tab = createMaterialTopTabNavigator();

export default function RegimentDetails({ route, navigation }) {
  const isFocused = useIsFocused();

  const dispatch = useDispatch<AppDispatch>();

  const { data, days } = useSelector((state: RootState) => state.trainingDays);
  const { detailInfo } = useSelector((state: any) => state.regiments);
  const { workouts } = useSelector((state: any) => state.workouts);
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const [currentTab, setcurrentTab] = useState<string>("");
  const { sharableIsLoading } = useSelector(
    (state: RootState) => state.sharables
  );

  const style = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-start",
      padding: 10,
      backgroundColor:
        currentUser.existingUser?.settings?.theme === "dark"
          ? "#171a1d"
          : "#f9fafa",
      alignItems: "center",
      display: "flex",
    },
  });
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState(false);
  const [sharableVisible, setsharableVisible] = useState(false);
  const [selectValue, setselectValue] = useState();
  const [trainingDayDelete, settrainingDayDelete] = useState(false);
  const [IsSharable, setIsSharable] = useState(false);
  const onToggleSnackBarDelete = () => settrainingDayDelete(!trainingDayDelete);
  const onDismissTrainingSnackBar = () => settrainingDayDelete(false);

  // ON LOAD
  useEffect(() => {
    setisLoading(true);
    if (route.params.regimentId !== undefined) {
      dispatch(getSingleRegiment(route.params.regimentId));
      dispatch(getAllTrainingDays(route.params.regimentId));
    }
    setisLoading(false);
  }, [route]);

  const handleDeleteWorkout = (val) => {
    dispatch(
      deleteWorkout({
        regimentId: detailInfo._id,
        routineId: val._id,
        id: val.id,
      })
    ).then((val) => {
      if (val.meta.requestStatus === "fulfilled") {
        if (route.params !== undefined) {
          dispatch(getSingleRegiment(route.params));
          dispatch(getAllTrainingDays(route.params));
          onToggleSnackBarDelete();
        }
        if (route.params.regimentId !== undefined) {
          dispatch(getSingleRegiment(route.params.regimentId));
          dispatch(getAllTrainingDays(route.params.regimentId));
        }
      }
    });
  };

  const handleTrainingDays = (val) => {
    dispatch(
      deleteTrainingDays({
        routineId: val._id,
        regimentId: detailInfo._id,
        trainingDay: val,
      })
    ).then((val) => {
      if (val.meta.requestStatus === "fulfilled") {
      }
      if (val.meta.requestStatus === "rejected") {
        alert("not working");
      }
    });
  };

  const WorkoutTab = (props) => {
    const { name } = props;

    const navigationState = useNavigationState((state) => state);
    const currentRouteName = navigationState.routes[navigationState.index].name;
    setcurrentTab(currentRouteName);

    return (
      <View style={style.container}>
        <ScrollView
          style={{ width: "100%", height: "100%" }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {data.routines.length === 0 ? (
            <View
              style={{
                backgroundColor:
                  currentUser.existingUser?.settings?.theme === "dark"
                    ? "#33373d"
                    : "#f1f1f2",
                borderColor:
                  currentUser.existingUser?.settings?.theme === "dark"
                    ? "black"
                    : "#f9fafa",
                borderWidth:
                  currentUser.existingUser?.settings?.theme === "dark" ? 0 : 2,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  marginTop: "50%",
                  color: "white",
                  fontSize: 30,
                }}
              >
                No Training Days
              </Text>
            </View>
          ) : (
            data.routines.map((val, idx) => {
              // Display Workout for that day
              if (val.day === name) {
                console.log("VALUE", val.workouts, name);

                return (
                  <View
                    key={idx}
                    style={{
                      margin: 0,
                      backgroundColor:
                        currentUser.existingUser?.settings?.theme === "dark"
                          ? "#33373d"
                          : "#f1f1f2",
                      borderColor:
                        currentUser.existingUser?.settings?.theme === "dark"
                          ? "black"
                          : "#f9fafa",
                      borderWidth:
                        currentUser.existingUser?.settings?.theme === "dark"
                          ? 0
                          : 2,
                      borderRadius: 10,
                    }}
                  >
                    <TouchableHighlight
                      key={idx}
                      underlayColor={"white"}
                      style={{
                        borderRadius: 8,
                        padding: 0,
                        width: "100%",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                    >
                      <View>
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            margin: 10,
                          }}
                        >
                          <View
                            style={{
                              display: "flex",
                              flexDirection: "column-reverse",
                              justifyContent: "space-between",
                              alignItems: "flex-start",
                            }}
                          >
                            <Text
                              style={{
                                textTransform: "capitalize",
                                color:
                                  currentUser.existingUser?.settings?.theme ===
                                  "dark"
                                    ? "#f9fafa"
                                    : "#33373d",
                                fontWeight: "200",
                                textAlign: "center",
                              }}
                            >
                              {val.description}
                            </Text>
                            <View
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <Text
                                style={{
                                  textTransform: "capitalize",
                                  color:
                                    currentUser.existingUser?.settings
                                      ?.theme === "dark"
                                      ? "#f9fafa"
                                      : "#33373d",
                                  fontSize: 20,
                                  fontWeight: "500",
                                  marginVertical: 10,
                                  marginRight: 10,
                                }}
                              >
                                {val.name}
                              </Text>
                              <Chip
                                mode={"flat"}
                                selectedColor="white"
                                style={{ backgroundColor: "black" }}
                              >
                                {val.day}
                              </Chip>
                            </View>
                          </View>
                          <View
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            {/* Create New Workout */}
                            {days.length < 7 && (
                              <AntDesign
                                style={{ marginRight: 30 }}
                                onPress={() => {
                                  // Update Workout
                                  navigation.navigate("Create Workout", {
                                    val,
                                    index: idx,
                                    regimentId: detailInfo._id,
                                  });
                                }}
                                name="edit"
                                size={20}
                                color={
                                  currentUser.existingUser?.settings?.theme ===
                                  "dark"
                                    ? "#f9fafa"
                                    : "#33373d"
                                }
                              />
                            )}

                            {/* Delete Existing Workout */}
                            <AntDesign
                              name="delete"
                              size={20}
                              color={
                                currentUser.existingUser?.settings?.theme ===
                                "dark"
                                  ? "#f9fafa"
                                  : "#33373d"
                              }
                              onPress={() => handleTrainingDays(val)}
                            />
                          </View>
                        </View>
                      </View>
                    </TouchableHighlight>

                    <Button
                      style={{
                        marginBottom: 20,
                        marginTop: 20,
                        backgroundColor: "black",
                        borderRadius: 15,
                        marginLeft: 20,
                        marginRight: 20,
                        height: 40,
                        justifyContent: "center",
                      }}
                      mode="elevated"
                      textColor="white"
                      onPress={() => {
                        navigation.navigate("Workouts", {
                          ...route,
                          day: val.day,
                          routineId: val._id,
                          regimentId: detailInfo._id,
                        });
                      }}
                    >
                      Add Workout
                    </Button>

                    <View style={{ marginHorizontal: 20, marginBottom: 0 }}>
                      {val.workouts.map((value, idx) => (
                        <View
                          key={idx}
                          style={{
                            display: "flex",
                            flexDirection: "row-reverse",
                            alignItems: "center",
                            width: "100%",
                          }}
                        >
                          <TouchableWithoutFeedback
                            onPress={() =>
                              navigation.navigate("WorkoutsDetails", {
                                workoutId: value._id,
                                sets: value.sets,
                                restTime: value.restTime,
                                routineId: val._id,
                                regimentId: detailInfo._id,
                                wId: value.id,
                                name: value.name,
                                btnName: "Update Workout",
                                action: (data) => {
                                  dispatch(
                                    updateWorkout({
                                      routineId: val._id,
                                      workoutId: value._id,
                                      regimentId: detailInfo._id,
                                      sets: data.sets,
                                      restTime: route.params.restTime,
                                    })
                                  ).then((value) => {
                                    if (
                                      value.meta.requestStatus === "fulfilled"
                                    ) {
                                      navigation.goBack();
                                    }
                                    if (
                                      value.meta.requestStatus === "rejected"
                                    ) {
                                      alert(
                                        "Workout could not be updated please try again!"
                                      );
                                    }
                                  });
                                },
                              })
                            }
                            onLongPress={() => {
                              setVisible(!visible);
                              setselectValue({ ...val, id: value.id });
                            }}
                          >
                            <View
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "space-between",
                                margin: 10,
                                padding: 0,
                                width: "100%",
                              }}
                            >
                              <View
                                style={{
                                  width: "100%",
                                  backgroundColor:
                                    currentUser.existingUser?.settings
                                      ?.theme === "dark"
                                      ? "#2e242c"
                                      : "#e7e7e8",
                                  borderRadius: 15,
                                  marginLeft: 10,
                                }}
                              >
                                <View
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    padding: 10,
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                  }}
                                >
                                  <View>
                                    <Text
                                      style={{
                                        width: "100%",
                                        fontSize: 14,
                                        margin: 10,
                                        color:
                                          currentUser.existingUser?.settings
                                            ?.theme === "dark"
                                            ? "#f9fafa"
                                            : "#33373d",
                                        fontWeight: "600",
                                      }}
                                    >
                                      {value.name}
                                    </Text>

                                    <Text
                                      style={{
                                        fontSize: 14,
                                        margin: 10,
                                        color:
                                          currentUser.existingUser?.settings
                                            ?.theme === "dark"
                                            ? "#f9fafa"
                                            : "#33373d",
                                      }}
                                    >
                                      {value.bodyPart}
                                    </Text>
                                  </View>

                                  <Image
                                    source={{
                                      uri: workouts?.items.filter(
                                        (workout) => workout.id == value.id
                                      )[0]?.gifUrl,
                                    }}
                                    style={{
                                      width: 75,
                                      height: 75,
                                      borderRadius: 150 / 2,
                                      overflow: "hidden",
                                      borderWidth: 3,
                                      borderColor: "black",
                                    }}
                                  />
                                </View>

                                {/* Sets */}
                                {value.sets.map((value, key) => (
                                  <View
                                    key={key}
                                    style={{
                                      display: "flex",
                                      margin: 0,
                                      padding: 10,
                                      backgroundColor: "black",
                                      flexDirection: "row",
                                      borderBottomLeftRadius: 15,
                                      borderBottomRightRadius: 15,
                                      justifyContent: "space-evenly",
                                      width: "100%",
                                    }}
                                  >
                                    <Text style={{ color: "white" }}>
                                      Sets {value.sets}
                                    </Text>
                                    <Text style={{ color: "white" }}>
                                      Reps {value.reps}
                                    </Text>
                                    {currentUser.existingUser?.settings
                                      ?.weight === "kg" ? (
                                      <Text style={{ color: "white" }}>
                                        Kg {value.weight}
                                      </Text>
                                    ) : (
                                      <Text style={{ color: "white" }}>
                                        Ibs {value.weight}
                                      </Text>
                                    )}
                                  </View>
                                ))}
                              </View>
                            </View>
                          </TouchableWithoutFeedback>
                        </View>
                      ))}
                    </View>
                  </View>
                );
              }
            })
          )}
        </ScrollView>
      </View>
    );
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      dispatch(getAllTrainingDays(detailInfo._id)).then((val) => {
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

  useEffect(() => {
    dispatch(getAllTrainingDays(detailInfo._id)).then((val) => {
      if (val.meta.requestStatus === "fulfilled") {
        setRefreshing(false);
      }
      if (val.meta.requestStatus === "rejected") {
        setRefreshing(false);
      }
    });
  }, [isFocused]);

  // No Days created
  if (days.length === 0) {
    return (
      <View>
        <View
          style={{
            marginHorizontal: "auto",
            display: "flex",
            padding: 10,
            width: "100%",
            backgroundColor:
              currentUser.existingUser?.settings?.theme === "dark"
                ? "#171a1d"
                : "#f9fafa",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Text
              style={{
                textAlign: "left",
                fontSize: 16,
                fontWeight: "200",
                color:
                  currentUser.existingUser?.settings?.theme === "dark"
                    ? "#f9fafa"
                    : "#1d2025",
              }}
            >
              {detailInfo.description}
            </Text>

            <View
              style={{ display: "flex", flexDirection: "row", marginRight: 10 }}
            >
              <AntDesign
                name="pluscircleo"
                size={20}
                color={
                  currentUser.existingUser?.settings?.theme === "dark"
                    ? "#f9fafa"
                    : "#33373d"
                }
                style={{ marginRight: 20 }}
                onPress={() =>
                  navigation.navigate("Create Workout", detailInfo._id)
                }
              />
            </View>
          </View>
        </View>
        <View
          style={{
            height: "100%",
            backgroundColor:
              currentUser.existingUser?.settings?.theme === "dark"
                ? "#171a1d"
                : "#f9fafa",
            borderWidth:
              currentUser.existingUser?.settings?.theme === "dark" ? 0 : 2,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              marginBottom: 200,
              color:
                currentUser.existingUser?.settings?.theme === "dark"
                  ? "#f9fafa"
                  : "#33373d",
              fontSize: 20,
            }}
          >
            No Training Days
          </Text>
        </View>
      </View>
    );
  }
  // Days Created
  return (
    <>
      {isLoading ? (
        <View style={{ flex: 1 }}>
          <Loading
            color={
              currentUser.existingUser?.settings?.theme === "dark"
                ? "#f9fafa"
                : "#1d2025"
            }
          />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <View
            style={{
              marginHorizontal: "auto",
              display: "flex",
              padding: 10,
              width: "100%",
              backgroundColor:
                currentUser.existingUser?.settings?.theme === "dark"
                  ? "#171a1d"
                  : "#f9fafa",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Text
                style={{
                  textAlign: "left",
                  fontSize: 16,
                  fontWeight: "200",
                  color:
                    currentUser.existingUser?.settings?.theme === "dark"
                      ? "#f9fafa"
                      : "#1d2025",
                }}
              >
                {detailInfo.description}
              </Text>

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginRight: 10,
                }}
              >
                {/* Add New Workout */}
                {days.length < 7 && (
                  <AntDesign
                    name="pluscircleo"
                    size={20}
                    color={
                      currentUser.existingUser?.settings?.theme === "dark"
                        ? "#f9fafa"
                        : "#33373d"
                    }
                    style={{ marginRight: 20 }}
                    onPress={() =>
                      navigation.navigate("Create Workout", detailInfo._id)
                    }
                  />
                )}

                {/* Start Workout */}
                <FontAwesome
                  name="play-circle"
                  size={20}
                  color={
                    currentUser.existingUser?.settings?.theme === "dark"
                      ? "#f9fafa"
                      : "#33373d"
                  }
                  onPress={() => {
                    let filteredData: IRoutine = data.routines.filter(
                      (val: IRoutine) => {
                        if (val.day.includes(currentTab.toLowerCase())) {
                          return val;
                        }
                      }
                    )[0];

                    navigation.navigate("StartWorkout", {
                      tabName: currentTab,
                      workouts: filteredData.workouts,
                    });
                  }}
                />

                {/* Share Workout Plan */}
                {days.length === 7 && (
                  <AntDesign
                    name="sharealt"
                    size={20}
                    color={
                      currentUser.existingUser?.settings?.theme === "dark"
                        ? "#f9fafa"
                        : "#33373d"
                    }
                  />
                )}
              </View>
            </View>
          </View>
          {/* Tabs */}
          <Tab.Navigator
            initialRouteName={
              route.params.tabName !== "" ? route.params.tabName : ""
            }
            screenOptions={{
              tabBarStyle: {
                backgroundColor:
                  currentUser.existingUser?.settings?.theme === "dark"
                    ? "#171a1d"
                    : "#f9fafa",
              },
            }}
          >
            {/* Workout Tabs */}
            <Tab.Group>
              {days?.map((val, idx) => (
                <Tab.Screen
                  key={idx}
                  name={names[val]}
                  options={{
                    tabBarLabelStyle: {
                      fontSize: 9,
                      color:
                        currentUser.existingUser?.settings?.theme === "dark"
                          ? "#f9fafa"
                          : "#33373d",
                      fontWeight: "600",
                    },
                  }}
                >
                  {(prop) => {
                    return <WorkoutTab name={val} {...prop} />;
                  }}
                </Tab.Screen>
              ))}
            </Tab.Group>
          </Tab.Navigator>

          {/* SnackBars */}
          <Snackbar
            visible={trainingDayDelete}
            onDismiss={onDismissTrainingSnackBar}
          >
            Removed Training Day
          </Snackbar>

          <Snackbar visible={IsSharable} onDismiss={() => setIsSharable(false)}>
            Workout Shared!
          </Snackbar>
          {/* Delete Workout Portal*/}
          <Portal>
            <Modal
              visible={visible}
              contentContainerStyle={{ backgroundColor: "white", padding: 20 }}
              onDismiss={() => setVisible(!visible)}
            >
              <Text style={{ padding: 10 }}>Delete Workout?</Text>
              <Button
                style={{
                  width: 220,
                  marginBottom: 20,
                  marginTop: 20,
                  backgroundColor: "#211a23",
                  borderRadius: 15,
                  marginLeft: "auto",
                  marginRight: "auto",
                  height: 40,
                  justifyContent: "center",
                }}
                onPress={() => {
                  setVisible(!visible);
                  handleDeleteWorkout(selectValue);
                }}
                mode="elevated"
                textColor="white"
              >
                Delete
              </Button>
              <Text
                onPress={() => {
                  setVisible(!visible);
                }}
                style={{ textAlign: "center" }}
              >
                Cancel
              </Text>
            </Modal>
          </Portal>

          {/* Share Workout Portal*/}
          <Portal>
            <Modal
              visible={sharableVisible}
              contentContainerStyle={{ backgroundColor: "white", padding: 20 }}
              onDismiss={() => setsharableVisible(!sharableVisible)}
            >
              <Text style={{ padding: 10, fontWeight: "500" }}>
                Share Workout?
              </Text>
              <Button
                style={{
                  width: 220,
                  marginBottom: 20,
                  marginTop: 20,
                  backgroundColor: "#211a23",
                  borderRadius: 15,
                  marginLeft: "auto",
                  marginRight: "auto",
                  height: 40,
                  justifyContent: "center",
                }}
                disabled={sharableIsLoading}
                onPress={() => {
                  dispatch(
                    createSharable({
                      sharable_name: detailInfo.name,
                      created_by: currentUser?.existingUser?._id,
                      regiment_difficulty: "beginner",
                      regiment_id: detailInfo._id,
                    })
                  ).then((val) => {
                    if (val.meta.requestStatus === "fulfilled") {
                      setIsSharable(true);
                      setsharableVisible(!sharableVisible);
                      dispatch(getSingleRegiment(route.params.regimentId));
                      dispatch(getAllTrainingDays(route.params.regimentId));
                    }
                    if (val.meta.requestStatus === "rejected") {
                      alert(
                        "Error! workout could not be shared. Please try again!"
                      );
                    }
                  });
                }}
                mode="elevated"
                textColor="white"
              >
                {sharableIsLoading ? (
                  <ActivityIndicator size="small" color={"white"} />
                ) : (
                  "Sharable"
                )}
              </Button>
              <Text
                onPress={() => {
                  setsharableVisible(!sharableVisible);
                }}
                style={{ textAlign: "center" }}
              >
                Cancel
              </Text>
            </Modal>
          </Portal>
        </View>
      )}
    </>
  );
}
