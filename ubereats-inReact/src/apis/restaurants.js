import axios from "axios";
import { restaurants } from "../urls";

export const fetchRestaurants = async () => {
  try {
    const res = await axios
      .get(restaurants);
    return res.data;
  } catch (e) {
    return console.error(e);
  }
};
