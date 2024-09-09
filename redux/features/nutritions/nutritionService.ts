import axios from "axios";
import tokenBearer from "../helpers/tokenHeader";
import { EXPO_PUBLIC_APP_URL } from "@env";

const SearchNutrition = async (query: string, token: string) => {
  const response = await axios.get(
    `${EXPO_PUBLIC_APP_URL}api/nutritions?query=${query}`,
    tokenBearer(token)
  );
  return response.data.foods;
};

const SearchNutritionInstant = async (query: string, token: string) => {
  const response = await axios.get(
    `${EXPO_PUBLIC_APP_URL}api/nutritions/instant-search?query=${query}`,
    tokenBearer(token)
  );
  console.log("resoobse", response.data);
  return response.data;
};

export default {
  SearchNutrition,
  SearchNutritionInstant,
};
