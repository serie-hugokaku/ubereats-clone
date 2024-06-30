import axios from "axios";
import { restaurants } from "../urls";

export const fetchRestaurants = () => {
  return axios
    .get(restaurants)
    .then((res) => {
      return res.data;
    })
    .catch((e) => console.error(e));
};
