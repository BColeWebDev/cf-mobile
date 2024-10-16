import { View, StyleSheet, Pressable } from "react-native";
import { Chip, Text } from "react-native-paper";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/app/store";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import moment from "moment";

let names = {
  monday: "Mon",
  tuesday: "Tues",
  wednesday: "Wed",
  thursday: "Thurs",
  friday: "Fri",
  saturday: "Sat",
  sunday: "Sun",
};

export default function ProfileScreen({ navigation }) {
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const { data, activeRegiments } = useSelector(
    (state: RootState) => state.regiments
  );
  const [image, setImage] = useState<string | null>(null);
  const date = moment();

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

  return (
    <View style={style.container}>
      <View
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
            currentUser.existingUser?.settings?.theme === "dark" ? 0 : 2,
          display: "flex",
          paddingVertical: 30,
          paddingHorizontal: 10,
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          borderRadius: 10,
          width: "95%",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: 15,
        }}
      >
        <Text
          style={{
            color:
              currentUser.existingUser?.settings?.theme === "dark"
                ? "#f9fafa"
                : "#33373d",
          }}
        >
          My Progress
        </Text>
      </View>

      {/* Profile */}
      <Pressable
        onPress={() =>
          navigation.navigate("Regiment Details", {
            regimentId: activeRegiments._id,
            tabName: "",
          })
        }
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
            currentUser.existingUser?.settings?.theme === "dark" ? 0 : 2,
          display: "flex",
          paddingVertical: 20,
          paddingHorizontal: 10,
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          borderRadius: 10,
          width: "95%",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: 15,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Text
            style={{
              color:
                currentUser.existingUser?.settings?.theme === "dark"
                  ? "#f9fafa"
                  : "#33373d",
              marginBottom: 10,
              fontSize: 16,
            }}
          >
            Active Workouts
          </Text>

          <Text
            style={{
              color:
                currentUser.existingUser?.settings?.theme === "dark"
                  ? "#f9fafa"
                  : "#33373d",
              textAlign: "center",
              fontSize: 16,
              marginBottom: 10,
            }}
          >
            {date.format("dddd")}
          </Text>
        </View>
        <Text
          style={{
            color:
              currentUser.existingUser?.settings?.theme === "dark"
                ? "#f9fafa"
                : "#33373d",
            textAlign: "left",
            fontSize: 16,
            marginBottom: 10,
          }}
        >
          {activeRegiments.name}
        </Text>

        <Text
          style={{
            color:
              currentUser.existingUser?.settings?.theme === "dark"
                ? "#f9fafa"
                : "#33373d",
            textAlign: "left",
            fontSize: 16,
            marginBottom: 10,
          }}
        >
          {activeRegiments.description}
        </Text>

        {/* <View style={{ display: "flex", flexDirection: "row" }}>
          <Chip
            style={{
              margin: 5,
              borderColor:
                currentUser.existingUser?.settings?.theme === "dark"
                  ? "black"
                  : "white",
              backgroundColor:
                currentUser.existingUser?.settings?.theme === "dark"
                  ? "black"
                  : "white",
            }}
            selectedColor={
              currentUser.existingUser?.settings?.theme === "dark"
                ? "black"
                : "white"
            }
            textStyle={{
              color:
                currentUser.existingUser?.settings?.theme === "dark"
                  ? "#f9fafa"
                  : "#33373d",
            }}
            onPress={() => {}}
            mode={"outlined"}
            elevated={true}
          >
            Chest
          </Chip>
          <Chip
            style={{
              margin: 5,
              borderColor:
                currentUser.existingUser?.settings?.theme === "dark"
                  ? "black"
                  : "white",
              backgroundColor:
                currentUser.existingUser?.settings?.theme === "dark"
                  ? "black"
                  : "white",
            }}
            selectedColor={
              currentUser.existingUser?.settings?.theme === "dark"
                ? "black"
                : "white"
            }
            textStyle={{
              color:
                currentUser.existingUser?.settings?.theme === "dark"
                  ? "#f9fafa"
                  : "#33373d",
            }}
            onPress={() => {}}
            mode={"outlined"}
            elevated={true}
          >
            Chest
          </Chip>
        </View> */}
      </Pressable>

      <View
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
            currentUser.existingUser?.settings?.theme === "dark" ? 0 : 2,
          display: "flex",
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: 10,
          width: "95%",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: 15,
        }}
      >
        <Text
          style={{
            color:
              currentUser.existingUser?.settings?.theme === "dark"
                ? "#f9fafa"
                : "#33373d",
            fontSize: 16,
            textAlign: "left",
            textTransform: "capitalize",
          }}
        >
          Gender
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color:
                currentUser.existingUser?.settings?.theme === "dark"
                  ? "#f9fafa"
                  : "#33373d",
              fontSize: 16,
              textAlign: "left",
              marginRight: 3,
              textTransform: "capitalize",
            }}
          >
            {currentUser?.existingUser?.gender === "M" ? "Male" : "Female"}
          </Text>
          <MaterialCommunityIcons
            name={`gender-${
              currentUser?.existingUser?.gender === "M" ? "male" : "female"
            }`}
            size={24}
            color={
              currentUser.existingUser?.settings?.theme === "dark"
                ? "#f9fafa"
                : "#33373d"
            }
          />
        </View>
      </View>

      <View
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
            currentUser.existingUser?.settings?.theme === "dark" ? 0 : 2,
          display: "flex",
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: 10,
          width: "95%",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: 15,
        }}
      >
        <Text
          style={{
            color:
              currentUser.existingUser?.settings?.theme === "dark"
                ? "#f9fafa"
                : "#33373d",
            textAlign: "left",
            textTransform: "capitalize",
          }}
        >
          Performace Goals
        </Text>
        <Text
          style={{
            color:
              currentUser.existingUser?.settings?.theme === "dark"
                ? "#f9fafa"
                : "#33373d",
            fontSize: 16,
            textAlign: "left",
            textTransform: "capitalize",
          }}
        >
          {currentUser?.existingUser?.performance_goals}
        </Text>
      </View>

      <View
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
            currentUser.existingUser?.settings?.theme === "dark" ? 0 : 2,
          display: "flex",
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: 10,
          width: "95%",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: 15,
        }}
      >
        <Text
          style={{
            color:
              currentUser.existingUser?.settings?.theme === "dark"
                ? "#f9fafa"
                : "#33373d",
            textAlign: "left",
            textTransform: "capitalize",
          }}
        >
          Lifesyle Goals
        </Text>
        <Text
          style={{
            color:
              currentUser.existingUser?.settings?.theme === "dark"
                ? "#f9fafa"
                : "#33373d",
            fontSize: 16,
            textAlign: "left",
            textTransform: "capitalize",
          }}
        >
          {currentUser?.existingUser?.lifestyle_goals}
        </Text>
      </View>

      <View
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
            currentUser.existingUser?.settings?.theme === "dark" ? 0 : 2,
          display: "flex",
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: 10,
          width: "95%",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: 15,
        }}
      >
        <Text
          style={{
            color:
              currentUser.existingUser?.settings?.theme === "dark"
                ? "#f9fafa"
                : "#33373d",
            fontSize: 16,
            textAlign: "left",
            textTransform: "capitalize",
          }}
        >
          {currentUser?.existingUser?.primary_goals}
        </Text>
        <Text
          style={{
            color:
              currentUser.existingUser?.settings?.theme === "dark"
                ? "#f9fafa"
                : "#33373d",
            fontSize: 16,
            textAlign: "left",
            textTransform: "capitalize",
          }}
        >
          {currentUser?.existingUser?.primary_goals}
        </Text>
      </View>
      <View
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
            currentUser.existingUser?.settings?.theme === "dark" ? 0 : 2,
          display: "flex",
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: 10,
          width: "95%",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: 15,
        }}
      >
        <Text
          style={{
            color:
              currentUser.existingUser?.settings?.theme === "dark"
                ? "#f9fafa"
                : "#33373d",
            fontSize: 16,
            textAlign: "left",
            textTransform: "capitalize",
          }}
        >
          Weight{" "}
        </Text>
        <Text
          style={{
            color:
              currentUser.existingUser?.settings?.theme === "dark"
                ? "#f9fafa"
                : "#33373d",
            fontSize: 16,
            textAlign: "left",
            textTransform: "capitalize",
          }}
        >
          {currentUser?.existingUser?.weight}
        </Text>
      </View>
      <View
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
            currentUser.existingUser?.settings?.theme === "dark" ? 0 : 2,
          display: "flex",
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: 10,
          width: "95%",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: 15,
        }}
      >
        <Text
          style={{
            color:
              currentUser.existingUser?.settings?.theme === "dark"
                ? "#f9fafa"
                : "#33373d",
            fontSize: 16,
            textAlign: "left",
            textTransform: "capitalize",
          }}
        >
          Height
        </Text>
        <Text
          style={{
            color:
              currentUser.existingUser?.settings?.theme === "dark"
                ? "#f9fafa"
                : "#33373d",
            fontSize: 16,
            textAlign: "left",
            textTransform: "capitalize",
          }}
        >
          {currentUser?.existingUser?.height}
        </Text>
      </View>
    </View>
  );
}
