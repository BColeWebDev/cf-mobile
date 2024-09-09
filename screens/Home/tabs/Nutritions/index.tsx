import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
  TouchableHighlight,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/app/store";
import { Searchbar, SegmentedButtons } from "react-native-paper";
import { useDispatch } from "react-redux";
import {
  SearchNutrition,
  SearchNutritionInstant,
} from "../../../../redux/features/nutritions/nutritionSlice";

const NutritionScreen = ({ navigation }) => {
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const { data } = useSelector((state: RootState) => state.nutritions);
  const [query, setquery] = useState<string>("grape");
  const [value, setValue] = useState<string>("common");
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
    dispatch(SearchNutritionInstant(query));
  }, [query]);
  console.log("DATA", data);
  return (
    <SafeAreaView style={style.container}>
      <Text
        style={{
          fontSize: 19,
          width: "100%",
          marginLeft: 50,
          color:
            currentUser.existingUser?.settings?.theme === "dark"
              ? "#f9fafa"
              : "#33373d",
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
        placeholderTextColor={
          currentUser.existingUser?.settings?.theme === "dark"
            ? "#f9fafa"
            : "#33373d"
        }
        iconColor={
          currentUser.existingUser?.settings?.theme === "dark"
            ? "#f9fafa"
            : "#33373d"
        }
        inputStyle={{
          color:
            currentUser.existingUser?.settings?.theme === "dark"
              ? "#f9fafa"
              : "#33373d",
        }}
        style={{
          width: "90%",
          color:
            currentUser.existingUser?.settings?.theme === "dark"
              ? "#f9fafa"
              : "#33373d",
          backgroundColor: "#33373d",
          marginBottom: 15,
        }}
      />

      {/* Nutrition Filters */}
      <SegmentedButtons
        style={{ width: "60%", marginVertical: 10 }}
        value={value}
        onValueChange={setValue}
        buttons={[
          {
            value: "common",
            label: "Commons",
            labelStyle: {
              color: "white",
            },
            style: {
              backgroundColor: value === "common" ? "black" : "#33373d",
              borderColor: "#171a1d",
            },
          },
          {
            value: "brand",
            label: "Brands",
            labelStyle: {
              color: "white",
            },
            style: {
              borderColor: "#171a1d",
              backgroundColor: value === "brand" ? "black" : "#33373d",
            },
          },
        ]}
      />
      {/* Branded Foods */}
      {value === "brand" ? (
        <ScrollView
          style={{ width: "100%" }}
          contentContainerStyle={{ paddingBottom: 50 }}
        >
          <View style={{ width: "100%", padding: 10 }}>
            {data.branded.length === 0 ? (
              <View style={{ height: 200 }}>
                <Text
                  style={{
                    flex: 1,
                    marginTop: 100,
                    fontWeight: "700",
                    textAlign: "center",
                    fontSize: 35,
                    color:
                      currentUser.existingUser?.settings?.theme === "dark"
                        ? "#f9fafa"
                        : "#1d2025",
                  }}
                >
                  No Data
                </Text>
              </View>
            ) : (
              data.branded.map((item, idx) => (
                <TouchableHighlight
                  onLongPress={() => {}}
                  key={idx}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: 5,
                    backgroundColor:
                      currentUser.existingUser?.settings?.theme === "dark"
                        ? "#33373d"
                        : "#f1f1f2",
                    borderRadius: 10,
                    padding: 10,
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  onPress={() => {
                    navigation.navigate("NutritionDetails", {
                      name: item.food_name,
                      data: item,
                    });
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "80%",
                    }}
                  >
                    <Text
                      style={{
                        width: "100%",
                        fontSize: 14,
                        color:
                          currentUser.existingUser?.settings?.theme === "dark"
                            ? "#f9fafa"
                            : "#33373d",
                        textTransform: "capitalize",
                      }}
                    >
                      {item.food_name}
                    </Text>
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
                </TouchableHighlight>
              ))
            )}
          </View>
        </ScrollView>
      ) : null}

      {/* Common Foods */}
      {value === "common" ? (
        <ScrollView
          style={{ width: "100%" }}
          contentContainerStyle={{ paddingBottom: 50 }}
        >
          <View style={{ width: "100%", padding: 10 }}>
            {data.branded.length === 0 ? (
              <View style={{ height: 200 }}>
                <Text
                  style={{
                    flex: 1,
                    marginTop: 100,
                    fontWeight: "700",
                    textAlign: "center",
                    fontSize: 35,
                    color:
                      currentUser.existingUser?.settings?.theme === "dark"
                        ? "#f9fafa"
                        : "#1d2025",
                  }}
                >
                  No Data
                </Text>
              </View>
            ) : (
              data.common.map((item, idx) => (
                <TouchableHighlight
                  onLongPress={() => {}}
                  key={idx}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: 5,
                    backgroundColor:
                      currentUser.existingUser?.settings?.theme === "dark"
                        ? "#33373d"
                        : "#f1f1f2",
                    borderRadius: 10,
                    padding: 10,
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  onPress={() => {
                    navigation.navigate("NutritionDetails", {
                      name: item.food_name,
                      data: item,
                    });
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "80%",
                    }}
                  >
                    <Text
                      style={{
                        width: "100%",
                        fontSize: 14,
                        color:
                          currentUser.existingUser?.settings?.theme === "dark"
                            ? "#f9fafa"
                            : "#33373d",
                        textTransform: "capitalize",
                      }}
                    >
                      {item.food_name}
                    </Text>
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
                </TouchableHighlight>
              ))
            )}
          </View>
        </ScrollView>
      ) : null}
    </SafeAreaView>
  );
};

export default NutritionScreen;
