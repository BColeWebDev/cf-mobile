import { ScrollView, View } from "react-native";
import React, { useState } from "react";
import { Text, Button, Chip } from "react-native-paper";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/app/store";

const WorkoutsModal = ({ navigation }) => {
  const { workouts, isLoading, equipments, bodyTargets, muscles } = useSelector(
    (state: RootState) => state.workouts
  );
  const [toggle, settoggle] = useState(true);

  const [filters, setfilter] = useState({
    equipments: [],
    bodyTargets: [],
    muscles: [],
  });

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
        [key]: prevState.muscles.filter((v) => v !== val),
      };
    });
  };

  console.log("fill", filters);
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
          Equipments {filters.equipments.length}
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
              selected={filters.equipments.includes(val) ? true : false}
              onPress={() => {
                if (filters.equipments.includes(val)) {
                  handleRemoveFilter(val, "equipments");
                  settoggle(!toggle);
                } else if (!filters.equipments.includes(val)) {
                  handleAddFilters(val, "equipments");
                  settoggle(!toggle);
                }
              }}
              mode={"outlined"}
              elevated={true}
              key={idx}
              showSelectedOverlay={
                filters.equipments.includes(val) ? true : false
              }
            >
              {val}
            </Chip>
          ))}
        </View>
        {/* Targets */}
        <Text style={{ fontSize: 18, color: "black", padding: 10 }}>
          Muscle Targets {filters.bodyTargets.length}
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
              selected={filters.bodyTargets.includes(val) ? true : false}
              onPress={() => {
                if (filters.bodyTargets.includes(val)) {
                  handleRemoveFilter(val, "bodyTargets");
                  settoggle(!toggle);
                } else if (!filters.bodyTargets.includes(val)) {
                  handleAddFilters(val, "bodyTargets");
                  settoggle(!toggle);
                }
              }}
              mode={"outlined"}
              elevated={true}
              key={idx}
              showSelectedOverlay={
                filters.bodyTargets.includes(val) ? true : false
              }
            >
              {val}
            </Chip>
          ))}
        </View>
        {/* Muscle Targets */}
        <Text style={{ fontSize: 18, color: "black", padding: 10 }}>
          Muscle Targets {filters.muscles.length}
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
              selected={filters.muscles.includes(val) ? true : false}
              onPress={() => {
                if (filters.muscles.includes(val)) {
                  handleRemoveFilter(val, "muscles");
                  settoggle(!toggle);
                } else if (!filters.muscles.includes(val)) {
                  handleAddFilters(val, "muscles");
                  settoggle(!toggle);
                }
              }}
              mode={"outlined"}
              elevated={true}
              key={idx}
              showSelectedOverlay={filters.muscles.includes(val) ? true : false}
            >
              {val}
            </Chip>
          ))}
        </View>
      </ScrollView>
      <View style={{ padding: 15 }}></View>
    </View>
  );
};

export default WorkoutsModal;
