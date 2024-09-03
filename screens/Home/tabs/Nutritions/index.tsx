import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/app/store";
import { Searchbar } from "react-native-paper";
import { useDispatch } from "react-redux";
import { SearchNutrition } from "../../../../redux/features/nutritions/nutritionSlice";

const NutritionScreen = () => {
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const { data } = useSelector((state: RootState) => state.nutritions);
  const [query, setquery] = useState<string>("grape");

  const dispatch = useDispatch<AppDispatch>();

  const style = StyleSheet.create({
    container: {
      height: "100%",
      flex: 1,
      justifyContent: "flex-start",
      backgroundColor:
        currentUser.existingUser?.settings?.theme === "dark"
          ? "#171a1d"
          : "#f9fafa",
      alignItems: "center",
    },
  });

  useEffect(() => {
    dispatch(SearchNutrition(query));
  }, [query]);
  console.log(data);
  return (
    <SafeAreaView style={style.container}>
      <Text
        style={{
          fontSize: 28,
          width: "100%",
          marginLeft: 50,
          color:
            currentUser.existingUser?.settings?.theme === "dark"
              ? "#f9fafa"
              : "#33373d",
          marginTop: 30,
          fontWeight: "500",
          textAlign: "left",
          marginVertical: 20,
        }}
      >
        Nutritions
      </Text>
      <Searchbar
        value={query}
        onChangeText={setquery}
        placeholder="search food"
        style={{
          width: "90%",
          color: "black",
          backgroundColor: "#f1f1f2",
          margin: 20,
        }}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          marginBottom: 20,
          backgroundColor:
            currentUser.existingUser?.settings?.theme === "dark"
              ? "#33373d"
              : "#f1f1f2",
          borderRadius: 10,
          padding: 10,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 20,
          width: "100%",
        }}
      >
        <FlatList
          data={data}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: 20,
                  backgroundColor:
                    currentUser.existingUser?.settings?.theme === "dark"
                      ? "#33373d"
                      : "#f1f1f2",
                  borderRadius: 10,
                  padding: 1,
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  width: "100%",
                }}
              >
                <View>
                  <Text
                    style={{
                      width: "100%",
                      fontSize: 22,
                      color:
                        currentUser.existingUser?.settings?.theme === "dark"
                          ? "#f9fafa"
                          : "#33373d",
                      textTransform: "capitalize",
                    }}
                  >
                    {item.food_name}
                  </Text>
                  <Text
                    style={{
                      width: "100%",
                      fontSize: 18,
                      color: "green",
                      textTransform: "capitalize",
                    }}
                  >
                    {Math.floor(item.nf_calories)}
                  </Text>
                </View>

                <Image
                  source={{ uri: item.photo.thumb }}
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
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default NutritionScreen;
