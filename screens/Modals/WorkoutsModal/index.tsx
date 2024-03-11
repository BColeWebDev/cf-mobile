import { ScrollView, View } from "react-native";
import React, { useState } from "react";
import { Text, Button, Chip } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/app/store";
import { getAllTrainingDays } from "../../../redux/features/trainingDays/trainingDaysSlice";
import {
  getAllBodyTargets,
  getAllEquipment,
  getAllMuscleTargets,
  getAllWorkouts,
} from "../../../redux/features/workouts/workoutSlice";

const WorkoutsModal = ({ navigation }) => {
  const { workouts, isLoading, equipments, bodyTargets, muscles } = useSelector(
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
        [key]: prevState.muscle.filter((v) => v !== val),
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
      console.log("filter", filter.length);
      for (let index = 0; index < filter.length; index++) {
        const element = filter[index];
        console.log("element", element);
        filters[element].length > 0
          ? filterArr.push(`${element}=${filters[element].join(",")}`)
          : null;
      }
      filterArr.join("&");
    }
    console.log("filterArr", filterArr);
    dispatch(
      getAllWorkouts({
        token: currentUser.userToken,
        page: 1,
        limit: 10,
        filters:
          filterArr.length > 0 ? `&${filterArr.join("&")}&filters=true` : "",
      })
    );
    setfilter(initialState);
    navigation.goBack();
  };

  return (
    <View
      style={{ flex: 1, alignItems: "center", justifyContent: "space-between" }}
    >
      <View
        style={{
          display: "flex",
          backgroundColor: "gray",
          flexDirection: "row-reverse",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: 10,
        }}
      >
        <Button
          mode="elevated"
          buttonColor="black"
          textColor="white"
          onPress={() => navigation.goBack()}
          style={{
            width: 110,
            borderRadius: 15,
            height: 40,
            justifyContent: "center",
          }}
        >
          Close
        </Button>
        <Text style={{ fontSize: 30, color: "white", fontWeight: "600" }}>
          Filters
        </Text>
      </View>

      <ScrollView style={{ width: "100%", maxHeight: "90%" }}>
        {<Text>{toggle}</Text>}
        {/* Equipments */}
        <Text style={{ fontSize: 18, color: "black", padding: 10 }}>
          Equipments {filters.equipment.length}
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
          {equipments.map((val, idx) => (
            <Chip
              style={{ margin: 5, borderColor: "black" }}
              selectedColor="black"
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
        <Text style={{ fontSize: 18, color: "black", padding: 10 }}>
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
              style={{ margin: 5, borderColor: "black" }}
              selectedColor="black"
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
        <Text style={{ fontSize: 18, color: "black", padding: 10 }}>
          Muscle Targets {filters.muscle.length}
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
              style={{ margin: 5, borderColor: "black" }}
              selectedColor="black"
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
        <Button
          mode="elevated"
          buttonColor="black"
          textColor="white"
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
      </View>
    </View>
  );
};

export default WorkoutsModal;
