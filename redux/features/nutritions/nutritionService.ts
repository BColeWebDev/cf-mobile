import axios from "axios";
import tokenBearer from "../helpers/tokenHeader";

const SearchNutrition = async (query: string, token: string) => {
  const response = await axios.get(
    `http://localhost:8000/api/nutritions?query=${query}`,
    tokenBearer(token)
  );
  return response.data.foods;
};

export default {
  SearchNutrition,
};
