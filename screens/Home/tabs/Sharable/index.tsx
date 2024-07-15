import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  RefreshControl,
  TouchableHighlight,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/app/store";
import { getAllSharable } from "../../../../redux/features/sharables/sharableSlice";
import { Searchbar, Text } from "react-native-paper";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
const Sharable = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: RootState) => state.sharables);
  const [query, setquery] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    dispatch(getAllSharable());
  }, []);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      dispatch(getAllSharable()).then((v) => {
        if (v.meta.requestStatus === "fulfilled") {
          setRefreshing(false);
        }
      });
    }, 2000);
  }, [refreshing]);

  return (
    <SafeAreaView style={style.container}>
      <Text
        style={{
          fontSize: 28,
          width: "100%",
          marginLeft: 50,
          color: "black",
          marginTop: 30,
          fontWeight: "500",
          textAlign: "left",
          marginVertical: 20,
        }}
      >
        Sharable
      </Text>
      <Searchbar
        value={query}
        placeholder="Search Workout"
        onChangeText={setquery}
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
          flexDirection: "row",
          justifyContent: "flex-end",
          width: "100%",
          padding: 20,
        }}
      >
        <FontAwesome
          style={{ paddingHorizontal: 10 }}
          name="sort-amount-asc"
          size={24}
          color="black"
        />
        <FontAwesome name="sort-amount-asc" size={24} color="black" />
      </View>
      {data.length === 0 ? (
        <>
          <Text>Coming Soon!</Text>
        </>
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={{ width: "100%" }}
          contentContainerStyle={{
            justifyContent: "flex-start",
            alignItems: "stretch",
            padding: 10,
            flex: 0.95,

            width: "100%",
          }}
          data={data}
          renderItem={({ item, index, separators }) => (
            <TouchableHighlight
              style={{
                backgroundColor: "#f1f1f1",
                borderWidth: 1,
                borderColor: "#d3d4d5",
                borderRadius: 8,
                padding: 15,
                width: "100%",
                marginBottom: 15,
              }}
              underlayColor="white"
              key={index}
              onPress={() =>
                navigation.navigate("SharableDetails", {
                  sharableId: item._id,
                  item: item,
                  regimentId: item.regiment_id,
                })
              }
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    color: "black",
                    fontWeight: "600",
                    fontSize: 14,
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                  }}
                  variant="labelLarge"
                >
                  {item.sharable_name}
                </Text>
                <Text
                  style={{
                    color: "black",
                    fontWeight: "300",
                    fontSize: 14,
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                  }}
                  variant="labelLarge"
                >
                  By {item.created_by}
                </Text>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 10,
                  }}
                >
                  <Text
                    style={{
                      margin: 5,
                      color: "black",
                      fontWeight: "600",
                      fontSize: 14,
                    }}
                    variant="labelLarge"
                  >
                    <AntDesign name="heart" size={16} color="black" />
                    {item.likes}
                  </Text>
                  <Text
                    style={{
                      margin: 5,
                      color: "black",
                      fontWeight: "600",
                      fontSize: 14,
                    }}
                    variant="labelLarge"
                  >
                    <AntDesign name="download" size={16} color="black" />
                    {item.downloads}
                  </Text>
                  <Text
                    style={{
                      margin: 5,
                      color: "black",
                      fontWeight: "600",
                      fontSize: 14,
                    }}
                    variant="labelLarge"
                  >
                    <FontAwesome name="comments" size={16} color="black" />
                    {item.comments.length}
                  </Text>
                </View>
              </View>
            </TouchableHighlight>
          )}
        />
      )}
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "flex-start",
    backgroundColor: "white",
    alignItems: "center",
  },
});
export default Sharable;
