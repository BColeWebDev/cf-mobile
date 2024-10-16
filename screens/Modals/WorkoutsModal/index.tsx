import { ScrollView, View } from "react-native";
import React, { useState } from "react";
import { Text, Button, Chip } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/app/store";
import { getAllWorkouts } from "../../../redux/features/workouts/workoutSlice";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

/** Filter Workout Modal */
const WorkoutsModal = ({ navigation }) => {
  const { equipments, bodyTargets, muscles } = useSelector(
    (state: RootState) => state.workouts
  );
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const [toggle, settoggle] = useState(true);
  const initialState = {
    equipment: [],
    bodyTarget: [],
    muscle: [],
  };
  const [filters, setfilter] = useState(initialState);
  const dispatch = useDispatch<AppDispatch>();

  const handleAddFilters = (val: string, key: string) => {
    setfilter((prevState) => {
      let arr = prevState[key];
      arr.push(val);
      prevState[key] = [...new Set(arr)];

      return prevState;
    });
  };

  const handleRemoveFilter = (val: string, key: string) => {
    setfilter((prevState) => {
      return {
        ...prevState,
        [key]: prevState[key].filter((v) => v !== val),
      };
    });
  };

  const handleWorkoutFilter = () => {
    let filterArr: string[] = [];

    if (
      filters.bodyTarget.length > 0 ||
      filters.equipment.length > 0 ||
      filters.muscle.length > 0
    ) {
      let filter = Object.keys(filters);

      for (let index = 0; index < filter.length; index++) {
        const element = filter[index];
        filters[element].length > 0
          ? filterArr.push(`${element}=${filters[element].join(",")}`)
          : null;
      }
      filterArr.join("&");
    }

    // Filter workouts
    dispatch(
      getAllWorkouts({
        token: currentUser.userToken,
        page: 1,
        limit: 1500,
        filters:
          filterArr.length > 0 ? `&${filterArr.join("&")}&filters=true` : "",
      })
    );
    //
    // setfilter(initialState);
    navigation.goBack();
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor:
          currentUser.existingUser?.settings?.theme === "dark"
            ? "#171a1d"
            : "#f9fafa",

        padding: 10,
        justifyContent: "space-between",
      }}
    >
      <ScrollView style={{ width: "100%", maxHeight: "90%" }}>
        {<Text>{toggle}</Text>}
        {/* Equipments */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesome5
            name="dumbbell"
            size={16}
            color={
              currentUser.existingUser?.settings?.theme === "dark"
                ? "#f9fafa"
                : "#33373d"
            }
          />
          <Text
            style={{
              fontSize: 18,
              color:
                currentUser.existingUser?.settings?.theme === "dark"
                  ? "#f9fafa"
                  : "#33373d",
              padding: 10,
            }}
          >
            Equipments {filters.equipment.length}
          </Text>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            flex: 1,
            flexWrap: "wrap",
            padding: 3,
          }}
        >
          {equipments.map((val, idx) => (
            <Chip
              style={{
                margin: 5,
                borderColor:
                  currentUser.existingUser?.settings?.theme === "dark"
                    ? "black"
                    : "#f1f1f2",
                backgroundColor:
                  currentUser.existingUser?.settings?.theme === "dark"
                    ? "#1d2025"
                    : "#f1f1f2",
              }}
              selectedColor={
                currentUser.existingUser?.settings?.theme === "dark"
                  ? "#f9fafa"
                  : "#33373d"
              }
              selected={filters.equipment.includes(val) ? true : false}
              onPress={() => {
                if (filters.equipment.includes(val)) {
                  handleRemoveFilter(val, "equipment");
                  settoggle(!toggle);
                } else if (!filters.equipment.includes(val)) {
                  handleAddFilters(val, "equipment");
                  settoggle(!toggle);
                }
              }}
              mode={"outlined"}
              elevated={true}
              key={idx}
              showSelectedOverlay={
                filters.equipment.includes(val) ? true : false
              }
            >
              {val}
            </Chip>
          ))}
        </View>
        {/* Targets */}
        <Text
          style={{
            fontSize: 18,
            color:
              currentUser.existingUser?.settings?.theme === "dark"
                ? "#f9fafa"
                : "#33373d",
            padding: 10,
          }}
        >
          Muscle Targets {filters.bodyTarget.length}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            flex: 1,
            flexWrap: "wrap",
            padding: 3,
          }}
        >
          {bodyTargets.map((val, idx) => (
            <Chip
              style={{
                margin: 5,
                borderColor:
                  currentUser.existingUser?.settings?.theme === "dark"
                    ? "black"
                    : "#f1f1f2",
                backgroundColor:
                  currentUser.existingUser?.settings?.theme === "dark"
                    ? "#1d2025"
                    : "#f1f1f2",
              }}
              selectedColor={
                currentUser.existingUser?.settings?.theme === "dark"
                  ? "#f9fafa"
                  : "#33373d"
              }
              selected={filters.bodyTarget.includes(val) ? true : false}
              onPress={() => {
                if (filters.bodyTarget.includes(val)) {
                  handleRemoveFilter(val, "bodyTarget");
                  settoggle(!toggle);
                } else if (!filters.bodyTarget.includes(val)) {
                  handleAddFilters(val, "bodyTarget");
                  settoggle(!toggle);
                }
              }}
              mode={"outlined"}
              elevated={true}
              key={idx}
              showSelectedOverlay={
                filters.bodyTarget.includes(val) ? true : false
              }
            >
              {val}
            </Chip>
          ))}
        </View>
        {/* Muscle Targets */}
        <Text
          style={{
            fontSize: 18,
            color:
              currentUser.existingUser?.settings?.theme === "dark"
                ? "#f9fafa"
                : "#33373d",
            padding: 10,
          }}
        >
          Muscle Group {filters.muscle.length}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            flex: 1,
            flexWrap: "wrap",
            padding: 3,
          }}
        >
          {muscles?.map((val, idx) => (
            <Chip
              style={{
                margin: 5,
                borderColor:
                  currentUser.existingUser?.settings?.theme === "dark"
                    ? "black"
                    : "#f1f1f2",
                backgroundColor:
                  currentUser.existingUser?.settings?.theme === "dark"
                    ? "#1d2025"
                    : "#f1f1f2",
              }}
              selectedColor={
                currentUser.existingUser?.settings?.theme === "dark"
                  ? "#f9fafa"
                  : "#33373d"
              }
              selected={filters.muscle.includes(val) ? true : false}
              onPress={() => {
                if (filters.muscle.includes(val)) {
                  handleRemoveFilter(val, "muscle");
                  settoggle(!toggle);
                } else if (!filters.muscle.includes(val)) {
                  handleAddFilters(val, "muscle");
                  settoggle(!toggle);
                }
              }}
              mode={"outlined"}
              elevated={true}
              key={idx}
              showSelectedOverlay={filters.muscle.includes(val) ? true : false}
            >
              {val}
            </Chip>
          ))}
        </View>
      </ScrollView>
      <View style={{ padding: 15 }}>
        {filters.bodyTarget.length > 0 ||
        filters.equipment.length > 0 ||
        filters.muscle.length > 0 ? (
          <Button
            mode="elevated"
            buttonColor={
              currentUser.existingUser?.settings?.theme === "dark"
                ? "black"
                : "#f9fafa"
            }
            textColor={
              currentUser.existingUser?.settings?.theme === "dark"
                ? "#f9fafa"
                : "#33373d"
            }
            onPress={() => handleWorkoutFilter()}
            style={{
              width: 110,
              borderRadius: 15,
              height: 40,
              justifyContent: "center",
            }}
          >
            Filter
          </Button>
        ) : null}
      </View>
    </View>
  );
};

export default WorkoutsModal;
