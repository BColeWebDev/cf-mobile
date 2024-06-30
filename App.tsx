import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { RootState, store } from "./redux/app/store";
import AllScreens from "./screens";
import { Animated, StatusBar } from "react-native";
import { useEffect } from "react";
import { PaperProvider } from "react-native-paper";
import { useSelector } from "react-redux";

export default function App() {
  let animatedValue = new Animated.Value(0);
  Animated.timing(animatedValue, {
    toValue: 1,
    duration: 1000,
    useNativeDriver: true,
  }).start();

  return (
    <Provider store={store}>
      <PaperProvider>
        <Wrapper />
        {/* <StatusBar /> */}
        <AllScreens />
      </PaperProvider>
    </Provider>
  );
}
const Wrapper = () => {
  const { currentUser } = useSelector((state: RootState) => state.auth);
  return (
    <StatusBar
      translucent={true}
      backgroundColor={
        currentUser.existingUser?.settings?.theme === "dark"
          ? "#171a1d"
          : "#f9fafa"
      }
      barStyle={
        currentUser.existingUser?.settings?.theme === "dark"
          ? "light-content"
          : "default"
      }
    />
  );
};
