import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import { Button, Surface, Portal, Modal, FAB } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/app/store";
import {
  deleteRegiment,
  getRegiments,
} from "../../../../redux/features/regiments/regimentsSlice";
import { useSelector } from "react-redux";

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
        }
      });
    }, 2000);
  }, [refreshing]);

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

  // useEffect(() => {
  //   if (currentUser !== undefined) {
  //     dispatch(getRegiments(currentUser?.existingUser?._id));
  //   }
  // }, [currentUser]);

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
        Regiments
      </Text>

      <ScrollView
        style={{ width: "100%", height: "100%" }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
                    color:
                      currentUser.existingUser?.settings?.theme === "dark"
                        ? "#f9fafa"
                        : "#1d2025",
                  }}
                >
                  No Regiments
                </Text>
              </View>
            ) : (
              data?.map((val, idx) => (
                <TouchableHighlight
                  style={{ marginBottom: 20, marginHorizontal: 10 }}
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
                      backgroundColor:
                        currentUser.existingUser?.settings?.theme === "dark"
                          ? "#33373d"
                          : "#f1f1f2",
                      borderColor:
                        currentUser.existingUser?.settings?.theme === "dark"
                          ? "black"
                          : "#f9fafa",
                      borderWidth:
                        currentUser.existingUser?.settings?.theme === "dark"
                          ? 0
                          : 2,
                      borderRadius: 10,
                      padding: 15,
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
                          color:
                            currentUser.existingUser?.settings?.theme === "dark"
                              ? "#f9fafa"
                              : "#1d2025",
                          fontSize: 14,
                          textTransform: "capitalize",
                          textAlign: "center",
                          marginBottom: 15,
                        }}
                      >
                        {val.name}
                      </Text>
                    </View>

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
                            ? "#f9fafa"
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

      <Portal>
        <Modal
          visible={visible}
          contentContainerStyle={{ backgroundColor: "white", padding: 20 }}
          onDismiss={() => setVisible(!visible)}
        >
          <Text style={{ padding: 10, fontSize: 18 }}>
            Delete {selected?.name}?
          </Text>
          <Button
            style={{
              width: 220,
              marginBottom: 20,
              marginTop: 20,
              backgroundColor: "#211a23",
              borderRadius: 15,
              marginLeft: "auto",
              marginRight: "auto",
              height: 40,
              justifyContent: "center",
            }}
            textColor="white"
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
          <Text
            onPress={() => {
              setVisible(!visible);
            }}
            style={{ textAlign: "center" }}
          >
            Cancel
          </Text>
        </Modal>
      </Portal>
      <FAB
        icon="plus"
        label="New Regiment"
        color="white"
        style={{
          position: "absolute",

          backgroundColor: "#4f1d9e",
          right: 10,
          bottom: 90,
        }}
        onPress={() => navigation.navigate("Create Regiment")}
      />
    </SafeAreaView>
  );
};

export default RegimentScreen;
