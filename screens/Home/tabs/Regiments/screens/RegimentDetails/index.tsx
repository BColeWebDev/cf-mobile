import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  RefreshControl,
  TouchableHighlight,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import {
  Button,
  Chip,
  List,
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
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import Loading from "../../../../../Loading";
let names = {
  monday: "Mon",
  tuesday: "Tues",
  wednesday: "Wed",
  thursday: "Thurs",
  friday: "Fri",
  saturday: "Sat",
  sunday: "Sun",
};

/* TODO:
Delete Regiment
Delete Workouts
Update Regiment (Name & Description)
Update Workout (Replace)
*/
const Tab = createMaterialTopTabNavigator();

export default function RegimentDetails({ route, navigation }) {
  const isFocused = useIsFocused();

  /* 2. Get the param */
  const dispatch = useDispatch<AppDispatch>();
  const style = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-start",
      padding: 10,
      backgroundColor: "#3D4663",
      alignItems: "center",
      display: "flex",
    },
  });
  const { data, days } = useSelector((state: RootState) => state.trainingDays);
  const { detailInfo } = useSelector((state: any) => state.regiments);
  const { workouts } = useSelector((state: any) => state.workouts);
  const { currentUser } = useSelector((state: RootState) => state.auth);

  const [refreshing, setRefreshing] = React.useState(false);
  const [image, setImage] = useState<any>();
  const [visible, setVisible] = useState(false);
  const [selectValue, setselectValue] = useState();

  const [trainingDayDelete, settrainingDayDelete] = useState(false);

  const onToggleSnackBarDelete = () => settrainingDayDelete(!trainingDayDelete);
  const onDismissTrainingSnackBar = () => settrainingDayDelete(false);

  const fetchImage = async () => {
    try {
      const response = await axios.get(
        `https://muscle-group-image-generator.p.rapidapi.com/getMulticolorImage`,
        {
          headers: {
            "X-RapidAPI-Key":
              "ac819a08e2msh6beaecd882152c1p1188e5jsnf15223ffb4db",
            "X-RapidAPI-Host": "muscle-group-image-generator.p.rapidapi.com",
            "Content-Type": "multipart/form-data",
          },
          params: {
            primaryColor: "255,60,80",
            secondaryColor: "200,30,0",
            primaryMuscleGroups: "all_lower",
            secondaryMuscleGroups: "chest,shoulders",
            transparentBackground: "0",
          },
          responseType: "blob",
        }
      );
      if (Platform.OS === "ios") {
        setImage(URL.createObjectURL(response.data));
      }
      let blob = new Blob([response.data], {
        type: "text/vtt; charset=utf-8",
      });
      const fileReaderInstance = new FileReader();
      fileReaderInstance.readAsDataURL(blob);
      fileReaderInstance.onload = (res) => {
        setImage(fileReaderInstance.result);
      };
    } catch (error) {
      console.error(error);
    }
  };
  // ON LOAD
  useEffect(() => {
    if (route.params.regimentId !== undefined) {
      dispatch(getSingleRegiment(route.params.regimentId));
      dispatch(getAllTrainingDays(route.params.regimentId));
      // fetchImage();
    }
  }, [route]);

  const handleDeleteWorkout = (val) => {
    console.log("val", detailInfo._id, val._id, val.id);
    dispatch(
      deleteWorkout({
        regimentId: detailInfo._id,
        routineId: val._id,
        id: val.id,
      })
    ).then((val) => {
      console.log("Val", val);
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

  const WorkoutTab = ({ name }) => {
    return (
      <View style={style.container}>
        <ScrollView
          style={{ width: "100%", height: "100%" }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {data.routines.length === 0 ? (
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
          ) : (
            data.routines.map((val, idx) => {
              if (val.day === name) {
                return (
                  <View
                    key={idx}
                    style={{ backgroundColor: "white", borderRadius: 10 }}
                  >
                    <TouchableHighlight
                      key={idx}
                      underlayColor={"white"}
                      style={{
                        borderRadius: 8,
                        padding: 10,
                        marginTop: 20,
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
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                          }}
                        >
                          <View
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <Text
                              style={{
                                textTransform: "capitalize",
                                color: "black",
                                fontSize: 15,
                                fontWeight: "500",
                                marginBottom: 10,
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
                          <View
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
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
                              size={24}
                              color="black"
                            />
                            <AntDesign
                              name="delete"
                              size={24}
                              color="black"
                              onPress={() => handleTrainingDays(val)}
                            />
                          </View>
                        </View>

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
                      </View>
                    </TouchableHighlight>

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
                    {/* <Image
                      source={{
                        uri: image,
                      }}
                      style={{
                        width: "100%",
                        height: 180,
                        padding: 10,
                        resizeMode: "contain",
                        marginTop: 10,
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginBottom: 10,
                      }}
                    /> */}

                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                      }}
                    >
                      {val.primaryMuscleGroup.length > 0 &&
                      val.secondaryMuscleGroup > 0 ? (
                        <>
                          <View
                            style={{ marginHorizontal: 20, marginBottom: 10 }}
                          >
                            <Text
                              style={{ marginBottom: 20, textAlign: "center" }}
                            >
                              Primary Muscle Group
                            </Text>
                            {val.primaryMuscleGroup.map((value, key) => (
                              <Text
                                style={{ textAlign: "center", marginBottom: 3 }}
                                key={key}
                              >
                                {value}
                              </Text>
                            ))}
                          </View>

                          <View
                            style={{ marginHorizontal: 20, marginBottom: 10 }}
                          >
                            <Text
                              style={{ marginBottom: 20, textAlign: "center" }}
                            >
                              Secondary Muscle Group
                            </Text>
                            {val.secondaryMuscleGroup.map((value, key) => (
                              <Text
                                style={{ textAlign: "center", marginBottom: 3 }}
                                key={key}
                              >
                                {value}
                              </Text>
                            ))}
                          </View>
                        </>
                      ) : null}
                    </View>

                    <View style={{ marginHorizontal: 20, marginBottom: 70 }}>
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
                                  backgroundColor: "#2e242c",
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
                                        color: "white",
                                        fontWeight: "600",
                                      }}
                                    >
                                      {value.name}
                                    </Text>

                                    <Text
                                      style={{
                                        fontSize: 14,
                                        margin: 10,
                                        color: "white",
                                      }}
                                    >
                                      {value.bodyPart}
                                    </Text>
                                  </View>

                                  <Image
                                    source={{
                                      uri: workouts?.items.filter(
                                        (workout) => workout.id == value.id
                                      )[0].gifUrl,
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

  if (days.length === 0) {
    return (
      <View>
        <View
          style={{
            marginHorizontal: "auto",
            display: "flex",
            padding: 10,
            width: "100%",
            backgroundColor: "#110c11",
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
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                textAlign: "left",
                fontSize: 10,
                fontWeight: "200",
                color: "white",
              }}
            >
              {detailInfo.name}
            </Text>

            <Button
              mode="outlined"
              textColor="white"
              onPress={() =>
                navigation.navigate("Create Workout", detailInfo._id)
              }
              style={{
                padding: 5,
                backgroundColor: "#211a23",
                borderColor: "black",
                marginLeft: "auto",
              }}
              icon={"plus"}
            >
              Create Training Day
            </Button>
          </View>

          <Text style={{ width: "100%", color: "white", textAlign: "left" }}>
            {detailInfo.description}
          </Text>
        </View>
        <Text style={{ textAlign: "center", marginTop: 50 }}>
          No Training Days
        </Text>
      </View>
    );
  }

  return (
    <>
      <View
        style={{
          marginHorizontal: "auto",
          display: "flex",
          padding: 10,
          width: "100%",

          backgroundColor: "#110c11",
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
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              textAlign: "left",
              fontSize: 20,
              fontWeight: "200",
              color: "white",
            }}
          >
            {detailInfo.name}
          </Text>
          <Text style={{ color: "white", textAlign: "left" }}>
            {detailInfo.description}
          </Text>
        </View>
        {days.length === 7 ? null : (
          <Button
            mode="outlined"
            textColor="white"
            onPress={() =>
              navigation.navigate("Create Workout", detailInfo._id)
            }
            style={{
              padding: 5,
              backgroundColor: "#211a23",
              borderColor: "black",
              marginLeft: "auto",
            }}
            icon={"plus"}
          >
            Create Training Day
          </Button>
        )}
      </View>
      {/* Tabs */}
      <Tab.Navigator>
        <Tab.Group>
          {days?.map((val, idx) => (
            <Tab.Screen
              key={idx}
              name={names[val]}
              options={{
                tabBarLabelStyle: {
                  fontSize: 9,
                  fontWeight: "600",
                },
              }}
            >
              {(prop) => <WorkoutTab name={val} />}
            </Tab.Screen>
          ))}
        </Tab.Group>
      </Tab.Navigator>

      <Snackbar
        visible={trainingDayDelete}
        onDismiss={onDismissTrainingSnackBar}
      >
        Removed Training Day
      </Snackbar>

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
    </>
  );
}
