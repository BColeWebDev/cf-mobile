import Loading from "./Loading";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Login";
import Confirmation from "./Confirmation";
import Error from "./Error";
import Home from "./Home";
import { useDispatch, useSelector } from "react-redux";
import Settings from "./Settings";
import WorkoutsModal from "./Modals/WorkoutsModal";
import CreateRegiment from "./Home/tabs/Regiments/screens/Create Regiment";
import RegimentDetails from "./Home/tabs/Regiments/screens/RegimentDetails";
import WorkoutsScreen from "./Home/tabs/Workouts";
import SignUpNamesScreens from "./SignUp/screens/SignUpNames";
import SignUpEmailScreens from "./SignUp/screens/SignUpEmail";
import CreateWorkout from "./Home/tabs/Regiments/screens/Create Workout";
import WorkoutDetails from "./Home/tabs/Regiments/screens/RegimentDetails/screens/WorkoutsDetails";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../redux/app/store";
import { setCurrentUser } from "../redux/features/auth/authSlice";
import { View } from "react-native";
import { Text } from "react-native-paper";
import SharableDetails from "./Home/tabs/Sharable/screens/SharableDetails";
const Stack = createNativeStackNavigator();

export default function AllScreens() {
  const { currentUser, isLoggedIn } = useSelector(
    (state: RootState) => state.auth
  );
  const { detailInfo } = useSelector((state: any) => state.regiments);
  console.log("isLoggedId", isLoggedIn, currentUser);
  const dispatch = useDispatch<AppDispatch>();
  const [initRoute, setinitRoute] = useState<string>("Login");

  console.log("in", initRoute);

  if (initRoute !== "") {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initRoute}>
          <Stack.Screen
            name="Loading"
            component={Loading}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="SignUpNamesScreens"
            component={SignUpNamesScreens}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUpEmailScreens"
            component={SignUpEmailScreens}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Confirmation"
            component={Confirmation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Error"
            component={Error}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{ headerTitle: "" }}
          />
          <Stack.Screen
            name="Create Regiment"
            component={CreateRegiment}
            options={{ headerTitle: "" }}
          />
          <Stack.Screen
            name="Create Workout"
            component={CreateWorkout}
            options={{ headerTitle: "" }}
          />
          <Stack.Screen
            name="Regiment Details"
            component={RegimentDetails}
            options={{
              headerTitle: () => (
                <View>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "200",
                      color:
                        currentUser.existingUser?.settings?.theme === "dark"
                          ? "#f9fafa"
                          : "#33373d",
                    }}
                  >
                    {" "}
                    {detailInfo.name}
                  </Text>
                </View>
              ),

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
            }}
          />
          <Stack.Screen
            name="SharableDetails"
            component={SharableDetails}
            options={{ headerTitle: "" }}
          ></Stack.Screen>
          <Stack.Group screenOptions={{ presentation: "modal" }}>
            <Stack.Screen
              name="WorkoutsFilters"
              options={{ headerShown: false }}
              component={WorkoutsModal}
            />
            <Stack.Screen name="WorkoutsDetails" component={WorkoutDetails} />

            <Stack.Screen
              name="Workouts"
              component={WorkoutsScreen}
              options={{ headerTitle: "All Workouts" }}
            />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
