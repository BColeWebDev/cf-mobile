import { View } from "react-native";
import React,{useState,useEffect} from "react";
import {
  Button,
  TextInput,
  Text,
} from "@react-native-material/core";
import { useDispatch } from "react-redux";
import {createRegiment} from "../../../../../../redux/features/regiments/regimentsSlice"
import { AppDispatch } from "../../../../../../redux/app/store";
import { useSelector } from "react-redux";

export default function CreateRegiment({ navigation }) {
  const dispatch = useDispatch<AppDispatch>()
  const {currentUser} = useSelector((state:any)=>state.user)
  const initialState = {name:"", description:"", userid:""}
  const [formData, setformData] = useState(initialState);



  const handleCreateLead = ()=>{
    formData.userid =  currentUser.existingUser.id
    dispatch(createRegiment(formData)).then((val)=>{
      if(val.meta.requestStatus === "fulfilled"){
        navigation.navigate("Home")
      }
      if(val.meta.requestStatus === "rejected"){
      
      }
    })
    
  }

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        justifyContent: "flex-start",
        backgroundColor: "#292929",
        alignItems: "center",
        display: "flex",
      }}
    >
      <Text
        style={{
          textAlign: "center",
          marginVertical: 20,
          color: "white",
          fontSize: 24,
          marginBottom: 150,
        }}
      >
        Create Regiment
      </Text>
      <TextInput
        style={{ width: "100%", marginBottom: 50 }}
        placeholder="Name"
        placeholderTextColor={"#F9C000"}
        variant={"standard"}
        selectionColor={"white"}
        onChangeText={(text) =>
          setformData((prevState) => ({ ...prevState, name: text }))
        }
      />
      <TextInput
        style={{ width: "100%", marginBottom: 200 }}
        placeholder="Description"
        placeholderTextColor={"#F9C000"}
        variant={"standard"}
        selectionColor={"white"}
        onChangeText={(text) =>
          setformData((prevState) => ({ ...prevState, description: text }))
        }
      />

      <Button
        title="CREATE REGIMENT"
        style={{ width: "100%", height: 40, justifyContent: "center" }}
        onPress={() =>handleCreateLead()}
        variant={"contained"}
      />
    </View>
  );
}
