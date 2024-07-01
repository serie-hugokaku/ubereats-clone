import axios from "axios"
import {lineFoods, orders} from "../urls/index"

export const postOrder = async (params) => {
    try {
        const res = await axios.post(orders,
            {
                LineFoodIDs: params.LineFoodIDs
            })
        return res.data
    } catch (e) {
        return console.error(e)
    }
}