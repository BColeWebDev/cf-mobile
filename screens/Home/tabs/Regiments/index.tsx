import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  Button,
  Badge,
  Surface,
  Portal,
  Modal,
  FAB,
  Banner,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/app/store";
import {
  deleteRegiment,
  getRegiments,
} from "../../../../redux/features/regiments/regimentsSlice";
import { useSelector } from "react-redux";
import { getAllWorkouts } from "../../../../redux/features/workouts/workoutSlice";

const RegimentScreen = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: RootState) => state.regiments);
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const [refreshing, setRefreshing] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [selected, setselected] = useState<any>();
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

  useEffect(() => {
    if (currentUser !== undefined) {
      dispatch(getRegiments(currentUser?.existingUser?._id));
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
            textAlign: "left",
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
            marginVertical: 15,
            width: 180,
            padding: 5,
            marginRight: 15,
            backgroundColor: "black",
            borderColor: "black",
            marginLeft: "auto",
          }}
          icon={"plus"}
        >
          Create Regiment
        </Button>
        <View style={{ width: "100%" }}>
          <ScrollView style={{ height: "100%" }}>
            {data?.length === 0 ? (
              <View style={{ height: 200 }}>
                <Text
                  style={{
                    flex: 1,
                    marginTop: 100,
                    fontWeight: "700",
                    textAlign: "center",
                    fontSize: 35,
                  }}
                >
                  No Data
                </Text>
              </View>
            ) : (
              data?.map((val, idx) => (
                <TouchableHighlight
                  style={{ marginBottom: 20, marginHorizontal: 30 }}
                  key={idx}
                  onLongPress={() => {
                    setselected(val);
                    setVisible(!visible);
                  }}
                  onPress={() => {
                    navigation.navigate("Regiment Details", {
                      regimentId: val._id,
                    });
                  }}
                >
                  <Surface
                    elevation={1}
                    style={{
                      backgroundColor: "black",
                      borderColor: "white",
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
                          color: "white",
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
                          backgroundColor: val.isCompleted ? "white" : "red",
                        }}
                      ></Badge>
                    </View>
                    <Text style={{ textAlign: "center", color: "white" }}>
                      {val.description}
                    </Text>
                    <View
                      style={{
                        display: "flex",
                        borderRadius: 20,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 10,
                        width: "100%",
                      }}
                    >
                      <Text
                        style={{
                          marginHorizontal: 3,
                          color: val?.days?.includes("sunday")
                            ? "white"
                            : "#1d2025",
                          padding: 4,
                          backgroundColor:
                            val?.days?.filter((val) => val === "sunday")
                              .length === 1
                              ? "#4f1d9e"
                              : "white",
                        }}
                      >
                        Sun
                      </Text>
                      <Text
                        style={{
                          marginHorizontal: 3,
                          color: val?.days?.includes("monday")
                            ? "white"
                            : "#1d2025",
                          padding: 4,
                          backgroundColor: val?.days?.includes("monday")
                            ? "#4f1d9e"
                            : "white",
                        }}
                      >
                        Mon
                      </Text>
                      <Text
                        style={{
                          marginHorizontal: 3,
                          color: val?.days?.includes("tuesday")
                            ? "white"
                            : "#1d2025",
                          padding: 4,

                          backgroundColor: val?.days?.includes("tuesday")
                            ? "#4f1d9e"
                            : "white",
                        }}
                      >
                        Tues
                      </Text>
                      <Text
                        style={{
                          marginHorizontal: 3,
                          color: val?.days?.includes("wednesday")
                            ? "white"
                            : "#1d2025",
                          padding: 4,
                          backgroundColor: val?.days?.includes("wednesday")
                            ? "#4f1d9e"
                            : "white",
                        }}
                      >
                        Wed
                      </Text>
                      <Text
                        style={{
                          marginHorizontal: 3,
                          color: val?.days?.includes("thursday")
                            ? "white"
                            : "#1d2025",
                          padding: 4,
                          backgroundColor: val?.days?.includes("thursday")
                            ? "#4f1d9e"
                            : "white",
                        }}
                      >
                        Thurs
                      </Text>
                      <Text
                        style={{
                          marginHorizontal: 3,
                          color: val?.days?.includes("friday")
                            ? "white"
                            : "#1d2025",
                          padding: 4,
                          backgroundColor: val?.days?.includes("friday")
                            ? "#4f1d9e"
                            : "white",
                        }}
                      >
                        Fri
                      </Text>
                      <Text
                        style={{
                          marginHorizontal: 3,
                          color: val?.days?.includes("saturday")
                            ? "white"
                            : "#1d2025",
                          padding: 4,
                          backgroundColor: val?.days?.includes("saturday")
                            ? "#4f1d9e"
                            : "white",
                        }}
                      >
                        Sat
                      </Text>
                    </View>
                  </Surface>
                </TouchableHighlight>
              ))
            )}
          </ScrollView>
        </View>
      </ScrollView>
      {/*  */}
      <Portal>
        <Modal
          visible={visible}
          contentContainerStyle={{ backgroundColor: "white", padding: 20 }}
          onDismiss={() => setVisible(!visible)}
        >
          <Text style={{ padding: 10 }}>Delete {selected?.name}</Text>
          <Button
            mode="contained"
            onPress={() => {
              dispatch(deleteRegiment(selected?._id)).then((val) => {
                if (val.meta.requestStatus === "fulfilled") {
                  dispatch(getRegiments(currentUser?.existingUser?._id));
                }
                if (val.meta.requestStatus === "rejected") {
                }
              });
              setVisible(!visible);
            }}
          >
            Delete
          </Button>
        </Modal>
      </Portal>
    </SafeAreaView>
  );
};

export default RegimentScreen;
