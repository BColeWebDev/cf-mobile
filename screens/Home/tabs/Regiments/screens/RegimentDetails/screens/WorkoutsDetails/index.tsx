import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../../../../redux/app/store";
import { updateWorkout } from "../../../../../../../../redux/features/workouts/workoutSlice";
import Loading from "../../../../../../../Loading";
import { Button, TextInput } from "react-native-paper";
import { ISets } from "../../../../../../../../redux/features/interfaces/ISets";

const WorkoutDetails = ({ route, navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { workouts, isLoading } = useSelector((state: any) => state.workouts);
  const { currentUser } = useSelector((state: any) => state.auth);
  const [Data, setData] = useState<ISets>({});

  let workoutsDetails = workouts?.items?.filter(
    (value) => value.id === route.params.wId
  )[0];
  console.log("workoutDetails", Data);

  const style = StyleSheet.create({
    setsContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10,

      marginHorizontal: 30,
    },
  });
  useEffect(() => {
    if (route.params.sets !== undefined || route.params.sets.length > 0)
      setData(route.params.sets[0]);
  }, [route.params.sets]);

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

  const handleUpdateWorkout = () => {
    route.params.action({
      sets: Data,
    });
  };

  return (
    <ScrollView>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor:
            currentUser.existingUser?.settings?.theme === "dark"
              ? "#171a1d"
              : "#f9fafa",
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
        <Text
          style={{
            color:
              currentUser.existingUser?.settings?.theme === "dark"
                ? "#f9fafa"
                : "#1d2025",
            marginTop: 30,
          }}
        >
          {workoutsDetails?.name}
        </Text>
        <Text
          style={{
            color:
              currentUser.existingUser?.settings?.theme === "dark"
                ? "#f9fafa"
                : "#1d2025",
            marginTop: 30,
          }}
        >
          {workoutsDetails?.bodyPart}
        </Text>
        <View style={{ marginVertical: 20, marginHorizontal: 10 }}>
          <Text
            style={{
              fontSize: 18,
              marginBottom: 10,
              fontWeight: "600",
              color:
                currentUser.existingUser?.settings?.theme === "dark"
                  ? "#f9fafa"
                  : "#1d2025",
            }}
          >
            Instructions
          </Text>
          {workoutsDetails?.instructions.map((val, idx) => (
            <Text
              style={{
                marginVertical: 5,
                color:
                  currentUser.existingUser?.settings?.theme === "dark"
                    ? "#f9fafa"
                    : "#1d2025",
              }}
              key={idx}
            >
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
              color:
                currentUser.existingUser?.settings?.theme === "dark"
                  ? "#f9fafa"
                  : "#1d2025",
            }}
          >
            Secondary Muscles
          </Text>
          {workoutsDetails?.secondaryMuscles.map((val, idx) => (
            <Text
              style={{
                marginVertical: 5,
                marginHorizontal: 10,
                color:
                  currentUser.existingUser?.settings?.theme === "dark"
                    ? "#f9fafa"
                    : "#1d2025",
              }}
              key={idx}
            >
              {`${idx + 1}.)`}
              {val}
            </Text>
          ))}

          {/* Sets, Reps & Weights/Kg */}
          <View>
            <View style={style.setsContainer}>
              <Text
                style={{
                  color:
                    currentUser.existingUser?.settings?.theme === "dark"
                      ? "#f9fafa"
                      : "#1d2025",
                }}
              >
                Sets:{" "}
              </Text>
              <TextInput
                textColor="black"
                mode={"outlined"}
                style={{ marginHorizontal: 20, backgroundColor: "white" }}
                selectionColor={"black"}
                cursorColor={"#F9C000"}
                value={String(Data?.sets)}
                onChangeText={(e) =>
                  setData((prevState) => ({ ...prevState, sets: Number(e) }))
                }
                keyboardType={"number-pad"}
              />
            </View>
            <View style={style.setsContainer}>
              <Text
                style={{
                  color:
                    currentUser.existingUser?.settings?.theme === "dark"
                      ? "#f9fafa"
                      : "#1d2025",
                }}
              >
                Reps:{" "}
              </Text>
              <TextInput
                textColor="black"
                mode={"outlined"}
                style={{ marginHorizontal: 20, backgroundColor: "white" }}
                selectionColor={"black"}
                cursorColor={"#F9C000"}
                value={String(Data?.reps)}
                keyboardType={"number-pad"}
                onChangeText={(e) =>
                  setData((prevState) => ({ ...prevState, reps: Number(e) }))
                }
              />
            </View>
            <View style={style.setsContainer}>
              <Text
                style={{
                  color:
                    currentUser.existingUser?.settings?.theme === "dark"
                      ? "#f9fafa"
                      : "#1d2025",
                }}
              >
                Weight:{" "}
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  alignItems: "center",
                }}
              >
                {/* KG or Ibs depending on user setting */}
                <TextInput
                  textColor="black"
                  mode={"outlined"}
                  style={{ marginHorizontal: 20, backgroundColor: "white" }}
                  selectionColor={"black"}
                  cursorColor={"#F9C000"}
                  textAlign="center"
                  value={String(Data?.weight)}
                  onChangeText={(e) =>
                    setData((prevState) => ({
                      ...prevState,
                      weight: Number(e),
                    }))
                  }
                  keyboardType={"number-pad"}
                />
                <Text
                  style={{
                    color:
                      currentUser.existingUser?.settings?.theme === "dark"
                        ? "#f9fafa"
                        : "#1d2025",
                  }}
                >
                  {currentUser?.existingUser?.settings.weight}
                </Text>
              </View>
            </View>
          </View>
        </View>

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
          onPress={() => handleUpdateWorkout()}
        >
          {route.params.btnName}
        </Button>
      </View>
    </ScrollView>
  );
};

export default WorkoutDetails;
