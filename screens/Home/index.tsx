import { Platform } from "react-native";
import React from "react";
import CFIcon from "../../assets/images/CF-Icon-Black.svg";
import ChadIcon from "../../assets/images/Chad.svg";
import MuscleIcon from "../../assets/images/Muscle-Icon.svg";
import PlatIcon from "../../assets/images/Plate.svg";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";
import ProfileScreen from "./tabs/Profile";
import RegimentScreen from "./tabs/Regiments";
import WorkoutsScreen from "./tabs/Workouts";
import NutritionScreen from "./tabs/Nutritions";

export default function Home({ navigation }) {
  const { isError, isLoading, isLoggedIn, currentUser } = useSelector(
    (state: any) => state.auth
  );

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarStyle: {
          paddingHorizontal: 5,
          paddingTop: 0,
          backgroundColor: "rgba(34,36,40,1)",
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
          tabBarIcon: ({ color, size }) => <CFIcon width={size} fill={color} />,
        }}
      />
      <Tab.Screen
        name="My Regiments"
        component={RegimentScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MuscleIcon width={size} fill={color} />
          ),
        }}
      />

      {/* <Tab.Screen
        name="Nutritions"
        component={NutritionScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <PlatIcon width={size} fill={color} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
}
