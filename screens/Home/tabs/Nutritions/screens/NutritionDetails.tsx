import { View, Text, Image, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../redux/app/store";
import { useDispatch } from "react-redux";
import { SearchNutrition } from "../../../../../redux/features/nutritions/nutritionSlice";

export default function NutritionDetails({ route }) {
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const { details } = useSelector((state: RootState) => state.nutritions);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (route.params.data.tag_name !== "") {
      dispatch(SearchNutrition(route.params.data.tag_name));
    }
  }, [route.params.data]);

  console.log("details", details);
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor:
          currentUser.existingUser?.settings?.theme === "dark"
            ? "#171a1d"
            : "#f9fafa",
        padding: 10,
      }}
    >
      <Image
        source={{ uri: route.params.data.photo.thumb }}
        style={{
          width: "100%",
          height: 220,
          backgroundColor: "black",
          borderRadius: 10,
        }}
      />
      <Text>{JSON.stringify(route.params.data)}</Text>

      <Text>{JSON.stringify(details)}</Text>
    </ScrollView>
  );
}
