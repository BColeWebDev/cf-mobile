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
  const { currentUser } = useSelector((state: RootState) => state.auth);

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
    <SafeAreaView style={style.container}>
      <Searchbar
        value={query}
        iconColor={
          currentUser.existingUser?.settings?.theme === "dark"
            ? "#f9fafa"
            : "#33373d"
        }
        placeholderTextColor={
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
          marginBottom: 10,
          marginHorizontal: 20,
          backgroundColor:
            currentUser.existingUser?.settings?.theme === "dark"
              ? "#1d2025"
              : "#f1f1f2",
          color:
            currentUser.existingUser?.settings?.theme === "dark"
              ? "white"
              : "#33373d",
          width: "90%",
        }}
        selectionColor={
          currentUser.existingUser?.settings?.theme === "dark"
            ? "#f9fafa"
            : "#33373d"
        }
        cursorColor={
          currentUser.existingUser?.settings?.theme === "dark"
            ? "#f9fafa"
            : "#33373d"
        }
        placeholder="Search Workout"
        onChangeText={setquery}
      />

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
          renderItem={({ item, index }) => (
            <TouchableHighlight
              style={{
                backgroundColor:
                  currentUser.existingUser?.settings?.theme === "dark"
                    ? "#33373d"
                    : "#f1f1f2",
                borderColor:
                  currentUser.existingUser?.settings?.theme === "dark"
                    ? "black"
                    : "#f9fafa",
                borderWidth:
                  currentUser.existingUser?.settings?.theme === "dark" ? 0 : 2,
                borderRadius: 10,
                padding: 15,
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
                    color:
                      currentUser.existingUser?.settings?.theme === "dark"
                        ? "#f9fafa"
                        : "#33373d",
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
                    color:
                      currentUser.existingUser?.settings?.theme === "dark"
                        ? "#f9fafa"
                        : "#33373d",
                    fontWeight: "300",
                    fontSize: 14,
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                  }}
                  variant="labelLarge"
                >
                  By {item.created_by}
                </Text>

                {/* <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 10,
                  }}
                >
                  <AntDesign
                    name="heart"
                    size={16}
                    style={{ marginRight: 10 }}
                    color={
                      currentUser.existingUser?.settings?.theme === "dark"
                        ? "#f9fafa"
                        : "#33373d"
                    }
                  />
                  <Text
                    style={{
                      margin: 5,
                      color: "black",
                      fontWeight: "600",
                      fontSize: 14,
                    }}
                    variant="labelLarge"
                  >
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
                </View> */}
              </View>
            </TouchableHighlight>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default Sharable;
