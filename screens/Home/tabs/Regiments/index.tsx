import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Badge, Surface, FAB, Banner } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/app/store";
import { getRegiments } from "../../../../redux/features/regiments/regimentsSlice";
import { useSelector } from "react-redux";

const RegimentScreen = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: any) => state.regiments);
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const [refreshing, setRefreshing] = React.useState(false);
  const [visible, setVisible] = React.useState(true);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      dispatch(getRegiments(currentUser?.existingUser?._id)).then((val) => {
        if (val.meta.requestStatus === "fulfilled") {
          setRefreshing(false);
        }
        if (val.meta.requestStatus === "rejected") {
          console.log("val", val);
        }
      });
    }, 2000);
  }, [refreshing]);

  const style = StyleSheet.create({
    container: {
      flex: 1,
      padding: 3,
      justifyContent: "flex-start",
      backgroundColor: "#f9f6fd",
      alignItems: "center",
      display: "flex",
    },
  });
  console.log("data", data);
  useEffect(() => {
    if (currentUser !== undefined) {
      dispatch(getRegiments(currentUser?.existingUser?._id)).then((val) => {
        if (val.meta.requestStatus === "fulfilled") {
          console.log("val", val);
        }
        if (val.meta.requestStatus === "rejected") {
          console.log("val", val);
        }
      });
    }
  }, [currentUser]);

  return (
    <SafeAreaView style={style.container}>
      <ScrollView
        style={{ width: "100%" }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text
          style={{
            fontSize: 28,
            color: "black",
            marginTop: 30,
            fontWeight: "500",
            marginVertical: 20,
          }}
        >
          Regiments
        </Text>
        <Button
          mode="outlined"
          textColor="white"
          onPress={() => navigation.navigate("Create Regiment")}
          style={{
            marginVertical: 25,
            width: 180,
            padding: 5,
            backgroundColor: "#4f1d9e",
            borderColor: "#6023c0",
            marginLeft: "auto",
          }}
          icon={"plus"}
        >
          Create Regiment
        </Button>
        <View style={{ width: "100%" }}>
          <ScrollView style={{ height: "100%" }}>
            {data?.map((val, idx) => (
              <TouchableHighlight
                style={{ marginBottom: 20, marginHorizontal: 30 }}
                key={idx}
                onLongPress={() => alert("press")}
                onPress={() => {
                  navigation.navigate("Regiment Details", { detailInfo: val });
                }}
              >
                <Surface
                  elevation={5}
                  style={{
                    backgroundColor: "#e5daf8",
                    borderColor: "#a379e7",
                    borderWidth: 2,
                    borderRadius: 10,
                    padding: 10,
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 22,
                        fontWeight: "500",
                        color: "#3b1676",
                        marginBottom: 10,
                        marginLeft: 5,
                      }}
                    >
                      {val.name}
                    </Text>
                    <Badge
                      style={{
                        marginRight: 5,
                        marginBottom: 15,
                        backgroundColor: val.isCompleted
                          ? "#b795ec"
                          : "#3b1676",
                      }}
                    ></Badge>
                  </View>
                  <Text style={{ textAlign: "center", color: "#3b1676" }}>
                    {val.description}
                  </Text>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      marginTop: 10,
                    }}
                  >
                    <Text style={{ marginHorizontal: 3, color: "#3b1676" }}>
                      Sun
                    </Text>
                    <Text style={{ marginHorizontal: 3, color: "#3b1676" }}>
                      Mon
                    </Text>
                    <Text style={{ marginHorizontal: 3, color: "#3b1676" }}>
                      Tues
                    </Text>
                    <Text style={{ marginHorizontal: 3, color: "#3b1676" }}>
                      Wed
                    </Text>
                    <Text style={{ marginHorizontal: 3, color: "#3b1676" }}>
                      Thurs
                    </Text>
                    <Text style={{ marginHorizontal: 3, color: "#3b1676" }}>
                      Fri
                    </Text>
                    <Text style={{ marginHorizontal: 3, color: "#3b1676" }}>
                      Sat
                    </Text>
                  </View>
                </Surface>
              </TouchableHighlight>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegimentScreen;
