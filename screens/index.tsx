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
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../redux/app/store";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import SharableDetails from "./Home/tabs/Sharable/screens/SharableDetails";
import NutritionDetails from "./Home/tabs/Nutritions/screens/NutritionDetails";
import SignUpExperience from "./SignUp/screens/SignUpExperience";
import SignUpAge from "./SignUp/screens/SignUpAge";
import SignUpWeight from "./SignUp/screens/SignUpWeight";
import SignUpTargetWeight from "./SignUp/screens/SignUpTargetWeight";
import SignUpHeight from "./SignUp/screens/SignUpHeight";
import SignUpGender from "./SignUp/screens/SignUpGender";
import SignUpEquipment from "./SignUp/screens/SignUpEquipment";
import SignUpPrimaryGoal from "./SignUp/screens/SignUpPrimaryGoal";
import { setCurrentUser } from "../redux/features/auth/authSlice";
import { getData } from "../redux/features/helpers/loginHandler";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import StartWorkout from "./StartWorkout";

const Stack = createNativeStackNavigator();

export default function AllScreens({ navigation }) {
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const { detailInfo } = useSelector((state: any) => state.regiments);
  const [initRoute, setinitRoute] = useState<string>("Login");
  const dispatch = useDispatch<AppDispatch>();
  // useEffect(() => {
  //   getData().then((value) => {
  //     console.log("CALLED", value);
  //     if (value.isLoggedIn) {
  //       dispatch(setCurrentUser(value.currentUser));
  //     }
  //   });
  // }, []);

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
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUpEquipment"
            component={SignUpEquipment}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUpNamesScreens"
            component={SignUpNamesScreens}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUpGender"
            component={SignUpGender}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUpEmailScreens"
            component={SignUpEmailScreens}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUpExperience"
            component={SignUpExperience}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUpAge"
            component={SignUpAge}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUpWeight"
            component={SignUpWeight}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUpTargetWeight"
            component={SignUpTargetWeight}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUpPrimaryGoal"
            component={SignUpPrimaryGoal}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUpHeight"
            component={SignUpHeight}
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
            options={{
              headerTitle: "Settings",
              headerStyle: {
                backgroundColor:
                  currentUser.existingUser?.settings?.theme === "dark"
                    ? "#171a1d"
                    : "#f9fafa",
              },
              headerTitleStyle: {
                fontSize: 25,
              },
              headerTintColor:
                currentUser.existingUser?.settings?.theme === "dark"
                  ? "#f9fafa"
                  : "#33373d",
            }}
          />
          <Stack.Screen
            name="Create Regiment"
            component={CreateRegiment}
            options={{
              headerTitle: "Create Regiment",
              headerStyle: {
                backgroundColor:
                  currentUser.existingUser?.settings?.theme === "dark"
                    ? "#171a1d"
                    : "#f9fafa",
              },
              headerTitleStyle: {
                fontSize: 25,
              },
              headerTintColor:
                currentUser.existingUser?.settings?.theme === "dark"
                  ? "#f9fafa"
                  : "#33373d",
            }}
          />
          <Stack.Screen
            name="Create Workout"
            component={CreateWorkout}
            options={{
              headerTitle: "Create Workout",
              headerStyle: {
                backgroundColor:
                  currentUser.existingUser?.settings?.theme === "dark"
                    ? "#171a1d"
                    : "#f9fafa",
              },
              headerBackTitleVisible: false,
              headerTitleStyle: {
                fontSize: 25,
              },
              headerTintColor:
                currentUser.existingUser?.settings?.theme === "dark"
                  ? "#f9fafa"
                  : "#33373d",
            }}
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
                      fontWeight: "600",
                      color:
                        currentUser.existingUser?.settings?.theme === "dark"
                          ? "#f9fafa"
                          : "#33373d",
                    }}
                  >
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
            name="StartWorkout"
            component={StartWorkout}
            options={({ route }) => {
              return {
                headerTitle: () => {
                  return (
                    <>
                      <View>
                        <Text
                          style={{
                            fontSize: 20,
                            fontWeight: "600",
                            textTransform: "capitalize",
                            color:
                              currentUser.existingUser?.settings?.theme ===
                              "dark"
                                ? "#f9fafa"
                                : "#33373d",
                          }}
                        >
                          Timer
                        </Text>
                      </View>
                    </>
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
              };
            }}
          />
          <Stack.Screen
            name="SharableDetails"
            component={SharableDetails}
            options={{
              headerTitle: () => (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "90%",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "600",
                      color:
                        currentUser.existingUser?.settings?.theme === "dark"
                          ? "#f9fafa"
                          : "#33373d",
                    }}
                  >
                    Sharable Details
                  </Text>

                  <View style={{ flexDirection: "row" }}>
                    <AntDesign
                      name="sharealt"
                      size={20}
                      color={
                        currentUser.existingUser?.settings?.theme === "dark"
                          ? "#f9fafa"
                          : "#33373d"
                      }
                      style={{ marginRight: 20 }}
                      onPress={() => alert("share")}
                    />
                    <Entypo
                      onPress={() => alert("download regiment")}
                      name="download"
                      size={20}
                      color={
                        currentUser.existingUser?.settings?.theme === "dark"
                          ? "#f9fafa"
                          : "#33373d"
                      }
                    />
                  </View>
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
          ></Stack.Screen>

          <Stack.Group screenOptions={{ presentation: "modal" }}>
            <Stack.Screen
              name="WorkoutsFilters"
              options={{
                headerTitle: () => (
                  <View style={{ width: "100%", justifyContent: "flex-start" }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "600",
                        color:
                          currentUser.existingUser?.settings?.theme === "dark"
                            ? "#f9fafa"
                            : "#33373d",
                      }}
                    >
                      Filters
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
              component={WorkoutsModal}
            />
            <Stack.Screen
              name="WorkoutsDetails"
              component={WorkoutDetails}
              options={({ route }) => ({
                headerTitle: () => {
                  return (
                    <View>
                      <Text
                        style={{
                          fontSize: 20,
                          color:
                            currentUser.existingUser?.settings?.theme === "dark"
                              ? "#f9fafa"
                              : "#33373d",
                        }}
                      >
                        {route.params?.name}
                      </Text>
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
              })}
            />

            <Stack.Screen
              name="Workouts"
              component={WorkoutsScreen}
              options={{
                headerTitle: "All Workouts",
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
              name="NutritionDetails"
              component={NutritionDetails}
              options={({ route }) => {
                return {
                  headerTitle: () => {
                    return (
                      <>
                        <View>
                          <Text
                            style={{
                              fontSize: 20,
                              fontWeight: "600",
                              textTransform: "capitalize",
                              color:
                                currentUser.existingUser?.settings?.theme ===
                                "dark"
                                  ? "#f9fafa"
                                  : "#33373d",
                            }}
                          >
                            {route.params["name"]}
                          </Text>
                        </View>
                      </>
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
                };
              }}
            />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
