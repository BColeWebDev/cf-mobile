import React from "react";

import { View, Text, ScrollView, RefreshControl } from "react-native";

const WorkoutTab = ({ name, style, refreshing, onRefresh }) => {
  return (
    <View style={style.container}>
      <ScrollView
        style={{ width: "100%", height: "100%" }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      ></ScrollView>
    </View>
  );
};

export default WorkoutTab;
