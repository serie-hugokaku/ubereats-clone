import axios from "axios";
import { foods } from "../urls";

export const fetchFoods = async (restaurantId) => {
  try {
    const res = await axios.get(foods(restaurantId));
    return res.data;
  } catch (e) {
    return console.error(e);
  }
};
