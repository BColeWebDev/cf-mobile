import { View } from "react-native";
import React, { useState, useEffect } from "react";
import { Button, TextInput, Text } from "react-native-paper";
import { useDispatch } from "react-redux";
import {
  createRegiment,
  getRegiments,
} from "../../../../../../redux/features/regiments/regimentsSlice";
import { AppDispatch } from "../../../../../../redux/app/store";
import { useSelector } from "react-redux";

export default function CreateRegiment({ navigation }) {
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser } = useSelector((state: any) => state.auth);
  const initialState = { name: "", description: "", userid: "" };
  const [formData, setformData] = useState(initialState);

  const handleCreateLead = () => {
    formData.userid = currentUser?.existingUser?._id;
    console.log("userid", currentUser?.existingUser?._id);
    dispatch(createRegiment(formData)).then((val) => {
      console.log("RETURN VAL***", val);
      if (val.meta.requestStatus === "fulfilled") {
        navigation.navigate("Home");
        dispatch(getRegiments(formData.userid));
      }
      if (val.meta.requestStatus === "rejected") {
        console.log(val);
      }
    });
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        justifyContent: "space-between",
        backgroundColor: "white",
        alignItems: "center",
        display: "flex",
      }}
    >
      <View style={{ display: "flex", flex: 0 }}>
        <Text
          style={{
            fontSize: 28,
            color: "black",

            marginTop: 30,
            fontWeight: "500",
            textAlign: "center",
            marginVertical: 20,
          }}
        >
          Create Regiment
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <TextInput
          style={{
            width: "100%",
            backgroundColor: "",
            paddingLeft: 10,
            marginVertical: 20,
            borderRadius: 1000,
          }}
          placeholder="Name"
          placeholderTextColor={"#3b1676"}
          mode={"outlined"}
          selectionColor={"#3b1676"}
          onChangeText={(text) =>
            setformData((prevState) => ({ ...prevState, name: text }))
          }
        />
        <TextInput
          style={{
            width: "100%",
            backgroundColor: "",
            paddingLeft: 10,
            marginVertical: 20,
            borderRadius: 1000,
          }}
          placeholder="Description"
          placeholderTextColor={"#3b1676"}
          mode={"outlined"}
          selectionColor={"#3b1676"}
          onChangeText={(text) =>
            setformData((prevState) => ({ ...prevState, description: text }))
          }
        />

        <Button
          style={{ width: "100%", height: 40, justifyContent: "center" }}
          onPress={() => handleCreateLead()}
          mode={"contained"}
        >
          {" "}
          CREATE REGIMENT
        </Button>
      </View>
    </View>
  );
}
