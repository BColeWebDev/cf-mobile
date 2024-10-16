import { Image, Platform, Pressable, View } from "react-native";
import React, { useState } from "react";
import CFIcon from "../../assets/images/CF-Icon-Black.svg";
import ChadIcon from "../../assets/images/Chad.svg";
import MuscleIcon from "../../assets/images/Muscle-Icon.svg";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";
import ProfileScreen from "./tabs/Profile";
import RegimentScreen from "./tabs/Regiments";
import WorkoutsScreen from "./tabs/Workouts";
import { Text } from "react-native-paper";
import SharableScreen from "./tabs/Sharable";
import { AntDesign } from "@expo/vector-icons";
import { AppDispatch, RootState } from "../../redux/app/store";
import { useDispatch } from "react-redux";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import PlatIcon from "../../assets/images/Plate.svg";
import * as ImagePicker from "expo-image-picker";
import NutritionScreen from "./tabs/Nutritions";

export default function Home({ navigation }) {
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const Tab = createBottomTabNavigator();

  const [image, setImage] = useState<string | null>(null);

  const handleChoosePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: true,
          tabBarStyle: {
            paddingHorizontal: 10,
            paddingTop: 0,
            backgroundColor: "black",
            position: "absolute",
            borderTopWidth: 0,
          },
        })}
      >
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerTitle: () => {
              return (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  {currentUser?.existingUser?.crown_member ? (
                    <FontAwesome5
                      name="crown"
                      size={24}
                      color="orange"
                      onPress={() => alert("Crown Member")}
                    />
                  ) : null}
                  {/* Image Profile */}
                  {currentUser?.existingUser?.avatarProfile === "" ? (
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Pressable onLongPress={handleChoosePhoto}>
                        <Ionicons
                          name="person-circle-sharp"
                          size={40}
                          color={
                            currentUser.existingUser?.settings?.theme === "dark"
                              ? "#f9fafa"
                              : "#33373d"
                          }
                        />
                      </Pressable>
                      <Text
                        style={{
                          color:
                            currentUser.existingUser?.settings?.theme === "dark"
                              ? "#f9fafa"
                              : "#33373d",
                          fontWeight: "700",
                          marginLeft: 8,
                        }}
                      >
                        {currentUser?.existingUser?.first_name}{" "}
                        {currentUser?.existingUser?.last_name}
                      </Text>
                    </View>
                  ) : (
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Pressable
                        style={{
                          display: "flex",
                          flexDirection: "row-reverse",
                          alignItems: "center",
                        }}
                        onLongPress={handleChoosePhoto}
                      >
                        <Image
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: 150 / 2,
                            overflow: "hidden",
                            borderWidth: 1.5,
                            backgroundColor: "black",
                            borderColor: "orange",
                            marginBottom: 10,
                          }}
                          source={{
                            uri: currentUser?.existingUser?.avatarProfile,
                          }}
                        />
                      </Pressable>

                      <Text
                        style={{
                          color:
                            currentUser.existingUser?.settings?.theme === "dark"
                              ? "#f9fafa"
                              : "#33373d",
                          fontWeight: "700",
                          marginLeft: 8,
                        }}
                      >
                        {currentUser?.existingUser?.first_name}{" "}
                        {currentUser?.existingUser?.last_name}
                      </Text>
                    </View>
                  )}
                  <Feather
                    name="settings"
                    size={24}
                    color={
                      currentUser.existingUser?.settings?.theme === "dark"
                        ? "#f9fafa"
                        : "#33373d"
                    }
                    style={{ alignItems: "flex-end", marginRight: 10 }}
                    onPress={() => navigation.navigate("Settings")}
                  />
                </View>
              );
            },
            headerTintColor:
              currentUser.existingUser?.settings?.theme === "dark"
                ? "#f9fafa"
                : "#33373d",
            headerStyle: {
              backgroundColor:
                currentUser.existingUser?.settings?.theme === "dark"
                  ? "#171a1d"
                  : "#f9fafa",
            },
            tabBarIcon: ({ color, size, focused }) => (
              <CFIcon width={size} fill={focused ? "white" : color} />
            ),
            tabBarLabel: ({ color, focused }) => (
              <View>
                <Text
                  style={{ color: focused ? "white" : color, fontSize: 10 }}
                >
                  Profile
                </Text>
              </View>
            ),
          }}
        />
        {/* <Tab.Screen
          name="Nutritions"
          component={NutritionScreen}
          options={{
            headerShown: false,

            tabBarIcon: ({ color, size, focused }) => (
              <PlatIcon width={size} fill={focused ? "white" : color} />
            ),

            tabBarLabel: ({ color, focused }) => (
              <View>
                <Text
                  style={{ color: focused ? "white" : color, fontSize: 10 }}
                >
                  Nutritions
                </Text>
              </View>
            ),
          }}
        /> */}
        <Tab.Screen
          name="My Regiments"
          component={RegimentScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size, focused }) => (
              <MuscleIcon width={size} fill={focused ? "white" : color} />
            ),
            tabBarLabel: ({ color, focused }) => (
              <View>
                <Text
                  style={{ color: focused ? "white" : color, fontSize: 10 }}
                >
                  Regiments
                </Text>
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="Workouts"
          component={WorkoutsScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size, focused }) => (
              <ChadIcon width={size} fill={focused ? "white" : color} />
            ),
            tabBarLabel: ({ color, focused }) => (
              <View>
                <Text
                  style={{ color: focused ? "white" : color, fontSize: 10 }}
                >
                  Workouts
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Community Workouts"
          component={SharableScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size, focused }) => (
              <AntDesign
                name="sharealt"
                size={size}
                color={focused ? "white" : color}
              />
            ),
            tabBarLabel: ({ color, focused }) => (
              <View>
                <Text
                  style={{ color: focused ? "white" : color, fontSize: 10 }}
                >
                  Shareable
                </Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}
