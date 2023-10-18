import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import React, { useEffect, useState } from "react";
import { Box, Button, Badge, Surface } from "@react-native-material/core";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/app/store";
import { getRegiments } from "../../../../redux/features/regiments/regimentsSlice";
import { useSelector } from "react-redux";

const RegimentScreen = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: any) => state.regiments);
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const style = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: "flex-start",
      backgroundColor: "#292929",
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
      <Box style={{ width: "100%" }}>
        <Text style={{ fontSize: 28, color: "white", marginTop: 30 }}>
          Regiments
        </Text>
        <Button
          onPress={() => navigation.navigate("Create Regiment")}
          style={{
            width: 200,
            marginLeft: "auto",
            marginRight: "auto",
            marginVertical: 20,
          }}
          title=" New Regiment"
        ></Button>
        <Box mb={30} style={{ height: 500 }}>
          {data?.map((val, idx) => <Box   key={idx}>
            <TouchableHighlight
            
              style={{width:"100%"}}
              onPress={() => {
                navigation.navigate("Regiment Details", { detailInfo: val });
              }}
            >
              <Surface
                style={{
                  backgroundColor: "#FAC000",
                  borderColor: "yellow",
                  borderWidth: 2,
                  borderRadius: 10,
                  marginBottom: 10,
                  paddingVertical: 20,
                }}
              >
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{ fontSize: 22, marginBottom: 10, marginLeft: 5 }}
                  >
                    {val.name}
                  </Text>
                  <Badge
                    color="yellow"
                    label={val.isCompleted ? "Completed" : "Incompleted"}
                    style={{ marginRight: 5 }}
                  />
                </Box>
                <Text style={{ textAlign: "center" }}>{val.description}</Text>
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 10,
                  }}
                >
                  <Text style={{ marginHorizontal: 3 }}>Sun</Text>
                  <Text style={{ marginHorizontal: 3 }}>Mon</Text>
                  <Text style={{ marginHorizontal: 3 }}>Tues</Text>
                  <Text style={{ marginHorizontal: 3 }}>Wed</Text>
                  <Text style={{ marginHorizontal: 3 }}>Thurs</Text>
                  <Text style={{ marginHorizontal: 3 }}>Fri</Text>
                  <Text style={{ marginHorizontal: 3 }}>Sat</Text>
                </Box>
              </Surface>
            </TouchableHighlight>
          </Box>)}
        </Box>
      </Box>
    </SafeAreaView>
  );
};

export default RegimentScreen;
