import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { store } from "./redux/app/store";
import AllScreens from "./screens";

export default function App() {
  return (
    <Provider store={store}>
      <AllScreens />
    </Provider>
  );
}
