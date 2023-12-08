import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  RefreshControl,
  TouchableHighlight,
} from "react-native";
import React, { useEffect, useCallback } from "react";
import { Button, Chip } from "react-native-paper";

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

      alignItems: "center",
      display: "flex",
    },
  });
  const { data, days, isLoading, isSuccess } = useSelector(
    (state: RootState) => state.trainingDays
  );
  const { detailInfo } = useSelector((state: any) => state.regiments);

  const dispatch = useDispatch<AppDispatch>();

  const [refreshing, setRefreshing] = React.useState(false);
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

  const ProfileScreen = ({ name }) => {
    console.log("name", name);
    return (
      <View style={style.container}>
        <ScrollView
          style={{ width: "100%" }}
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
                  <View>
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
                        borderColor: "#e5daf8",
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
                          <Chip mode={"flat"} selectedColor="purple">
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
                    <View style={{ marginLeft: 20 }}>
                      <Text
                        style={{
                          textTransform: "capitalize",
                          color: "black",
                          fontSize: 25,
                          fontWeight: "500",
                          marginBottom: 20,
                        }}
                      >
                        Workouts
                      </Text>
                      {val.workouts.map((value, idx) => (
                        <View
                          key={idx}
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",

                            justifyContent: "flex-start",
                          }}
                        >
                          <Text> {value.bodyPart}</Text>
                          <Text>{value.name}</Text>
                          <Text>{value.equipment}</Text>
                          <Text>{value.muscle_target}</Text>
                          <Image
                            source={{ uri: value.gifUrl }}
                            style={{
                              width: 60,
                              height: 60,
                              borderRadius: 50,
                            }}
                          />
                        </View>
                      ))}
                    </View>
                    <Button
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
    }, 2000);
  }, [refreshing]);
  return days.length === 0 ? null : (
    <>
      <View
        style={{
          marginHorizontal: "auto",
          display: "flex",
          padding: 10,
          width: "100%",
          backgroundColor: "#4f1d9e",
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
              backgroundColor: "#6023c0",
              borderColor: "#e5daf8",
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
            <Tab.Screen key={idx} name={val}>
              {(prop) => <ProfileScreen name={val} />}
            </Tab.Screen>
          ))}
        </Tab.Group>
      </Tab.Navigator>
    </>
  );
}
