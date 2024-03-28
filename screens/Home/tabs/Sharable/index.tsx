import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/app/store";
import { getAllSharable } from "../../../../redux/features/sharables/sharableSlice";
const Sharable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: RootState) => state.sharables);
  console.log("DATA", data);

  useEffect(() => {
    dispatch(getAllSharable());
  }, []);
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
      {data.length === 0 ? (
        <>
          <Text>Coming Soon!</Text>
        </>
      ) : (
        data.map((val, idx) => <Text key={idx}>{val.sharable_name}</Text>)
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
