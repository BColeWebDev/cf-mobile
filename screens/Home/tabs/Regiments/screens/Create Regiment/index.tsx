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

  const handleCreateRegiment = () => {
    formData.userid = currentUser?.existingUser?._id;
    dispatch(createRegiment(formData)).then((val) => {
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
        justifyContent: "space-evenly",
        backgroundColor:
          currentUser.existingUser?.settings?.theme === "dark"
            ? "#171a1d"
            : "#f9fafa",
        alignItems: "center",
        display: "flex",
      }}
    >
      <View
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          flex: 1,
        }}
      >
        <TextInput
          textColor="black"
          mode={"outlined"}
          style={{
            marginBottom: 25,
            marginHorizontal: 20,
            backgroundColor: "white",
            width: "100%",
          }}
          activeOutlineColor="black"
          selectionColor={"black"}
          cursorColor={"black"}
          placeholder="Name"
          onChangeText={(text) =>
            setformData((prevState) => ({ ...prevState, name: text }))
          }
        />
        <TextInput
          textColor="black"
          mode={"outlined"}
          style={{
            marginBottom: 25,
            marginHorizontal: 20,
            backgroundColor: "white",
            width: "100%",
          }}
          activeOutlineColor="black"
          selectionColor={"black"}
          cursorColor={"black"}
          placeholder="Description"
          onChangeText={(text) =>
            setformData((prevState) => ({ ...prevState, description: text }))
          }
        />
      </View>
      <Button
        style={{
          width: 220,
          marginBottom: 20,
          borderRadius: 15,
          height: 40,
          marginTop: 20,
          justifyContent: "center",
        }}
        mode="elevated"
        buttonColor="black"
        textColor="white"
        onPress={() => handleCreateRegiment()}
      >
        CREATE REGIMENT
      </Button>
    </View>
  );
}
