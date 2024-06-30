import axios from "axios"
import { foods } from "../urls"

export const fetchFoods = (restaurantId) => {
    return axios.get(foods(restaurantId)).then(res => {
        return res.data
    })
    .catch((e) => console.error(e))
}