import { View, Text, StyleSheet } from "react-native";
import React,{useEffect,useState}from "react";
import { Box, Button } from "@react-native-material/core";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../redux/app/store";
import { getRegiments } from "../../../../redux/features/regiments/regimentsSlice";
import { useSelector } from "react-redux";

const RegimentScreen = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>()
  const {data}= useSelector((state:any)=> state.regiments)
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

  useEffect(() => {
    dispatch(getRegiments())
  }, []);

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
          }}
          title=" New Regiment"
        ></Button>
        <Box mb={30} style={{ height: 500 }}>
        {data?.map((val)=>
        <Box>
          <Text>{val.name}</Text>
          <Text>{val.description}</Text>
        </Box>
        
        )}
        </Box>
       
      </Box>
    </SafeAreaView>
  );
};

export default RegimentScreen;
