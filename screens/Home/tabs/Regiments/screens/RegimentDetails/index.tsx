import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  RefreshControl,
  TouchableHighlight,
  Platform,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { Button, Chip, Snackbar } from "react-native-paper";

import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../../../redux/app/store";
import { useSelector } from "react-redux";
import {
  getAllTrainingDays,
  deleteTrainingDays,
} from "../../../../../../redux/features/trainingDays/trainingDaysSlice";
import { getSingleRegiment } from "../../../../../../redux/features/regiments/regimentsSlice";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TrainingDayScreens from "./screens/TrainingDayScreens";
import { deleteWorkout } from "../../../../../../redux/features/workouts/workoutSlice";
import axios from "axios";
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
  /* 2. Get the param */

  const style = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-start",
      padding:10,
      backgroundColor:"#3D4663",
      alignItems: "center",
      display: "flex",
    },
  });
  const {
    data,
    days,
    isLoading,
    primaryMuscleGroup,
    secondaryMuscleGroup,
    isSuccess,
  } = useSelector((state: RootState) => state.trainingDays);
  const { detailInfo } = useSelector((state: any) => state.regiments);

  const dispatch = useDispatch<AppDispatch>();

  const [refreshing, setRefreshing] = React.useState(false);
  const [image, setImage] = useState<any>();
  const [visible, setVisible] = useState(false);
  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);
  const fetchImage = async () => {
    [
      "all",
      "all_lower",
      "all_upper",
      "abductors",
      "abs",
      "adductors",
      "back",
      "back_lower",
      "back_upper",
      "biceps",
      "calfs",
      "chest",
      "core",
      "core_lower",
      "core_upper",
      "forearms",
      "gluteus",
      "hamstring",
      "hands",
      "latissimus",
      "legs",
      "neck",
      "quadriceps",
      "shoulders",
      "shoulders_back",
      "shoulders_front",
      "triceps",
    ];
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
            primaryMuscleGroups: "legs",
            secondaryMuscleGroups: "triceps,shoulders",
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
    if (route.params !== undefined) {
      dispatch(getSingleRegiment(route.params));
      dispatch(getAllTrainingDays(route.params));
    }
    if (route.params.regimentId !== undefined) {
      dispatch(getSingleRegiment(route.params.regimentId));
      dispatch(getAllTrainingDays(route.params.regimentId));
    }
  }, [route]);

  // useEffect(() => {
  //   fetchImage();
  // }, []);
  const ProfileScreen = ({ name }) => {
    return (
      <View style={style.container}>
        <ScrollView
          style={{ width: "100%", height:"100%"}}
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
                  <View key={idx} style={{ backgroundColor: "white", borderRadius:10 }}>
                    {/* <Image
                      source={{ uri: image }}
                      style={{
                        width: 200,
                        height: 180,
                        marginTop: 35,
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                    /> */}

                    <TouchableHighlight
                      onPress={() => {
                        navigation.navigate("Create Workout", {
                          val,
                          index: idx,
                          regimentId: detailInfo._id,
                        });
                      }}
                      onLongPress={() => {
                        dispatch(
                          deleteTrainingDays({
                            routineId: val._id,
                            regimentId: detailInfo._id,
                          })
                        ).then((val) => {
                          if (val.meta.requestStatus === "fulfilled") {
                            dispatch(getAllTrainingDays(detailInfo._id));
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
                        borderRadius: 8,
                        padding: 10,
                        marginTop: 20,
                        width: "95%",
                        borderColor: "#211a23",
                        borderWidth: 1,
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
                            alignItems: "flex-end",
                          }}
                        >
                          <Text
                            style={{
                              textTransform: "capitalize",
                              color: "black",
                              fontSize: 15,
                              fontWeight: "500",
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

                    <View style={{ marginHorizontal: 20, marginBottom: 70 }}>
                      {val.workouts.map((value, idx) => (
                        <TouchableHighlight
                          key={idx}
                          onPress={() =>
                            navigation.navigate("WorkoutsDetails", {
                              workoutId: value.id,
                            })
                          }
                          onLongPress={() =>
                            dispatch(
                              deleteWorkout({
                                regimentId: detailInfo._id,
                                routineId: val._id,
                                id: value.id,
                              })
                            ).then((val) => {
                              if (val.meta.requestStatus === "fulfilled") {
                                if (route.params !== undefined) {
                                  dispatch(getSingleRegiment(route.params));
                                  dispatch(getAllTrainingDays(route.params));
                                }
                                if (route.params.regimentId !== undefined) {
                                  dispatch(
                                    getSingleRegiment(route.params.regimentId)
                                  );
                                  dispatch(
                                    getAllTrainingDays(route.params.regimentId)
                                  );
                                }
                              }
                            })
                          }
                        >
                          <View
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "space-between",
                              marginHorizontal: 10,
                              padding: 0,

                              backgroundColor: "#2e242c",
                              borderRadius: 15,
                              marginBottom: 10,
                            }}
                          >
                            <View
                              style={{
                                display: "flex",
                                flexDirection: "column",

                                marginLeft: 10,
                                padding: 10,
                              }}
                            >
                              <View>
                                <Text
                                  style={{
                                    fontSize: 20,
                                    color: "white",
                                    fontWeight: "600",
                                  }}
                                >
                                  {value.name}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: 20,
                                    color: "white",
                                  }}
                                >
                                  {" "}
                                  {value.bodyPart}
                                </Text>
                              </View>

                              <View>
                                <Text
                                  style={{
                                    color: "white",
                                  }}
                                >
                                  {value.equipment}
                                </Text>
                                <Text
                                  style={{
                                    color: "white",
                                  }}
                                >
                                  {value.muscle_target}
                                </Text>
                              </View>
                            </View>
                            {/* TODO: Displaying Image */}
                          </View>
                        </TouchableHighlight>
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
          console.log(val);
          setRefreshing(false);
        }
      });
      fetchImage();
    }, 2000);
  }, [refreshing]);

  if(days.length ===0){
    return   <View>
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
            fontSize: 30,
            fontWeight: "600",
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
  }



  return  <>
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
              fontSize: 30,
              fontWeight: "600",
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

      <Tab.Navigator>
        <Tab.Group>
          {days?.map((val, idx) => (
            <Tab.Screen  key={idx} name={names[val]}>
              {(prop) => <ProfileScreen name={val} />}
            </Tab.Screen>
          ))}
        </Tab.Group>
      </Tab.Navigator>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: "Undo",
          onPress: () => {
            // Do something
          },
        }}
      >
        Hey there! I'm a Snackbar.
      </Snackbar>
    </>
  
}
