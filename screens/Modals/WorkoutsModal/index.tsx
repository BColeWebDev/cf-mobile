import { ScrollView, View } from "react-native";
import React from "react";
import { Text, Button } from "react-native-paper";
import { useSelector } from "react-redux";

const WorkoutsModal = ({ navigation }) => {
  const { workouts, isLoading, equipments, bodyTargets, muscles } = useSelector(
    (state: any) => state.workouts
  );
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

      <ScrollView style={{ width: "90%", padding: 30 }}>
        {equipments.map((val, idx) => (
          <Text
            style={{
              marginBottom: 10,
              fontWeight: "600",
              textTransform: "capitalize",
            }}
            key={idx}
          >
            {val}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
};

export default WorkoutsModal;
