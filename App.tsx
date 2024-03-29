import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { store } from "./redux/app/store";
import AllScreens from "./screens";
import { Animated, StatusBar } from "react-native";
import { useEffect } from "react";
import { PaperProvider } from "react-native-paper";

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
        <StatusBar />
        <AllScreens />
      </PaperProvider>
    </Provider>
  );
}
