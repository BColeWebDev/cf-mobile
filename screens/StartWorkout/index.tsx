import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/app/store";
import { IRoutine } from "../../redux/features/interfaces/IRoutine";

const StartWorkout = ({ route }) => {
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const [timer, settimer] = useState<number>(0);
  const { workouts } = useSelector((state: any) => state.workouts);

  const style = StyleSheet.create({
    container: {
      height: "100%",
      backgroundColor:
        currentUser.existingUser?.settings?.theme === "dark"
          ? "#171a1d"
          : "#f9fafa",
      alignItems: "center",
      padding: 10,
      justifyContent: "flex-start",
    },
  });

  return (
    <View style={style.container}>
      {route.params.workouts.map((value, idx) => {
        return (
          <View
            id={idx}
            style={{
              width: "95%",
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: 30,
            }}
          >
            <View>
              <Text
                style={{
                  color:
                    currentUser.existingUser?.settings?.theme === "dark"
                      ? "#f9fafa"
                      : "#33373d",
                  textAlign: "left",
                  fontSize: 24,
                  marginBottom: 15,
                }}
              >
                {value.name}
              </Text>
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

            {value.sets.map((val) => {
              return (
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      marginRight: 10,
                      color:
                        currentUser.existingUser?.settings?.theme === "dark"
                          ? "#f9fafa"
                          : "#33373d",
                    }}
                  >
                    Sets {val.sets}
                  </Text>
                  <Text
                    style={{
                      marginRight: 10,
                      color:
                        currentUser.existingUser?.settings?.theme === "dark"
                          ? "#f9fafa"
                          : "#33373d",
                    }}
                  >
                    Reps {val.reps}
                  </Text>
                  <Text
                    style={{
                      marginRight: 10,
                      color:
                        currentUser.existingUser?.settings?.theme === "dark"
                          ? "#f9fafa"
                          : "#33373d",
                    }}
                  >
                    Weight {val.weight}
                  </Text>
                </View>
              );
            })}
          </View>
        );
      })}
    </View>
  );
};

export default StartWorkout;
