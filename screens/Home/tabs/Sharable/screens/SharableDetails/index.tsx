import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableHighlight,
  ScrollView,
} from "react-native";
import { useDispatch } from "react-redux";
import { getSingleRegiment } from "../../../../../../redux/features/regiments/regimentsSlice";
import { AppDispatch, RootState } from "../../../../../../redux/app/store";
import { useSelector } from "react-redux";
import Loading from "../../../../../Loading";
import { Button, Chip } from "react-native-paper";
export default function SharableDetails({ navigation, route }) {
  const dispatch = useDispatch<AppDispatch>();
  const { detailInfo, isLoading, isSuccess } = useSelector(
    (state: any) => state.regiments
  );
  useEffect(() => {
    if (route.params.regimentId !== undefined) {
      dispatch(getSingleRegiment(route.params.regimentId));
    }
  }, [route]);

  if (isLoading) {
    return (
      <View style={{ flex: 1 }}>
        <Loading color={"red"} />
      </View>
    );
  }

  if (isSuccess) {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ width: "100%", height: "100%" }}>
          <Button
            style={{
              width: 220,
              marginBottom: 20,
              marginTop: 20,
              backgroundColor: "#211a23",
              borderRadius: 15,
              marginLeft: "auto",
              marginRight: 10,
              height: 40,
              justifyContent: "flex-end",
            }}
            mode="elevated"
            textColor="white"
            onPress={() => {
              navigation.navigate("My Regiments");
            }}
          >
            Download Regiment
          </Button>

          <Text
            style={{
              fontSize: 22,
              textAlign: "left",
              paddingHorizontal: 15,
              paddingVertical: 10,
            }}
          >
            {detailInfo.name}
          </Text>
          <Text
            style={{ fontSize: 18, textAlign: "left", paddingHorizontal: 15 }}
          >
            {detailInfo.description}
          </Text>
          <Text
            style={{ fontSize: 16, textAlign: "left", paddingHorizontal: 15 }}
          >
            Workouts {detailInfo.routines?.length}
          </Text>
          <Text
            style={{ textAlign: "right", marginRight: 10, fontWeight: "900" }}
          >
            Days {detailInfo.days.length}
          </Text>
          <View style={{ marginVertical: 10 }}>
            {detailInfo.routines.map((value, idx) => (
              <View
                key={idx}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginHorizontal: 10,
                    marginBottom: 10,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      textTransform: "capitalize",
                      color: "black",
                      fontSize: 15,
                      fontWeight: "500",
                      marginBottom: 10,
                    }}
                  >
                    {value.name} {value.description}
                  </Text>
                  <Chip
                    mode={"flat"}
                    selectedColor="white"
                    style={{ backgroundColor: "black" }}
                  >
                    {value.day}
                  </Chip>
                </View>

                {value.primaryMuscleGroup.length === 0 ||
                value.secondaryMuscleGroup.length === 0 ? (
                  <Text
                    style={{
                      textAlign: "center",
                      fontWeight: "500",
                      padding: 10,
                    }}
                  >
                    No Regiments
                  </Text>
                ) : (
                  <View
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: 10,
                      flexDirection: "row",
                    }}
                  >
                    <View>
                      <View>
                        {value.primaryMuscleGroup.map((primary, idx) => (
                          <Chip
                            key={idx}
                            style={{
                              margin: 5,
                              borderColor: "black",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                            selectedColor="black"
                            mode={"outlined"}
                            elevated={true}
                          >
                            {primary}
                          </Chip>
                        ))}
                      </View>
                    </View>

                    <View>
                      <View>
                        {value.secondaryMuscleGroup.map((primary, idx) => (
                          <Chip
                            key={idx}
                            style={{ margin: 5, borderColor: "black" }}
                            selectedColor="black"
                            mode={"outlined"}
                            elevated={true}
                          >
                            {primary}
                          </Chip>
                        ))}
                      </View>
                    </View>
                  </View>
                )}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}
