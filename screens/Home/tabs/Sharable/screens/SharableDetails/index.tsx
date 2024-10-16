import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableHighlight,
  ScrollView,
  StyleSheet,
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
    (state: RootState) => state.regiments
  );

  const { currentUser } = useSelector((state: RootState) => state.auth);

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

  if (isSuccess) {
    return (
      <View style={style.container}>
        <ScrollView style={{ width: "100%", height: "100%" }}>
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
        </ScrollView>
      </View>
    );
  }
}
