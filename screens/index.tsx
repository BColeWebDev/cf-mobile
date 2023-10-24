import Loading from "./Loading";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Login";
import SignUpScreens from "./SignUp";
import Confirmation from "./Confirmation";
import Error from "./Error";
import Home from "./Home";
import { useSelector } from "react-redux";
import Settings from "./Settings";
import WorkoutsModal from "./Modals/WorkoutsModal";
import CreateRegiment from "./Home/tabs/Regiments/screens/Create Regiment";
import RegimentDetails from "./Home/tabs/Regiments/screens/RegimentDetails";
import WorkoutsScreen from "./Home/tabs/Workouts";
import SignUpNamesScreens from "./SignUp/screens/SignUpNames";

const Stack = createNativeStackNavigator();
export default function AllScreens() {
  const { currentUser, isLoggedIn } = useSelector((state: any) => state.auth);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? "Home" : "Login"}>
        <Stack.Screen
          name="Loading"
          component={Loading}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Sign Up"
          component={SignUpScreens}
          options={{ headerShown: false }}
        />
        <Stack.Screen
        name="SignUpNamesScreens"
        component={SignUpNamesScreens}
        options={{headerShown:false}}
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
          name="Regiment Details"
          component={RegimentDetails}
          options={{ headerTitle: "" }}
        />
        <Stack.Group screenOptions={{ presentation: "modal" }}>
          <Stack.Screen
            name="MyModal"
            options={{ headerShown: false }}
            component={WorkoutsModal}
          />
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
