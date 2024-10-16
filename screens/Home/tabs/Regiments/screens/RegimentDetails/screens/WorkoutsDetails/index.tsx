import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../../../../../../../Loading";
import { Button, TextInput } from "react-native-paper";
import { ISets } from "../../../../../../../../redux/features/interfaces/ISets";
import { RootState } from "../../../../../../../../redux/app/store";

const WorkoutDetails = ({ route }) => {
  const { workouts, isLoading } = useSelector((state: any) => state.workouts);
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const [Data, setData] = useState<ISets>({});

  let workoutsDetails = workouts?.items?.filter(
    (value) => value.id === route.params.wId
  )[0];

  const style = StyleSheet.create({
    setsContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginRight: 10,
    },
  });
  useEffect(() => {
    if (route.params.sets !== undefined || route.params.sets.length > 0)
      console.log("SETs", route.params.sets);
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
    <ScrollView
      style={{
        backgroundColor:
          currentUser.existingUser?.settings?.theme === "dark"
            ? "#171a1d"
            : "#f9fafa",
      }}
    >
      <View
        style={{
          display: "flex",
          flex: 1,
          height: "100%",
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
            width: "100%",
            height: 350,
            margin: 10,
            backgroundColor: "black",
            borderRadius: 10,
          }}
        />

        <Text
          style={{
            fontSize: 20,
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
          {route.params.regimentId !== "" ? (
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                padding: 10,
              }}
            >
              <View style={style.setsContainer}>
                <Text
                  style={{
                    color:
                      currentUser.existingUser?.settings?.theme === "dark"
                        ? "#f9fafa"
                        : "#1d2025",
                  }}
                >
                  Sets:
                </Text>
                <TextInput
                  placeholderTextColor={
                    currentUser.existingUser?.settings?.theme === "dark"
                      ? "#f9fafa"
                      : "#33373d"
                  }
                  style={{
                    marginBottom: 10,
                    marginHorizontal: 5,
                    backgroundColor: "#1d2025",
                    color:
                      currentUser.existingUser?.settings?.theme === "dark"
                        ? "#f9fafa"
                        : "#33373d",
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
                  textColor={
                    currentUser.existingUser?.settings?.theme === "dark"
                      ? "#f9fafa"
                      : "#1d2025"
                  }
                  value={String(Data?.sets)}
                  onChangeText={(e) =>
                    setData((prevState) => ({
                      ...prevState,
                      sets: Number(e),
                    }))
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
                  textColor={
                    currentUser.existingUser?.settings?.theme === "dark"
                      ? "#f9fafa"
                      : "#1d2025"
                  }
                  placeholderTextColor={
                    currentUser.existingUser?.settings?.theme === "dark"
                      ? "#f9fafa"
                      : "#33373d"
                  }
                  style={{
                    marginBottom: 10,
                    marginHorizontal: 5,
                    backgroundColor: "#1d2025",
                    color:
                      currentUser.existingUser?.settings?.theme === "dark"
                        ? "#f9fafa"
                        : "#33373d",
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
                  keyboardType={"number-pad"}
                  value={String(Data.reps)}
                  onChangeText={(e) =>
                    setData((prevState) => ({
                      ...prevState,
                      reps: Number(e),
                    }))
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
                    placeholderTextColor={
                      currentUser.existingUser?.settings?.theme === "dark"
                        ? "#f9fafa"
                        : "#33373d"
                    }
                    style={{
                      marginBottom: 10,
                      marginHorizontal: 5,
                      backgroundColor: "#1d2025",
                      color:
                        currentUser.existingUser?.settings?.theme === "dark"
                          ? "#f9fafa"
                          : "#33373d",
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
                    textColor={
                      currentUser.existingUser?.settings?.theme === "dark"
                        ? "#f9fafa"
                        : "#1d2025"
                    }
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
          ) : null}

          {route.params.regimentId !== "" ? (
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
          ) : null}
        </View>
      </View>
    </ScrollView>
  );
};

export default WorkoutDetails;
