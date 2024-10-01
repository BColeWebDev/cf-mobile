import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

/** Store Login Data  */
export const getData = async () => {
  if (Platform.OS === "ios" || Platform.OS === "android") {
    let res1 = await AsyncStorage.getItem("currentUser");

    let currentUser = JSON.parse(res1);

    let res2 = await AsyncStorage.getItem("isLoggedIn");
    let isLoggedIn = JSON.parse(res2);
    return { currentUser, isLoggedIn };
  }
};

/** Set Login Data
 * @param str Async Storage String
 * @param value JSON dats
 */
export const setData = async (str: string, value) => {
  const jsonValue = JSON.stringify(value);
  await AsyncStorage.setItem(str, jsonValue);
};
