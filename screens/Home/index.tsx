import { Platform, SafeAreaView, View } from "react-native";
import React, { useEffect } from "react";
import CFIcon from "../../assets/images/CF-Icon-Black.svg";
import ChadIcon from "../../assets/images/Chad.svg";
import MuscleIcon from "../../assets/images/Muscle-Icon.svg";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";
import ProfileScreen from "./tabs/Profile";
import RegimentScreen from "./tabs/Regiments";
import WorkoutsScreen from "./tabs/Workouts";
import NutritionScreen from "./tabs/Nutritions";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SharableScreen from "./tabs/Sharable";
import { AntDesign } from "@expo/vector-icons";
import { AppDispatch, RootState } from "../../redux/app/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../redux/features/auth/authSlice";
export default function Home({ navigation }) {
  const { isError, isLoading, isLoggedIn, currentUser } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch<AppDispatch>();
  const Tab = createBottomTabNavigator();

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
            headerShown: false,
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
